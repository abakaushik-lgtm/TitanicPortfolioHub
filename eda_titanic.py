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
    # Check input
    if not os.path.exists(CSV_INPUT):
        print(f"Error: Cleansed input '{CSV_INPUT}' not found. Please run preprocess_titanic.py first.")
        return

    # Load cleaned records
    records = []
    with open(CSV_INPUT, mode='r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for row in reader:
            records.append(row)

    total_records = len(records)
    print(f"Loaded {total_records} preprocessed passenger records for EDA analysis.")
    print("==========================================================================\n")

    # --- 1. Descriptive Statistics ---
    print("SECTION 1: DESCRIPTIVE STATISTICS")
    print("--------------------------------------------------------------------------")
    
    # Age Statistics
    ages = get_column(records, "Age", float)
    mean_age = compute_mean(ages)
    median_age = compute_median(ages)
    min_age = min(ages) if ages else 0.0
    max_age = max(ages) if ages else 0.0
    std_age = compute_std_dev(ages, mean_age)

    print(f"Passenger Age Profile Metrics:")
    print(f"  * Mean Age:   {mean_age:.4f} years")
    print(f"  * Median Age: {median_age:.4f} years")
    print(f"  * Minimum:    {min_age:.2f} years")
    print(f"  * Maximum:    {max_age:.2f} years")
    print(f"  * Std Dev:    {std_age:.4f} years")

    # Fare Statistics
    fares = get_column(records, "Fare", float)
    mean_fare = compute_mean(fares)
    median_fare = compute_median(fares)
    min_fare = min(fares) if fares else 0.0
    max_fare = max(fares) if fares else 0.0
    std_fare = compute_std_dev(fares, mean_fare)

    print(f"\nPassenger Fare Ticket Metrics:")
    print(f"  * Mean Fare:   £{mean_fare:.4f}")
    print(f"  * Median Fare: £{median_fare:.4f}")
    print(f"  * Minimum:    £{min_fare:.2f}")
    print(f"  * Maximum:    £{max_fare:.2f}")
    print(f"  * Std Dev:    £{std_fare:.4f}")

    # Counts
    pclasses = get_column(records, "Pclass", int)
    c1 = pclasses.count(1)
    c2 = pclasses.count(2)
    c3 = pclasses.count(3)
    print(f"\nPassenger Counts by Class (Pclass):")
    print(f"  * Class 1 (Upper):  {c1} ({c1/total_records*100:.2f}%)")
    print(f"  * Class 2 (Middle): {c2} ({c2/total_records*100:.2f}%)")
    print(f"  * Class 3 (Lower):  {c3} ({c3/total_records*100:.2f}%)")

    genders = get_column(records, "Sex", str)
    males = genders.count("male")
    females = genders.count("female")
    print(f"\nPassenger Counts by Sex:")
    print(f"  * Males:            {males} ({males/total_records*100:.2f}%)")
    print(f"  * Females:          {females} ({females/total_records*100:.2f}%)")

    survivals = get_column(records, "Survived", int)
    survived_cnt = survivals.count(1)
    deceased_cnt = survivals.count(0)
    print(f"\nSurvival Profile Ratios:")
    print(f"  * Survived (1):     {survived_cnt} ({survived_cnt/total_records*100:.2f}%)")
    print(f"  * Deceased (0):     {deceased_cnt} ({deceased_cnt/total_records*100:.2f}%)")

    # --- 2. Bivariate Survival Analysis ---
    print("\nSECTION 2: BIVARIATE SURVIVAL ANALYSIS")
    print("--------------------------------------------------------------------------")
    
    # Survival vs Gender
    f_surv = sum(1 for r in records if r["Sex"] == "female" and int(r["Survived"]) == 1)
    f_tot = sum(1 for r in records if r["Sex"] == "female")
    m_surv = sum(1 for r in records if r["Sex"] == "male" and int(r["Survived"]) == 1)
    m_tot = sum(1 for r in records if r["Sex"] == "male")
    
    print(f"Survival Rate by Gender:")
    print(f"  * Females: {f_surv} survived out of {f_tot} ({f_surv/f_tot*100:.2f}%)")
    print(f"  * Males:   {m_surv} survived out of {m_tot} ({m_surv/m_tot*100:.2f}%)")

    # Survival vs Pclass
    p1_s = sum(1 for r in records if int(r["Pclass"]) == 1 and int(r["Survived"]) == 1)
    p1_t = sum(1 for r in records if int(r["Pclass"]) == 1)
    p2_s = sum(1 for r in records if int(r["Pclass"]) == 2 and int(r["Survived"]) == 1)
    p2_t = sum(1 for r in records if int(r["Pclass"]) == 2)
    p3_s = sum(1 for r in records if int(r["Pclass"]) == 3 and int(r["Survived"]) == 1)
    p3_t = sum(1 for r in records if int(r["Pclass"]) == 3)

    print(f"\nSurvival Rate by Ticket Class:")
    print(f"  * Class 1: {p1_s} survived out of {p1_t} ({p1_s/p1_t*100:.2f}%)")
    print(f"  * Class 2: {p2_s} survived out of {p2_t} ({p2_s/p2_t*100:.2f}%)")
    print(f"  * Class 3: {p3_s} survived out of {p3_t} ({p3_s/p3_t*100:.2f}%)")

    # --- 3. Correlation Matrix ---
    print("\nSECTION 3: PEARSON CORRELATION MATRIX")
    print("--------------------------------------------------------------------------")
    num_fields = ["Survived", "Pclass", "Age", "SibSp", "Parch", "Fare"]
    num_data = {f: get_column(records, f, float) for f in num_fields}

    print(f"{'Field':12s}", end="")
    for f in num_fields:
        print(f"{f:10s}", end="")
    print()

    correlation_matrix = {}
    for f1 in num_fields:
        correlation_matrix[f1] = {}
        print(f"{f1:12s}", end="")
        for f2 in num_fields:
            coef = compute_pearson_correlation(num_data[f1], num_data[f2])
            correlation_matrix[f1][f2] = coef
            print(f"{coef:10.4f}", end="")
        print()

    # --- 4. Outlier Detection using IQR Method ---
    print("\nSECTION 4: IQR OUTLIER DETECTION SCAN")
    print("--------------------------------------------------------------------------")
    
    def detect_outliers(vals, field_name):
        sorted_vals = sorted(vals)
        n = len(sorted_vals)
        
        # Q1 (25th percentile) and Q3 (75th percentile)
        q1_idx = int(n * 0.25)
        q3_idx = int(n * 0.75)
        q1 = sorted_vals[q1_idx]
        q3 = sorted_vals[q3_idx]
        iqr = q3 - q1
        
        lower_bound = q1 - 1.5 * iqr
        upper_bound = q3 + 1.5 * iqr
        
        outliers = [x for x in vals if x < lower_bound or x > upper_bound]
        
        print(f"{field_name} Outlier Bounds Audit:")
        print(f"  * First Quartile (Q1):  {q1:.4f}")
        print(f"  * Third Quartile (Q3):  {q3:.4f}")
        print(f"  * Interquartile (IQR):  {iqr:.4f}")
        print(f"  * Lower Outlier Limit:  {lower_bound:.4f}")
        print(f"  * Upper Outlier Limit:  {upper_bound:.4f}")
        print(f"  * Outliers Detected:    {len(outliers)} values out of {n} ({len(outliers)/n*100:.2f}%)")
        if outliers:
            print(f"    - Min Outlier: {min(outliers):.2f} | Max Outlier: {max(outliers):.2f}")
        return outliers

    detect_outliers(num_data["Age"], "Age")
    print()
    detect_outliers(num_data["Fare"], "Fare")

    print("\n==========================================================================")
    print("EXPLORATORY DATA ANALYSIS PIPELINE COMPLETED - DATA INSIGHTS COMPILED!")
    print("==========================================================================")

if __name__ == "__main__":
    main()
