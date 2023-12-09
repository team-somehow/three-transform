
pragma solidity ^0.8.0;

contract RedditVotingSystem{

    struct Vote {
        address voter;
        bool choice;
    }
    
    struct PostOrComment {
        uint voteCount;
        mapping(address => Vote) votes;
    }
    
    mapping(uint => PostOrComment) public postsOrComments;
    uint public totalPostsOrComments;
    
    function createPostOrComment() public returns (uint) {
        totalPostsOrComments ++;
        PostOrComment storage pc = postsOrComments[totalPostsOrComments];
        pc.voteCount = 0;
        return totalPostsOrComments;
    }
    
    function upVote(uint _postOrCommentId) public {
        PostOrComment storage pc = postsOrComments[_postOrCommentId];
        
        require(pc.votes[msg.sender].voter != msg.sender, 'User has already voted');
        
        pc.votes[msg.sender].choice = true;
        pc.votes[msg.sender].voter = msg.sender;
        pc.voteCount += 1;
    }
    
    function downVote(uint _postOrCommentId) public {
        PostOrComment storage pc = postsOrComments[_postOrCommentId];
        
        require(pc.votes[msg.sender].voter != msg.sender, 'User has already voted');
        
        pc.votes[msg.sender].choice = false;
        pc.votes[msg.sender].voter = msg.sender;
        pc.voteCount -= 1;
    }
    
    function checkVote(uint _postOrCommentId, address _user) public view returns(bool){
        PostOrComment storage pc = postsOrComments[_postOrCommentId];
        return pc.votes[_user].choice;
    }
    
    function checkTotalVotes(uint _postOrCommentId) public view returns(uint) {
        PostOrComment storage pc = postsOrComments[_postOrCommentId];
        return pc.voteCount;
    }
}
