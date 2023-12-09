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
                        "minimum": 1,
                        "maximum": 100,
                        "description": "Confidence level (between 1 and 100 - 1 being least confident that it will compile successfully and 100 being completely sure that it will compile successfully) for the compilation status of the generated Solidity code.",
                    },
                    "completeness_confidence": {
                        "type": "integer",
                        "minimum": 1,
                        "maximum": 100,
                        "description": "Confidence level (between 1 and 100 - 1 being least confident that it will compile successfully and 100 being completely sure that it will compile successfully) for the completeness of the generated Solidity code.",
                    },
                    "additional_notes": {
                        "type": "string",
                        "description": "Any additional notes or comments related to the generated Solidity code.",
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
        "contract_name": "VotingSystem",
        "details": {
            "additional_notes": "The VotingSystem contract allows upvoting and downvoting of posts or comments on the blockchain. The upvote and downvote functions ensure that a user can only upvote or downvote each post/comment once. The contract emits a Voted event whenever a vote is cast. The getVote function enables querying a user's vote for a specific post/comment.",
            "compilation_status_confidence": 1,
            "completeness_confidence": 1
        },
        "solidity_code": "pragma solidity ^0.8.0;\n\n// SPDX-License-Identifier: MIT\n\ncontract VotingSystem {\n    \n    // Mapping to store votes of users. Mapping postId/commentId to user address to vote.\n    // Note: Vote is modelled as an integer, +1 indicates upvote, -1 indicates downvote and 0 indicates no vote.\n    mapping (uint => mapping(address => int)) private votes;\n    \n    // Event to log when a vote is casted.\n    event Voted(uint postId, address voter, int vote);\n    \n    // Function to upvote a post/comment.\n    function upvote(uint _postId) public {\n        require(votes[_postId][msg.sender] != 1, 'You have already upvoted this post/comment.');\n        votes[_postId][msg.sender] = 1;\n        emit Voted(_postId, msg.sender, 1);\n    }\n    \n    // Function to downvote a post/comment.\n    function downvote(uint _postId) public {\n        require(votes[_postId][msg.sender] != -1, 'You have already downvoted this post/comment.');\n        votes[_postId][msg.sender] = -1;\n        emit Voted(_postId, msg.sender, -1);\n    }\n    \n    // Function to get the vote of a user for a particular post/comment.\n    function getVote(uint _postId, address _voter) public view returns(int) {\n        return votes[_postId][_voter];\n    }\n}\n"
    }
}