import WalletCard from "../components/WalletCard";
import { useContext } from "react";
import { MainContext } from "../store";
import Item from "../components/Item";
import { Button } from "@mui/material";
import { useRouter } from "next/router";

export default function Wallet() {
  const { state, dispatch } = useContext(MainContext);
  const { contract } = state;
  const router = useRouter();
  const upgradeItem = async (itemID, busID) => {
    console.log(itemID, busID);
    await contract.methods
      .upgradeItem(itemID, busID)
      .send({ from: ethereum.selectedAddress })
      .on("receipt", (receipt) => {
        console.log(receipt);
      });
    window.location.href = "/wallet";
  };
  return (
    <div>
      <main>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            marginBottom: "2rem",
            border: "2px solid gold",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {state.UpgradeTable?.item && <Item item={state.UpgradeTable.item} />}
            {state.UpgradeTable?.scroll && <Item item={state.UpgradeTable.scroll} collectible />}
          </div>
          <div>
            <Button
              disabled={!state.UpgradeTable?.item && !state.UpgradeTable?.scroll}
              onClick={() => upgradeItem(state.UpgradeTable?.item.id, state.UpgradeTable?.scroll.id)}
            >
              Upgrade
            </Button>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          <WalletCard />
        </div>
      </main>
    </div>
  );
}
