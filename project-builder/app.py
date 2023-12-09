from flask import Flask, jsonify, request
from flask_cors import CORS
from openai import OpenAI
import os
from subprocess import run

gpt_api_key=os.environ.get("OPENAI_API_KEY")
app = Flask(__name__,static_url_path='/static/', static_folder='static/')


@app.route('/',methods=['GET','POST'])
def hardhatCompiler():
    data=request.get_json()
    with open(f"hardhat-base/contracts/{data['contractName']}.sol", 'w+') as sol_file:
        sol_file.write(data['code'])
    with open(f"hardhat-base/test/{data['contractName']}.js", 'w+') as sol_file:
        sol_file.write(data['testing'])
    return jsonify(data)

if __name__=="__main__":
    app.run(debug=True,port=8001)