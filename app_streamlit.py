import streamlit as st
import pandas as pd
import numpy as np
import math
import re
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, confusion_matrix, classification_report

# Set page configuration with a premium dark-theme look
st.set_page_config(
    page_title="Titanic Machine Learning Laboratory",
    page_icon="🚢",
    layout="wide",
    initial_sidebar_state="expanded"
)

# Custom CSS to apply dark theme styling matching the Portfolio Hub
st.markdown("""
<style>
    .main {
        background-color: #030712;
        color: #f9fafb;
    }
    div[data-testid="stSidebar"] {
        background-color: #111827;
        border-right: 1px solid rgba(255, 255, 255, 0.08);
    }
    .stButton>button {
        background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%) !important;
        color: #ffffff !important;
        border: none !important;
        border-radius: 8px !important;
        font-weight: 600 !important;
    }
    .stProgress>div>div>div>div {
        background-color: #6366f1 !important;
    }
    .metric-card {
        background-color: rgba(17, 24, 39, 0.6);
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 12px;
        padding: 20px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        text-align: center;
    }
    h1, h2, h3 {
        font-family: 'Playfair Display', Georgia, serif;
    }
</style>
""", unsafe_allow_html=True)

# --- 1. Load Data & Perform Additional Feature Engineering ---
@st.cache_data
def load_and_preprocess_data():
    df = pd.read_csv("titanic_clean.csv")
    
    # 1. Title Extraction
    def get_title(name):
        title_search = re.search(' ([A-Za-z]+)\\.', name)
        if title_search:
            title = title_search.group(1)
            if title in ['Mlle', 'Ms']:
                return 'Miss'
            elif title == 'Mme':
                return 'Mrs'
            elif title in ['Lady', 'Countess', 'Capt', 'Col', 'Don', 'Dr', 'Major', 'Rev', 'Sir', 'Jonkheer', 'Dona']:
                return 'Rare'
            return title
        return ""

    df['Title'] = df['Name'].apply(get_title)
    # Fill any empty values
    df['Title'] = df['Title'].fillna('Mr')
    
    # 2. Family Size
    df['FamilySize'] = df['SibSp'] + df['Parch'] + 1
    
    # 3. Is Alone
    df['IsAlone'] = 0
    df.loc[df['FamilySize'] == 1, 'IsAlone'] = 1
    
    # 4. Age * Class interaction
    df['AgeClass'] = df['Age'] * df['Pclass']
    
    return df

try:
    df = load_and_preprocess_data()
except Exception as e:
    st.error(f"Error loading 'titanic_clean.csv'. Please make sure the file exists. Error: {e}")
    st.stop()

# --- 2. Train Models & Keep Stored Cache ---
@st.cache_resource
def train_classifiers(data):
    # Encode Title
    title_mapping = {"Mr": 1, "Miss": 2, "Mrs": 3, "Master": 4, "Rare": 5}
    encoded_titles = data['Title'].map(title_mapping).fillna(1).astype(int)
    
    # Preprocessing identical to pipeline + engineered features
    # MinMax Scale Age and Fare
    age_min, age_max = 0.42, 80.00
    fare_min, fare_max = 0.00, 512.3292
    
    X = pd.DataFrame()
    X['Age_norm'] = (data['Age'] - age_min) / (age_max - age_min)
    X['Sex_encoded'] = data['Sex'].map({'female': 1, 'male': 0})
    X['Pclass'] = data['Pclass']
    X['Fare_norm'] = (data['Fare'] - fare_min) / (fare_max - fare_min)
    X['SibSp'] = data['SibSp']
    X['Parch'] = data['Parch']
    X['Embarked_encoded'] = data['Embarked'].map({'C': 1, 'Q': 2, 'S': 0}).fillna(0)
    
    # Storing engineered features
    X['FamilySize'] = data['FamilySize']
    X['IsAlone'] = data['IsAlone']
    X['Title_encoded'] = encoded_titles
    X['AgeClass'] = (data['AgeClass'] - data['AgeClass'].min()) / (data['AgeClass'].max() - data['AgeClass'].min())

    y = data['Survived']
    
    # Split
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    
    # Model 1: Logistic Regression
    lr_model = LogisticRegression(random_state=42, max_iter=1000)
    lr_model.fit(X_train, y_train)
    
    # Model 2: Random Forest
    rf_model = RandomForestClassifier(n_estimators=100, random_state=42, max_depth=6)
    rf_model.fit(X_train, y_train)
    
    return lr_model, rf_model, X_train, X_test, y_train, y_test, X.columns.tolist()

