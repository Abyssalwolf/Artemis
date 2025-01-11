from flask import Flask, request, jsonify
from flask_cors import CORS
from firebase_admin import initialize_app, firestore, credentials
import firebase_admin
from groq import Groq

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Initialize Firebase
if not firebase_admin._apps:
    cred = firebase_admin.credentials.Certificate('artemis-9d63d-firebase-adminsdk-p1l4d-bf6b44470e.json')
    firebase_admin.initialize_app(cred)

db = firestore.client()

groq_client = Groq(api_key="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")

# Function to generate subtasks and times using LLM
def task_step(task, description, time):
    completion = groq_client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {
                "role": "system",
                "content": "Given a main task, break it down into smaller, manageable subtasks that are easy to complete. Optimize the task into steps with estimated time durations and any necessary resources. The goal is to make the task manageable by dividing it based on the time available and complexity. Give each subtask in quotes and time required in single quotes.\nExample Input \nMain Task: \"Prepare a monthly project report\"\n\nRequired time for completion: 5 hours\nAvailable time per day: 1 hour\n\nExample Output: Main Task: Prepare a monthly project report\n\nSubtasks:\n- Gather data and information - 1 hour\n- Analyze data - 1 hour\n- Draft the report outline - 1 hour\n- Write the report introduction - 1 hour\n- Review and finalize the report - 1 hour\n\nStick to this output format strictly."
            },
            {
                "role": "user",
                "content": f"Main task : {task}\ntask description:{description}\nrequired time for completion : {time}\nthe time can be in hours or minutes upon your discretion"
            }
        ],
        temperature=1,
        max_tokens=1024,
        top_p=1,
        stream=True,
        stop=None,
    )

    out = ""
    for chunk in completion:
        if type(chunk.choices[0].delta.content) == str:
            out += chunk.choices[0].delta.content

    # Extract subtasks and times
    subtasks = []
    times = []
    lines = out.split("\n")
    for line in lines:
        if "-" in line and "\"" in line:
            subtask = line.split("\"")[1]
            time_required = line.split("'")[1]
            subtasks.append(subtask)
            times.append(time_required)

    return subtasks, times

@app.route('/api/create_user', methods=['POST'])
def create_user():
    data = request.json
    name = data.get('name')
    age = data.get('age')
    routine = data.get('routine')

    try:
        # Add a new document to the 'users' collection
        doc_ref = db.collection('users').document()  # Create a new document reference
        doc_ref.set({
            'name': name,
            'age': age,
            'routine': routine
        })
        
        # Return the document ID
        return jsonify({"success": True, "userId": doc_ref.id}), 200
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

@app.route('/api/add_task', methods=['POST'])
def add_task():
    data = request.json
    user_id = data.get('userId')
    title = data.get('title')
    description = data.get('description')
    time = data.get('time')

    try:
        # Generate subtasks and times using LLM
        subtasks, subtask_times = task_step(title, description, time)

        # Add a new document to the 'tasks' collection
        task_ref = db.collection('tasks').document()
        task_ref.set({
            'userId': user_id,
            'title': title,
            'description': description,
            'time': time,
            'subtasks': subtasks,  # Store subtasks
            'subtask_times': subtask_times  # Store subtask times
        })

        return jsonify({"success": True, "taskId": task_ref.id}), 200
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

@app.route('/api/get_user_tasks', methods=['GET'])
def get_user_tasks():
    user_id = request.args.get('userId')

    try:
        # Query tasks where userId matches
        tasks_ref = db.collection('tasks').where('userId', '==', user_id)
        tasks_docs = tasks_ref.stream()

        # Convert documents to a list of dictionaries and include task IDs
        tasks = []
        for task_doc in tasks_docs:
            task_data = task_doc.to_dict()
            task_data['id'] = task_doc.id  # Include the task ID
            tasks.append(task_data)

        return jsonify({"success": True, "tasks": tasks}), 200
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500
    
