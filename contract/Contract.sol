// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

contract StatusUpdate {
    uint256 constant MAX_CHARACTER_AMOUNT = 128;

    mapping(address => string) public statuses;

    event StatusUpadted(
        address indexed user,
        string newStatus,
        uint256 timestamp
    );

    function setStatus(string memory _status) public {
        require(bytes(_status).length<=MAX_CHARACTER_AMOUNT,"Length exceed");
        statuses[msg.sender]=_status;
        emit StatusUpadted(msg.sender, _status, block.timestamp);
    }

    function getStatus(address _user) public view returns(string memory){
        string memory status = statuses[_user];
        if(bytes(status).length==0){
            return "No Status";
        }else{
            return status;
        }
    }
}
