# Task 3: Exploratory Data Analysis (EDA)
## Technical EDA Report: Titanic Passenger Dataset Exploration

---

### 1. Introduction & Background
Exploratory Data Analysis (EDA) is the analytical bridge that links raw database cleaning with advanced predictive modeling. Following the successful execution of our Task 2 preprocessing pipeline, which resolved all 866 null values and established a complete, validated dataset, this report conducts a systematic statistical investigation of the cleaned manifest comprising **891 rows** and **12 columns**.

The primary objective of this EDA phase is to analyze passenger attributes—such as gender, age, socio-economic status, and ticket pricing—to isolate core patterns, relationships, and trends, and empirically confirm the factors that determined passenger survival during the sinking of the RMS Titanic.

---

### 2. Descriptive Statistical Summary
To establish a baseline mathematical profile, descriptive statistics (mean, median, standard deviation, minimum, maximum, and counts) were computed on the cleaned numerical and categorical variables. 

#### Table A: Continuous Variables Metrics
| Feature Name | Total Rows | Mean Value | Median Value | Minimum Value | Maximum Value | Standard Deviation |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| **Age (Years)** | 891 | 29.3616 | 28.0000 | 0.42 | 80.00 | 13.0197 |
| **Fare (£ GBP)** | 891 | 32.2042 | 14.4542 | 0.00 | 512.33 | 49.6934 |

#### Table B: Categorical & Binary Distributions
| Feature Grouping | Attribute Level | Frequency Count | Percentage Share (%) |
| :--- | :--- | :---: | :---: |
| **Survival Status** | Deceased (0) | 549 | 61.62% |
| | Survived (1) | 342 | 38.38% |
| **Passenger Class (Pclass)** | Class 1 (Upper) | 216 | 24.24% |
| | Class 2 (Middle) | 184 | 20.65% |
| | Class 3 (Lower) | 491 | 55.11% |
| **Passenger Gender (Sex)** | Male | 577 | 64.76% |
| | Female | 314 | 35.24% |

---

### 3. Univariate Analysis
Univariate analysis examines the structural distribution profiles of individual variables in isolation.

1.  **Age Distribution**:
    *   *Profile*: The age profile covers a broad spectrum (0.42 to 80 years), with a mean of 29.36 years and a median of 28.00 years.
    *   *Distribution Shape*: The distribution is moderately right-skewed, characterized by a high frequency of passengers clustered between 20 and 40 years old (the young working-class adult demographic). A distinct spike exists at the 28.0 mark, reflecting the outlier-robust median imputations conducted during preprocessing.
2.  **Fare Distribution**:
    *   *Profile*: Highly right-skewed. The mean fare (£32.20) is more than double the median fare (£14.45).
    *   *Interpretation*: The vast majority of passengers paid budget tickets under £30.00, while a small elite paid luxury fares up to £512.33. This represents a significant socio-economic stratification.
3.  **Gender Distribution**:
    *   *Profile*: A pronounced gender imbalance existed on board, with males representing **64.76%** (577 passengers) and females representing **35.24%** (314 passengers) of the manifest.
4.  **Passenger Class Distribution**:
    *   *Profile*: Over half the passengers traveled in Class 3 (Lower Deck, **55.11%**), highlighting that the majority of travelers were working-class adult laborers and immigrants, whereas Class 1 (Upper Deck) accounted for 24.24% and Class 2 (Middle Deck) represented 20.65%.
5.  **Survival Rate Distribution**:
    *   *Profile*: The overall baseline survival rate is **38.38%** (342 survivors vs 549 deceased).

---

### 4. Bivariate Analysis
Bivariate analysis explores the interactions between demographic/economic features and the primary target outcome (`Survived`).

#### 1. Survival Rate vs. Biological Gender
Comparing survival outcomes between male and female passengers reveals the most powerful predictive pattern in the dataset:
*   **Female Passengers**: **74.20%** survived (233 out of 314 survived).
*   **Male Passengers**: **18.89%** survived (109 out of 577 survived).
*   *Key Pattern*: Female passengers were nearly **four times** more likely to survive than males. This provides empirical validation of the historical "women and children first" maritime evacuation protocol, establishing `Sex` as a primary classifier variable.

#### 2. Survival Rate vs. Passenger Class (Pclass)
Passenger class represents a robust proxy for socio-economic deck positioning:
*   **Class 1 (Upper)**: **62.96%** survived (136 out of 216 survived).
*   **Class 2 (Middle)**: **47.28%** survived (87 out of 184 survived).
*   **Class 3 (Lower)**: **24.24%** survived (119 out of 491 survived).
*   *Key Pattern*: Survival rate demonstrates a linear negative correlation with Pclass indexes ($1 > 2 > 3$). Upper-class passengers had a survival rate **2.5 times** higher than lower-class passengers, reflecting physical cabin proximity to the boat deck, locked gate evacuations delays, and linguistic boarding barriers for third-class immigrants.

#### 3. Age vs. Survival Relationship
*   *Observation*: Young children (under age 12) demonstrate significantly elevated survival rates (exceeding 54%), illustrating the prioritization of children during emergency boat loading. In contrast, working-age adult cohorts show elevated mortality. 
*   *Data Science Impact*: Age operates as a highly non-linear feature. Applying binning or non-linear models (decision tree nodes) will capture this interaction better than linear algorithms.

#### 4. Ticket Fare vs. Survival Relationship
*   *Observation*: Grouping fares reveals that passengers paying premium fares exceeding £50.00 had a survival rate of **68.21%**, compared to only **21.57%** for passengers paying sub-£10.00 fares.
*   *Key Pattern*: Higher financial investment in boarding corresponds directly to increased survival probability, reflecting the compounding privilege of wealth during the disaster.

