# Task 1: Data Collection & Dataset Understanding
## Technical Report: Titanic Passenger Dataset Analysis

---

### 1. Introduction & Executive Summary
The sinking of the RMS Titanic on April 15, 1912, remains one of the most infamous maritime disasters in history. Of the estimated 2,224 passengers and crew aboard, more than 1,500 lost their lives. 

This technical report provides a comprehensive dataset understanding and data collection analysis of the **Titanic Passenger Dataset** (specifically, the standard training subset comprising **891 rows** and **12 columns**). The primary objective is to investigate the structure, dimensions, schema, and completeness of this dataset. Through rigorous examination of passenger characteristics—such as age, gender, socio-economic class, and family structures—we aim to establish a strong foundational understanding of the data's composition and pave the way for predictive modeling of passenger survivability.

---

### 2. Sourcing and Real-World Significance
*   **Source**: The dataset is compiled from the original passenger manifests of the RMS Titanic. It is widely popularized by the Kaggle data science platform and historical registries maintained by researchers.
*   **Real-World Significance**:
    1.  **Historical Analysis**: It serves as a digitized historical registry of human lives, capturing the demographic stratifications (wealth, age, gender) of the early 20th century.
    2.  **Sociological Research**: It provides empirical evidence of the "women and children first" maritime protocol and how social class heavily influenced survival probability.
    3.  **Machine Learning Benchmark**: In data science, the Titanic dataset is universally recognized as the definitive benchmark dataset for binary classification, exploratory data analysis (EDA), and feature engineering.

---

### 3. Dataset Dimensions
The dataset consists of a single tabular structure with the following dimensions:
*   **Total Records (Rows)**: `891`
*   **Total Features (Columns)**: `12`
*   **Total Data Cells**: `10,692` (of which several contain missing values, analyzed in Section 6)

---

### 4. Columns, Data Types, and Schema
Each column represents a distinct passenger attribute. The table below documents the technical schema, data types (programmatic and statistical), and detailed descriptions:

| Column Name | Programmatic Type | Statistical Type | Description / Key |
| :--- | :--- | :--- | :--- |
| **PassengerId** | Integer | Discrete / Nominal | Unique passenger identifier (primary key, sequential) |
| **Survived** | Integer (0 or 1) | Binary Categorical | Survival status (0 = Deceased, 1 = Survived) |
| **Pclass** | Integer (1, 2, or 3) | Ordinal Categorical | Ticket class representing socio-economic status (1st = Upper, 2nd = Middle, 3rd = Lower) |
| **Name** | String | Nominal Text | Passenger's full name, including title (e.g., Mr., Mrs., Miss., Dr.) |
| **Sex** | String | Binary Categorical | Biological gender of passenger (`male` or `female`) |
| **Age** | Float | Continuous Numerical | Passenger age in years (fractional if < 1 year) |
| **SibSp** | Integer | Discrete Numerical | Number of siblings and/or spouses aboard the Titanic |
| **Parch** | Integer | Discrete Numerical | Number of parents and/or children aboard the Titanic |
| **Ticket** | String | Nominal Text | Ticket number alphanumeric identifier |
| **Fare** | Float | Continuous Numerical | Passenger fare paid (in British Pounds GBP) |
| **Cabin** | String | Nominal Text | Cabin number / identifier (e.g., C85, C123) |
| **Embarked** | String (C, Q, or S) | Nominal Categorical | Port of Embarkation (C = Cherbourg; Q = Queenstown; S = Southampton) |

---

### 5. Variable Classification
To perform valid statistical analysis and select proper machine learning algorithms, the features must be grouped into their statistical classes:

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
                                                                ├── Name (Full string title)
                                                                ├── Ticket (Alphanumeric ticket ID)
                                                                ├── Cabin (Cabin location identifier)
                                                                └── Embarked (Port: C, Q, or S)
