---
marp: true
theme: gaia
_class: lead
paginate: true
backgroundColor: #0f172a
color: #f8fafc
style: |
  section {
    font-family: 'Inter', sans-serif;
    padding: 40px;
  }
  h1 {
    color: #2dd4bf;
  }
  h2 {
    color: #0d9488;
    border-bottom: 2px solid #334155;
  }
  footer {
    color: #64748b;
  }
  code {
    background-color: #1e293b;
    color: #e2e8f0;
  }
  table {
    border-collapse: collapse;
    width: 100%;
    margin-top: 20px;
  }
  th {
    background-color: #1e293b;
    color: #2dd4bf;
    border: 1px solid #334155;
    padding: 8px;
  }
  td {
    border: 1px solid #334155;
    padding: 8px;
  }
---

# TASK 2: DATA CLEANING & PREPROCESSING
## Preparing the Titanic Dataset for Analysis

**Presented by**: Data Science Team  
**Objective**: Build a robust, 5-stage data engineering pipeline to audit, impute, deduplicate, and validate passenger records.

---

## 1. Context & Objectives

*   **The Problem**: Raw datasets contain incomplete logs, formatting discrepancies, and outliers. Applying raw data to ML models causes errors or biased predictions.
*   **The Mission**: Establish absolute data reliability for the **891-record Titanic dataset** through systematic preprocessing.
*   **Core Objectives**:
    1.  **Deduplicate**: Prevent manifest duplication biases.
    2.  **Impute**: Address the 177 missing ages and Port omissions.
    3.  **Structure**: Label the 77% missing Cabins.
    4.  **Standardize**: Normalize programmatic datatypes and text cases.
    5.  **Validate**: Apply physical range constraints.

---

## 2. Preprocessing Flowchart

Our systematic 5-stage cleaning pipeline is structured as follows:

```
    [Raw Titanic Dataset]
              │
              ▼
   Stage 1: Duplicate Audit  ───► Identify and remove duplicate rows
              │
              ▼
   Stage 2: Missingness Imputation  ───► Median Age (28), Mode Port (S), Cabin (Unknown)
              │
              ▼
   Stage 3: Data Type Casts ───► Standardize Floats (Age, Fare) & Ints
              │
              ▼
   Stage 4: Text Standardization ───► Uppercase ports/cabins, Lowercase Sex, Trim spaces
              │
              ▼
   Stage 5: Range Validations ───► Verify Age (0-100), Fare (>=0), Survived (0/1)
              │
              ▼
   [Cleaned, Analysis-Ready Dataset]
```

---

## 3. Data Cleaning Imputation Strategy

We resolve the three missing value features using statistically rigorous methods:

### 1. **Age (19.87% Missing)**
*   *Method*: Fill with the **Median Age (28.0 years)**.
*   *Rationale*: Outlier-robust. Prevents distortion from infant and elderly extremes, maintaining a normal demographic curve.

### 2. **Embarked (0.22% Missing)**
*   *Method*: Fill with the **Mode Port ("S" - Southampton)**.
*   *Rationale*: Safe categorical mode treatment; Southampton accounts for >72% of the manifests.

### 3. **Cabin (77.10% Missing)**
*   *Method*: Group missing cells under category **"Unknown"**.
*   *Rationale*: Preserves rows for analysis while retaining deck initials for feature engineering.

---

## 4. Standardization & Type Casting

To maximize database efficiency and algorithm compatibility:

*   **Type Conversions**:
    *   `Age` cast to **Double Float** to preserve fractional infant records.
    *   `Fare` cast to **Double Float**.
    *   `PassengerId`, `Survived`, and `Pclass` cast to **Integers**.
*   **Text Normalization**:
    *   Passenger full names stripped of irregular quotes and double spaces.
    *   `Sex` standardized to lowercase (`male`, `female`).
    *   `Ticket`, `Cabin`, and `Embarked` ports converted to uppercase.
*   **Duplicate Audit**:
    *   Verified all 891 records represent unique primary manifests (0 duplicates present).

---

## 5. Post-Cleaning Validation Range Checks

A final sanity script executes range-boundary checks on the preprocessed dataset:

1.  **Age Boundaries ($0.0 < Age \le 100.0$)**
    *   Verified all passenger ages represent logical physical values.
2.  **Fare Non-Negativity ($Fare \ge £0.00$)**
    *   Confirmed zero negative tickets are present in the final register.
3.  **Survival Binary Integrity ($Survived \in [0, 1]$)**
    *   Validated that the target outcome contains only strictly valid states.

> [!NOTE]
> All 891 records successfully conformed to validation boundaries. The data is logically consistent and clean.

---

## 6. Before-and-After Preprocessing Comparison

| Feature / Metric | Raw Manifest State | Preprocessed State | Technical Preprocessing Action |
| :--- | :--- | :--- | :--- |
| **Total Records** | 891 rows | **891 rows** | Deduplication validated manifest integrity |
| **Age Completeness** | 80.13% (177 missing) | **100.00% (0 missing)** | Imputed using median passenger age (**28.0**) |
| **Cabin Completeness**| 22.90% (687 missing) | **100.00% (0 missing)** | Empty values labeled as category **"Unknown"** |
| **Port Completeness** | 99.78% (2 missing) | **100.00% (0 missing)** | Imputed using the mode port **"S"** (Southampton) |
| **Type Consistency** | Mixed alphanumerics | **Standardized schema** | Continuous floats and categoricals cast cleanly |
| **Data Quality** | 866 null cells | **0 null cells** | Data is complete and ready for analysis |

---

## 7. Conclusions & Next Steps

*   **Pipeline Success**: The preprocessing pipeline bridged the gap between messy historical manifests and strict mathematical models.
*   **Quality Achieved**: Resolved all **866 missing value cells**, verified **manifest uniqueness**, and validated **range constraints** with zero data loss.
*   **Exploration Ready**: With a complete, highly reliable database, the dataset is optimized for advanced model accuracy.
*   **Next Steps**: Transition to **Task 3: Exploratory Data Analysis (EDA)** to visually map feature correlations and model survival patterns!

---
_End of Slide Deck. Preprocessing Complete._