lr_model, rf_model, X_train, X_test, y_train, y_test, feature_names = train_classifiers(df)

# --- 3. Streamlit Interface Structure ---
st.title("🚢 Titanic Predictive Modeling Laboratory")
st.markdown("A premium, interactive scikit-learn simulation platform comparing **Logistic Regression** and **Random Forest** outcomes with advanced feature engineering.")

# Create Sidebar for Profiler Inputs
st.sidebar.header("👤 Passenger Profiler")

input_sex = st.sidebar.selectbox("Biological Gender", ["Male", "Female"])
input_age = st.sidebar.slider("Age (Years)", 0.42, 80.00, 29.36, 0.5)
input_pclass = st.sidebar.radio("Passenger Ticket Class", [1, 2, 3], index=2)
input_fare = st.sidebar.slider("Ticket Fare Paid (£)", 0.00, 512.33, 32.20, 0.5)
input_sibsp = st.sidebar.number_input("Siblings / Spouses Aboard", min_value=0, max_value=8, value=0)
input_parch = st.sidebar.number_input("Parents / Children Aboard", min_value=0, max_value=6, value=0)
input_embarked = st.sidebar.selectbox("Port of Boarding", ["Southampton", "Cherbourg", "Queenstown"])

# Infer engineered values from inputs
family_size = input_sibsp + input_parch + 1
is_alone = 1 if family_size == 1 else 0
age_class = input_age * input_pclass

# Approximate Title from demographics
if input_sex == "Female":
    if input_parch > 0:
        inferred_title = "Mrs"
    else:
        inferred_title = "Miss"
else:
    if input_age < 12:
        inferred_title = "Master"
    else:
        inferred_title = "Mr"

st.sidebar.markdown("---")
st.sidebar.markdown(f"**Engineered Features Inferred:**")
st.sidebar.write(f"*   **Title:** {inferred_title}")
st.sidebar.write(f"*   **Family Size:** {family_size}")
st.sidebar.write(f"*   **Is Alone:** {'Yes' if is_alone == 1 else 'No'}")
st.sidebar.write(f"*   **Age*Class interaction:** {age_class:.2f}")

# --- 4. Main Body Tabs ---
tab1, tab2, tab3 = st.tabs(["🔬 Real-Time Prediction Sandbox", "📊 Model Performance & Comparison", "📂 Dataset Explorer & Statistics"])

