import os

from groq import Groq

client = Groq(
    api_key="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",
)

chat_completion = client.chat.completions.create(
    messages=[
        {
            "role": "user",
            "content": "Explain the importance of fast language models",
        }
    ],
    model="llama-3.3-70b-versatile",
)

print(chat_completion.choices[0].message.content)