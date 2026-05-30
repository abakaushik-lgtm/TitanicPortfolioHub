import csv
import os
import json
import math
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, confusion_matrix, classification_report

CSV_INPUT = "titanic_clean.csv"
JS_OUTPUT = "titanic_model_meta.js"

def main():
    print("==========================================================================")
    print("RUNNING TITANIC PREDICTIVE MODELING PIPELINE (TASK 5)")
    print("==========================================================================")
    
    if not os.path.exists(CSV_INPUT):
        print(f"Error: Cleansed input '{CSV_INPUT}' not found. Please run preprocess_titanic.py first.")
        return

    # Load preprocessed records
    records = []
    with open(CSV_INPUT, mode='r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for row in reader:
            records.append(row)

    total_records = len(records)
    print(f"Loaded {total_records} preprocessed passenger records.")

    # --- 1. Prepare Features and Targets ---
    # We will MinMax normalize Age and Fare so that the Logistic Regression
    # coefficients act as direct indicators of Feature Importance.
    # Age Min/Max: [0.42, 80.00]
    # Fare Min/Max: [0.00, 512.3292]
    # Sex Encoding: female = 1, male = 0
    # Embarked Encoding: C = 1, Q = 2, S = 0

    X = []
    y = []

    for r in records:
        survived = int(r["Survived"])
        pclass = int(r["Pclass"])
        
        # Gender encoding
        sex = 1 if r["Sex"] == "female" else 0
        
        # Age normalization (MinMax [0.42, 80.00])
        age = float(r["Age"])
        age_norm = (age - 0.42) / (80.00 - 0.42)
        
        sibsp = int(r["SibSp"])
        parch = int(r["Parch"])
        
        # Fare normalization (MinMax [0.00, 512.3292])
        fare = float(r["Fare"])
        fare_norm = (fare - 0.0) / (512.3292 - 0.0)
        
        # Embarked encoding
        emb_val = r["Embarked"]
        if emb_val == "C":
            emb = 1
        elif emb_val == "Q":
            emb = 2
        else:
            emb = 0 # Southampton as mode base

        X.append([age_norm, sex, pclass, fare_norm, sibsp, parch, emb])
        y.append(survived)

    # --- 2. Train-Test Split (80% Train, 20% Test) ---
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42
    )
    print(f"Train split size: {len(X_train)} records | Test split size: {len(X_test)} records")

    # --- 3. Model Selection & Training ---
    # We select Logistic Regression as recommended for its high interpretability,
    # suitability for binary outcomes, and excellent baseline capacity.
    model = LogisticRegression(random_state=42)
    model.fit(X_train, y_train)
    print("Logistic Regression model trained successfully.")
    print("--------------------------------------------------------------------------\n")

    # --- 4. Model Evaluation ---
    y_pred = model.predict(X_test)
    y_prob = model.predict_proba(X_test)[:, 1]

    accuracy = accuracy_score(y_test, y_pred)
    tn, fp, fn, tp = confusion_matrix(y_test, y_pred).ravel()
    report = classification_report(y_test, y_pred, output_dict=True)

    print("MODEL PERFORMANCE METRICS")
    print("-------------------------")
    print(f"Accuracy Score: {accuracy * 100:.2f}% ({sum(1 for a, b in zip(y_test, y_pred) if a == b)} of {len(y_test)} correct)")
    print()
    print("Confusion Matrix:")
    print(f"  * True Negatives (TN)  : {tn}")
    print(f"  * False Positives (FP) : {fp} (Type I Error)")
    print(f"  * False Negatives (FN) : {fn} (Type II Error)")
    print(f"  * True Positives (TP)  : {tp}")
    print()
    print("Classification Report Matrix:")
    print(f"  * Deceased (Class 0): Precision = {report['0']['precision']:.4f} | Recall = {report['0']['recall']:.4f} | F1 = {report['0']['f1-score']:.4f}")
    print(f"  * Survived (Class 1): Precision = {report['1']['precision']:.4f} | Recall = {report['1']['recall']:.4f} | F1 = {report['1']['f1-score']:.4f}")
    print()

    # --- 5. Coefficients & Intercept ---
    intercept = model.intercept_[0]
    coeffs = model.coef_[0]
    features = ["Age", "Sex", "Pclass", "Fare", "SibSp", "Parch", "Embarked"]
    coef_dict = dict(zip(features, coeffs))

    print("MODEL COEFFICIENTS (Feature Importance)")
    print("---------------------------------------")
    print(f"  * Base Intercept (Beta_0): {intercept:.4f}")
    for feat, val in coef_dict.items():
        print(f"  * Feature {feat:10s} (Beta_i): {val: .4f}")
    print()

    # --- 6. Profiling Simulations (Sample Predictions) ---
    print("PASSENGER PROFILE SIMULATION SAMPLES")
    print("------------------------------------")
    
    def predict_profile(age, sex_str, pclass, fare, sibsp, parch, embarked_str):
        sex = 1 if sex_str == "female" else 0
        age_n = (age - 0.42) / (80.00 - 0.42)
        fare_n = (fare - 0.0) / (512.3292 - 0.0)
        emb = 1 if embarked_str == "C" else 2 if embarked_str == "Q" else 0
        
        # Calculate decision boundary score z
        z = (intercept + 
             coef_dict["Age"] * age_n + 
             coef_dict["Sex"] * sex + 
             coef_dict["Pclass"] * pclass + 
             coef_dict["Fare"] * fare_n + 
             coef_dict["SibSp"] * sibsp + 
             coef_dict["Parch"] * parch + 
             coef_dict["Embarked"] * emb)
        
        # Calculate logistic probability p
        p = 1.0 / (1.0 + math.exp(-z))
        pred = 1 if p >= 0.5 else 0
        outcome = "Survived" if pred == 1 else "Did Not Survive"
        print(f"  * Profile: {sex_str.capitalize()}, Age {age}, Class {pclass}, Fare £{fare}, Port {embarked_str} -> Prob = {p*100:.2f}% -> Prediction: {outcome}")
        return p, outcome

    # Profile 1: Female, 25, First Class, £100 Fare, Port Cherbourg, 0 SibSp/Parch
    predict_profile(25.0, "female", 1, 100.0, 0, 0, "C")
    # Profile 2: Male, 35, Third Class, £8 Fare, Port Southampton, 0 SibSp/Parch
    predict_profile(35.0, "male", 3, 8.0, 0, 0, "S")
    # Profile 3: Child Male, 8, Second Class, £20 Fare, Port Southampton, 0 SibSp/Parch
    predict_profile(8.0, "male", 2, 20.0, 0, 0, "S")
    print()

    # --- 7. Export Metadata JS Database ---
    js_content = f"""// Titanic Machine Learning Model Metadata
// Trained using Logistic Regression on an 80-20 Train-Test split
window.titanicModelMeta = {{
    intercept: {intercept:.8f},
    coefficients: {{
        Age: {coef_dict['Age']:.8f},
        Sex: {coef_dict['Sex']:.8f},
        Pclass: {coef_dict['Pclass']:.8f},
        Fare: {coef_dict['Fare']:.8f},
        SibSp: {coef_dict['SibSp']:.8f},
        Parch: {coef_dict['Parch']:.8f},
        Embarked: {coef_dict['Embarked']:.8f}
    }},
    accuracy: {accuracy:.8f},
    confusionMatrix: {{
        TN: {tn},
        FP: {fp},
        FN: {fn},
        TP: {tp}
    }},
    classificationReport: {{
        deceased: {{
            precision: {report['0']['precision']:.8f},
            recall: {report['0']['recall']:.8f},
            f1: {report['0']['f1-score']:.8f}
        }},
        survived: {{
            precision: {report['1']['precision']:.8f},
            recall: {report['1']['recall']:.8f},
            f1: {report['1']['f1-score']:.8f}
        }}
    }}
}};
"""
    with open(JS_OUTPUT, mode='w', encoding='utf-8') as f:
        f.write(js_content)
    print(f"Model parameters successfully compiled and exported to '{JS_OUTPUT}'!")
    print("==========================================================================")

if __name__ == "__main__":
    main()
