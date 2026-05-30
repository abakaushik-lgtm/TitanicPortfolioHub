# TASK 5: PREDICTIVE MODELING & INSIGHTS
## Classifying Passenger Survival via Logistic Regression

---

# Slide 1: Cover Page
## Titanic Passenger Survival Prediction

**Sub-Title:** A Reproducible Machine Learning Classification and Decision Support Framework.  
**Course & Project:** Applied Data Science and Analytics Portfolio • Task 5  
**Presented By:** Lead Data Science Researcher & Antigravity AI Partner  

### Machine Learning Metrics:
- **Baseline Accuracy:** **78.77%** on Test Set ($N = 179$)  
- **Model Selected:** Logistic Regression Classifier (`scikit-learn`)  
- **Data Partition:** 80% Training Data ($712$) vs. 20% Testing Data ($179$)  

---

# Slide 2: Predictive Modeling Workflow
## End-to-End Data Science & Machine Learning Pipeline

Our predictive modeling follows a rigorous, structured data science workflow:

1.  **Data Collection (Task 1)**: Acquired the authentic raw manifest containing 891 rows and 12 features.
2.  **Data Cleaning (Task 2)**: Scanned manifest and resolved all 866 null values via outlier-robust medians and category markers.
3.  **Exploratory Sweeps (Task 3)**: Discovered key bivariate survival splits and mapped correlations.
4.  **Feature Engineering (Task 5)**: Encoded categorical values and scaled continuous ranges to $[0, 1]$.
5.  **Model Training (Task 5)**: Partitioned data and fitted a Logistic Regression classifier (`random_state=42`).
6.  **Prediction & Evaluation (Task 5)**: Verified unseen accuracy, logged confusion matrices, and plotted coefficients.

---

# Slide 3: Feature Preparation & Engineering
## Preparing Tabular Manifests for Linear Classifiers

Before model training, we prepared the predictor variables:

*   **Binary Encoding**:
    - *Biological Gender (`Sex`)*: Female = 1, Male = 0.
    - *Embarked Port*: Southampton (`S`) = 0, Cherbourg (`C`) = 1, Queenstown (`Q`) = 2.
*   **Ordinal Scale**:
    - *Passenger Class (`Pclass`)*: Retained as $1$, $2$, $3$.
*   **MinMax Range Normalization**:
    - Continuous fields (`Age` and `Fare`) scaled to map features strictly between $[0, 1]$:
    - $$\text{Age}_{\text{norm}} = \frac{\text{Age} - 0.42}{80.00 - 0.42}$$
    - $$\text{Fare}_{\text{norm}} = \frac{\text{Fare} - 0.00}{512.33 - 0.00}$$
    - *Rationale*: Normalization prevents range scale bias, making coefficients directly comparable.

---

# Slide 4: Logistic Regression Classifier
## Selecting the Optimal Predictive Model Baseline

We selected a **Logistic Regression** classifier based on three core academic criteria:

*   **High Interpretability**:
    - Renders explicit coefficients ($\beta_i$) for every predictor variable.
    - Clearly shows which factors had the most impact on survival.
*   **Sigmoid Activation Mapping**:
    - Maps linear decision boundaries ($z$) into probabilities ($p \in [0, 1]$):
    - $$z = \beta_0 + \beta_1 x_1 + \beta_2 x_2 + \dots + \beta_7 x_7$$
    - $$p = \frac{1}{1 + e^{-z}}$$
*   **Baseline Capacity**:
    - Generalizes well on small datasets, providing high baseline performance with minimal overfitting.

---

# Slide 5: Model Evaluation Metrics
## Quantifying Predictive Performance on Unseen Test Split

Evaluated against the isolated testing partition ($N_{test} = 179$):

*   **Overall Classification Accuracy**: **78.77%** (141 of 179 correct).
*   **Confusion Matrix Breakdown**:
    - *True Negatives (TN)*: **88** deceased passengers correctly classified.
    - *True Positives (TP)*: **53** surviving passengers correctly classified.
    - *False Negatives (FN)*: **21** survivors incorrectly predicted as deceased.
    - *False Positives (FP)*: **17** deceased incorrectly predicted as survived.
*   **Classification Balance (F1-Scores)**:
    - *Deceased (Class 0)*: Precision = **80.73%** | Recall = **83.81%** | F1 = **82.24%**
    - *Survived (Class 1)*: Precision = **75.71%** | Recall = **71.62%** | F1 = **73.61%**

---

# Slide 6: Model Coefficients & Feature Importance
## Exposing the Primary Mathematical Drivers of Survival

**Base Intercept ($\beta_0$):** **1.3445**

*   **Sex (Biological Gender)**: **2.5697** (Strongest positive/protective coefficient)
    - *Meaning*: Being female dramatically increases survival log-odds.
*   **Age (Normalized)**: **-1.7306** (Negative coefficient)
    - *Meaning*: Increasing age penalty, reflecting high senior vulnerability.
*   **Pclass (Ticket Class)**: **-0.9531** (Negative coefficient)
    - *Meaning*: Higher class numbers (3rd class) plummets survival.
*   **Fare (Normalized)**: **0.6414** (Positive coefficient)
    - *Meaning*: Premium ticket wealth offers protective survival buffers.
*   **Family Size Factors**: `SibSp` ($-0.2701$) and `Parch` ($-0.0685$) represent minor negative impacts.

---

# Slide 7: Passenger Profiling Simulations
## Investigating Decision Boundary Scores

We simulate three passenger profiles to show feature interactions:

*   **Profile 1: Female, 25, 1st Class, paid £100, Cherbourg**
    - *Metric*: Score $z = +2.7951$ -> Probability $p = \mathbf{94.25\%}$
    - *Prediction*: **Survived** (Positive gender and class overrode age).
*   **Profile 2: Male, 35, 3rd Class, paid £8, Southampton**
    - *Metric*: Score $z = -2.2505$ -> Probability $p = \mathbf{9.48\%}$
    - *Prediction*: **Did Not Survive** (No gender shield, heavy class penalty).
*   **Profile 3: Male Child, 8, 2nd Class, paid £20, Southampton**
    - *Metric*: Score $z = -0.7014$ -> Probability $p = \mathbf{33.15\%}$
    - *Prediction*: **Did Not Survive** (No gender shield, and the 2nd Class penalty dragged probability below the $50\%$ decision boundary).

---

# Slide 8: Real-World Recommendations
## Applying Predictive Insights to Emergency Planning

Model parameters offer actionable recommendations for safety management:

*   **Prioritize Vulnerable Demographics**:
    - Emergency protocols must prioritize high-risk groups (e.g., lower classes and seniors) during evacuations.
*   **Real-Time Passenger Risk Audits**:
    - Modern cruise lines can use classification models to run real-time safety assessments on passenger lists before departure.
*   **Spatial Evacuation Optimization**:
    - Lower decks and Class 3 cabins require dedicated routes and marshals to overcome spatial deck placement disadvantages.
*   **Safety brief customisation**:
    - Passenger demographics can guide safety training, tailoring briefs for families or senior travelers.

---

# Slide 9: Synthesis & Conclusion
## Transforming Historical Data into Actionable Predictions

*   **Model Accuracy**:
    - Successfully developed a binary classifier predicting passenger survival with **78.77% accuracy**.
*   **Deterministic Factors**:
    - The model mathematically proves that biological gender (`Sex`) was the most critical factor, followed by age and class.
*   **Machine Learning Value**:
    - Demonstrates how machine learning transforms historical manifests into clear, actionable predictions.
    - Provides a mathematically grounded predictive framework, showcasing the power of predictive analytics in risk management and decision-making.
