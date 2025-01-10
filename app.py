from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def landing():
    return render_template('landing.html')

@app.route('/<user_id>/tasks')
def tasks(user_id):
    return render_template('tasks.html', user_id=user_id)

@app.route('/task_details')
def task_details():
    return render_template('task_details.html')

@app.route('/focus')
def focus():
    return render_template('focus.html')

@app.route('/view-data')
def view_data():
    return render_template('view_data.html')

if __name__ == '__main__':
    app.run(debug=True)