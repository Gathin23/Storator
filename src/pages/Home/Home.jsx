import { useNavigate } from "react-router-dom";
import { useWeb3Modal, useWeb3ModalAccount } from "@web3modal/ethers5/react";

const Home = () => {
  const navigate = useNavigate();
  const { open } = useWeb3Modal();
  const {isConnected } = useWeb3ModalAccount();

  return (
    <div>
      {/* <div onClick={() => open()} className="flex justify-end mr-5 mt-5">
        <button className="border-2 border-dashed rounded-full border-black px-3 py-2 hover:border-solid">
          {isConnected ? "Connected" : "Connect Wallet"}
        </button>
      </div> */}
      <div className="flex flex-col mt-20">
        <span className="ml-10 text-9xl font-bold text-white">Storator</span>
        <span className="mt-5 ml-10 text-4xl text-white font-medium">
          Choose your genre, shape the plot, and mint unique NFTs.
        </span>
      </div>
      <button
        onClick={() => {
          if (isConnected) {
            navigate("/genre");
          } else {
            open();
          }
        }}
        className="mt-10 text-2xl ml-10 border-2 border-dashed rounded-full border-white text-white px-3 py-2 hover:border-dotted"
      >
        {isConnected ? "Get Started :-)" : "Connect Wallet"}
      </button>
    </div>
  );
};

export default Home;
