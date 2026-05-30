# Task 4: Academic Report on Data Visualization & Storytelling

**Course & Project:** Applied Data Science and Analytics Portfolio • Task 4  
**Subject:** Demographics, Evacuation Patterns, and Socioeconomic Partitioning on the RMS Titanic  
**Prepared By:** Lead Data Science Researcher & Antigravity AI Partner  
**Target Audience:** University Data Science Faculty & Maritime Historical Society Reviewers  

---

## Executive Summary

Data visualization serves as the bridge between raw mathematical matrices and intuitive human understanding. Following data collection (Task 1), systematic preprocessing (Task 2), and exploratory audits (Task 3), this report presents the definitive academic compilation of **Task 4: Data Visualization & Storytelling**. 

By translating our validated, cleaned dataset ($N = 891$ records) into structured graphical narratives, we expose the underlying societal structures and emergency protocols that governed survival during the tragic sinking of the RMS Titanic on April 15, 1912. Through careful chart selection and rigorous data storytelling, we prove that biological gender, ticket class, age brackets, and fare levels acted as the primary deterministic vectors of life and death.

---

## 1. Passenger Demographics Visualizations

To comprehend any observational sample, a researcher must first map its demographic baseline. We visualised three primary features to capture the Titanic's passenger layout: Age, Gender, and Social Standing (Ticket Class).

### 1.1 Demographic Baseline Data
| Feature Category | Segment Class | Passenger Count ($N = 891$) | Percentage Share (%) |
| :--- | :--- | :---: | :---: |
| **Biological Gender** | Male | 577 | 64.76% |
| | Female | 314 | 35.24% |
| **Ticket Class (Pclass)** | Class 1 (Upper) | 216 | 24.24% |
| | Class 2 (Middle) | 184 | 20.65% |
| | Class 3 (Lower) | 491 | 55.11% |
| **Age Brackets** | Child (Age < 12) | 68 | 7.63% |
| | Adult (Age $\ge$ 12) | 823 | 92.37% |

### 1.2 Graphical Representation & Chart Selection Rationale
1. **Age Distribution (Histogram)**:
   * *Chart Selection*: We employed a continuous histogram with 10-year bin intervals.
   * *Rationale*: Histograms are the standard mathematical method for representing continuous numerical fields, allowing skewness and modality to be immediately visible.
   * *Insight*: The distribution exhibits a strong right-skewed unimodal layout peaking in the **20–40 years** range, with a distinct minor spike for infants (under 5). It demonstrates that the majority of passengers were young working-age adults.
2. **Gender Distribution (Donut / Pie Chart)**:
   * *Chart Selection*: A circular donut chart with polar segmental arcs.
   * *Rationale*: Donut charts are ideal for displaying binary categorical variables where the cumulative total is 100%, offering a cleaner focal center than standard solid pies.
   * *Insight*: Males represented a massive **64.76%** of the manifest. This biological skew represents a crucial baseline when evaluating overall raw survival counts.
3. **Passenger Class Distribution (Bar Chart)**:
   * *Chart Selection*: A single-variable vertical column bar chart.
   * *Rationale*: Bar charts represent discrete categorical variables with distinct separation, preventing false continuous assumptions.
   * *Insight*: Class 3 (Lower Class) represents a massive **55.11%** majority of the manifest, reflecting early 20th-century economic distributions and illustrating that the Titanic was primarily a transport vessel for lower-income emigrants.

---

## 2. Survival Analysis Visualizations

Evaluating the factors that influenced passenger survival represents the core analytical objective of this study. We contrasted survival outcomes against the two primary categorical features: Gender and Ticket Class.

### 2.1 Bivariate Survival Metrics
| Categorical Feature | Subset Group | Survived | Deceased | Survival Rate (%) |
| :--- | :--- | :---: | :---: | :---: |
| **Biological Gender** | Female | 233 | 81 | **74.20%** |
| | Male | 109 | 468 | **18.89%** |
| **Ticket Class (Pclass)** | Class 1 | 136 | 80 | **62.96%** |
| | Class 2 | 87 | 97 | **47.28%** |
| | Class 3 | 119 | 372 | **24.24%** |

