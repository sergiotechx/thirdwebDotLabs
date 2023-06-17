
thirdweDotLabs
https://pad.riseup.net/p/dotlabs

Billetera:
https://metamask.io/
Añadir mumbai
https://chainlist.org/?testnets=true&search=polygon
Faucet Mumbai
https://mumbaifaucet.com/
Nodejs
https://nodejs.org/es

//////////////////////////Non code Signature Minting //////////////////////////////////////////////
https://www.freepik.com/
https://thirdweb.com/thirdweb.eth/SignatureDrop
npx create-next-app@latest

/////////////////////////Dapp con herramientas Thirdweb//////////////////////////////////////

Comandos para crear el contrato en Hardhat:

npx thirdweb create contract
Nombre del proyecto: MessageBlock
Framework de apoyo: hardhat
Nombre del contrato :Message

Código fuente del contrato

/*Message.sol */
/*
// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;

/**
 * @title Storage
 * @dev Store & retrieve value in a variable
 * @custom:dev-run-script ./scripts/deploy_with_ethers.ts
 */
contract Message {

    string message;


    function setMessage(string memory _message) public {
        message = _message;
    }

    /**
     * @dev Return value 
     * @return value of 'number'
     */
    function getMessage() public view returns ( string memory){
        return message;
    }
}
*/

Comandos para desplegar el contrato:

npx thirdweb build
npx thirdweb deploy
https://thirdweb.com/contracts/deploy/QmSNiKX7gJeuWjx9mwVB8EpsgJBthY1DiTY9TKNZrDbNDe
https://thirdweb.com/mumbai/0x2bA4B4F88BE07707e2349b1475b896F93DEEB57C

///////////////////////APP//////////////////////
Comandos para crear la dapp

npx thirdweb create app
MessageWeb

cd messageweb

Lista de cadenas activas
https://portal.thirdweb.com/react/react.thirdwebprovider#default-chains

Cambiar la cadena de etherum a la red de prueba de mumbai
pages/_app.js
7 const activeChain = "mumbai";

Código fuente index.js

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



)
