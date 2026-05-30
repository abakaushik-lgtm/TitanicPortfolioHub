# TASK 4: DATA VISUALIZATION & STORYTELLING
## Translating Raw Titanic manifests into Statistical Narratives

---

# Slide 1: Cover Page
## Titanic Passenger Evacuation Analysis

**Sub-Title:** A Comprehensive Academic Study of Demographics, Fares, Evacuation Priorities, and Feature Relationships.  
**Course & Project:** Applied Data Science and Analytics Portfolio • Task 4  
**Presented By:** Lead Data Science Researcher & Antigravity AI Partner  

### Executive Metrics Summary:
- **Analyzed Manifesto:** $N = 891$ Cleaned Observations  
- **Visual Focus:** Demographics, Survival Gradients, Fares, Age Brackets, Correlation Heatmaps  
- **Core Strategy:** Guided Storytelling and Purpose-Led Chart Selection  

---

# Slide 2: Passenger Demographics Visualization
## Understanding the Titanic's Baseline Population

To contextualise survival ratios, we must first map the passenger demographics:

*   **Gender Splits (Pie/Donut Chart)**:
    - *Metric*: **64.76%** Male (577) vs. **35.24%** Female (314).
    - *Insight*: Males represent a massive majority of the manifest, establishing a baseline of high competition for lifeboats.
*   **Ticket Class (Bar Chart)**:
    - *Metric*: **55.11%** in Class 3 (Lower), **20.65%** in Class 2, **24.24%** in Class 1.
    - *Insight*: Over half of the passengers were in third class, highlighting the economic divide aboard the ship.
*   **Age Profile (Histogram)**:
    - *Metric*: Mean = **29.36 years**, Median = **28.00 years**.
    - *Insight*: A continuous histogram shows a right-skewed unimodal population peaked between **20-40 years**, with a minor spike for infants.

---

# Slide 3: Survival Analysis Visualization
## Evacuation Rules and Priorties Exposed

Comparing survival volumes across demographic groupings exposes structural priorities:

*   **Evacuation Priority by Gender (Grouped Bar Chart)**:
    - *Metric*: **74.20%** of Females survived (233/314) vs. only **18.89%** of Males (109/577).
    - *Insight*: A massive 55-point gap proves that the "women first" protocol was strictly enforced.
*   **Socioeconomic Divide by Class (Grouped Bar Chart)**:
    - *Metric*: **62.96%** survived in Class 1, **47.28%** in Class 2, and **24.24%** in Class 3.
    - *Insight*: First-class passengers enjoyed a 38-point survival advantage over third-class. This reflects spatial deck placement (first class was closer to lifeboats) and economic privilege.

---

# Slide 4: Fare Analysis Visualization
## Economic Partitioning and Premium Outliers

Ticket price (`Fare`) distribution reflects deep class divisions:

*   **Fare Histograms (Continuous Distribution)**:
    - *Metric*: Median fare = **£14.45**, Mean fare = **£32.20**.
    - *Insight*: Extreme right-skewness. Most passengers bought cheap emigrant tickets, while a small group paid premium prices.
*   **Fare Comparison by Class (Box Plot)**:
    - *Metric*: Class 1 median is **£60.29** vs. Class 3 median of **£8.05**.
    - *Insight*: Class 1 tickets cost 7.5 times more than third-class. The box plot displays a large spread and identifies **116 high-value outliers** (up to £512.33) representing luxury multi-room suites. These outliers were retained to protect historical data integrity.

---

# Slide 5: The Non-Linear Impact of Age
## Investigating Emergency Priority Across Life Stages

Standard linear models miss the protective priority given to children:

*   **Age Bracket Survival (Grouped Column Chart)**:
    - *Infants (Age < 5)*: **67.50%** survived (27/40) — the highest survival group.
    - *Kids (Age 5 - 12)*: **42.86%** survived (12/28).
    - *Teens (Age 12 - 18)*: **48.89%** survived (22/45).
    - *Adults (Age 18 - 60)*: **36.44%** survived (274/752).
    - *Seniors (Age >= 60)*: **26.92%** survived (7/26) — the most vulnerable group.
*   **Key Insight**: Children under 12 overall had an elevated **57.35%** survival rate compared to **36.82%** for adults. This confirms the "children first" protocol, while also highlighting the extreme vulnerability of seniors in freezing conditions.

---

# Slide 6: Multi-Feature Correlation Grid
## Visualizing Feature Interactions

A 6x6 Pearson Correlation Heatmap reveals key statistical interactions:

*   **Core Relationships**:
    - *Pclass and Survived ($r = -0.3385$)*: Strong negative link. As class number increases (from 1st to 3rd), survival rate drops.
    - *Fare and Survived ($r = 0.2573$)*: Positive correlation. Higher ticket prices associate with elevated survival.
    - *Fare and Pclass ($r = -0.5495$)*: Strong negative link, confirming that upper-class passengers paid significantly higher fares.
    - *Age and Survived ($r = -0.0649$)*: Near-zero linear link, illustrating why categorizing age into brackets is necessary to see non-linear survival priorities.
*   **Modeling Warning**: The strong Fare-Pclass correlation highlights potential multicollinearity that must be addressed in predictive modeling.

---

# Slide 7: Interactive Storytelling Dashboard
## Executive Overview Portfolio Hub Preview

We have constructed an **Interactive Data Storytelling Dashboard** inside our Web Portfolio Hub to combine these key findings into a single executive view:

*   **Unified Multi-Chart Dashboard Grid**:
    - Combines Survival Rate, Gender splits, Class distributions, Fare boxplots, Age-survival brackets, and the Pearson Correlation Heatmap.
*   **The Guided Storytelling Stepper**:
    - Lets users navigate through a 4-chapter narrative.
    - Updates narration commentary and dynamically highlights relevant charts with a glowing transition animation.
*   **Interactive Visual Elements**:
    - Pure JavaScript SVG engines render charts instantly with zero external dependencies and provide hover tooltips for all data points.

---

# Slide 8: Data Storytelling & Conclusions
## Key Takeaways and Chart Selection Principles

*   **Storytelling Conclusions**:
    - Titanic survival was not a random lottery. It was highly dependent on biological gender, passenger class, age, and ticket fare.
    - Visualizing the manifest highlights the deep social divides and rescue priorities of the era.
*   **Chart Selection Rationale**:
    - **Continuous Histograms** are essential for mapping skewed distributions like `Age` and `Fare`.
    - **Box Plots** are the best choice for showing continuous spreads across ordinal classes, exposing outliers without losing context.
    - **Grouped Column Charts** are ideal for comparing survival counts across demographic brackets.
    - **Heatmaps** are the most effective way to turn complex correlation tables into immediate visual patterns.
