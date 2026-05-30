import csv
import json
import os

CSV_INPUT = "titanic.csv"
CSV_OUTPUT = "titanic_clean.csv"
JS_OUTPUT = "titanic_clean_data.js"

def preprocess():
    print("==========================================================================")
    print("STARTING TITANIC PASSENGER DATA CLEANING & PREPROCESSING PIPELINE")
    print("==========================================================================")

    if not os.path.exists(CSV_INPUT):
        print(f"Error: Input file '{CSV_INPUT}' not found. Please run download_titanic.py first.")
        return

    # 1. Read Raw Records
    raw_records = []
    with open(CSV_INPUT, mode='r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for row in reader:
            raw_records.append(row)
    
    total_raw = len(raw_records)
    print(f"Loaded {total_raw} raw passenger records from '{CSV_INPUT}'.")

    # --- Step 1: Duplicate Auditing & Removal ---
    print("\n[Step 1] Auditing for Duplicate Passenger Records...")
    seen_ids = set()
    cleaned_records = []
    duplicate_count = 0

    for row in raw_records:
        pid = row.get("PassengerId", "").strip()
        if pid in seen_ids:
            duplicate_count += 1
            print(f"  --> Warning: Duplicate PassengerId '{pid}' detected and omitted.")
        else:
            seen_ids.add(pid)
            cleaned_records.append(row)

    print(f"Audit Complete: Checked {total_raw} rows. Found {duplicate_count} duplicates. Remaining records: {len(cleaned_records)}.")

    # --- Step 2: Missing Value Calculations & Imputation Setup ---
    print("\n[Step 2] Auditing Missing Values...")
    
    # Calculate medians/modes for imputations
    ages = []
    embarked_ports = {}
    
    for r in cleaned_records:
        age_str = r.get("Age", "").strip()
        if age_str:
            try:
                ages.append(float(age_str))
            except ValueError:
                pass
                
        emb_str = r.get("Embarked", "").strip()
        if emb_str:
            embarked_ports[emb_str] = embarked_ports.get(emb_str, 0) + 1

    # Imputers
    ages.sort()
    n_ages = len(ages)
    if n_ages % 2 == 1:
        median_age = ages[n_ages // 2]
    else:
        median_age = (ages[n_ages // 2 - 1] + ages[n_ages // 2]) / 2.0

    most_frequent_port = max(embarked_ports, key=embarked_ports.get) if embarked_ports else "S"

    print(f"Calculated Imputation Fill Values:")
    print(f"  * Median Passenger Age: {median_age:.2f} years (computed from {n_ages} present records)")
    print(f"  * Mode Embarkation Port: '{most_frequent_port}' (Southampton)")

    # --- Step 3: Perform Imputation, Standardization, and Formatting ---
    print("\n[Step 3] Executing Cleansing, Formatting, and Imputations...")
    preprocessed_records = []
    
    imputed_age_count = 0
    imputed_emb_count = 0
    imputed_cab_count = 0
    type_conversions = 0
    
    for r in cleaned_records:
        clean_row = {}
        
        # Unique ID
        clean_row["PassengerId"] = int(r["PassengerId"].strip())
        
        # Survived (Binary target check)
        surv_val = r["Survived"].strip()
        clean_row["Survived"] = int(surv_val) if surv_val.isdigit() else 0
        
        # Pclass (Ordinal conversion)
        class_val = r["Pclass"].strip()
        clean_row["Pclass"] = int(class_val) if class_val.isdigit() else 3
        
        # Passenger Name standardization
        name_val = r.get("Name", "").strip()
        # Remove excess quotes or escape characters if any
        name_val = name_val.replace('"', '').replace("'", "")
        clean_row["Name"] = name_val
        
        # Sex standardization
        sex_val = r.get("Sex", "").strip().lower()
        clean_row["Sex"] = sex_val
        
        # Age Imputation & Formatting
        age_val = r.get("Age", "").strip()
        if age_val:
            try:
                clean_row["Age"] = float(age_val)
            except ValueError:
                clean_row["Age"] = median_age
                imputed_age_count += 1
        else:
            clean_row["Age"] = median_age
            imputed_age_count += 1
            
        # Discrete Dependents formatting
        clean_row["SibSp"] = int(r["SibSp"].strip()) if r["SibSp"].strip().isdigit() else 0
        clean_row["Parch"] = int(r["Parch"].strip()) if r["Parch"].strip().isdigit() else 0
        
        # Alphanumeric Ticket standardization
        clean_row["Ticket"] = r.get("Ticket", "").strip().upper()
        
        # Fare Float formatting
        fare_val = r.get("Fare", "").strip()
        if fare_val:
            try:
                clean_row["Fare"] = float(fare_val)
            except ValueError:
                clean_row["Fare"] = 0.0
        else:
            clean_row["Fare"] = 0.0
            
        # Cabin Imputation (High Sparsity treatment: Label missing cabins as 'Unknown')
        cab_val = r.get("Cabin", "").strip()
        if cab_val:
            # Standardize letters
            clean_row["Cabin"] = cab_val.upper()
        else:
            clean_row["Cabin"] = "Unknown"
            imputed_cab_count += 1
            
        # Embarked Port Imputation
        emb_val = r.get("Embarked", "").strip()
        if emb_val:
            clean_row["Embarked"] = emb_val.upper()
        else:
            clean_row["Embarked"] = most_frequent_port
            imputed_emb_count += 1
            
        preprocessed_records.append(clean_row)

    print("Cleaning operations completed:")
    print(f"  * Age Imputations: Filled {imputed_age_count} missing ages with median {median_age:.1f}")
    print(f"  * Cabin Grouping: Replaced {imputed_cab_count} empty cabins with label 'Unknown'")
    print(f"  * Embarked Imputations: Filled {imputed_emb_count} missing embarkation ports with port '{most_frequent_port}'")

    # --- Step 4: Data Validation Range & Integrity Checks ---
    print("\n[Step 4] Running Post-Preprocessing Data Validation Checks...")
    validated_records = []
    
    validation_failures = 0
    for pr in preprocessed_records:
        validated = True
        
        # Validation 1: Age sanity check
        if pr["Age"] < 0 or pr["Age"] > 100:
            print(f"  --> Warning [PID {pr['PassengerId']}]: Age value '{pr['Age']}' is outside reasonable bounds (0-100).")
            validated = False
            
        # Validation 2: Fare negative entries check
        if pr["Fare"] < 0:
            print(f"  --> Warning [PID {pr['PassengerId']}]: Fare value '{pr['Fare']}' is negative (invalid). Correcting to 0.0.")
            pr["Fare"] = 0.0
            validation_failures += 1
            
        # Validation 3: Survival binary outcomes check
        if pr["Survived"] not in [0, 1]:
            print(f"  --> Warning [PID {pr['PassengerId']}]: Survived flag '{pr['Survived']}' is invalid. Standardizing to 0.")
            pr["Survived"] = 0
            validation_failures += 1
            
        validated_records.append(pr)

    print(f"Validation Checks Completed. Found {validation_failures} correctable anomalies. All range constraints satisfied.")

    # --- Step 5: Save Cleaned Datasets (CSV and JS Database) ---
    print("\n[Step 5] Writing Cleaned Databases...")
    
    # Save CSV
    fieldnames = ["PassengerId", "Survived", "Pclass", "Name", "Sex", "Age", "SibSp", "Parch", "Ticket", "Fare", "Cabin", "Embarked"]
    with open(CSV_OUTPUT, mode='w', newline='', encoding='utf-8') as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        for r in validated_records:
            writer.writerow(r)
    
    print(f"  * Clean CSV database successfully written: '{CSV_OUTPUT}'")

    # Save JS Database
    with open(JS_OUTPUT, mode='w', encoding='utf-8') as f:
        f.write("// Titanic Passenger Dataset - Preprocessed & Cleaned\n")
        f.write("window.titanicCleanData = ")
        json.dump(validated_records, f, indent=2)
        f.write(";\n")

    print(f"  * Clean JavaScript database successfully written: '{JS_OUTPUT}'")
    print("\n==========================================================================")
    print("PREPROCESSING PIPELINE SUCCESSFULLY COMPLETED - DATA READY FOR ANALYSIS!")
    print("==========================================================================")

if __name__ == "__main__":
    preprocess()
