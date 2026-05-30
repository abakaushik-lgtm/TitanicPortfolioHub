// Titanic Machine Learning Model Metadata
// Trained using Logistic Regression on an 80-20 Train-Test split
window.titanicModelMeta = {
    intercept: 1.34449892,
    coefficients: {
        Age: -1.73058683,
        Sex: 2.56973836,
        Pclass: -0.95312756,
        Fare: 0.64136981,
        SibSp: -0.27008118,
        Parch: -0.06854262,
        Embarked: 0.24426741
    },
    accuracy: 0.78770950,
    confusionMatrix: {
        TN: 88,
        FP: 17,
        FN: 21,
        TP: 53
    },
    classificationReport: {
        deceased: {
            precision: 0.80733945,
            recall: 0.83809524,
            f1: 0.82242991
        },
        survived: {
            precision: 0.75714286,
            recall: 0.71621622,
            f1: 0.73611111
        }
    }
};
