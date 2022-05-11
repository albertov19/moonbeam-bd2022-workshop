import React, { useState, useEffect } from "react";
import { Button, Form, Grid, Icon, Card, GridColumn } from "semantic-ui-react";
import ContractInstance from "../ethereum/contract";
import { contract } from "../address.json";

export function MainComponent(props) {
  //State Variables
  const [balance, setBalance] = useState(0);
  const [tokenIDs, setTokenIDs] = useState([]);
  const [tokenURIs, setTokenURIs] = useState([]);
  const [contractInstance] = useState(ContractInstance(contract));
  const [loading, setLoading] = useState(false);

  // On Page Load
  useEffect(async () => {
    if (props.account) {
      //Check Balance
      await checkBalance();
    }
  }, [props]);

  const checkBalance = async () => {
    if (contractInstance) {
      // Get Balance
      setBalance(await contractInstance.balanceOf(props.account));

      //Get IDs from Owner
      let tempOwner;
      let tempTokenIDs = Array();
      let tempTokenURIs = Array();
      let totalSupply = await contractInstance._tokenIdCounter();

      // Get the token IDs and URIs associated with the address
      for (let i = 0; i < totalSupply; i++) {
        tempOwner = await contractInstance.ownerOf(i);
        if (props.account === tempOwner) {
          tempTokenIDs.push(i);
          tempTokenURIs.push(await contractInstance.tokenURI(i));
        }
      }
      setTokenIDs(tempTokenIDs);
      setTokenURIs(tempTokenURIs);
    }
  };

  // Render each NFT
  const getElement = (tokenID, index) => {
    let image = tokenURIs[index];
    let header = "Token ID #" + tokenID.toString();

    return (
      <Card
        image={
          <center>
            <img src={"https://ipfs.infura.io/ipfs/" + image} width="80%" align="middle" />
          </center>
        }
        header={header}
      />
    );
  };

  const renderNFTs = () => {
    if (balance > 0 && tokenIDs) {
      return tokenIDs.map((tokenID, index) => {
        return <GridColumn key={index}>{getElement(tokenID, index)}</GridColumn>;
      });
    }
  };

  // Handle Mint Button
  const handleSubmit = async () => {
    if (props.account) {
      setLoading(true);
      try {
        // Get Current Amount of NFTs
        const totalNFTs = await contractInstance._tokenIdCounter();

        // Get IPFShash to mint
        let mintHash;
        console.log(totalNFTs.mod(9).toString());
        switch (totalNFTs.mod(9).toString()) {
          case "0":
            mintHash = "QmPD4U4ywae7hVc8WYgJuwRAxhzAc8F7pBfmrjFhFEwxW3";
            break;
          case "1":
            mintHash = "QmXUn3dqpu1cXMD1dZMUyeRbh9AwBfqPCvNd6TRMhjHq49";
            break;
          case "2":
            mintHash = "QmaNe2uprzPckMLBzJqEVH7W1MtGJs6Z8JWBebbhwu7yNi";
            break;
          case "3":
            mintHash = "QmWSzQZtWotRg35FtbjxZg5JPMMqUat9yE3CwEuc9yKyRM";
            break;
          case "4":
            mintHash = "QmbJS29Hby3PK5u8dr5Y6kvYEL8nai5d5ZqZGWLBoFGCyj";
            break;
          case "5":
            mintHash = "QmTHNfQ1rfHWAiB7DWu79Ap7iP4rdvAzfm3oupLPx1Nurc";
            break;
          case "6":
            mintHash = "QmdB9RoWr2gyZzdgXGsqu5CRMcQDVh3VWNayMRwa7rEzav";
            break;
          case "7":
            mintHash = "QmdKTuD1aWRKqDszRqMkxCLyrdK8rFTDhAoJXm38LJkyhM";
            break;
          case "8":
            mintHash = "QmUaKLbdK2UC1aozFGBFwjk2SakdU25dpHjt68dhZ8yQ38";
            break;
          default:
            console.error("TERRIBLE ERROR -> RUN!!");
            setLoading(false);
            break;
        }
        // Mint NFT
        let tx = await contractInstance.safeMint(props.account, mintHash);
        await tx.wait();
      } catch (e) {
        console.error(e.message);
        setLoading(false);
        return;
      }

      // After Minting, Update Balance and Grid
      await checkBalance();
      renderNFTs();
      setLoading(false);
    }
  };

  return (
    <div>
      <h3>Your Current NFTs</h3>
      <p>You have a total of {balance.toLocaleString()} NFTs</p>
      <br />
      <Grid columns={3}>{renderNFTs()}</Grid>
      <br />
      <Form onSubmit={handleSubmit}>
        <Grid>
          <Grid.Column width={5} verticalAlign="middle">
            <Button
              type="submit"
              as="div"
              disabled={!(props.connected && props.account && !loading)}
              labelPosition="right"
              fluid
            >
              <Button primary loading={loading} fluid>
                <Icon name="external alternate" />
                Mint NFT
              </Button>
            </Button>
          </Grid.Column>
        </Grid>
      </Form>
    </div>
  );
}

export default MainComponent;