with tab1:
    st.header("Real-Time Prediction Engine")
    st.markdown("Adjust passenger credentials in the sidebar to solve predictions instantly on both models side-by-side:")
    
    # 1. Scale Inputs
    age_norm = (input_age - 0.42) / (80.00 - 0.42)
    fare_norm = (input_fare - 0.0) / (512.3292 - 0.0)
    sex_encoded = 1 if input_sex == "Female" else 0
    emb_encoded = 1 if input_embarked == "Cherbourg" else 2 if input_embarked == "Queenstown" else 0
    
    title_mapping = {"Mr": 1, "Miss": 2, "Mrs": 3, "Master": 4, "Rare": 5}
    title_encoded = title_mapping[inferred_title]
    
    # AgeClass normalization range from training set
    raw_age_class = df['Age'] * df['Pclass']
    ac_min, ac_max = raw_age_class.min(), raw_age_class.max()
    ac_norm = (age_class - ac_min) / (ac_max - ac_min)
    
    # Build feature vector
    input_vector = pd.DataFrame([[
        age_norm, sex_encoded, input_pclass, fare_norm, input_sibsp, input_parch, emb_encoded,
        family_size, is_alone, title_encoded, ac_norm
    ]], columns=feature_names)
    
    # Predict
    lr_prob = lr_model.predict_proba(input_vector)[0][1]
    rf_prob = rf_model.predict_proba(input_vector)[0][1]
    
    lr_pred = 1 if lr_prob >= 0.5 else 0
    rf_pred = 1 if rf_prob >= 0.5 else 0
    
    # Layout predictions
    col1, col2 = st.columns(2)
    
    with col1:
        st.subheader("Model A: Logistic Regression")
        st.markdown(f"<div class='metric-card' style='border-color: rgba(99, 102, 241, 0.4);'>", unsafe_allow_html=True)
        if lr_pred == 1:
            st.markdown("<h2 style='color:#10b981;'>🟢 SURVIVED</h2>", unsafe_allow_html=True)
        else:
            st.markdown("<h2 style='color:#ef4444;'>🔴 DID NOT SURVIVE</h2>", unsafe_allow_html=True)
            
        st.write(f"**Survival Probability:** {lr_prob*100:.2f}%")
        st.progress(lr_prob)
        st.markdown("</div>", unsafe_allow_html=True)
        
    with col2:
        st.subheader("Model B: Random Forest Classifier")
        st.markdown(f"<div class='metric-card' style='border-color: rgba(13, 148, 136, 0.4);'>", unsafe_allow_html=True)
        if rf_pred == 1:
            st.markdown("<h2 style='color:#10b981;'>🟢 SURVIVED</h2>", unsafe_allow_html=True)
        else:
            st.markdown("<h2 style='color:#ef4444;'>🔴 DID NOT SURVIVE</h2>", unsafe_allow_html=True)
            
        st.write(f"**Survival Probability:** {rf_prob*100:.2f}%")
        st.progress(rf_prob)
        st.markdown("</div>", unsafe_allow_html=True)
        
    st.markdown("---")
    st.subheader("Mathematical Insights on Decision Boundaries")
    
    if lr_pred == rf_pred:
        st.success(f"**Consensus:** Both models predict that this passenger **{'SURVIVED' if lr_pred == 1 else 'DID NOT SURVIVE'}**.")
    else:
        st.warning("**Divergence:** The models disagree on this boundary profile! Logistic Regression relies heavily on linear weighted logs, while Random Forest splits tree leaves to manage non-linear thresholds.")

