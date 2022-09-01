import { useState } from "react";
import { useMoralis } from "react-moralis";
import { getMarketplaceAddress } from "constant/constant";
import { approveNFTcontract, listOnMarketPlace } from "helpers/contractCall/writeCall";
import { checkNftApproval } from "helpers/contractCall/readCall";
import { useMoralisDb } from "hooks/useMoralisDb";
import { Modal, Button, Spin, Input } from "antd";

const SellNftModal = ({ nftToSell, setVisibility, visible }) => {
  const { account } = useMoralis();
  const { addItemImage, saveMarketItemInDB } = useMoralisDb();
  const [price, setPrice] = useState(0);
  const [loading, setLoading] = useState(false);
  const marketAddress = getMarketplaceAddress();

  const list = async (nft, listPrice) => {
    setLoading(true);
    try {
      const approval = await checkNftApproval(account);
      if (!approval) {
        await approveNFTcontract(nft.token_address, marketAddress);
      }
      const res = await listOnMarketPlace(nft, listPrice, marketAddress);
      if (res.success === true) {
        setVisibility(false);
        addItemImage(nftToSell);
        saveMarketItemInDB(nft, listPrice, res.data);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <Modal
      title={`List "${nftToSell?.name} #${nftToSell?.token_id}" For Sale`}
      visible={visible}
      onCancel={() => setVisibility(false)}
      onOk={() => list(nftToSell, price)}
      okText="List"
      footer={[
        <Button onClick={() => setVisibility(false)}>Cancel</Button>,
        <Button onClick={() => list(nftToSell, price)} type="primary">
          Sell
        </Button>,
      ]}
    >
      <Spin spinning={loading}>
        <img
          src={`${nftToSell?.image}`}
          alt=""
          style={{
            width: "250px",
            height: "250px",
            margin: "auto",
            borderRadius: "10px",
            marginBottom: "15px",
          }}
        />
        <label style={{ color: "white" }}>Set the price in CRO:</label>
        <Input autoFocus onChange={(e) => setPrice(e.target.value)} />
      </Spin>
    </Modal>
  );
};

export default SellNftModal;