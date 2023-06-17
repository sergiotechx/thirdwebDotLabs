**textos colaborativos thirdweDotLabs** [https://pad.riseup.net/p/dotlabs](https://pad.riseup.net/p/dotlabs)

Antes de iniciar, instalar la billetera, anexar la red de prueba , tender fonds e instalar Node js

**Billetera:** [https://metamask.io/](https://metamask.io/) 

**Añadir mumbai** [https://chainlist.org/?testnets=true&search=polygon](https://chainlist.org/?testnets=true&search=polygon) 

**Faucet Mumbai** [https://mumbaifaucet.com/](https://mumbaifaucet.com/) 

**Nodejs** [https://nodejs.org/es](https://nodejs.org/es)

**//////////////////////////Non code Signature Minting //////////////////////////////////////////////**

**Muchas image tip NFT:**  [https://www.freepik.com/](https://www.freepik.com/) 

**signing nft minting:** [https://thirdweb.com/thirdweb.eth/SignatureDrop](https://thirdweb.com/thirdweb.eth/SignatureDrop) 

**Comando:** npx create-next-app@latest

**/////////////////////////Dapp con herramientas Thirdweb//////////////////////////////////////**

**Sección contrato**

_Comandos para crear el contrato en Hardhat:_

_**Comandos:**_

*   npx thirdweb create contract 
*   Nombre del proyecto: MessageBlock 
*   Framework de apoyo: hardhat 
*   Nombre del contrato :Message

_Código fuente del contrato_
```solidity
SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 \<0.9.0;


string message;

function setMessage(string memory message) public
{
  message = _message;
}

function getMessage() public view returns ( string memory)
{
 return message;
}  
```
_Comandos para desplegar el contrato:_

*   npx thirdweb build 
*   npx thirdweb deploy 

_Ejemplo del link que despliega_

[https://thirdweb.com/contracts/deploy/QmSNiKX7gJeuWjx9mwVB8EpsgJBthY1DiTY9TKNZrDbNDe](https://thirdweb.com/contracts/deploy/QmSNiKX7gJeuWjx9mwVB8EpsgJBthY1DiTY9TKNZrDbNDe)

_ejemplo de contrato desplegado_

 [https://thirdweb.com/mumbai/0x2bA4B4F88BE07707e2349b1475b896F93DEEB57C](https://thirdweb.com/mumbai/0x2bA4B4F88BE07707e2349b1475b896F93DEEB57C)

**Sección daap**

 Comandos para crear la dapp

*   npx thirdweb create app MessageWeb
*   cd messageweb

**Lista de cadenas activas** [https://portal.thirdweb.com/react/react.thirdwebprovider#default-chains](https://portal.thirdweb.com/react/react.thirdwebprovider#default-chains)

_Cambiar la cadena de etherum a la red de prueba de mumbai pages/\_app.js 7_ const activeChain = "mumbai";

Código fuente index.js
```react
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
```
