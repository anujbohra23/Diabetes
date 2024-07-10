import numpy as np
import pandas as pd
from flask import Flask, request, jsonify, render_template
import pickle
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split

app = Flask(__name__)
model = pickle.load(open('model.pkl','rb'))

df = pd.read_csv(r"C:\Users\Anuj Bohra\Desktop\DiabetesPrediction\flask\diabetes.csv")

X = df.drop(columns=['Outcome']) # still a dataframe
y = df['Outcome'] # .values makes it a numpy array

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=0)

# feature scaling
sc_x = StandardScaler()
X_train = sc_x.fit_transform(X_train)
X_test = sc_x.transform(X_test)


@app.route('/')
def home():
    return render_template('home.html')

@app.route('/index')
def index():
    return render_template('index.html')

@app.route('/symp')
def symp():
    return render_template('sym.html')

@app.route('/fact')
def fact():
    return render_template('FAQs.html')

@app.route('/predict',methods=['POST'])
def predict():
    '''
    For rendering results on HTML GUI
    '''
    float_features = [float(x) for x in request.form.values()]
    final_features = [np.array(float_features)]
    prediction = model.predict( sc_x.transform(final_features) )

    if prediction == 1:
        pred = "You have Diabetes, please consult a Doctor."
    elif prediction == 0:
        pred = "You don't have Diabetes."
    output = pred

    return render_template('result.html', prediction_text='{}'.format(output))

if __name__ == "__main__":
    app.run(debug=True)
