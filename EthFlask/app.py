from flask import Flask, jsonify, request
from flask_cors import CORS
from openai import OpenAI
import json
import os
from subprocess import run

from subprocess import Popen, PIPE
import subprocess

gpt_api_key=os.environ.get("OPENAI_API_KEY")

app = Flask(__name__, static_url_path='/static/', static_folder='static/')
CORS(app)

client=OpenAI(api_key=gpt_api_key)

@app.route('/generate/code',methods=['GET',"POST"])
def generate_code():
    is_test = request.get_json().get('is_test', None)
    if is_test == True:
        response = generate_code_test_response
        return jsonify(response)

    # return jsonify({"response":request.get_json()})
    approach_heading=request.get_json()['approach_heading']
    approach_content=request.get_json()['approach_content']
    user_approach=request.get_json()['user_approach']

    smart_contract_prompt = """
        Develop a Solidity smart contract to implement the following approach for the web application:

        Approach Heading: "{}"
        
        Approach Content:
        {}

        Additional Details:
        {}

        Your task is to provide the Solidity code for the smart contract that will effectively integrate this approach into the web application. 
        Include relevant functions, variables, and any necessary logic to ensure the successful implementation of the specified feature.

        Ensure that the generated Solidity code:
        1. Compiles without errors.
        2. Is complete and ready for deployment.
        3. The version of Solidity used is "0.8.0" and SPDX-License-Identifier should be "MIT".
        4. Create a 'transferTo' function in a smart contract that allows the owner to transfer ownership to a specified address. Only the current owner should have the privilege to invoke this function.

        Note: Consider best practices and security considerations for smart contracts during the development.
    """

    smart_contract_prompt = smart_contract_prompt.format(approach_heading,approach_content,user_approach)


    schema = {
        "type": "object",
        "properties": {
            "solidity_code": {
                "type": "string",
                "description": "Generated Solidity code for the specified approach.",
            },
            "contract_name": {
                "type": "string",
                "description": "Name of the smart contract generated for the specified approach.",
            },
            "details": {
                "type": "object",
                "properties": {
                    "compilation_status_confidence": {
                        "type": "integer",
                        "description": "Confidence level (between 1 and 100 - 1 being least confident that it will compile successfully and 100 being completely sure that it will compile successfully) for the compilation status of the generated Solidity code.",
                    },
                    "completeness_confidence": {
                        "type": "integer",
                        "description": "Confidence level (between 1 and 100 - 1 being least confident that it will compile successfully and 100 being completely sure that it will compile successfully) for the completeness of the generated Solidity code.",
                    },
                    "additional_notes": {
                        "type": "string",
                        "description": "Describe all the functions of the smart contract except the 'transferTo' function. Provide a brief description of the contract's functionality and any other relevant details",
                    },
                },
                "required": ["compilation_status_confidence", "completeness_confidence"],
                "description": "Details about the generated Solidity code.",
            },
        },
        "required": ["solidity_code", "contract_name", "details"],
        "description": "Schema for representing the generated Solidity code and related details.",
    }

    response=client.chat.completions.create(
        model="gpt-4",
        messages=[
            {"role": "system", "content": smart_contract_prompt},
        ],
        functions=[{"name": "print", "parameters": schema}],
        function_call={"name": "print"},
    )
    print(response.choices[0].message.function_call.arguments)
    return jsonify({"response":json.loads(response.choices[0].message.function_call.arguments, strict=False)})

@app.route('/scrape',methods=['GET',"POST"])
def web_scrape():
    website_url = request.args.get('url')

    ############################################
    is_test = request.args.get('is_test', None)
    if is_test == "true":
        if website_url == "https://flipkart.com/" or "flipkart" in website_url:
            response = web_scrape_flipkart_website_response
            return jsonify(response)
        
        if website_url == "https://www.reddit.com/" or "reddit" in website_url:
            response = web_scrape_reddit_website_respose
            return jsonify(response)
        
        else:
            response = web_scrape_reddit_website_respose
            return jsonify(response)
    ############################################
    
    # actual code
    prompt = """
        Assume I am from the tech team of a web2 app hosted at "{}" 
        (now onwards whenever I use the following words  "web app" or "app" or "web application" or alike I am referring to the web2 app hosted at "{}") 
        and I want to update my technology by integrating a smart contract in my web application. 
        Give me "approaches" to integrate smart contract in the app.
        
        How you should behave :- 
            1) figure out what the "web app" does by looking it up on the internet. Then figure out features that can be better served on web3 for that particular app
            2) If it is a well-known app DO NOT answer as it is not possible. Understand that the developer is building a similar version on web3.
        
        For example :- 
        (1) If the app's core functionality is to sell properties online so an "approach" would be :-
            1) use escrow smart contract to transfer property
            2) use NFT to represent property
        (2) If the app is reddit so an "approach" would be :-
            1) Reddit's upvote/downvote system can be made even more transparent and tamper-proof using blockchain smart contracts.
    """
    prompt = prompt.format(website_url, website_url)

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

