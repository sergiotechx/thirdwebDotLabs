import { ConnectWallet } from "@thirdweb-dev/react";
import styles from "../styles/Home.module.css";
import { useState } from "react";
import { useAddress, useContract, useContractRead } from "@thirdweb-dev/react";

export default function Home() {
  
  const [hash, setHash] = useState();
  const [message, setMessage] = useState('');
  
  const { contract } = useContract('0x2bA4B4F88BE07707e2349b1475b896F93DEEB57C');
  const { data: messageHook, isLoading: loadingMessageHook } = useContractRead(contract, "getMessage");

  const setMessageBlock = async (event) => {
    event.preventDefault();
    const inputValue = event.target.parentNode;
    let inputText = inputValue.querySelector('input');
    const params = [inputText.value];
    const tx = await contract.call("setMessage", params);
    console.log(tx.receipt.transactionHash);
    setHash(tx.receipt.transactionHash);
  }

  const getMessageBlock = async (event) => {
    event.preventDefault();
    const params = [];
    const tx = await contract.call("getMessage", params);
    console.log(tx);
    setMessage(tx);
  }
  return (
    <>
      <div className={styles.connect}>
        <ConnectWallet />
      </div>
      
      <form>
        <label >Set Message</label>
        <input type="text" />
        <button onClick={setMessageBlock}>Set</button>
        <div>
          <p>El hash es:</p>
          <label>{hash}</label>
        </div>
      </form>
      
      <form>
        <label >Get Message:</label>
        <button onClick={getMessageBlock}>get</button>
        <div >
          <label>El mensaje es: </label>
          <label>{message}</label>
        </div>
      </form>
      
      <p>lectura usando hook</p>
      {loadingMessageHook?<p>loading</p>:<p>{messageHook}</p>}
    </>
  );
}