with tab2:
    st.header("Comparative Model Performance")
    st.markdown("Compare scikit-learn training scores and diagnostic metrics across train-test partitions:")
    
    # Score predictions
    y_pred_lr = lr_model.predict(X_test)
    y_pred_rf = rf_model.predict(X_test)
    
    lr_acc = accuracy_score(y_test, y_pred_lr)
    rf_acc = accuracy_score(y_test, y_pred_rf)
    
    # 1. Performance Overview Table
    comp_df = pd.DataFrame({
        "Performance Metric": ["Test Accuracy", "Precision (Survived)", "Recall (Survived)", "F1-Score (Survived)"],
        "Logistic Regression": [
            f"{lr_acc*100:.2f}%",
            f"{classification_report(y_test, y_pred_lr, output_dict=True)['1']['precision']*100:.2f}%",
            f"{classification_report(y_test, y_pred_lr, output_dict=True)['1']['recall']*100:.2f}%",
            f"{classification_report(y_test, y_pred_lr, output_dict=True)['1']['f1-score']*100:.2f}%"
        ],
        "Random Forest": [
            f"{rf_acc*100:.2f}%",
            f"{classification_report(y_test, y_pred_rf, output_dict=True)['1']['precision']*100:.2f}%",
            f"{classification_report(y_test, y_pred_rf, output_dict=True)['1']['recall']*100:.2f}%",
            f"{classification_report(y_test, y_pred_rf, output_dict=True)['1']['f1-score']*100:.2f}%"
        ]
    })
    
    st.table(comp_df)
    
    # 2. Confusion Matrices Heatmap Comparison
    st.subheader("Confusion Matrix Comparison")
    col1, col2 = st.columns(2)
    
    cm_lr = confusion_matrix(y_test, y_pred_lr)
    cm_rf = confusion_matrix(y_test, y_pred_rf)
    
    with col1:
        st.markdown("**Logistic Regression Matrix**")
        fig, ax = plt.subplots(figsize=(4, 3))
        sns.heatmap(cm_lr, annot=True, fmt="d", cmap="Blues", cbar=False,
                    xticklabels=["Died", "Survived"], yticklabels=["Died", "Survived"])
        plt.ylabel("Actual")
        plt.xlabel("Predicted")
        st.pyplot(fig)
        st.write(f"*   **Type I Errors (FP):** {cm_lr[0][1]} | **Type II Errors (FN):** {cm_lr[1][0]}")
        
    with col2:
        st.markdown("**Random Forest Matrix**")
        fig, ax = plt.subplots(figsize=(4, 3))
        sns.heatmap(cm_rf, annot=True, fmt="d", cmap="Teal", cbar=False,
                    xticklabels=["Died", "Survived"], yticklabels=["Died", "Survived"])
        plt.ylabel("Actual")
        plt.xlabel("Predicted")
        st.pyplot(fig)
        st.write(f"*   **Type I Errors (FP):** {cm_rf[0][1]} | **Type II Errors (FN):** {cm_rf[1][0]}")

    st.markdown("---")
    
    # 3. Feature Importance Analysis
    st.subheader("Feature Importance Comparison")
    
    # LR coefficients vs RF importances
    lr_coefs = lr_model.coef_[0]
    rf_importances = rf_model.feature_importances_
    
    feat_imp_df = pd.DataFrame({
        "Feature": feature_names,
        "LR Coefficient": lr_coefs,
        "RF Gini Importance": rf_importances
    })
    
    col1, col2 = st.columns(2)
    
    with col1:
        st.markdown("**Logistic Regression Coefficients**")
        fig, ax = plt.subplots(figsize=(5, 4))
        sns.barplot(x="LR Coefficient", y="Feature", data=feat_imp_df.sort_values(by="LR Coefficient"), ax=ax, palette="coolwarm")
        plt.title("Beta Parameter Weights")
        st.pyplot(fig)
        
    with col2:
        st.markdown("**Random Forest Feature Gini Importances**")
        fig, ax = plt.subplots(figsize=(5, 4))
        sns.barplot(x="RF Gini Importance", y="Feature", data=feat_imp_df.sort_values(by="RF Gini Importance", ascending=False), ax=ax, palette="viridis")
        plt.title("Tree Split Gini Score Reduction")
        st.pyplot(fig)

with tab3:
    st.header("Cleaned Dataset Explorer")
    st.markdown("Review descriptive distributions and examine preprocessed passenger records with advanced features:")
    
    # Display stats
    col1, col2, col3 = st.columns(3)
    col1.metric("Total Passengers", len(df))
    col2.metric("Overall Survival Rate", f"{df['Survived'].mean()*100:.2f}%")
    col3.metric("Average Family Size", f"{df['FamilySize'].mean():.2f}")
    
    st.subheader("Interactive manifest browser")
    search_q = st.text_input("🔍 Search passenger name:")
    
    filtered_df = df
    if search_q:
        filtered_df = df[df['Name'].str.lower().str.includes(search_q.lower())]
        
    st.dataframe(filtered_df[['PassengerId', 'Name', 'Sex', 'Age', 'Pclass', 'Fare', 'Embarked', 'Title', 'FamilySize', 'IsAlone', 'Survived']])
    
    st.subheader("Statistical Distributions")
    col1, col2 = st.columns(2)
    
    with col1:
        st.write("**Biological Gender Splits**")
        gender_counts = df['Sex'].value_counts()
        fig, ax = plt.subplots(figsize=(4, 3))
        plt.pie(gender_counts, labels=gender_counts.index, autopct='%1.1f%%', colors=["#6366f1", "#2dd4bf"], startangle=90)
        st.pyplot(fig)
        
    with col2:
        st.write("**Survival rates across socioeconomic Ticket Classes**")
        class_surv = df.groupby('Pclass')['Survived'].mean() * 100
        fig, ax = plt.subplots(figsize=(4, 3))
        sns.barplot(x=class_surv.index, y=class_surv.values, palette="muted", ax=ax)
        plt.ylabel("Survival Rate (%)")
        st.pyplot(fig)