@app.route("/generateabi",methods=['GET','POST'])
def generateOBI():
    return jsonify(test_reponse)



    return jsonify(response)


if __name__ == "__main__":
    app.run(debug=True)

web_scrape_reddit_website_respose = {
    "response": {
        "approaches": [
            {
                "content": "Smart contracts can make Reddit's upvoting and downvoting system more transparent and tamper-proof. Users can vote on posts and comments, and these votes can be recorded on the blockchain. This ensures that the voting process is clear, transparent, and cannot be tampered with. Manipulated votes are a concern that can be tackled using smart contracts.",
                "heading": "Decentralized Voting System",
                "relevence": "Reddit heavily relies on its upvote and downvote system to rank content and decide what gets seen by more people. Ensuring this system's legitimacy adds value to the platform."
            },
            {
                "content": "Reddit currently has a karma system where users gain points for their comments and posts, which are upvoted by other users. This concept can be implemented via smart contracts to create Karma Tokens. Users can earn or lose tokens based on their contributions. The tokens can hold real value, and users could trade them for goods, services, or even sell them for cryptocurrency.",
                "heading": "Tokenization of Karma Points",
                "relevence": "The ability to earn karma is a key engagement factor in Reddit. Tokenizing karma points may drive stronger user engagement and facilitate an economy within Reddit itself."
            },
            {
                "content": "Content posted on Reddit can be stored on the blockchain, ensuring it is immutable and persistent. This use of a smart contract can mean that once a post is made, it cannot be altered or deleted. This ensures the authenticity of the content.",
                "heading": "Decentralized & Immutable Content",
                "relevence": "Amid increasingly common concerns about censorship and content manipulation on social platforms, this feature can give Reddit a competitive edge."
            },
            {
                "content": "Smart contracts can enhance Reddit's advertising system. Advertisers can directly enter into contracts with the platform using smart contracts. They can pay using digital tokens, and the display of ads can be automatically controlled by the contract. This would make the transaction process more efficient and trustable.",
                "heading": "Smart Contract-based Ads",
                "relevence": "Advertising is a significant source of revenue for Reddit. Using smart contracts to automate and make the process more transparent could improve advertiser trust and satisfaction."
            }
        ],
        "summary": "Reddit is a network of communities where people can dive into their interests, hobbies and passions. It's a platform for users to post, comment, and vote on content. Reddit has many subreddits for various topics, and users can subscribe to these subreddits to receive updates on their front page. Users can also upvote and downvote posts and comment on them."
    }
}