# @app.route('/api/delete_subtask', methods=['POST'])
# def delete_subtask():
#     data = request.json
#     task_id = data.get('taskId')
#     subtask_index = data.get('subtaskIndex')

#     try:
#         # Get the task document
#         task_ref = db.collection('tasks').document(task_id)
#         task_doc = task_ref.get()

#         if not task_doc.exists:
#             return jsonify({"success": False, "error": "Task not found"}), 404

#         # Get the current subtasks and subtask_times
#         task_data = task_doc.to_dict()
#         subtasks = task_data.get('subtasks', [])
#         subtask_times = task_data.get('subtask_times', [])

#         # Remove the subtask and its corresponding time
#         if subtask_index < len(subtasks):
#             subtasks.pop(subtask_index)
#             subtask_times.pop(subtask_index)

#             # Update the task document
#             task_ref.update({
#                 'subtasks': subtasks,
#                 'subtask_times': subtask_times
#             })

#             return jsonify({"success": True}), 200
#         else:
#             return jsonify({"success": False, "error": "Invalid subtask index"}), 400
#     except Exception as e:
#         return jsonify({"success": False, "error": str(e)}), 500
    
@app.route('/api/get_task_details', methods=['GET'])
def get_task_details():
    task_id = request.args.get('taskId')  # Get taskId from query parameters

    try:
        # Fetch the task document from Firestore
        task_ref = db.collection('tasks').document(task_id)
        task_doc = task_ref.get()

        # Check if the task exists
        if not task_doc.exists:
            return jsonify({"success": False, "error": "Task not found"}), 404

        # Return the task details
        task_data = task_doc.to_dict()
        return jsonify({"success": True, "task": task_data}), 200
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

@app.route('/api/create_focus_session', methods=['POST'])
def create_focus_session():
    data = request.json
    task_id = data.get('taskId')
    time_spent_today = data.get('timeSpentToday')
    time_to_work_later = data.get('timeToWorkLater')

    try:
        # Get the task document to extract subtasks
        task_ref = db.collection('tasks').document(task_id)
        task_doc = task_ref.get()

        if not task_doc.exists:
            return jsonify({"success": False, "error": "Task not found"}), 404

        # Get the first 2 subtasks for the focus session
        subtasks = task_doc.to_dict().get('subtasks', [])[:2]

        # Create a new focus session document
        focus_session_ref = db.collection('focus_sessions').document()
        focus_session_ref.set({
            'taskId': task_id,
            'timeSpentToday': time_spent_today,
            'timeToWorkLater': time_to_work_later,
            'subtasks': subtasks,
            'status': False  # Initially, the session is not completed
        })

        return jsonify({"success": True, "sessionId": focus_session_ref.id}), 200
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500
    
@app.route('/api/complete_focus_session', methods=['POST'])
def complete_focus_session():
    data = request.json
    session_id = data.get('sessionId')

    try:
        # Get the focus session document
        session_ref = db.collection('focus_sessions').document(session_id)
        session_doc = session_ref.get()

        if not session_doc.exists:
            return jsonify({"success": False, "error": "Focus session not found"}), 404

        # Get the task ID and subtasks from the session
        task_id = session_doc.to_dict().get('taskId')
        session_subtasks = session_doc.to_dict().get('subtasks', [])

        # Get the task document
        task_ref = db.collection('tasks').document(task_id)
        task_doc = task_ref.get()

        if not task_doc.exists:
            return jsonify({"success": False, "error": "Task not found"}), 404

        # Remove the session subtasks from the task document
        task_subtasks = task_doc.to_dict().get('subtasks', [])
        updated_subtasks = [subtask for subtask in task_subtasks if subtask not in session_subtasks]

        # Update the task document with the remaining subtasks
        task_ref.update({
            'subtasks': updated_subtasks
        })

        # Mark the focus session as completed
        session_ref.update({
            'status': True
        })

        return jsonify({"success": True}), 200
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500
    


if __name__ == '__main__':
    app.run(debug=True)