from flask import Flask, jsonify, request
from flask_cors import CORS
from openai import OpenAI
import json
import os
from subprocess import run

from subprocess import Popen, PIPE
import subprocess

gpt_api_key=os.environ.get("OPENAI_API_KEY")
app = Flask(__name__,static_url_path='/static/', static_folder='static/')
CORS(app)
client=OpenAI(api_key=gpt_api_key)

@app.route('/',methods=['GET',"POST"])
def home():

    # return jsonify({"response":request.get_json()})
    user_answer_1=request.get_json()['answer1']
    user_approach=request.get_json()['approach']
    prompt = f"Given the answer: {user_answer_1}, and the approach: {user_approach}, write a smart contract code by testing it before make the contract detailed."
    schema={
        "type":"object",
        "properties":{
            "code":{
                "type":"string",
                "description":"Give only the detailed solidity code after testing"
            },
            "details":
            {
                "type":"string",
                "description":"All the remaining details regarding the contract"
            }
        },
        "required":['code','details']
    }
    response=client.chat.completions.create(
        model="gpt-3.5-turbo-1106",
        messages=[
                {"role": "system", "content": prompt},
                {"role": "assistant", "content": f"Question 1: What features do you want your smart contract to implement"},
                {"role": "user", "content": f"{user_answer_1}"},
                {"role": "assistant", "content": f"Approach: The approach given by the user"},
                {"role": "user", "content": f"{user_approach}"},
        ],
        functions=[{"name": "print", "parameters": schema}],
        function_call={"name": "print"},
    )
    print(response.choices[0].message.function_call.arguments)
    return jsonify({"response":json.loads(response.choices[0].message.function_call.arguments)})

@app.route('/scrape',methods=['GET',"POST"])
def web_scrape():
    website_url = request.args.get('url')
    prompt = """
        Assume I am from the tech team of a web2 app hosted at "{}" 
        (now onwards whenever I use the following words  "web app" or "app" or "web application" or alike I am referring to the web2 app hosted at "{}") 
        and I want to update my technology by integrating a smart contract in my web application. 
        Give me "approaches" to integrate smart contract in the app.
        
        How you should behave :- 
            1) figure out what the "web app" does by looking it up on the internet. Then figure out features that can be better served on web3 for that particular app
            2) If it is a well-known app DO NOT answer as it is not possible. Understand that the developer is building a similar version on web3.
        
        For example :- 
            If the app's core functionality is to sell properties online so an "approach" would be :-
            1) use escrow smart contract to transfer property
            2) use NFT to represent property
    """
    prompt = prompt.format(website_url, website_url)

    # print(prompt)
    # return jsonify({"response":prompt})

    schema = {
        "type": "object",
        "properties": {
            "summary": {
                "type": "string",
                "description": "A concise summary of the \"web application\".",
            },
            "approaches": {
                "type": "array",
                "items": {
                    "type": "object",
                    "properties": {
                        "heading": {
                            "type": "string",
                            "description": "A concise heading describing the key idea of the approach.",
                        },
                        "content": {
                            "type": "string",
                            "description": "Detailed content outlining the steps and implementation details of the approach.",
                        },
                        "relevence": {
                            "type": "string",
                            "description": "How is the approach relevant to the given \"web application\".",
                        },
                    },
                    "required": ["heading", "content"],
                },
                "description": "An array of approaches for integrating a smart contract into the \"web application\".",
            },
        },
        "required": ["approaches"],
        "description": "Schema for representing various approaches to integrate a smart contract into the \"web application\".",
    }
    response=client.chat.completions.create(
        model="gpt-4",
        messages=[
            {"role": "system", "content": prompt},
        ],
        functions=[{"name": "print", "parameters": schema}],
        function_call={"name": "print"},
    )
    print(response.choices[0].message.function_call.arguments)
    return jsonify({"response":json.loads(response.choices[0].message.function_call.arguments)})


@app.route('/rest-api',methods=['GET','POST'])
def RESTAPI():
    abi=request.get_json()['abi']
    print(abi)
    response=[]
    for i in abi:
        temp={}
        if i['type']=='constructor':
            continue
        temp['name']=i['name']
        temp['inputs']=[]
        for j in i['inputs']:
            if j['name']=="":
                temp["inputs"].append({
                    "address":"string"
                })
                continue
            temp['inputs'].append({
                j['name']:j['type']
            })
        temp['outputs']=[]
        if "outputs" in i:
            print(i['outputs'])
            for j in i['outputs']:
                temp['outputs'].append({
                    "type":j['type']
                })
            
        response.append(temp)




    return jsonify(response)


