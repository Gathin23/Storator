import { useStoryContext } from "../../context/StoryContext";
import {
  useWeb3ModalProvider,
  useWeb3ModalAccount,
} from "@web3modal/ethers5/react";
import { abi } from "../../constants/abi";
import { ethers } from "ethers";
import { useState } from "react";

const Create = () => {
  const { story } = useStoryContext();
  const { walletProvider } = useWeb3ModalProvider();
  const [storylineOptions, setStorylineOptions] = useState({});
  let contract = null;
  let contractAddress = "0x64BF816c3b90861a489A8eDf3FEA277cE1Fa0E82";

  let prompt = `
  role : assume that you are the storyteller who tells interesting stories.
  initial part of the story: ${story}
  theme: fantasy
  Now provide four different ways in which the story could proceed.
  Give the output in json format with keys as option1 option2 option3 option4 with corresponding story progress.
  error correction1 : make sure each option does not exceed with 20 words
  error correction2 : only print the json output with no extra text.`;

  const generateStoryline = async () => {
    let provider = new ethers.providers.Web3Provider(walletProvider);
    let signer = provider.getSigner();
    contract = new ethers.Contract(contractAddress, abi, signer);
    let fee = await contract.estimateFee(11);
    console.log(story);
    let result = await contract.calculateAIResult(11, prompt, { value: fee });
    console.log(result);
  };

  const getStoryline = async () => {
    let provider = new ethers.providers.Web3Provider(walletProvider);
    let signer = provider.getSigner();
    contract = new ethers.Contract(contractAddress, abi, signer);
    let result = await contract.getAIResult(11, prompt);
    console.log(result);
    let startIndex = result.indexOf("{");
    let endIndex = result.lastIndexOf("}") + 1;
    let jsonResult = result.substring(startIndex, endIndex);
    let parsedResult = JSON.parse(jsonResult);
    setStorylineOptions(parsedResult);
  };

  return (
    <div className="flex flex-row">
      <div className="w-1/2">
        <div className="h-96 m-10 border-2 border-dashed">
          <span className="text-2xl text-white">{story}</span>
        </div>
        <button
          onClick={generateStoryline}
          className="mt-10 text-2xl ml-10 border-2 border-dashed rounded-full border-white text-white px-3 py-2 hover:border-dotted"
        >
          Generate Storyline
        </button>
        <button
          onClick={getStoryline}
          className="mt-10 text-2xl ml-10 border-2 border-dashed rounded-full border-white text-white px-3 py-2 hover:border-dotted"
        >
          Get Storyline
        </button>
      </div>
      <div className="w-1/2">
        <div className="h-32 m-10 border-2 border-dashed">
          <span className="text-lg text-white">
            {storylineOptions.option1}
          </span>
        </div>
        <div className="h-32 m-10 border-2 border-dashed">
          <span className="text-lg text-white">
            {storylineOptions.option2}
          </span>
        </div>
        <div className="h-32 m-10 border-2 border-dashed">
          <span className="text-lg text-white">
            {storylineOptions.option3}
          </span>
        </div>
        <div className="h-32 m-10 border-2 border-dashed">
          <span className="text-lg text-white">
            {storylineOptions.option4}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Create;
