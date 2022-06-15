import { Button, Paper, Stack, Typography } from "@mui/material";
import { ethers } from "ethers";
import React, { useEffect, useState, useContext } from "react";
import Web3 from "web3";
import { abi } from "../helpers/abi";
import { MainContext } from "../store";
import { setCollectibleNFTs } from "../store/actions/setCollectibleNFTs";
import { setItems } from "../store/actions/setItems";
import Item from "./Item";

const CONTRACT_ADDRESS = "0x7d9Ee515F294307a6c8ff3d448BEA453B2566b81";

const WalletCard = () => {
  const { state, dispatch } = useContext(MainContext);
  const [collectibleNFTs, setCollectibleList] = useState(null);
  const [contract, setContract] = useState(null);
  const [userNFTs, setNFTs] = useState(null);
  const web3 = new Web3("http://127.0.0.1:7545");
  const getItems = async () => {
    let nftList = [];
    let nftListT = [];
    let totalNFT = await contract.methods.totalNFT().call();
    let balance = await contract.methods.balanceOf(ethereum.selectedAddress).call();
    let nftArray = Array(Number(totalNFT)).fill(0);
    const a = await Promise.all(
      nftArray.map(async (_, index) => {
        let token;
        try {
          token = await contract.methods.ownerOf(index).call();
        } catch (err) {
          // console.log(err);
        }
        if (token != undefined && token.toLowerCase() === ethereum.selectedAddress) {
          nftList.push(index);
        }
      })
    );
    await Promise.all(
      nftList.map(async (nft, id) => {
        const data = await contract.methods.getTokenDetails(nft).call({ from: ethereum.selectedAddress });
        nftListT.push({ id, data });
      })
    );
    let collectibleList = {};
    nftListT.map((nft, id) => {
      if (nft.data.collectible && !collectibleList[nft.data.name]) {
        collectibleList = { ...collectibleList, [nft.data.name]: [nft] };
      } else if (nft.data.collectible) {
        collectibleList[nft.data.name].push(nft);
      }
    });
    setNFTs(nftListT);
    setCollectibleList(collectibleList);
    await setItems(dispatch, nftList);
    await setCollectibleNFTs(dispatch, collectibleList);
    return userNFTs;
  };
  useEffect(() => {
    if (web3) {
      let contractAbi = new web3.eth.Contract(abi, CONTRACT_ADDRESS);
      setContract(contractAbi);
      dispatch({ type: "SET_CONTRACT", payload: contractAbi });
    }
  }, []);
  useEffect(() => {
    contract && getItems();
  }, [contract]);
  return (
    <div style={{ display: "flex", height: 200 }}>
      {console.log({ state })}
      {userNFTs &&
        userNFTs
          .filter((i) => (state?.UpgradeTable?.item ? i.id !== state?.UpgradeTable?.item.id : i))
          .map((nft, id) => {
            if (!nft.data.collectible) return <Item key={id} item={nft} />;
          })}
      {collectibleNFTs &&
        Object.keys(collectibleNFTs).map((name, id) => {
          return (
            <Item
              key={id}
              collectible
              item={{
                data: {
                  name,
                  count: state?.UpgradeTable?.scroll ? collectibleNFTs[name].length - 1 : collectibleNFTs[name].length,
                  idList: collectibleNFTs[name]
                    .filter((i) => (state?.UpgradeTable?.scroll ? i.id !== state?.UpgradeTable?.scroll : i))
                    .map((b) => b),
                },
              }}
            />
          );
        })}
    </div>
  );
};

export default WalletCard;
