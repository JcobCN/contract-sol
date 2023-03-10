pragma solidity ^0.4.24;

contract Test{

    address owner;
    bool unLock;
    string str;

    event LOG(string);

    constructor() public {
        owner = msg.sender;
        unLock = true;
    }

    modifier unLockMod(){
        require(unLock == true, "is LOCKED!!");
        _;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "You are not the owner");
        _;
    }

    function destroy() public onlyOwner{
        emit LOG("destroy contract");
        selfdestruct(msg.sender);
    }

    function setLock(bool l) public onlyOwner{
        unLock = l;
    }

    function set(string s) public unLockMod{
       str = s;
    }

    function get() public view unLockMod returns (string){
        return str;
    }

}
