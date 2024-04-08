import { useStoryContext } from "../../context/StoryContext";
import {
  useWeb3ModalProvider,
  useWeb3ModalAccount,
} from "@web3modal/ethers5/react";
import { abi } from "../../constants/abi";
import { ethers } from "ethers";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const { story, setStory } = useStoryContext();
  const { walletProvider } = useWeb3ModalProvider();
  const navigate = useNavigate();
  const [storylineOptions, setStorylineOptions] = useState({});
  let contract = null;
  let contractAddress = "0x64BF816c3b90861a489A8eDf3FEA277cE1Fa0E82";

  let prompt = `
  Role : Assume that you are the storyteller who tells interesting stories.
  For the given story beginning give four possible ways the story could continue with each option under 20 words as output in json format with keys as option1 option2 option3 option4 with corresponding story continuation.
  Story beginning : ${story}
  Theme: fantasy
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
    console.log(parsedResult);
    setStorylineOptions(parsedResult);
  };

  const handleStorylineClick = (storyline) => {
    if(storyline === undefined) return;
    const finalStory = story.concat(" ", storyline);
    setStory(finalStory);
    setStorylineOptions({});
  };

  return (
    <div className="flex flex-row">
      <div className="w-1/2">
        <div className="h-auto m-10 border-2 border-dashed">
          <div className="m-4">
            <span className="text-xl text-white">
              {story}
            </span>
          </div>
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
        <div
          onClick={() => handleStorylineClick(storylineOptions.option1)}
          className="h-32 m-10 border-2 border-dashed"
        >
          <div className="m-4">
            <span className="text-lg text-white">
              {storylineOptions.option1}
            </span>
          </div>
        </div>
        <div
          onClick={() => handleStorylineClick(storylineOptions.option1)}
          className="h-32 m-10 border-2 border-dashed"
        >
          <div className="m-4">
            <span className="text-lg text-white">
              {storylineOptions.option2}
            </span>
          </div>
        </div>
        <div
          onClick={() => handleStorylineClick(storylineOptions.option1)}
          className="h-32 m-10 border-2 border-dashed"
        >
          <div className="m-4">
            <span className="text-lg text-white">
              {storylineOptions.option2}
            </span>
          </div>
        </div>
        <div
          onClick={() => handleStorylineClick(storylineOptions.option1)}
          className="h-32 m-10 border-2 border-dashed"
        >
          <div className="m-4">
            <span className="text-lg text-white">
              {storylineOptions.option4}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Create;
