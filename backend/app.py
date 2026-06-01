from flask import Flask, render_template, request, redirect, url_for
import os

# Project paths
BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
TEMPLATE_FOLDER = os.path.join(BASE_DIR, 'frontend', 'templates')
STATIC_FOLDER = os.path.join(BASE_DIR, 'frontend', 'static')

# Flask app
app = Flask(
    __name__,
    template_folder=TEMPLATE_FOLDER,
    static_folder=STATIC_FOLDER
)

print("Static Path:", STATIC_FOLDER)
print("Template Path:", TEMPLATE_FOLDER)


# Home Page
@app.route('/')
def home():
    return render_template('index.html')


# Chatbot Page
@app.route('/chatbot')
def chatbot():
    return render_template('chatbot.html')


# Login Page
@app.route('/login', methods=['GET', 'POST'])
def login():

    if request.method == 'POST':

        username = request.form.get('username')
        password = request.form.get('password')

        print("Login attempt")
        print("Username:", username)

        return redirect(url_for('home'))

    return render_template('login.html')


# Register Page
@app.route('/register', methods=['GET', 'POST'])
def register():

    if request.method == 'POST':

        fullname = request.form.get('fullname')
        username = request.form.get('username')
        email = request.form.get('email')
        password = request.form.get('password')
        organization = request.form.get('organization')
        contact = request.form.get('contact')

        print("New user registered")
        print(fullname)
        print(username)
        print(email)
        print(organization)
        print(contact)

        return redirect(url_for('login'))

    return render_template('register.html')


# Run App
if __name__ == '__main__':
    app.run(debug=True)