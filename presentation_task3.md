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

# TASK 3: EXPLORATORY DATA ANALYSIS (EDA)
## Uncovering Survival Factors in the Titanic Dataset

**Presented by**: Data Science Team  
**Objective**: Analyze the cleaned dataset to identify patterns, bivariate relationships, numerical correlations, and outlier boundaries influencing passenger survival.

---

## 1. Cleaned Dataset Background

*   **Clean Registry**: Preprocessing resolved all **866 null cells** and verified **manifest uniqueness**, yielding a verified database of 891 rows and 12 columns.
*   **The Mission**: Conduct statistical audits to identify factors that dictated passenger survival during the sinking.
*   **Core EDA Requirements**:
    1.  **Descriptive Statistics**: Document baseline demographics.
    2.  **Univariate Distributions**: Chart age, fare, class, sex, and survival.
    3.  **Bivariate Relationships**: Evaluate target correlations against gender and class.
    4.  **Outlier Audits**: Assess extreme ages and fares.
    5.  **Linear Correlations**: Map Pearson coefficient matrices.

---

## 2. Descriptive Summary Statistics

Baseline mathematical profiles computed on continuous and categorical coordinates:

### Passenger Numerical Profiles
*   **Age Profile**: Mean **29.36 years** | Median **28.00 years** | Std Dev **13.02 years** (Min 0.42, Max 80.00).
*   **Fare Profile**: Mean **£32.20** | Median **£14.45** | Std Dev **£49.69** (highly right-skewed, Max £512.33).

### Demographic Manifest Shares
*   **Class Split**: 55.11% Third Class | 24.24% First Class | 20.65% Second Class.
*   **Gender Split**: 64.76% Male (577 passengers) vs. 35.24% Female (314 passengers).
*   **Survival Share**: 38.38% Survived (342 rows) vs. 61.62% Deceased (549 rows).

---

## 3. Univariate Manifest Audits

*   **Age Profile**: Moderately right-skewed. Major passenger cluster falls between 20 and 40 years. Spike at 28.0 represents preprocessed median imputations.
*   **Fare Profile**: Extremely right-skewed. Over half of the manifest paid budget tickets under £15.00, while a luxury elite paid up to £512.33.
*   **Gender Imbalance**: Males represent over **64%** of the manifest.
*   **Socio-economic Divide**: Lower-deck class 3 immigrants/laborers represented over **55%** of travelers.

> [!NOTE]
> Univariate sweeps confirm that while males and lower-class passengers were the heavy majority, their survival rates tell a completely different story.

---

## 4. Bivariate Survival: Gender & Class

Exploratory analysis reveals that gender and socio-economic class represent the two most influential predictors of survival:

### 1. Survival Rate vs. Biological Gender
*   **Female Passengers**: **74.20% Survival** (233 survived out of 314).
*   **Male Passengers**: **18.89% Survival** (109 survived out of 577).
*   *Insight*: Females were nearly **four times** more likely to survive, validating the prioritizing of women during evacuation.

### 2. Survival Rate vs. Passenger Class (Pclass)
*   **Class 1 (Upper Deck)**: **62.96% Survival** (136 of 216).
*   **Class 2 (Middle Deck)**: **47.28% Survival** (87 of 184).
*   **Class 3 (Lower Deck)**: **24.24% Survival** (119 of 491).
*   *Insight*: Survival shows a clear socio-economic ladder. First-class passengers had a **2.5x** higher survival rate than third-class.

---

## 5. Age & Fare Survival Curves

### 1. Age vs. Survival (Non-Linearity)
*   Children (under age 12) had high survival rates (**exceeding 54%**), illustrating emergency priority policies. 
*   Working-age adults faced high mortality. Age operates as a highly non-linear feature.

### 2. Fare vs. Survival (Economic Privilege)
*   Passengers paying premium fares above £50.00 had a survival rate of **68.21%**, compared to only **21.57%** for sub-£10.00 fares.
*   Wealthy passengers had cabins closer to the top deck, direct safety briefings, and priority boat access.

---

## 6. Outlier Audits: Interquartile Range (IQR)

Using the formula: $IQR = Q_3 - Q_1$, outliers are identified as values outside the bounds: $[Q_1 - 1.5 \times IQR, \ Q_3 + 1.5 \times IQR]$.

### 1. Age Outliers (66 Detected | 7.41% of records)
*   *Quartiles*: Q1 = 22.0, Q3 = 35.0, IQR = 13.0. Bounds: **2.5 to 54.5 years**.
*   *Decision*: **RETAINED**. Infants under 2.5 and seniors over 54.5 are genuine, historically accurate manifests carrying critical survival signals.

### 2. Fare Outliers (116 Detected | 13.02% of records)
*   *Quartiles*: Q1 = 7.89, Q3 = 31.00, IQR = 23.10. Bounds: **-26.76 to 65.65**.
*   *Decision*: **RETAINED**. High-fare luxury suite records capture the true economic stratifications of early 20th-century luxury travel. Fares should be log-transformed rather than deleted.

---

## 7. Pearson Correlation Coefficient Matrix

Pearson correlation ($r$) evaluates the linear relationship strength and direction between numerical variables:

| Variable | Survived | Pclass | Age | SibSp | Parch | Fare |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| **Survived** | 1.0000 | -0.3385 | -0.0649 | -0.0353 | 0.0816 | 0.2573 |
| **Pclass** | -0.3385 | 1.0000 | -0.3399 | 0.0831 | 0.0184 | -0.5495 |
| **Age** | -0.0649 | -0.3399 | 1.0000 | -0.2333 | -0.1725 | 0.0967 |
| **Fare** | 0.2573 | -0.5495 | 0.0967 | 0.1597 | 0.2162 | 1.0000 |

### Key Correlation Insights
*   **Pclass vs. Survived ($r = -0.3385$)**: Moderate negative correlation. Higher class numbers (lower socio-economic status) are strongly linked to lower survival.
*   **Fare vs. Pclass ($r = -0.5495$)**: Strong negative correlation. Confirms strong collinearity; first-class ticket holders paid significantly higher fares.

---

## 8. Conclusions & Modeling Guidance

*   **Key Predictors Identified**: Biological gender (`Sex`) and socio-economic standing (`Pclass`, `Fare`) are the most influential factors driving survivability.
*   **Modeling Recommendations**:
    1.  **Feature Engineering**: Combine `SibSp` + `Parch` + 1 into a single family size metric `FamilySize` to capture family survival coordination dynamics.
    2.  **Variable Transformation**: Log-transform the extremely skewed `Fare` column ($\log(Fare + 1)$) to stabilize variance before linear models.
    3.  **Classifier Selection**: Because of highly non-linear feature structures (like Age curves and Boxplot outliers), non-linear classifiers like **Random Forests**, **Gradient Boosting**, and **XGBoost** are highly recommended over simple linear models.

---
_End of Slide Deck. EDA Complete. Ready for Modeling._
