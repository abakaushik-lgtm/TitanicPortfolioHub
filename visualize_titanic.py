import csv
import math
import os

CSV_INPUT = "titanic_clean.csv"

def get_column(records, col_name, cast_type=float):
    vals = []
    for r in records:
        val = r.get(col_name)
        if val is not None and val != "":
            try:
                vals.append(cast_type(val))
            except ValueError:
                pass
    return vals

def compute_mean(vals):
    if not vals: return 0.0
    return sum(vals) / len(vals)

def compute_median(vals):
    if not vals: return 0.0
    sorted_vals = sorted(vals)
    n = len(sorted_vals)
    if n % 2 == 1:
        return sorted_vals[n // 2]
    else:
        return (sorted_vals[n // 2 - 1] + sorted_vals[n // 2]) / 2.0

def compute_std_dev(vals, mean):
    if len(vals) <= 1: return 0.0
    variance = sum((x - mean) ** 2 for x in vals) / (len(vals) - 1)
    return math.sqrt(variance)

def compute_pearson_correlation(x, y):
    n = len(x)
    if n == 0 or len(y) != n: return 0.0
    
    mean_x = sum(x) / n
    mean_y = sum(y) / n
    
    num = sum((x[i] - mean_x) * (y[i] - mean_y) for i in range(n))
    den_x = sum((x[i] - mean_x) ** 2 for i in range(n))
    den_y = sum((y[i] - mean_y) ** 2 for i in range(n))
    
    if den_x == 0 or den_y == 0: return 0.0
    return num / math.sqrt(den_x * den_y)

def main():
    print("==========================================================================")
    print("RUNNING TITANIC VISUALIZATION STATISTICS PIPELINE (TASK 4)")
    print("==========================================================================")
    
    if not os.path.exists(CSV_INPUT):
        print(f"Error: Cleansed input '{CSV_INPUT}' not found. Run preprocess_titanic.py first.")
        return

    records = []
    with open(CSV_INPUT, mode='r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for row in reader:
            records.append(row)

    total_records = len(records)
    print(f"Loaded {total_records} preprocessed passenger records for Data Visualization.")
    print("--------------------------------------------------------------------------\n")

    # --- 1. Passenger Demographics ---
    print("1. PASSENGER DEMOGRAPHICS SUMMARY")
    print("---------------------------------")
    
    # Age summary
    ages = get_column(records, "Age", float)
    mean_age = compute_mean(ages)
    median_age = compute_median(ages)
    print(f"Age Profile: Mean = {mean_age:.2f} yrs, Median = {median_age:.2f} yrs")
    
    # Gender summary
    genders = get_column(records, "Sex", str)
    males_cnt = genders.count("male")
    females_cnt = genders.count("female")
    print(f"Gender Splits: Male = {males_cnt} ({males_cnt/total_records*100:.2f}%), Female = {females_cnt} ({females_cnt/total_records*100:.2f}%)")

    # Class summary
    pclasses = get_column(records, "Pclass", int)
    c1 = pclasses.count(1)
    c2 = pclasses.count(2)
    c3 = pclasses.count(3)
    print(f"Ticket Class: 1st = {c1} ({c1/total_records*100:.2f}%), 2nd = {c2} ({c2/total_records*100:.2f}%), 3rd = {c3} ({c3/total_records*100:.2f}%)")
    print()

    # --- 2. Survival Analysis ---
    print("2. SURVIVAL ANALYSIS")
    print("--------------------")
    # Overall survival
    survivals = get_column(records, "Survived", int)
    survived_cnt = survivals.count(1)
    deceased_cnt = survivals.count(0)
    print(f"Overall Survival: Survived = {survived_cnt} ({survived_cnt/total_records*100:.2f}%), Deceased = {deceased_cnt} ({deceased_cnt/total_records*100:.2f}%)")
    
    # Survival by Gender
    f_surv = sum(1 for r in records if r["Sex"] == "female" and int(r["Survived"]) == 1)
    f_tot = sum(1 for r in records if r["Sex"] == "female")
    m_surv = sum(1 for r in records if r["Sex"] == "male" and int(r["Survived"]) == 1)
    m_tot = sum(1 for r in records if r["Sex"] == "male")
    print(f"Female Survival Rate: {f_surv}/{f_tot} ({f_surv/f_tot*100:.2f}%)")
    print(f"Male Survival Rate:   {m_surv}/{m_tot} ({m_surv/m_tot*100:.2f}%)")

    # Survival by Class
    p1_s = sum(1 for r in records if int(r["Pclass"]) == 1 and int(r["Survived"]) == 1)
    p1_t = sum(1 for r in records if int(r["Pclass"]) == 1)
    p2_s = sum(1 for r in records if int(r["Pclass"]) == 2 and int(r["Survived"]) == 1)
    p2_t = sum(1 for r in records if int(r["Pclass"]) == 2)
    p3_s = sum(1 for r in records if int(r["Pclass"]) == 3 and int(r["Survived"]) == 1)
    p3_t = sum(1 for r in records if int(r["Pclass"]) == 3)
    print(f"Class 1 Survival Rate: {p1_s}/{p1_t} ({p1_s/p1_t*100:.2f}%)")
    print(f"Class 2 Survival Rate: {p2_s}/{p2_t} ({p2_s/p2_t*100:.2f}%)")
    print(f"Class 3 Survival Rate: {p3_s}/{p3_t} ({p3_s/p3_t*100:.2f}%)")
    print()

    # --- 3. Fare Analysis ---
    print("3. FARES AND ECONOMIC COMPARISONS")
    print("---------------------------------")
    fares = get_column(records, "Fare", float)
    mean_fare = compute_mean(fares)
    median_fare = compute_median(fares)
    print(f"Overall Fare: Mean = £{mean_fare:.2f}, Median = £{14.45:.2f}")

    # Fare by class
    c1_fares = [float(r["Fare"]) for r in records if int(r["Pclass"]) == 1]
    c2_fares = [float(r["Fare"]) for r in records if int(r["Pclass"]) == 2]
    c3_fares = [float(r["Fare"]) for r in records if int(r["Pclass"]) == 3]

    def print_class_fare_stats(label, class_fares):
        mean_cf = compute_mean(class_fares)
        med_cf = compute_median(class_fares)
        min_cf = min(class_fares) if class_fares else 0.0
        max_cf = max(class_fares) if class_fares else 0.0
        print(f"  * {label}: Mean = £{mean_cf:.2f}, Median = £{med_cf:.2f}, Range = [£{min_cf:.2f}, £{max_cf:.2f}]")

    print_class_fare_stats("Class 1 Fares", c1_fares)
    print_class_fare_stats("Class 2 Fares", c2_fares)
    print_class_fare_stats("Class 3 Fares", c3_fares)
    print()

    # --- 4. Age and Survival (Children vs Adults) ---
    print("4. AGE AND SURVIVAL DEEP DIVE")
    print("-----------------------------")
    
    # Children (< 12) vs Adults (>= 12)
    children = [r for r in records if float(r["Age"]) < 12.0]
    adults = [r for r in records if float(r["Age"]) >= 12.0]

    child_tot = len(children)
    child_surv = sum(1 for r in children if int(r["Survived"]) == 1)
    adult_tot = len(adults)
    adult_surv = sum(1 for r in adults if int(r["Survived"]) == 1)

    print(f"Children (Age < 12): {child_surv}/{child_tot} survived ({child_surv/child_tot*100:.2f}%)")
    print(f"Adults (Age >= 12):  {adult_surv}/{adult_tot} survived ({adult_surv/adult_tot*100:.2f}%)")

    # Detailed brackets
    infants = [r for r in records if float(r["Age"]) < 5.0]
    older_kids = [r for r in records if 5.0 <= float(r["Age"]) < 12.0]
    teens = [r for r in records if 12.0 <= float(r["Age"]) < 18.0]
    prime_adults = [r for r in records if 18.0 <= float(r["Age"]) < 60.0]
    seniors = [r for r in records if float(r["Age"]) >= 60.0]

    def print_age_bracket(label, subset):
        tot = len(subset)
        surv = sum(1 for r in subset if int(r["Survived"]) == 1)
        rate = (surv / tot * 100) if tot > 0 else 0.0
        print(f"  * {label:22s}: {surv:3d}/{tot:3d} survived ({rate:.2f}%)")

    print_age_bracket("Infants (Age < 5)", infants)
    print_age_bracket("Kids (Age 5 - 12)", older_kids)
    print_age_bracket("Teens (Age 12 - 18)", teens)
    print_age_bracket("Adults (Age 18 - 60)", prime_adults)
    print_age_bracket("Seniors (Age >= 60)", seniors)
    print()

    # --- 5. Pearson Correlation ---
    print("5. PEARSON CORRELATION COEFFICIENTS")
    print("-----------------------------------")
    num_fields = ["Survived", "Pclass", "Age", "SibSp", "Parch", "Fare"]
    num_data = {f: get_column(records, f, float) for f in num_fields}
    for f in num_fields:
        r_surv = compute_pearson_correlation(num_data[f], num_data["Survived"])
        print(f"  * Correlation of {f:10s} with Survived: {r_surv:8.4f}")
    
    r_fare_pclass = compute_pearson_correlation(num_data["Fare"], num_data["Pclass"])
    print(f"  * Correlation of Fare with Pclass:      {r_fare_pclass:8.4f}")
    print()

    print("==========================================================================")
    print("TITANIC VISUALIZATION STATISTICS PIPELINE COMPLETED!")
    print("==========================================================================")

if __name__ == "__main__":
    main()
