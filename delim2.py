from groq import Groq
client = Groq(
    api_key="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",
)
completion = client.chat.completions.create(
    model="gemma2-9b-it",
    messages=[
        {
            "role": "system",
            "content": "You are given a main task with several subtasks, each having an estimated time for completion. The goal is to allocate the subtasks into two categories: those that can be completed in the time limited today and those that will be completed later using time allotted to later. When the total time available for a task (time limit today+ time allotted later) is not equal to the total sum of time required by each subtask scale the time required by each subtasks with respect to the original time required and then allocate the task to be done today and then to be done later\n\nsample format to follow for output:\nMain Task: make an ml model\n\nSubtasks:\n- \"Collect and preprocess data\" - '30 minutes'\n- \"Split data into training and testing sets\" - '15 minutes'\n- \"Choose and train a model\" - '30 minutes'\n- \"Evaluate model performance\" - '30 minutes'\n- \"Tune model hyperparameters\" - '15 minutes'\n\n\nthe final daywise allocation after scaling must be shown at the end in the format of input ie, use double quotes for task name, single quotes for task time. use quotes at the end to show daywise allocation as my format. you should not use quotes anywhere else in your response, whether single or double quotes, except for final daywise allocation."
        },
        {
            "role": "user",
            "content": "Main Task: Clean your kitchen\n\nSubtasks:\n- Clear off countertops - 30 minutes\n- Wash dishes and utensils - 20 minutes\n- Wipe down kitchen tables and chairs - 20 minutes\n- Sweep and mop the floor - 30 minutes\n- Clean kitchen appliances- 20 minutes\n\ndays available: 2\nday 1 time: 30 minutes\nday 2 time: 40 minutes"
        },
        {
            "role": "assistant",
            "content": "First, we'll calculate the total time required for all subtasks:\n\n30 minutes + 20 minutes + 20 minutes + 30 minutes + 20 minutes = 120 minutes\n\nNext, we'll determine the total time available across both days: 30 minutes + 40 minutes = 70 minutes\n\nSince the available time (70 minutes) is less than the total required time (120 minutes), we need to scale down the subtasks.\n\nScaling factor = Total available time / Total required time = 70 minutes / 120 minutes = 0.583\n\nNow, let's scale down the time required for each subtask:\n\n- Clear off countertops: 30 minutes * 0.583 = 17.5 minutes\n- Wash dishes and utensils: 20 minutes * 0.583 = 11.66 minutes\n- Wipe down kitchen tables and chairs: 20 minutes * 0.583 = 11.66 minutes\n- Sweep and mop the floor: 30 minutes * 0.583 = 17.5 minutes\n- Clean kitchen appliances: 20 minutes * 0.583 = 11.66 minutes\n\n\n\n\n**Day 1 Allocation:**\n\n\"Clear off countertops\" - '17.5 minutes'\n\"Wash dishes and utensils\" - '11.66 minutes'\n\"Wipe down kitchen tables and chairs\" - '11.66 minutes'\n\n**Day 2 Allocation:**\n\n\"Sweep and mop the floor\" - '17.5 minutes'\n\"Clean kitchen appliances\" - '11.66 minutes'  \n\n\n\n"
        }
    ],
    temperature=1,
    max_tokens=1024,
    top_p=1,
    stream=True,
    stop=None,
)

for chunk in completion:
    print(chunk.choices[0].delta.content or "", end="")
