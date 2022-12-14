import React from "react";
import MenuItems from "./MenuItems";
import { Account } from "../Account";
import logo from "../../assets/logo.png";
import { Header } from "antd/lib/layout/layout";

const styles = {
  header: {
    zIndex: 1,
    width: "100%",
    backgroundColor: "transparent",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 10px",
    boxShadow: "0 1px 10px rgb(151 164 175 / 10%)",
  },
  headerRight: {
    display: "flex",
    gap: "10px",
    alignItems: "center",
    paddingRight: "10px",
    fontSize: "15px",
    fontWeight: "600",
  },
} as const;

const CustomHeader: React.FC = () => {
  return (
    <Header style={styles.header}>
      <Logo />
      <MenuItems />
      <div style={styles.headerRight}>
        <Account />
      </div>
    </Header>
  );
};

// export const Logo = () => <img src={logo} alt="ultranova_logo" width="200px" />;

export const Logo = () => (
  <div style={{ paddingTop: "90px" }}>
    <img src={logo} alt="ultranova_logo" width="220px" />;
  </div>
);
export default CustomHeader;