### 2.2 Graphical Representation & Chart Selection Rationale
1. **Survival Rate by Gender (Grouped/Clustered Bar Chart)**:
   * *Chart Selection*: A grouped bar chart displaying side-by-side Survived vs. Deceased counts clustered by gender.
   * *Rationale*: Grouping count bars side-by-side allows direct volume comparisons across categories while preserving raw scale magnitudes.
   * *Insight*: Females achieved a **74.20% survival rate** (233/314) compared to just **18.89%** for males (109/577). This massive difference is a graphical proof of the strict enforcement of the "women and children first" maritime evacuation protocol.
2. **Survival Rate by Ticket Class (Grouped/Clustered Bar Chart)**:
   * *Chart Selection*: A grouped bar chart showcasing Survived vs. Deceased counts clustered by Passenger Class.
   * *Rationale*: Class distributions represent an ordinal category. A grouped bar chart visually exposes how survival volumes shifted across economic classes.
   * *Insight*: First-class passengers enjoyed a **62.96% survival rate** (136/216), whereas third-class passengers were heavily marginalized with a **24.24% survival rate** (119/491). This severe gradient reflects spatial deck separation (first class cabins were placed on upper decks closer to lifeboats) and socioeconomic prioritization during the emergency.

---

## 3. Fare Analysis & Outlier Visualizations

Understanding the financial layout of the passenger manifest requires an evaluation of ticket costs (`Fare`) and how these costs mapped to social classes.

### 3.1 Fare Profile by Class
* **Class 1 Fares**: Mean = **£84.15**, Median = **£60.29**, Range = [£0.00, £512.33]
* **Class 2 Fares**: Mean = **£20.66**, Median = **£14.25**, Range = [£0.00, £73.50]
* **Class 3 Fares**: Mean = **£13.68**, Median = **£8.05**, Range = [£0.00, £69.55]

### 3.2 Graphical Representation & Chart Selection Rationale
1. **Fare Distribution (Histogram)**:
   * *Chart Selection*: A highly skewed histogram with fine-grain binning.
   * *Rationale*: Highlights the massive concentration of cheap tickets alongside an extremely long tail of premium prices.
   * *Insight*: The overall median fare is **£14.45**, while the mean is **£32.20**, proving extreme right-skewness. This statistical skew is typical in wealth distributions.
2. **Fare Comparison by Class (Box Plot)**:
   * *Chart Selection*: A three-series box-and-whisker plot displaying the Median line, Interquartile Range (IQR box), Minimum/Maximum Whiskers, and isolated outlier dots.
   * *Rationale*: Box plots are the most robust visualization tool for depicting continuous distributions across ordinal groups, revealing median shifts, variance disparities, and extreme values.
   * *Insight*: The median cost of a Class 1 ticket (£60.29) is **7.5 times** higher than a Class 3 ticket (£8.05). Additionally, the box plot reveals extreme high-value outliers (up to £512.33) that represent premium multi-cabin suites. Outliers are mathematically defined using the $Q3 + 1.5 \times IQR$ boundary, yielding **116 fare outliers** which are actively retained to ensure the authenticity of the historical record.

---

## 4. Age and Survival Non-Linear Relationships

While linear modeling assumes a constant progression, human age exhibits non-linear relationships with survival due to protective priority protocols.

### 4.1 Detailed Age Bracket Survival Metrics
| Age Bracket Group | Age Range Criteria | Survived Count | Total Count | Survival Rate (%) |
| :--- | :--- | :---: | :---: | :---: |
| **Infants** | Age < 5 years | 27 | 40 | **67.50%** |
| **Kids** | 5 $\le$ Age < 12 years | 12 | 28 | **42.86%** |
| **Teens** | 12 $\le$ Age < 18 years | 22 | 45 | **48.89%** |
| **Adults** | 18 $\le$ Age < 60 years | 274 | 752 | **36.44%** |
| **Seniors** | Age $\ge$ 60 years | 7 | 26 | **26.92%** |

### 4.2 Graphical Representation & Chart Selection Rationale
1. **Age Group Survival (Grouped Column Bar Chart)**:
   * *Chart Selection*: A vertical bar chart comparing survival rates directly across age brackets.
   * *Rationale*: Categorizing the continuous Age field into logical life stages lets us isolate the survival rates of key priority groups.
   * *Insight*: Children overall (Age < 12) achieved an elevated **57.35% survival rate** (39/68), with infants under 5 peaking at **67.50%**. Adults (Age >= 12) dropped to **36.82%**, while seniors over 60 were heavily vulnerable at **26.92%**. This visual layout confirms the historical "children first" protocol, but also reveals a sharp drop in senior survival, pointing to physical vulnerability during a freezing midnight evacuation.

