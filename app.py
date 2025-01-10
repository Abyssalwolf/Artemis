from flask import Flask, render_template

# Create an instance of the Flask class
app = Flask(__name__)

# Define a route and a view function
@app.route('/')
def home():
    return render_template('index.html')

@app.route('/about')
def about():
    return "This is the about page."

# Run the application
if __name__ == '__main__':
    app.run(debug=True)