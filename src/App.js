import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./pages/homepage/Homepage";

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import AboutInStorePage from "./pages/about-instore-page/AboutInStorePage";
import ProfilePage from "./pages/profile-page/ProfilePage";
import PrivateRoutes from "./utils/PrivateRoutes";
import BrandDashboard from "./pages/branddashboard/BrandDashboard";
import AfterLoginPage from "./pages/AfterLoginPage";
import { Footer, Navbar } from "./common";
import MallHomePage from "./pages/mallhomepage/MallHomePage";
import CustomerDashboard from "./pages/customerdashboard/CustomerDashboard";
import CustomerHomePage from "./pages/CustomerHomePage";
import MallNearMeSing from "./pages/mallnearme/MallNearMeSing";

// const firebaseConfig = {
//   apiKey: "AIzaSyAE-ph5NvfT0S2LgYmL-QmCX6Y2pCPA6gA",
//   authDomain: "inapp-79f5f.firebaseapp.com",
//   projectId: "inapp-79f5f",
//   storageBucket: "inapp-79f5f.appspot.com",
//   messagingSenderId: "775372553139",
//   appId: "1:775372553139:web:eae2df6e867eabd62969c6",
//   measurementId: "G-FG67QKN4LZ",
// };

function App() {
  // const app = initializeApp(firebaseConfig);
  // const analytics = getAnalytics(app);
  return (
    <BrowserRouter basename="In-store-front">
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/about-instore" element={<AboutInStorePage />} />
        <Route path="/customer" element={<CustomerHomePage />} />
        <Route path="/retailer" element={<AfterLoginPage />} />
        <Route path="/mall" element={<MallHomePage />} />
        <Route element={<PrivateRoutes />}>
          <Route path="/profile-page" element={<ProfilePage />} />
          <Route path="/branddashboard" element={<BrandDashboard />} />
          <Route path="/customerdashboard" element={<CustomerDashboard />} />
          <Route path="/mallnearme" element={<MallNearMeSing />} />
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
