from flask import Flask, render_template, request, redirect, url_for, session
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
app.secret_key = 'your_secret_key'  # Needed for session management

# Dummy in-memory user storage (Dictionary to simulate a database)
users = {}

# Home route
@app.route('/')
def home():
    return render_template('home.html')

# Register route
@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        
        if username in users:
            return "Username already exists!"

        # Hash the password and store the user
        hashed_password = generate_password_hash(password)
        users[username] = hashed_password
        return redirect(url_for('login'))

    return render_template('register.html')

# Login route
@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']

        user_password = users.get(username)

        if user_password and check_password_hash(user_password, password):
            session['username'] = username
            return redirect(url_for('secured_page'))
        else:
            return "Invalid username or password!"

    return render_template('login.html')

# Secured page route (accessible only if logged in)
@app.route('/secure_page')
def secured_page():
    if 'username' in session:
        return render_template('secure_page.html', username=session['username'])
    return redirect(url_for('login'))

# Logout route
@app.route('/logout')
def logout():
    session.pop('username', None)
    return redirect(url_for('home'))

if __name__ == '__main__':
    app.run(debug=True)
