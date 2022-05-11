import React, { useEffect, useState } from "react";
import { Container, Button, Menu, Icon } from "semantic-ui-react";
import detectEthereumProvider from "@metamask/detect-provider";
import Head from "next/head";
import * as ethers from "ethers";

import { Link } from "../routes";
import MainComponent from "../components/main-component";

const App = () => {
  const [account, setAccount] = useState();
  const [connected, setConnected] = useState(false);

  useEffect(async () => {
    await checkMetamask;

    // Check for changes in Metamask (account and chain)
    if (window.ethereum) {
      window.ethereum.on("chainChanged", () => {
        window.location.reload();
      });
      window.ethereum.on("accountsChanged", () => {
        window.location.reload();
      });
    }
  }, []);

  const checkMetamask = async () => {
    const provider = await detectEthereumProvider({ mustBeMetaMask: true });
    if (provider) {
      const chainId = await provider.request({
        method: "eth_chainId",
      });
      // Moonbase Alpha's chainId is 1287, which is 0x507 in hex
      if (chainId === "0x507") {
        const accounts = await ethereum.request({
          method: "eth_requestAccounts",
        });

        // Update State
        if (accounts) {
          setAccount(ethers.utils.getAddress(accounts[0]));
          setConnected(true);
        }
      } else {
        // Only Moonbase Alpha is Supported
        setAccount("Only Moonbase Alpha Supported");
      }
    } else {
      // MetaMask not detected
      setAccount("MetaMask not Detected");
    }
  };

  const onConnect = async () => {
    await checkMetamask();
  };

  return (
    <Container>
      <Head>
        <title>NFT dApp Example Blockdown 2022</title>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon.png" />
        <link
          rel="stylesheet"
          href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css"
        />
      </Head>
      <div style={{ paddingTop: "10px" }}></div>
      <Menu>
        <Link route="/">
          <a className="item">NFT dApp Example Blockdown 2022</a>
        </Link>
        <Menu.Menu position="right">
          <a className="item"> {account} </a>
          {connected ? (
            <Button floated="right" icon labelPosition="left" color="green">
              <Icon name="check"></Icon>
              Connected
            </Button>
          ) : (
            <Button floated="right" icon labelPosition="left" onClick={onConnect} primary>
              <Icon name="plus square"></Icon>
              Connect MetaMask
            </Button>
          )}
        </Menu.Menu>
      </Menu>
      <br />
      <h2>NFT dApp Example Blockdown 2022</h2>
      <p>
        Welcome to this amazing dApp. Check your NFTs or mint new ones!
        <br />
      </p>

      <MainComponent account={account} connected={connected} />
    </Container>
  );
};

export default App;
