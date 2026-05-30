# Task 5: Academic Report on Predictive Modeling & Insights

**Course & Project:** Applied Data Science and Analytics Portfolio • Task 5  
**Subject:** Classifying Survival Outcomes on the RMS Titanic via Logistic Regression  
**Prepared By:** Lead Data Science Researcher & Antigravity AI Partner  
**Target Audience:** University Data Science Faculty & Maritime Historical Society Reviewers  

---

## Executive Summary

Predictive modeling transforms historical records into actionable mathematical structures. Following systematic data collection (Task 1), data preprocessing (Task 2), exploratory analysis (Task 3), and descriptive visualization (Task 4), this report presents the definitive academic compilation of **Task 5: Predictive Model or Insight Project**. 

Using the cleaned dataset ($N = 891$ passengers), we developed a binary classification model utilizing **Logistic Regression** to predict passenger survival outcomes. The trained model achieves an overall classification accuracy of **78.77%** on a strict 80-20 train-test split ($N_{test} = 179$). By analyzing model coefficients, we mathematically confirm the features that drove survival probabilities, validating the socioeconomic and biological patterns of the disaster. This report details the complete machine learning workflow:

$$\text{Data Collection} \rightarrow \text{Data Cleaning} \rightarrow \text{Feature Engineering} \rightarrow \text{Model Training} \rightarrow \text{Prediction} \rightarrow \text{Evaluation}$$

Additionally, we translate these predictive patterns into actionable emergency management recommendations.

---

## 1. Data Preparation & Feature Engineering

To train a robust statistical classifier, we prepared the preprocessed tabular manifest by converting categorical features into numerical values and scaling continuous fields:

1.  **Biological Gender Encoding (`Sex`)**:
    *   Casted string values to binary indicators: `female` = $1$, `male` = $0$.
    *   *Rationale*: Exposes biological gender as a strict binary weight in the linear decision boundary.
2.  **Embarkation Port Encoding (`Embarked`)**:
    *   Casted nominal ports to discrete integers: Cherbourg (`C`) = $1$, Queenstown (`Q`) = $2$, Southampton (`S`) = $0$. Southampton acted as the modal base.
3.  **Socioeconomic Ticket Class (`Pclass`)**:
    *   Retained as ordinal integer scales ($1$, $2$, or $3$).
4.  **Continuous Range Normalization (`Age`, `Fare`)**:
    *   To prevent scale bias and make coefficients directly comparable as feature importances, we standardised `Age` and `Fare` using MinMax scaling to map values strictly between $[0, 1]$:
    *   $$\text{Age}_{\text{norm}} = \frac{\text{Age} - 0.42}{80.00 - 0.42}$$
    *   $$\text{Fare}_{\text{norm}} = \frac{\text{Fare} - 0.00}{512.33 - 0.00}$$
    *   *Rationale*: Standardizing continuous scales allows the absolute magnitude of the resulting model weights to represent the true statistical importance of the features.
5.  **Family Size Variables (`SibSp`, `Parch`)**:
    *   Retained as discrete count integers.

---

## 2. Machine Learning Model Selection & Training

### 2.1 Model Selection Rationale
We selected a **Logistic Regression** classifier for this study based on three core academic criteria:
1.  **High Interpretability**: Unlike "black-box" models (neural networks, support vector machines), Logistic Regression provides clear, explicit weights (coefficients) for every feature, highlighting the exact drivers of predictions.
2.  **Suitability for Binary Classification**: Logistic Regression is the standard statistical algorithm for predicting binary outcomes ($y \in [0, 1]$) by mapping linear log-odds into probabilities using the sigmoid activation function:
    $$z = \beta_0 + \beta_1 x_1 + \beta_2 x_2 + \dots + \beta_n x_n$$
    $$p = \sigma(z) = \frac{1}{1 + e^{-z}}$$
3.  **Optimal Baseline Performance**: It acts as the standard baseline model for predictive tabular manifests, providing high generalization capabilities with minimal risk of overfitting.

