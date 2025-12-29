import numpy as np
from sklearn.linear_model import LinearRegression

# dummy training data
# [total_quantity, available_quantity]
X = np.array([
    [1000, 800],
    [500, 200],
    [2000, 1500],
    [300, 50]
])

# 1 = sufficient, 0 = insufficient
y = np.array([1, 0, 1, 0])

model = LinearRegression()
model.fit(X, y)

def predict_resource(total, available):
    prediction = model.predict([[total, available]])[0]
    return "Sufficient" if prediction >= 0.5 else "Insufficient"
