pragma solidity ^0.4.8;
import "./ValidatorSet.sol";
// Some addresses are admins.
// Admin can add or remove another admin or a validator.

contract AdminList is ValidatorSet {


	event Report(address indexed reporter, address indexed reported, bool indexed malicious);

	/// Admin status.
	mapping(address => bool) public isAdmin;

	// Mapping for validatorys
    mapping(address => bool) public isValidatory;

    // Mapping for pendingValidatorys
    mapping(address => uint) public pendingValidatorIndex
    address [] pendingValidatoryList;


	uint public lastTransitionBlock;
	/// Number of blocks at which the validators were changed.
	uint256 public transitionNonce;
	// Current list of addresses entitled to participate in the consensus.
	address[] public validatorsList;
	
    
	mapping(address => uint) validatorIndex;
	
	struct UserInfo {
	    string name;
	    string phone;
	    string socialUrl;
	    string deviceId;
	}
	
	mapping(address => UserInfo) userInfoMap;
	
	mapping(address => uint) voteCount;
	
	

	// Each validator is initially supported by all others.
	function AdminList() public {
		isAdmin[0xdEb917b2c11e37e37a80544D424ecf0E0ebA6eBe] = true;
		validatorsList.push(0xdEb917b2c11e37e37a80544D424ecf0E0ebA6eBe);

		for (uint i = 0; i < validatorsList.length; i++) {
			address validator = validatorsList[i];
			validatorIndex[validator] = i;
		}
		logTransition();
	}

	function getValidators() external view returns(address[]) {
		return validatorsList;
	}

	


	// ADMIN FUNCTIONS

	// Add a validator.
	function addValidator(address validator)  {
		validatorIndex[validator] = validatorsList.length;
		validatorsList.push(validator);
		logTransition();
	}


    function nominateValidator(address validator){
        // Check if the sender is already an validator
        require(!isValidator[validator].isValue);
        
    }


	// Remove a validator.
	function removeValidator(address validator) only_admin {
		uint removedIndex = validatorIndex[validator];
		// Can not remove the last validator.
		uint lastIndex = validatorsList.length -1;
		address lastValidator = validatorsList[lastIndex];
		// Override the removed validator with the last one.
		validatorsList[removedIndex] = lastValidator;
		// Update the index of the last validator.
		validatorIndex[lastValidator] = removedIndex;
		delete validatorsList[lastIndex];
		validatorsList.length--;
		// Reset validator status.
		validatorIndex[validator] = 0;
		logTransition();
	}

	// Add an admin.
	function addAdmin(address admin) only_admin {
		isAdmin[admin] = true;
	}

	// Remove an admin.
	function removeAdmin(address admin) only_admin {
		isAdmin[admin] = false;
	}

    // Fallback function throws when called.
	function () payable {
		revert();
	}
	
	function finalizeChange() external{
	    
	}

    function logTransition() private {
		emit InitiateChange(blockhash(block.number - 1), validatorsList);
	}


	// MISBEHAVIOUR HANDLING

	// Called when a validator should be removed.
	function reportMalicious(address validator, uint256 blockNumber, bytes proof)  external {
	emit Report(msg.sender, validator, true);
	}

	// Report that a validator has misbehaved in a benign way.
	function reportBenign(address validator, uint256 blockNumber)  external{
	emit Report(msg.sender, validator, false);
	}


	// MODIFIERS
	modifier only_admin() {
		if (!isAdmin[msg.sender]) revert();
		_;
	}

	modifier on_new_block() {
		if (block.number > lastTransitionBlock) _;
	}

    modifier only_validatory(){
        if(!isValidatory[msg.sender]) revert();
    }

}