---

### 5. Outlier Detection Scan (IQR Method)
Using the mathematical Interquartile Range (IQR) method, outliers were scanned to isolate anomalous observations. The IQR is defined as $IQR = Q_3 - Q_1$, and outliers reside outside the interval $[Q_1 - 1.5 \times IQR, \ Q_3 + 1.5 \times IQR]$.

#### 1. Passenger Age Outlier Audit
*   *First Quartile (Q1)*: 22.0000 | *Third Quartile (Q3)*: 35.0000
*   *Interquartile Range (IQR)*: 13.0000
*   *Lower Bound Threshold*: 2.5000 | *Upper Bound Threshold*: 54.5000
*   *Outliers Identified*: **66 values** out of 891 (**7.41%** of records).
*   *Range of Outliers*: Infants under 2.5 years (e.g. 0.42 years) and seniors over 54.5 years (up to 80.00 years).
*   *Treatment Decision*: **RETAINED**.
*   *Rationale*: These outliers are physically realistic and represent correct historical boarding manifests. Omitted children represent high survival priorities, and elderly represent high vulnerability, making them crucial signals for classification accuracy.

#### 2. Ticket Fare Outlier Audit
*   *First Quartile (Q1)*: 7.8958 | *Third Quartile (Q3)*: 31.0000
*   *Interquartile Range (IQR)*: 23.1042
*   *Lower Bound Threshold*: -26.7605 | *Upper Bound Threshold*: 65.6563
*   *Outliers Identified*: **116 values** out of 891 (**13.02%** of records).
*   *Range of Outliers*: Highly premium fares ranging from £66.60 to £512.33.
*   *Treatment Decision*: **RETAINED**.
*   *Rationale*: Fares are highly right-skewed due to luxury suites. These are genuine financial transactions. Because ticket pricing correlates strongly with cabin placement and boat boarding access, these values are highly predictive. Fares should be log-transformed to stabilize variance rather than removed.

---

### 6. Pearson Correlation Matrix Analysis
Pearson correlation coefficients ($r$) evaluate the linear relationship strength and direction between numerical features. The table below represents the fully computed correlation matrix:

| Feature Name | Survived | Pclass | Age | SibSp | Parch | Fare |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| **Survived** | 1.0000 | -0.3385 | -0.0649 | -0.0353 | 0.0816 | 0.2573 |
| **Pclass** | -0.3385 | 1.0000 | -0.3399 | 0.0831 | 0.0184 | -0.5495 |
| **Age** | -0.0649 | -0.3399 | 1.0000 | -0.2333 | -0.1725 | 0.0967 |
| **SibSp** | -0.0353 | 0.0831 | -0.2333 | 1.0000 | 0.4148 | 0.1597 |
| **Parch** | 0.0816 | 0.0184 | -0.1725 | 0.4148 | 1.0000 | 0.2162 |
| **Fare** | 0.2573 | -0.5495 | 0.0967 | 0.1597 | 0.2162 | 1.0000 |

#### Interpretation of Key Coefficients:
1.  **Pclass vs. Survived ($r = -0.3385$)**: A moderate, negative linear correlation. As passenger class indices increase ($1 \rightarrow 2 \rightarrow 3$), survival outcomes decrease.
2.  **Fare vs. Survived ($r = +0.2573$)**: A weak-to-moderate, positive linear correlation. Higher ticket prices Paid correspond to increased survival probability.
3.  **Fare vs. Pclass ($r = -0.5495$)**: A strong, negative linear relationship. Illustrates significant multi-collinearity; lower class indexes (representing 1st class) are strongly associated with high ticket fares, as economically expected.
4.  **SibSp vs. Parch ($r = +0.4148$)**: A moderate, positive linear correlation, confirming that siblings/spouses and parents/children travel together in unified family units.

---

### 7. Key Findings & Insights
The exploratory analysis reveals three core structural rules that governed survival:
1.  **The Gender Advantage**: Women were prioritized. `Sex` represents the single most significant predictor.
2.  **Socio-economic Privilege**: 1st-class ticket holders and high-fare payers had direct boat deck access and evacuation preferences, whereas 3rd-class passengers faced structural neglect.
3.  **Non-linear Age Demographics**: While age has a negligible linear correlation with survival ($r = -0.0649$), children had significantly elevated survival rates.
4.  **Economic Disparity Outliers**: Fare values are highly skewed due to luxury first-class suites (13.02% outlier rate), representing a valuable predictive economic signal.

---

### 8. Conclusion
Task 3 Exploratory Data Analysis (EDA) successfully establishes a comprehensive mathematical and visual understanding of the cleaned Titanic Passenger Dataset. 

These findings directly support subsequent machine learning tasks by dictating feature selection and preprocessing pipelines:
*   **Classifier Selections**: Due to highly non-linear feature interactions (such as Age curves and Fare boxplot outliers), non-linear classifiers like **Random Forests**, **Gradient Boosting**, and **XGBoost** are highly recommended over simple linear models.
*   **Feature Engineering**: The correlation between `SibSp` and `Parch` ($r = 0.4148$) supports combining them into a single metric `FamilySize` (`SibSp` + `Parch` + 1), and then binning them into categories (Single, Small, Large) to capture the coordinate family panic curve.
*   **Variable Transformations**: The extremely skewed `Fare` feature must be log-transformed ($\log(Fare + 1)$) to stabilize variance and normalize distributions before training models like Logistic Regression or SVM.

The cleaned and explored dataset is now structurally locked, visually mapped, and fully prepared for predictive modeling tasks.
