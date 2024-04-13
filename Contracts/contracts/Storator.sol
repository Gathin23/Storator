// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "./interfaces/IAIOracle.sol";
import "./AIOracleCallbackReceiver.sol";

contract Storator is AIOracleCallbackReceiver {

    // Fixed model ID for AIOracle requests
    uint256 constant AIORACLE_MODEL_ID = 11;

    // Gas limit set on the callback from AIOracle
    uint64 public constant AIORACLE_CALLBACK_GAS_LIMIT = 5000000;

    // Status of OAO requests
    enum OAORequestStatus { NONEXISTENT, EXISTENT, DONE }

    // Mapping of request IDs to their status
    mapping(uint256 => OAORequestStatus) public oaoRequestsStatus;

    // Mapping of request IDs to their outputs
    mapping(uint256 => string) public outputs;

    // Mapping of inputs to request IDs
    mapping(string => uint256) public inputToRequestId;

    // Event emitted when prompts are updated
    event promptsUpdated(uint256 requestId, uint256 modelId, string input, string output, bytes callbackData);

    // Event emitted upon prompt request
    event promptRequest(uint256 requestId, address sender, uint256 modelId, string prompt);

    /**
     * @notice Initialize the contract, binding it to a specified AIOracle.
     * @param _aiOracle Address of the AIOracle contract
     */
    constructor(IAIOracle _aiOracle) AIOracleCallbackReceiver(_aiOracle) {}

    /**
     * @notice Request AIOracle with a given input string.
     * @param _input Input string for the AI model
     */
    function aiOracleRequest(string memory _input) internal {
        uint256 requestId = aiOracle.requestCallback{value: estimateFee()}(
            AIORACLE_MODEL_ID,
            bytes(_input),
            address(this),
            AIORACLE_CALLBACK_GAS_LIMIT,
            ""
        );
        oaoRequestsStatus[requestId] = OAORequestStatus.EXISTENT;
        inputToRequestId[_input] = requestId;
    }

    /**
     * @notice Callback function called by the AIOracle.
     * @param requestId ID of the request in OAO
     * @param output AI model's output
     * @param callbackData User-defined data
     */
    function aiOracleCallback(uint256 requestId, bytes calldata output, bytes calldata callbackData) external override onlyAIOracleCallback {
        require(oaoRequestsStatus[requestId] == OAORequestStatus.EXISTENT, "Request does not exist");
        // Convert bytes output to string
        string memory outputString = string(output);
        // Store output
        outputs[requestId] = outputString;
        oaoRequestsStatus[requestId] = OAORequestStatus.DONE;
        emit promptsUpdated(requestId, AIORACLE_MODEL_ID, "", outputString, callbackData);
    }

    /**
     * @notice Estimate the fee for the AIOracle request.
     * @return Fee estimate
     */
    function estimateFee() public view returns (uint256) {
        return aiOracle.estimateFee(AIORACLE_MODEL_ID, AIORACLE_CALLBACK_GAS_LIMIT);
    }

    /**
     * @notice Calculate AI result for a given prompt.
     * @param _prompt Input prompt for the AI model
     */
    function calculateAIResult(string calldata _prompt) external payable {
        aiOracleRequest(_prompt);
        emit promptRequest(1, msg.sender, AIORACLE_MODEL_ID, _prompt);
    }

    /**
     * @notice Fetch the output of a completed AIOracle request.
     * @param requestId ID of the completed request
     * @return Output of the AI model as a string
     */
    function fetchOutput(uint256 requestId) external view returns (string memory) {
        require(oaoRequestsStatus[requestId] == OAORequestStatus.DONE, "Request not completed");
        return outputs[requestId];
    }

    /**
     * @notice Get the request ID for a given input.
     * @param _input Input string for the AI model
     * @return Request ID corresponding to the input
     */
    function getRequestID(string calldata _input) external view returns (uint256) {
        return inputToRequestId[_input];
    }
}