---

## 5. Pearson Correlation Analysis

To evaluate how variables interact across the entire dataset, we calculated Pearson correlation coefficients ($r$) and visualised the matrix.

### 5.1 Correlation Matrix Heatmap
* **Pclass vs. Survived**: **-0.3385** (Moderate negative correlation; as class number increases from 1 to 3, survival decreases)
* **Fare vs. Survived**: **0.2573** (Moderate positive correlation; higher ticket prices associate with elevated survival)
* **Fare vs. Pclass**: **-0.5495** (Strong negative relationship; lower class numbers [1st class] associate with high ticket costs)
* **Age vs. Survived**: **-0.0649** (Weak near-zero linear correlation, showcasing the non-linear relationship where both infants and young adults survived at high rates)
* **Parch (Parents/Children) vs. Survived**: **0.0816** (Weak positive correlation, indicating moderate family sizes offered small protective advantages)

### 5.2 Graphical Representation & Chart Selection Rationale
* *Chart Selection*: A 6x6 grid tile layout color-coded with glowing teal (positive correlation) and red (negative correlation) filters.
* *Rationale*: Correlation heatmaps condense a massive matrix of numbers into a clear visual pattern, allowing researchers to quickly spot relationships and multicollinearity issues.
* *Insight*: The heatmap exposes that `Pclass` and `Fare` possess the strongest mathematical relationships to `Survived`. The strong relationship between Pclass and Fare ($r = -0.5495$) highlights potential multicollinearity that must be addressed when training machine learning classifiers.

---

## 6. The Core Principles of Data Storytelling & Chart Selection

### 6.1 What the Visualizations Reveal (The Narrative)
Visualizations transform cold, tabular manifests into an evocative historical tragedy. By layering demographics, fares, age, and class on top of survival rates, we reveal:
1. **The Double Privilege**: Survival was not a lottery. It was a structured outcome determined by gender and economic class. An upper-class female was almost guaranteed survival, whereas a lower-class male faced a survival rate under 20%.
2. **The Rescue Priority**: The data confirms that humanitarian evacuation protocols ("women and children first") were strictly enforced, resulting in elevated survival rates for infants and children under 12.
3. **The Wealth Shield**: First-class deck positioning and economic leverage translated directly to survival advantages.

### 6.2 The Power of Visualization in Uncovering Patterns
Tabular data hides critical patterns. In a raw list of 891 records:
- Spotting the **non-linear survival spike** for infants is nearly impossible.
- Finding the **116 fare outliers** would require tedious sorting.
- Identifying **multicollinearity** between Pclass and Fare is invisible without calculating relationships.
Graphical charts map these mathematical equations into visual variables (length, color, position) that the human brain processes instantly.

### 6.3 Rationale for Chart Selection (Why Rationale Matters)
Using the wrong chart type distorts data and leads to incorrect conclusions. We adhered to strict university-level standards to ensure clarity and accuracy:
- **Continuous Variables** (`Age`, `Fare`) must be mapped as continuous histograms or box plots, not pie charts.
- **Binary/Discrete Categories** (`Sex`, `Survived`) are best served by polar donut rings or grouped count columns.
- **Multidimensional Relationships** are best resolved through color-graded heatmaps, transforming statistical correlation formulas into immediate visual insights.

---

## 7. Academic Conclusion

By executing **Task 4: Data Visualization & Storytelling**, we have successfully transformed a historical passenger manifest into an analytical narrative. The data proves that survival was highly dependent on biological gender, passenger class, age, and ticket fare:
- **Gender** was the single most powerful predictor of survival ($74.20\%$ female vs. $18.89\%$ male).
- **Socioeconomic standing** (Pclass) created a stark divide in outcomes ($62.96\%$ Class 1 vs. $24.24\%$ Class 3).
- **Evacuation protocols** actively protected youth ($67.50\%$ infant survival) while seniors remained vulnerable ($26.92\%$).

Ultimately, this visual portfolio establishes that statistical models trained on this dataset will achieve high accuracy due to these strong predictive signals. This work provides a reliable, robust, and mathematically grounded foundation for exploratory analysis and predictive machine learning.
