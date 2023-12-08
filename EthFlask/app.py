from flask import Flask, jsonify, request
from flask_cors import CORS
from openai import OpenAI
import json
import os
# flask, flask_cors, openai

gpt_api_key=os.environ.get("OPENAI_API_KEY")
app = Flask(__name__,static_url_path='/static/', static_folder='static/')
CORS(app)
client=OpenAI(api_key=gpt_api_key)

@app.route('/',methods=['GET',"POST"])
def home():
    user_answer_1="There should be ability to transfer property easily"
    user_answer_2="The property prices should be stored"
    user_approach="Implement transfer of property using Smart contract"
    prompt = f"Given the answers: {user_answer_1} and {user_answer_2}, and the approach: {user_approach}, write a smart contract code by testing it before."
    schema={
        "type":"object",
        "properties":{
            "code":{
                "type":"string",
                "description":"Give only the solidity code"
            },
            "details":
            {
                "type":"string",
                "description":"All the remaining details"
            }
        },
        "required":['code','details']
    }
    response=client.chat.completions.create(
        model="gpt-3.5-turbo-1106",
        messages=[
                {"role": "system", "content": prompt},
                {"role": "user", "content": f"Answer 1: {user_answer_1}"},
                {"role": "assistant", "content": "Your first answer content here."},
                {"role": "user", "content": f"Answer 2: {user_answer_2}"},
                {"role": "assistant", "content": "Your second answer content here."},
                {"role": "user", "content": f"Approach: {user_approach}"},
        ],
        functions=[{"name": "print", "parameters": schema}],
        function_call={"name": "print"},
    )
    print(response.choices[0].message.function_call.arguments)


    # generated_code=json.loads(response)
    # print(response.choices[0].message.function_call.arguments)

    return jsonify({"response":json.loads(response.choices[0].message.function_call.arguments)})


    # try:
    #     # user_answer_1 = request.json['answer_1']
    #     # user_answer_2 = request.json['answer_2']
    #     # user_approach = request.json['approach']

        

    #     # Create a prompt for the OpenAI API
    #     prompt = f"Given the answers: {user_answer_1} and {user_answer_2}, and the approach: {user_approach}, write a smart contract code by testing it before."

    #     # Make a request to the OpenAI API
    #     response = openai.ChatCompletion.create(
    #         model="gpt-3.5-turbo",
    #         messages=[
    #             {"role": "system", "content": prompt},
    #             {"role": "user", "content": f"Answer 1: {user_answer_1}"},
    #             {"role": "assistant", "content": "Your first answer content here."},
    #             {"role": "user", "content": f"Answer 2: {user_answer_2}"},
    #             {"role": "assistant", "content": "Your second answer content here."},
    #             {"role": "user", "content": f"Approach: {user_approach}"},
    #         ]
    #     )

    #     generated_code = response['choices'][0]['message']['content']

    #     return jsonify({"generated_code": generated_code})

    # except Exception as e:
    #     # Handle exceptions
    #     return jsonify({"error": str(e)}), 500






    return jsonify({"hello":"world"})