from flask import Flask, jsonify, request
from flask_cors import CORS
from openai import OpenAI
import shutil
import os
import random
from subprocess import run
import subprocess
from lighthouseweb3 import Lighthouse
from web3 import Web3
from solcx import compile_source
import json
lighthouseKeys='189af0ba.4f431b7ecc314f4ea25273a574b88111'
lh = Lighthouse(token=lighthouseKeys)
def uploadFile(address):
    upload = lh.upload(source=address)
    return upload

gpt_api_key=os.environ.get("OPENAI_API_KEY")
lighthouseKeys=os.environ.get("LIGHTHOUSE")
app = Flask(__name__,static_url_path='/static/', static_folder='static/')
CORS(app)

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
    Hardhat=uploadFile(f'./static/{name}.zip')
    shutil.make_archive(f'static/{name}/artifacts','zip',f"{name}/artifacts")
    ABI=uploadFile(f'./static/{name}/artifacts.zip')
    abi=""
    with open(f"{name}/artifacts/contracts/{data['contractName']}.sol/{data['contractName']}.json","r") as sol_file:
        abi=sol_file.read()
    return jsonify({"HardHat":f"https://gateway.lighthouse.storage/ipfs/{Hardhat['data']['Hash']}","ABI_URI":f"https://gateway.lighthouse.storage/ipfs/{ABI['data']['Hash']}","ABI":json.loads(abi)})


@app.route('/hardhatDeploy',methods=['GET','POST'])
def hardhatDeploy():
    name=f"setup-{random.randint(1,100000)}"

    run(['bash','script2.sh',name])
    data=request.get_json()
    data=request.get_json()

    file_path = f"{name}/contracts/{data['contractName']}.sol"
    os.makedirs(os.path.dirname(file_path), exist_ok=True)
    with open(file_path, 'w+') as sol_file:
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
    print(result.stdout.strip().decode('utf-8').split("Address:  "))
    contractAddress=result.stdout.strip().decode('utf-8').split("Address:  ")[1]
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
    upload=uploadFile(f'./static/{name}/artifacts.zip')
    return jsonify({"filename":f"/static/{name}/artifacts.zip","CID":upload['data']['Hash']})




if __name__=="__main__":
    uploadFile('artifiacts.zip','/setup-32744/artifacts.zip')
    app.run(host='127.0.0.1',port=5002)
