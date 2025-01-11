from groq import Groq

# Initialize Groq client for task breakdown
task_client = Groq(
    api_key="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",
)

# Initialize Groq client for task allocation
allocation_client = Groq(
    api_key="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"
)

def task_step(task, description, time):
    completion = task_client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {
                "role": "system",
                "content": "Given a main task, break it down into smaller, manageable subtasks that are easy to complete. Optimize the task into steps with estimated time durations and any necessary resources. The goal is to make the task manageable by dividing it based on the time available and complexity. give each subtask in quotes and time required in single quote\nExample Input \nMain Task: \"Prepare a monthly project report\"\n\nRequired time for completion: 5 hours\nAvailable time per day: 1 hour\n\nexample output: Main Task: Prepare a monthly project report\n\nSubtasks:\n- Gather data and information - 1 hour\n- Analyze data - 1 hour\n- Draft the report outline - 1 hour\n- Write the report introduction - 1 hour\n- Review and finalize the report - 1 hour\n\nstick to this output format strictly\n\n"
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

    subtasks, times = extract_subtasks_and_times(out)
    return subtasks, times

def extract_subtasks_and_times(output):
    subtasks, times = [], []
    task, time = "", ""
    task_collecting, time_collecting = False, False

    for char in output:
        if char == '"':
            if task_collecting:
                subtasks.append(task.strip())
                task = ""
            task_collecting = not task_collecting
        elif char == "'":
            if time_collecting:
                times.append(time.strip())
                time = ""
            time_collecting = not time_collecting
        elif task_collecting:
            task += char
        elif time_collecting:
            time += char
    
    return subtasks, times

def allocate_tasks(subtasks, times, days, day_times):
    input_str = f"Main Task: Your Task\n\nSubtasks:\n"
    for subtask, time in zip(subtasks, times):
        input_str += f"- \"{subtask}\" - '{time}'\n"
    input_str += f"\ndays available: {days}\n"
    for i, day_time in enumerate(day_times):
        input_str += f"day {i + 1} time: {day_time} minutes\n"
    
    completion = allocation_client.chat.completions.create(
        model="gemma2-9b-it",
        messages=[
            {
                "role": "system",
                "content": "You are given a main task with several subtasks, each having an estimated time for completion. The goal is to allocate the subtasks into two categories: those that can be completed in the time limited today and those that will be completed later using time allotted to later. When the total time available for a task (time limit today + time allotted later) is not equal to the total sum of time required by each subtask scale the time required by each subtasks with respect to the original time required and then allocate the task to be done today and then to be done later\n\nSample format to follow for output:\nMain Task: make an ml model\n\nSubtasks:\n- \"Collect and preprocess data\" - '30 minutes'\n- \"Split data into training and testing sets\" - '15 minutes'\n- \"Choose and train a model\" - '30 minutes'\n- \"Evaluate model performance\" - '30 minutes'\n- \"Tune model hyperparameters\" - '15 minutes'\n\n\nThe final daywise allocation after scaling must be shown at the end in the format of input ie, use double quotes for task name, single quotes for task time. Use quotes at the end to show daywise allocation as my format. You should not use quotes anywhere else in your response, whether single or double quotes, except for final daywise allocation."
            },
            {
                "role": "user",
                "content": input_str
            },
        ],
        temperature=1,
        max_tokens=1024,
        top_p=1,
        stream=True,
        stop=None,
    )
    
    result = ""
    for chunk in completion:
        result += chunk.choices[0].delta.content or ""
    return result

# Get the breakdown of the main task
subtasks, times = task_step('build a drone', 'chasis,hardware,propellers,integration', '10 hours')

# Allocate the tasks based on available days and times
day_times = [360, 240]  # Example day-wise available times in minutes
allocation_result = allocate_tasks(subtasks, times, len(day_times), day_times)

print(allocation_result)
