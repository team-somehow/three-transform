pragma solidity ^0.8.0;

// SPDX-License-Identifier: MIT

contract VotingSystem {
    
    // Mapping to store votes of users. Mapping postId/commentId to user address to vote.
    // Note: Vote is modelled as an integer, +1 indicates upvote, -1 indicates downvote and 0 indicates no vote.
    mapping (uint => mapping(address => int)) private votes;
    
    // Event to log when a vote is casted.
    event Voted(uint postId, address voter, int vote);
    
    // Function to upvote a post/comment.
    function upvote(uint _postId) public {
        require(votes[_postId][msg.sender] != 1, 'You have already upvoted this post/comment.');
        votes[_postId][msg.sender] = 1;
        emit Voted(_postId, msg.sender, 1);
    }
    
    // Function to downvote a post/comment.
    function downvote(uint _postId) public {
        require(votes[_postId][msg.sender] != -1, 'You have already downvoted this post/comment.');
        votes[_postId][msg.sender] = -1;
        emit Voted(_postId, msg.sender, -1);
    }
    
    // Function to get the vote of a user for a particular post/comment.
    function getVote(uint _postId, address _voter) public view returns(int) {
        return votes[_postId][_voter];
    }
}