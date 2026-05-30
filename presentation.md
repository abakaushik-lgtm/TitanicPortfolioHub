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
    color: #38bdf8;
  }
  h2 {
    color: #0ea5e9;
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
    color: #38bdf8;
    border: 1px solid #334155;
    padding: 8px;
  }
  td {
    border: 1px solid #334155;
    padding: 8px;
  }
---

# TASK 1: DATA COLLECTION & DATASET UNDERSTANDING
## Exploring the Titanic Passenger Dataset

**Presented by**: Data Science Team  
**Objective**: Collect, understand, and structure passenger demography data to prepare for predictive analysis.

---

## 1. Introduction & Context

*   **The Event**: On April 15, 1912, the RMS Titanic sank after colliding with an iceberg, resulting in over 1,500 deaths.
*   **The Mission**: Analyze the **891-passenger manifest** (training dataset) to understand passenger features and how they correlate to survival.
*   **Significance**:
    *   **Historical Chronicle**: Represents early 20th-century demographics and class systems.
    *   **Sociological Study**: Reveals how age, gender, and social status dictated lifeboat access.
    *   **Machine Learning Milestone**: The entry-level gold standard for predictive classification.

---

## 2. Dataset Dimensions & Schema

*   **Total Passenger Records (Rows)**: `891`
*   **Total Features/Attributes (Columns)**: `12`
*   **Total Observations**: `10,692` discrete cells

### Basic Schema Overview
*   **Identifiers**: Unique passenger index and ticket numbers.
*   **Target Variables**: Binary survival outcome indicator.
*   **Demographic Details**: Name, Gender, and Age.
*   **Socio-economic Details**: Passenger Class (1st, 2nd, 3rd) and Ticket Fare.
*   **Family Structure**: Siblings/Spouses (`SibSp`) and Parents/Children (`Parch`) aboard.
*   **Logistics**: Cabin number assignment and Embarkation Port.

---

## 3. Data Schema & Feature Dictionary

| Column Name | Data Type | Statistical Type | Description |
| :--- | :---: | :---: | :--- |
| **PassengerId** | Integer | Discrete Nominal | Unique index (1 to 891) |
| **Survived** | Integer | Binary Categorical | Outcome (0 = No, 1 = Yes) |
| **Pclass** | Integer | Ordinal Categorical | Socio-economic Class (1st, 2nd, 3rd) |
| **Name** | String | Nominal Text | Passenger Full Name |
| **Sex** | String | Binary Categorical | Biological Gender (`male` / `female`) |
| **Age** | Float | Continuous Numeric | Passenger Age in Years |
| **SibSp** | Integer | Discrete Numeric | Number of Siblings/Spouses aboard |
| **Parch** | Integer | Discrete Numeric | Number of Parents/Children aboard |
| **Ticket** | String | Nominal Text | Ticket Number alphanumeric |
| **Fare** | Float | Continuous Numeric | Fare Price Paid (in GBP £) |
| **Cabin** | String | Nominal Text | Cabin room location identifier |
| **Embarked** | String | Nominal Categorical | Port (C = Cherbourg, Q = Queenstown, S = Southampton) |

---

## 4. Variable Categorization

```
                          TITANIC DATASET FEATURES
                                     │
         ┌───────────────────────────┴───────────────────────────┐
         ▼                                                       ▼
NUMERICAL VARIABLES                                     CATEGORICAL VARIABLES
  ├── Continuous                                          ├── Binary
  │     ├── Age (Continuous years)                        │     ├── Survived (Target: 0 or 1)
  │     └── Fare (Ticket cost in GBP)                     │     └── Sex (male or female)
  │                                                       │
  └── Discrete                                            ├── Ordinal
        ├── SibSp (Sibling/Spouse count)                  │     └── Pclass (Class 1, 2, or 3)
        └── Parch (Parent/Child count)                    │
                                                          └── Nominal (Textual)
                                                                ├── Name, Ticket, Cabin, Embarked
```

*   **Understanding Type Distributions**: Programmatic datatypes (Integers, Floats, Strings) do not always map 1:1 to Statistical classes (Ordinal, Nominal, Continuous, Discrete). Categorization is crucial for modeling.

---

## 5. The Challenge of Missing Data

Not all passenger logs survived intact. We identify three columns with missing values:

### 1. **Cabin (77.10% Missing)**
*   *687 records absent*.
*   *Cause*: 2nd and 3rd class cabins were rarely documented, and records lost in the sinking.
*   *Action*: Drop column or transform into a boolean variable `HasCabin` (1 = Yes, 0 = No).

### 2. **Age (19.87% Missing)**
*   *177 records absent*.
*   *Cause*: Incomplete boarding records.
*   *Action*: Perform smart imputation (e.g., median age by Title grouping: Mr., Mrs., Master).

### 3. **Embarked (0.22% Missing)**
*   *2 records absent*.
*   *Action*: Simple mode imputation (impute with Southampton "S").

---

## 6. Key Demographic Observations

*   **Survival Rate**: Only **38.38%** survived the journey (342 survivors vs. 549 deceased).
*   **Gender Stratification**:
    *   **64.76%** Male (577 passengers) vs. **35.24%** Female (314 passengers).
    *   *Observation*: Strong female survival bias is historically expected due to evacuations.
*   **Socio-economic Split**:
    *   **55.10%** in Class 3 (Lower deck), **24.20%** in Class 1 (Upper deck), **20.70%** in Class 2 (Middle deck).
    *   *Observation*: Over half the manifest comprised lower-income or immigrant passengers.
*   **Age Profile**:
    *   Average Age: **29.7 years** (youngest is 5 months, oldest is 80 years).
*   **Ticket Fare Range**:
    *   Median Fare was **£14.45**, while the maximum was **£512.33** (skewed by extreme luxury suites).

---

## 7. Predictive Potential & Hypothetical Insights

Through exploratory visual analysis, several key modeling hypotheses emerge:

1.  **The Gender Advantage (Women First)**
    *   *Hypothesis*: Female passengers will exhibit survival rates over 70%, while males will fall below 25%.
2.  **Socio-economic Divide**
    *   *Hypothesis*: First-class passengers have direct deck access, leading to significantly higher survival rates compared to third-class passengers.
3.  **Age-Based Survival Curves**
    *   *Hypothesis*: Children (Age < 12) will have elevated survival, showing non-linear survival relationship with age.
4.  **Family Coordination Effect**
    *   *Hypothesis*: Travelling alone or in large groups (>4) reduces survival rates compared to medium-sized families (1-3 relatives).

---

## 8. Summary of Dataset Understanding

*   **Demographic Detail**: The dataset is a rich historical asset with distinct economic, family, and gender signals.
*   **Preparation Needed**: Before applying Machine Learning, we must:
    1.  Impute the **177 missing ages** using name titles.
    2.  Address the **extreme Cabin sparsity (77%)** through feature engineering.
    3.  Encode categorical strings (`Sex`, `Embarked`) to numerical values.
*   **Next Steps**: Transition to **Task 2: Exploratory Data Analysis (EDA)** to visually map and test the proposed survival hypotheses!

---
_End of Slide Deck. Thank you._
