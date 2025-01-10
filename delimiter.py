from groq import Groq

client = Groq(
    api_key="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",
)

completion = client.chat.completions.create(
    model="llama-3.3-70b-versatile",
    messages=[
        {
            "role": "system",
            "content": "Given a main task, break it down into smaller, manageable subtasks that are easy to complete. Optimize the task into steps with estimated time durations and any necessary resources. The goal is to make the task manageable by dividing it based on the time available and complexity. give each subtask in quotes and time required in single qoute\nExample Input \nMain Task: \"Prepare a monthly project report\"\n\nRequired time for completion: 5 hours\nAvailable time per day: 1 hour\n\nexample output: Main Task: Prepare a monthly project report\n\nSubtasks:\n- Gather data and information - 1 hour\n- Analyze data - 1 hour\n- Draft the report outline - 1 hour\n- Write the report introduction - 1 hour\n- Review and finalize the report - 1 hour\n\nstick to this output format strictly\n\n"
        },
#i changed the main task quotes thing
#i didnt do it but, change so that only int value is in single quotes. but then, ask llm to give in minutes
        {
            "role": "user",
            "content": "Main task : cook pasta\nrequired time for completion : 2 hrs\n"
        }
    ],
    temperature=1,
    max_tokens=1024,
    top_p=1,
    stream=True,
    stop=None,
)
out=""
for chunk in completion:
    print(chunk.choices[0].delta.content or "", end="")
    if type(chunk.choices[0].delta.content)==str:
        out=out+(chunk.choices[0].delta.content)

print(out)
outnew=""
c=0
p1=0
outlist=[]
for i in out:
    if i=="\"" and c==1:
        c=0
        outlist.append(outnew)
        outnew=""
        p1=1
        continue
    if c==1:
        outnew+=i
    if i=="\"" and c==0:
        c=1

outnew=""
c=0
p1=0
outlist1=[]

for i in out:
    if i=="'" and c==1:
        c=0
        outlist1.append(outnew)
        outnew=""
        p1=1
        continue
    if c==1:
        outnew+=i
    if i=="'" and c==0:
        c=1


print("blah")
for i in range(len(outlist)):
    print("step",i+1, "is", outlist[i])
    print("time",i+1, "is", outlist1[i])