### 2.2 Model Training Setup
*   **Data Partitioning**: The manifest was partitioned into **80% Training Data** ($N_{train} = 712$) and **20% Testing Data** ($N_{test} = 179$) using a strict random split (`random_state=42`) to ensure reproducibility.
*   **Target Variable ($y$)**: `Survived` (0 = Did Not Survive, 1 = Survived).
*   **Predictor Features ($X$)**: `Age` (normalized), `Sex` (encoded), `Pclass`, `Fare` (normalized), `SibSp`, `Parch`, `Embarked` (encoded).

---

## 3. Model Evaluation Metrics

After fitting the Logistic Regression model on the training partition, the classifier was evaluated against the isolated testing partition ($N_{test} = 179$).

### 3.1 Accuracy Score
The classifier achieved an overall predictive accuracy of **78.77%**, correctly classifying **141 out of 179** unseen passenger profiles.

### 3.2 Confusion Matrix Breakdown
The confusion matrix maps correct predictions against classification errors:

*   **True Negatives (TN)**: **88** deceased passengers correctly classified as "Did Not Survive".
*   **False Positives (FP)**: **17** deceased passengers incorrectly predicted as "Survived" (Type I Error).
*   **False Negatives (FN)**: **21** surviving passengers incorrectly predicted as "Did Not Survive" (Type II Error).
*   **True Positives (TP)**: **53** surviving passengers correctly classified as "Survived".

### 3.3 Classification Performance Matrix
Evaluating precision (purity of predictions), recall (completeness of retrieval), and F1-score (harmonic mean) reveals highly balanced classification capabilities:

| Outcome Target Class ($y$) | Precision | Recall | F1-Score | Support ($N_{\text{test}}$) |
| :--- | :---: | :---: | :---: | :---: |
| **Deceased (Class 0)** | 0.8073 | 0.8381 | 0.8224 | 105 passengers |
| **Survived (Class 1)** | 0.7571 | 0.7162 | 0.7361 | 74 passengers |
| **Macro Average** | 0.7822 | 0.7772 | 0.7793 | 179 passengers |
| **Weighted Average** | 0.7865 | 0.7877 | 0.7867 | 179 passengers |

---

## 4. Model Coefficients & Feature Importance Analysis

The trained Logistic Regression model yielded the following parameters:
*   **Base Intercept ($\beta_0$)**: **1.3445**

| Predictor Variable Feature | Model Coefficient ($\beta_i$) | Statistical Direction | Feature Importance Rank |
| :--- | :---: | :---: | :---: |
| **Sex (Biological Gender)** | **2.5697** | Positive (Protective) | **Rank 1 (Most Critical)** |
| **Age (Normalized)** | **-1.7306** | Negative (Vulnerability) | **Rank 2** |
| **Pclass (Ticket Class)** | **-0.9531** | Negative (Vulnerability) | **Rank 3** |
| **Fare (Normalized)** | **0.6414** | Positive (Protective) | Rank 4 |
| **SibSp (Siblings/Spouses)** | **-0.2701** | Negative (Vulnerability) | Rank 5 |
| **Embarked (Port of Boarding)** | **0.2443** | Positive (Protective) | Rank 6 |
| **Parch (Parents/Children)** | **-0.0685** | Negative (Vulnerability) | Rank 7 (Least Impact) |

### 4.1 Statistical Interpretation of Coefficients
1.  **The Gender Shield ($\beta_2 = 2.5697$)**: Being female represents the single most powerful predictor of survival. The positive weight increases the survival log-odds dramatically, mathematically validating the historical priority given to women.
2.  **The Age Vulnerability ($\beta_1 = -1.7306$)**: Normalized age has a strong negative coefficient, illustrating that as age increased, survival probability decreased. This reflects the vulnerability of seniors during freezing maritime emergencies.
3.  **The Class Barrier ($\beta_3 = -0.9531$)**: The negative coefficient of Pclass indicates that as the class number increased (shifting from 1st to 3rd class), survival rates plummeted. Every increase in class number acted as a significant barrier to survival.
4.  **The Wealth Buffer ($\beta_4 = 0.6414$)**: The positive coefficient of Fare confirms that higher ticket prices offered additional protective advantages.

---

## 5. Passenger Profiling & Predictive Simulations

Using our trained model coefficients, we run predictions on sample passenger profiles to demonstrate how features interact in the Logistic Regression decision boundary:

