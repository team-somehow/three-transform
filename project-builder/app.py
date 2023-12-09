from flask import Flask, jsonify, request
from flask_cors import CORS
from openai import OpenAI
import shutil
import os
import random
from subprocess import run
import subprocess
from lighthouseweb3 import Lighthouse
lighthouseKeys='189af0ba.4f431b7ecc314f4ea25273a574b88111'
print(lighthouseKeys)
lh = Lighthouse(token=lighthouseKeys)
def uploadFile(address):
    upload = lh.upload(source=address)
    return upload

gpt_api_key=os.environ.get("OPENAI_API_KEY")
lighthouseKeys=os.environ.get("LIGHTHOUSE")
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
    upload=uploadFile(f'./static/{name}/artifacts.zip')
    return jsonify({"filename":f"/static/{name}/artifacts.zip","CID":upload['data']['Hash']})




if __name__=="__main__":
    uploadFile('artifiacts.zip','/setup-32744/artifacts.zip')
    app.run(host='127.0.0.1',port=5002)
