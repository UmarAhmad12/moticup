"use client";
import React from "react";
// import { BrowserRouter as Router } from "react-router-dom";
// import { Toaster } from "react-hot-toast";
// import { Provider } from "react-redux";
// import store from "./redux/store";
// import Navbar from "../components/navbar";
// import { Route, Routes, useLocation } from "react-router-dom";
// import Home from "./dashboard/page";
// import Index from "./assets/page";
// import Inspection from "./inspections/page";
// import CreateAssets from "./assets/create/page";
// import Machines from "./machines/page";
// import Client from "./clients/page";
// import Order from "./orders/page";


// import EditAssets from "./assetEdit/page";
import CreateInspection from "./inspections/page";

import Login from "./login/page";


function page() {
  return (
    <>
      {/* <Navbar /> */}
      <Login/>
      {/* <Toaster /> */}
      {/* <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />

          <Route exact path="/dashboard" element={<Home />} />

          <Route path="/assets">
            <Route index element={<Index />} />
            <Route path="create" element={<CreateAssets />} />
            <Route path=":id/edit" element={<EditAssets />} />
          </Route>

          <Route path="/inspection">
            <Route index element={<Inspection />} />
            <Route path="create" element={<CreateInspection />} />
            <Route path=":id/edit" element={<EditAssets />} />
          </Route>

          <Route path="/machines" element={<Machines />} />
          <Route path="/clients" element={<Client />} />
          <Route path="/orders" element={<Order />} />

          <Route path="/denied" element={<Denied />} />

          <Route path="/login" element={<Login />} />
        </Routes>
        <Toaster />
      </Router>
      </Provider> */}
    </>
  );
}

export default page;