### 5.1 Profile 1: Female, 25, First Class, paid £100, Embarked Cherbourg
*   *Feature Inputs*: Sex = 1, Pclass = 1, Age = 25 (scaled = 0.3088), Fare = £100 (scaled = 0.1952), SibSp/Parch = 0, Embarked = 1.
*   *Score calculation ($z$)*: 
    $$z = 1.3445 - 1.7306(0.3088) + 2.5697(1) - 0.9531(1) + 0.6414(0.1952) - 0.2701(0) - 0.0685(0) + 0.2443(1) = 2.7951$$
*   *Probability calculation ($p$)*: 
    $$p = \frac{1}{1 + e^{-2.7951}} = 94.25\%$$
*   *Outcome Prediction*: **Survived** (Highly probable).
*   *Rationale*: The strong positive female coefficient ($+2.5697$) combined with 1st Class positioning ($z$-impact of $-0.9531$) overrode the negative age weight, yielding a high probability of survival.

### 5.2 Profile 2: Male, 35, Third Class, paid £8, Embarked Southampton
*   *Feature Inputs*: Sex = 0, Pclass = 3, Age = 35 (scaled = 0.4345), Fare = £8 (scaled = 0.0156), SibSp/Parch = 0, Embarked = 0.
*   *Score calculation ($z$)*: 
    $$z = 1.3445 - 1.7306(0.4345) + 2.5697(0) - 0.9531(3) + 0.6414(0.0156) - 0.2701(0) - 0.0685(0) + 0.2443(0) = -2.2505$$
*   *Probability calculation ($p$)*: 
    $$p = \frac{1}{1 + e^{2.2505}} = 9.48\%$$
*   *Outcome Prediction*: **Did Not Survive** (Highly vulnerable).
*   *Rationale*: The absence of the female protective shield ($0$) combined with the heavy negative penalty of third-class travel ($-0.9531 \times 3 = -2.8593$) and working adult age ($-0.7520$) dragged the score far below the decision boundary, predicting low survival probability.

### 5.3 Profile 3: Male Child, 8, Second Class, paid £20, Embarked Southampton
*   *Feature Inputs*: Sex = 0, Pclass = 2, Age = 8 (scaled = 0.0952), Fare = £20 (scaled = 0.0390), SibSp/Parch = 0, Embarked = 0.
*   *Score calculation ($z$)*: 
    $$z = 1.3445 - 1.7306(0.0952) + 2.5697(0) - 0.9531(2) + 0.6414(0.0390) - 0.2701(0) - 0.0685(0) + 0.2443(0) = -0.7014$$
*   *Probability calculation ($p$)*: 
    $$p = \frac{1}{1 + e^{0.7014}} = 33.15\%$$
*   *Outcome Prediction*: **Did Not Survive**.
*   *Rationale*: Although young age minimized the age penalty ($-0.1647$), the lack of the female protective shield ($0$) and the negative penalty of second-class travel ($-1.9062$) dragged the overall probability down to **33.15%**, falling below the $50\%$ decision boundary.

---

## 6. Real-World & Business Recommendations

This predictive model demonstrates how historical manifests can be used to generate actionable emergency planning recommendations:

1.  **Prioritize Vulnerable Demographics**: Emergency protocols must explicitly prioritize high-risk groups (e.g., lower-class cabins and seniors) during evacuations. 
2.  **Deploy Predictive Risk Audits**: Modern cruise lines can use classification models to run real-time risk assessments on passenger lists, identifying vulnerable populations before a voyage begins.
3.  **Spatial Evacuation Optimization**: Emergency plans must account for spatial separation. Lower decks and third-class cabins require dedicated evacuation routes and safety marshals to overcome spatial disadvantages during an emergency.
4.  **Demographic-Driven Safety Briefings**: Passenger lists can guide safety training, offering tailored briefings to families traveling with children or elderly members.

---

## 7. Academic Conclusion

By training and evaluating our Logistic Regression model, we have successfully developed a binary classifier that predicts passenger survival with **78.77% accuracy**. 

The model's coefficients mathematically prove that biological gender (`Sex`) acted as the single most critical factor, followed by normalized age and ticket class (`Pclass`). The results show how machine learning can transform historical manifests into clear, actionable insights. By formalizing these relationships, we have constructed a mathematically grounded predictive framework that demonstrates the power of predictive analytics in risk management and decision-making.
