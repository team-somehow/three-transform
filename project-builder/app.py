from flask import Flask, jsonify, request
from flask_cors import CORS
from openai import OpenAI
import shutil
import os
import random
from subprocess import run
import subprocess

gpt_api_key=os.environ.get("OPENAI_API_KEY")
app = Flask(__name__,static_url_path='/static/', static_folder='static/')


@app.route('/',methods=['GET','POST'])
def hardhatCompiler():
    name=f"setup-{random.randint(1,100000)}"

    run(['bash','script2.sh',name])
    data=request.get_json()
    with open(f"{name}/contracts/{data['contractName']}.sol", 'w+') as sol_file:
        sol_file.write(data['code'])
    with open(f"{name}/test/{data['contractName']}.js", 'w+') as sol_file:
        sol_file.write(data['testing'])
    run(['bash','script.sh',name])
    shutil.make_archive(f'static/{name}','zip',name)
    print("Zip file made")
    return jsonify({"filename":f"/static/{name}.zip"})


@app.route('/hardhatDeploy',methods=['GET','POST'])
def hardhatDeploy():
    name=f"setup-{random.randint(1,100000)}"

    run(['bash','script2.sh',name])
    data=request.get_json()
    data=request.get_json()
    with open(f"{name}/contracts/{data['contractName']}.sol", 'w+') as sol_file:
        sol_file.write(data['code'])
    deployText='''const hre = require("hardhat");
        async function main() {
        const con = await hre.ethers.deployContract("'''+data['contractName']+'''",[],{});
        await con.waitForDeployment();
        console.log("Address: ",con.target);
        }
        main().catch((error) => {
        console.error(error);
        process.exitCode = 1;
        });
    
    '''
    with open(f"{name}/scripts/deploy.js", 'w+') as sol_file:
        sol_file.write(deployText)

    result=run(['bash','deployscript.sh',name],stdout=subprocess.PIPE)
    print(result.stdout.strip())
    contractAddress=""
    return jsonify({"Contract Address":contractAddress})

@app.route('/getABI',methods=['GET',"POST"])
def getABI():
    name=f"setup-{random.randint(1,100000)}"
    run(['bash','script2.sh',name])
    data=request.get_json()
    with open(f"{name}/contracts/{data['contractName']}.sol", 'w+') as sol_file:
        sol_file.write(data['code'])
    run(['bash','script.sh',name])
    shutil.make_archive(f'static/{name}/artifacts','zip',f"{name}/artifacts")
    print("Zip file made")
    return jsonify({"filename":f"/static/{name}/artifacts.zip"})


if __name__=="__main__":
    app.run(host='127.0.0.1',port=5002)