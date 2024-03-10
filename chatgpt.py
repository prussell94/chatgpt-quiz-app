from openai import OpenAI

client = OpenAI(api_key="")

model_id = "gpt-3.5-turbo"
completion = client.chat.completions.create(model=model_id,
messages=[
{"role": "user", "content": "Where was the last Olympics held? Just tell me the year & country?"}
])
print(completion.choices[0].message.content)