web_scrape_flipkart_website_response = {
            "response": {
                "approaches": [
                    {
                        "content": "One immediate approach would be integrating a smart contract for secure and reliable payment. In addition to the current payment gateways, a smart contract will enable direct transfers of cryptocurrency between buyers and sellers. This will increase transparency and may reduce possible transaction costs.",
                        "heading": "Smart Contract for Secure Payments",
                        "relevence": "In e-commerce, trust and security during transactions is a critical component. Using smart contracts could enhance this by offering a transparent and secure system for both customers and sellers."
                    },
                    {
                        "content": "Another approach could involve using non-fungible tokens (NFTs) to ensure the authenticity of products, particularly high-value items. Each product could be minted as an NFT representing a unique digital certificate of authenticity. Upon purchasing, this NFT could be sent to the buyer's digital wallet, guaranteeing the authenticity of the product.",
                        "heading": "Product Authenticity Verification using NFTs",
                        "relevence": "Counterfeiting is a significant challenge in e-commerce. By integrating NFTs for high-value items, customers are assured of the authenticity of their purchases."
                    },
                    {
                        "content": "Integrate smart contracts for dispute resolutions. The contract could have conditions that govern refunds and return policies. In case of a dispute, the smart contract can be enacted based upon the laid out conditions, ensuring fairness and transparency.",
                        "heading": "Smart Contract for Dispute Resolution",
                        "relevence": "Dealing with disputes is often a complex and time-consuming process in e-commerce. A smart contract automatically executing based on pre-determined conditions can expedite this process."
                    }
                ],
                "summary": "Flipkart is an Indian e-commerce company that deals with selling goods online. Its core business proposition includes products from numerous categories, such as fashion, home essentials, electronics, etc. It offers secure digital payment options and follows a business model of inventory-led direct sales as well as a hybrid model where it provides a platform for other sellers to sell their products."
            }
        }

generate_code_test_response = {
    "response": {
        "contract_name": "RedditVoting",
        "details": {
            "additional_notes": "This smart contract enables upvoting and downvoting of posts in a Reddit-like platform. All votes are stored on the Ethereum blockchain to ensure transparency. A post's unique hash is used as the key to record votes. The constructor sets the contract deployer as the initial owner. The contract includes an 'onlyOwner' modifier to restrict certain operations to the owner address. A 'transferTo' function allows the owner to transfer ownership to another Ethereum address. Note: the contract does not include any logic to authenticate users beyond their Ethereum address. Therefore, any Ethereum account can interact with the contract and cast votes.",
            "compilation_status_confidence": 1,
            "completeness_confidence": 1
        },
        "solidity_code": "--SPDX-License-Identifier: MIT\npragma solidity ^0.8.0;\n\ncontract RedditVoting {\n\n    address public owner;\n    mapping(address => mapping(bytes32 => bool)) public upvotes;\n    mapping(address => mapping(bytes32 => bool)) public downvotes;\n    mapping(bytes32 => uint256) public score;\n\n    constructor() {\n        owner = msg.sender;\n    }\n\n    modifier onlyOwner() {\n        require(msg.sender == owner, \"Only owner can call this function.\");\n        _;\n    }\n\n    function upvote(bytes32 _hash) public {\n        require(!downvotes[msg.sender][_hash], \"Cannot upvote a downvoted post.\");\n        upvotes[msg.sender][_hash] = true;\n        score[_hash]++;\n    }\n\n    function downvote(bytes32 _hash) public {\n        require(!upvotes[msg.sender][_hash], \"Cannot downvote an upvoted post.\");\n        downvotes[msg.sender][_hash] = true;\n        score[_hash]--;\n    }\n\n    function getPostScore(bytes32 _hash) public view returns (uint256) {\n        return score[_hash];\n    }\n\n    function transferTo(address newOwner) public onlyOwner {\n        owner = newOwner;\n    }\n}"
    }
}


