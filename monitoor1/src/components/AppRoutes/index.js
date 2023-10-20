import Private from "../../modules/Private";
import Home from "../../modules/Home";
import { Routes, Route } from "react-router-dom";
import Analytics from "../../modules/Analytics";
import Wallet from "../../modules/Wallet";
import Login from "../../modules/Login";
import Report from "../../modules/Report";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="analytics" element={<Analytics />} />
      <Route path="private" element={<Private />} />
      <Route path="menu" element={<Home />} />
      <Route path="menu/wallet" element={<Wallet/>} />
      <Route path="/" element={<Login />} />
      <Route path="report" element={<Report />} />
    </Routes>
  );
};

export default AppRoutes;