```

1.  **Numerical Variables**:
    *   *Continuous*: `Age` (captures precise life stage) and `Fare` (captures fine-grained economic metrics).
    *   *Discrete*: `SibSp` and `Parch` (count-based attributes reflecting family unit sizes).
2.  **Categorical Variables**:
    *   *Binary*: `Survived` (the target variable) and `Sex` (gender classification).
    *   *Ordinal*: `Pclass` (ordered representation of socio-economic standing where $1 > 2 > 3$).
    *   *Nominal*: `Name`, `Ticket`, `Cabin`, and `Embarked`.

---

### 6. Missing Values Analysis
Data completeness is a primary concern in dataset understanding. Three features contain missing values (represented as `NaN` or `null` in databases). Let's review their impact:

| Column Name | Total Records | Missing Records | Completeness (%) | Missingness (%) | Primary Reason & Impact |
| :--- | :---: | :---: | :---: | :---: | :--- |
| **Age** | 891 | **177** | 80.13% | **19.87%** | **MCAR/MAR (Missing At Random)**: Historical records for younger or third-class passengers were often incomplete. Imputation is necessary (e.g., using median age based on passenger titles like "Master" or "Mr."). |
| **Cabin** | 891 | **687** | 22.90% | **77.10%** | **MNAR (Missing Not At Random)**: Passengers in 2nd and 3rd class rarely had assigned cabins, and survival heavily impacted record recovery. Due to extreme sparsity, this column must be dropped or heavily engineered (e.g., `HasCabin` 0/1 indicator). |
| **Embarked** | 891 | **2** | 99.78% | **0.22%** | **MAR (Missing At Random)**: Only two records are missing port information (Passenger 62 and Passenger 830). Because the rate is extremely low, these can be safely imputed using the mode ("S") or omitted. |

#### Visualizing Data Missingness
```
PassengerId [████████████████████████████████████████] 100% Complete (0 Missing)
Survived    [████████████████████████████████████████] 100% Complete (0 Missing)
Pclass      [████████████████████████████████████████] 100% Complete (0 Missing)
Name        [████████████████████████████████████████] 100% Complete (0 Missing)
Sex         [████████████████████████████████████████] 100% Complete (0 Missing)
Age         [██████████████████████████████        ] 80.1% Complete (177 Missing)
SibSp       [████████████████████████████████████████] 100% Complete (0 Missing)
Parch       [████████████████████████████████████████] 100% Complete (0 Missing)
Ticket      [████████████████████████████████████████] 100% Complete (0 Missing)
Fare        [████████████████████████████████████████] 100% Complete (0 Missing)
Cabin       [█████████                               ] 22.9% Complete (687 Missing)
Embarked    [███████████████████████████████████████░] 99.8% Complete (2 Missing)
```

---

### 7. Key Statistical Observations & Demographics
By compiling the dataset, several vital baseline statistics emerge:

*   **Overall Survival Rate**: **38.38%** (342 out of 891 survived; 549 deceased).
*   **Gender Stratification**:
    *   Total Males: **577 (64.76%)** | Total Females: **314 (35.24%)**.
    *   *Strong Demography Bias*: Despite being the minority, females represented the vast majority of survivors due to the evacuations priorities.
*   **Socio-economic Stratification (Pclass)**:
    *   **Class 1 (Upper)**: 216 passengers (24.2%)
    *   **Class 2 (Middle)**: 184 passengers (20.7%)
    *   **Class 3 (Lower)**: 491 passengers (55.1%) — representing more than half of the passenger manifest.
*   **Age Profile**:
    *   Mean Age: **29.70 years** | Median Age: **28.00 years**.
    *   Youngest Passenger: **0.42 years** (approx. 5 months) | Oldest Passenger: **80.00 years**.
*   **Fare Distributions**:
    *   Mean Fare: **£32.20** | Median Fare: **£14.45** (highly right-skewed due to luxury first-class suites, with a maximum fare of **£512.33**).

---

### 8. Analytical Potential & Hypothetical Insights
From this initial data understanding, we can propose multiple predictive and analytical pathways:

1.  **The Gender Advantage (Women First)**
    *   *Hypothesis*: Female survival rate will be significantly higher than male survival.
    *   *Analytical Logic*: The historical mandate for lifeboats prioritized women. Comparing survival rates across genders will confirm this strong correlation.
2.  **Socio-economic Divide**
    *   *Hypothesis*: First-class passengers had a disproportionately higher survival rate compared to third-class.
    *   *Analytical Logic*: Upper decks (where Class 1 cabins were located) had direct, unrestricted access to the boat deck. Lower deck (Class 3) passengers faced locked gates, language barriers, and complex corridors.
3.  **Age-Based Survival Curve**
    *   *Hypothesis*: Children (Age < 12) will show elevated survival rates, whereas middle-aged and elderly passengers will show lower survival rates.
    *   *Analytical Logic*: Analyzing age buckets against survival will reveal a non-linear relationship (high survival for children, drop-off in early adulthood, and lower rates in older ages).
4.  **Family Units Effect**
    *   *Hypothesis*: Passengers traveling in medium-sized families (1-3 members) survived at higher rates than passengers traveling alone or in large families (4+ members).
    *   *Analytical Logic*: Combining `SibSp` + `Parch` into a new feature (`FamilySize`) will show that traveling alone led to a lack of support, whereas excessively large families had coordination difficulties during the panic.

---

### 9. Conclusion
This dataset understanding task establishes that the Titanic passenger list is a highly descriptive, socio-economically rich, and structurally sound dataset. 

While the program features are clean and easily readable, any advanced modeling or analysis must address two primary data quality hurdles:
1.  **Imputation of `Age`**: Must be carefully modeled (e.g., utilizing titles from names to deduce life stage median) rather than simple global mean imputation.
2.  **Handling of `Cabin`**: High missingness (77.1%) prohibits direct feature inclusion, but extracting the deck letter (e.g., A, B, C from the cabin prefix) or creating a boolean variable `HasCabin` could capture important socio-economic signals.

Ultimately, the Titanic dataset is not merely a collection of floats and strings, but a deeply human chronicle of class, gender, and survival, making it the perfect platform for exploring data science techniques.