test_reponse={
    "ABI": {
      "_format": "hh-sol-artifact-1",
      "abi": [
        {
          "inputs": [],
          "stateMutability": "nonpayable",
          "type": "constructor"
        },
        {
          "inputs": [
            {
              "internalType": "bytes32",
              "name": "_hash",
              "type": "bytes32"
            }
          ],
          "name": "downvote",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            },
            {
              "internalType": "bytes32",
              "name": "",
              "type": "bytes32"
            }
          ],
          "name": "downvotes",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "bytes32",
              "name": "_hash",
              "type": "bytes32"
            }
          ],
          "name": "getPostScore",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "owner",
          "outputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "bytes32",
              "name": "",
              "type": "bytes32"
            }
          ],
          "name": "score",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "newOwner",
              "type": "address"
            }
          ],
          "name": "transferTo",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "bytes32",
              "name": "_hash",
              "type": "bytes32"
            }
          ],
          "name": "upvote",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            },
            {
              "internalType": "bytes32",
              "name": "",
              "type": "bytes32"
            }
          ],
          "name": "upvotes",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        }
      ],
      "bytecode": "0x608060405234801561001057600080fd5b50336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506109c4806100606000396000f3fe608060405234801561001057600080fd5b50600436106100885760003560e01c8063a5b1f44d1161005b578063a5b1f44d14610127578063e5af18c514610143578063f1c1921514610173578063faa5fd03146101a357610088565b80633faab61e1461008d57806365231328146100bd5780638da5cb5b146100ed578063a03fa7e31461010b575b600080fd5b6100a760048036038101906100a291906105e7565b6101bf565b6040516100b4919061062d565b60405180910390f35b6100d760048036038101906100d291906106a6565b6101dc565b6040516100e49190610701565b60405180910390f35b6100f561020b565b604051610102919061072b565b60405180910390f35b61012560048036038101906101209190610746565b61022f565b005b610141600480360381019061013c91906105e7565b610300565b005b61015d600480360381019061015891906105e7565b610432565b60405161016a919061062d565b60405180910390f35b61018d600480360381019061018891906106a6565b61044a565b60405161019a9190610701565b60405180910390f35b6101bd60048036038101906101b891906105e7565b610479565b005b600060036000838152602001908152602001600020549050919050565b60016020528160005260406000206020528060005260406000206000915091509054906101000a900460ff1681565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16146102bd576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016102b4906107f6565b60405180910390fd5b806000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050565b600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082815260200190815260200160002060009054906101000a900460ff161561039e576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161039590610862565b60405180910390fd5b60018060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600083815260200190815260200160002060006101000a81548160ff02191690831515021790555060036000828152602001908152602001600020600081548092919061042a906108b1565b919050555050565b60036020528060005260406000206000915090505481565b60026020528160005260406000206020528060005260406000206000915091509054906101000a900460ff1681565b600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082815260200190815260200160002060009054906101000a900460ff1615610517576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161050e90610945565b60405180910390fd5b6001600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600083815260200190815260200160002060006101000a81548160ff0219169083151502179055506003600082815260200190815260200160002060008154809291906105a490610965565b919050555050565b600080fd5b6000819050919050565b6105c4816105b1565b81146105cf57600080fd5b50565b6000813590506105e1816105bb565b92915050565b6000602082840312156105fd576105fc6105ac565b5b600061060b848285016105d2565b91505092915050565b6000819050919050565b61062781610614565b82525050565b6000602082019050610642600083018461061e565b92915050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b600061067382610648565b9050919050565b61068381610668565b811461068e57600080fd5b50565b6000813590506106a08161067a565b92915050565b600080604083850312156106bd576106bc6105ac565b5b60006106cb85828601610691565b92505060206106dc858286016105d2565b9150509250929050565b60008115159050919050565b6106fb816106e6565b82525050565b600060208201905061071660008301846106f2565b92915050565b61072581610668565b82525050565b6000602082019050610740600083018461071c565b92915050565b60006020828403121561075c5761075b6105ac565b5b600061076a84828501610691565b91505092915050565b600082825260208201905092915050565b7f4f6e6c79206f776e65722063616e2063616c6c20746869732066756e6374696f60008201527f6e2e000000000000000000000000000000000000000000000000000000000000602082015250565b60006107e0602283610773565b91506107eb82610784565b604082019050919050565b6000602082019050818103600083015261080f816107d3565b9050919050565b7f43616e6e6f74207570766f7465206120646f776e766f74656420706f73742e00600082015250565b600061084c601f83610773565b915061085782610816565b602082019050919050565b6000602082019050818103600083015261087b8161083f565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b60006108bc82610614565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff82036108ee576108ed610882565b5b600182019050919050565b7f43616e6e6f7420646f776e766f746520616e207570766f74656420706f73742e600082015250565b600061092f602083610773565b915061093a826108f9565b602082019050919050565b6000602082019050818103600083015261095e81610922565b9050919050565b600061097082610614565b91506000820361098357610982610882565b5b60018203905091905056fea264697066735822122077b1bf02ba306160f8480adfce6cf4ced37f10e44b6ceae4a3117e2fb454b21d64736f6c63430008110033",
      "contractName": "RedditVoting",
      "deployedBytecode": "0x608060405234801561001057600080fd5b50600436106100885760003560e01c8063a5b1f44d1161005b578063a5b1f44d14610127578063e5af18c514610143578063f1c1921514610173578063faa5fd03146101a357610088565b80633faab61e1461008d57806365231328146100bd5780638da5cb5b146100ed578063a03fa7e31461010b575b600080fd5b6100a760048036038101906100a291906105e7565b6101bf565b6040516100b4919061062d565b60405180910390f35b6100d760048036038101906100d291906106a6565b6101dc565b6040516100e49190610701565b60405180910390f35b6100f561020b565b604051610102919061072b565b60405180910390f35b61012560048036038101906101209190610746565b61022f565b005b610141600480360381019061013c91906105e7565b610300565b005b61015d600480360381019061015891906105e7565b610432565b60405161016a919061062d565b60405180910390f35b61018d600480360381019061018891906106a6565b61044a565b60405161019a9190610701565b60405180910390f35b6101bd60048036038101906101b891906105e7565b610479565b005b600060036000838152602001908152602001600020549050919050565b60016020528160005260406000206020528060005260406000206000915091509054906101000a900460ff1681565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16146102bd576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016102b4906107f6565b60405180910390fd5b806000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050565b600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082815260200190815260200160002060009054906101000a900460ff161561039e576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161039590610862565b60405180910390fd5b60018060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600083815260200190815260200160002060006101000a81548160ff02191690831515021790555060036000828152602001908152602001600020600081548092919061042a906108b1565b919050555050565b60036020528060005260406000206000915090505481565b60026020528160005260406000206020528060005260406000206000915091509054906101000a900460ff1681565b600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082815260200190815260200160002060009054906101000a900460ff1615610517576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161050e90610945565b60405180910390fd5b6001600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600083815260200190815260200160002060006101000a81548160ff0219169083151502179055506003600082815260200190815260200160002060008154809291906105a490610965565b919050555050565b600080fd5b6000819050919050565b6105c4816105b1565b81146105cf57600080fd5b50565b6000813590506105e1816105bb565b92915050565b6000602082840312156105fd576105fc6105ac565b5b600061060b848285016105d2565b91505092915050565b6000819050919050565b61062781610614565b82525050565b6000602082019050610642600083018461061e565b92915050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b600061067382610648565b9050919050565b61068381610668565b811461068e57600080fd5b50565b6000813590506106a08161067a565b92915050565b600080604083850312156106bd576106bc6105ac565b5b60006106cb85828601610691565b92505060206106dc858286016105d2565b9150509250929050565b60008115159050919050565b6106fb816106e6565b82525050565b600060208201905061071660008301846106f2565b92915050565b61072581610668565b82525050565b6000602082019050610740600083018461071c565b92915050565b60006020828403121561075c5761075b6105ac565b5b600061076a84828501610691565b91505092915050565b600082825260208201905092915050565b7f4f6e6c79206f776e65722063616e2063616c6c20746869732066756e6374696f60008201527f6e2e000000000000000000000000000000000000000000000000000000000000602082015250565b60006107e0602283610773565b91506107eb82610784565b604082019050919050565b6000602082019050818103600083015261080f816107d3565b9050919050565b7f43616e6e6f74207570766f7465206120646f776e766f74656420706f73742e00600082015250565b600061084c601f83610773565b915061085782610816565b602082019050919050565b6000602082019050818103600083015261087b8161083f565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b60006108bc82610614565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff82036108ee576108ed610882565b5b600182019050919050565b7f43616e6e6f7420646f776e766f746520616e207570766f74656420706f73742e600082015250565b600061092f602083610773565b915061093a826108f9565b602082019050919050565b6000602082019050818103600083015261095e81610922565b9050919050565b600061097082610614565b91506000820361098357610982610882565b5b60018203905091905056fea264697066735822122077b1bf02ba306160f8480adfce6cf4ced37f10e44b6ceae4a3117e2fb454b21d64736f6c63430008110033",
      "deployedLinkReferences": {},
      "linkReferences": {},
      "sourceName": "contracts/RedditVoting.sol"
    },
    "ABI_URI": "https://gateway.lighthouse.storage/ipfs/QmaF7jTr2DzqRxF85PdhTHZN6wFYXJhcAo2BpkYpRnH47Q",
    "HardHat": "https://gateway.lighthouse.storage/ipfs/QmWZsdB6x927g5SR8fR6kWXeuo4rUBoGMKtPURfHZfUwz8"
  }