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
    if is_test:
        response = {
            "response": {
                "code": """pragma solidity ^0.8.0;

                    contract RefundContract {
                        enum Status { Pending, Verified, Refunded }
                        mapping(address => Status) public refundStatus;
                        address public seller;
                        address public flipkartTeam;

                        constructor(address _seller, address _flipkartTeam) {
                            seller = _seller;
                            flipkartTeam = _flipkartTeam;
                        }

                        function initiateRefund() public {
                            require(refundStatus[msg.sender] == Status.Verified, 'Refund not verified');
                            require(msg.sender == flipkartTeam, 'Only flipkart team can process refund');
                            refundStatus[msg.sender] = Status.Refunded;
                            // Process the refund
                        }

                        function verifyRefund() public {
                            require(msg.sender == seller, 'Only seller can verify refund');
                            refundStatus[msg.sender] = Status.Verified;
                        }
                    }""",
                    "details": "This smart contract is designed to handle refunds and return policies. It includes an enum to track the status of the refund, mappings to store the refund status of each party, and functions to initiate and verify refunds. The contract also includes conditions to ensure that only the seller and flipkart team can initiate and verify refunds. The code needs to be tested further for complete functionality and integration."
                }
            }

        return jsonify(response)

    # return jsonify({"response":request.get_json()})
    user_answer_1=request.get_json()['features']
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

    ############################################
    if website_url == "https://flipkart.com/":
        response = {
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
        return jsonify(response)
    
    if website_url == "https://www.reddit.com/":
        response = {
            "response": {
                "approaches": [
                    {
                        "content": "Smart contracts can be used to implement a token system within the community. This would give digital assets a value that could be earned by the community participants based on their contributions. This can be achieved by deploying a smart contract that governs the token dynamics like issue, transfer, and burn.",
                        "heading": "Implementing Token Systems",
                        "relevence": "On Reddit, users' activity along with its influence and contributions to the community can be quantified and incentivized. By applying token systems, user engagement can be taken to a new level. This could increase the interaction and the quality of content, providing an improved user experience."
                    },
                    {
                        "content": "Smart contracts can be used to verify the authenticity and integrity of the content posted. A unique signature to each post can be added and that signature can be stored on the blockchain. Any changes made to the content will result in a change in the signature, ensuring the content remains unchanged and authentic.",
                        "heading": "Content Verification",
                        "relevence": "Reddit is an information sharing platform and ensuring the authenticity of the information becomes vital. However, editing a post currently might give rise to disputes regarding the original content. This approach can preserve the integrity of the original posts and avoid disputes."
                    },
                    {
                        "content": "Reddit's upvote/downvote system can be made even more transparent and tamper-proof using blockchain smart contracts. Votes can be stored as transactions, providing a transparent and immutable track of votes. This can also ensure that a single user cannot influence the overall votes excessively.",
                        "heading": "Voting System",
                        "relevence": "Upvoting and downvoting are essential components of Reddit to decide the popularity of a post. By using a smart contract to handle votes, it's even more secure and transparent which will encourage fair play in the community."
                    },
                    {
                        "content": "Advertising on Reddit can be made more efficient and transparent by using smart contracts to handle the advertisement transactions. Advertisers could use tokens to pay for their advertisements and viewers could be incentivised for watching advertisements.",
                        "heading": "Advertisement Management",
                        "relevence": "This not only provides a seamless ad experience but also ensures a fair view count, making the advertisement aspect of Reddit more robust and reliable."
                    }
                ],
                "summary": "Reddit is a network of communities where individuals can find experiences built around their interests, hobbies, and passions. Users can post, vote, and comment in communities organized around their interests. Reddit's vast network includes communities covering a large range of topics, including various aspects of technology, politics, science, sports, entertainment, and more."
            }
        }
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


if __name__ == "__main__":
    app.run(debug=True)