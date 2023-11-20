// index.js
import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import News from "./news";
import Nav from "./nav";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserInfo from "./userInfo";
import ForYou from "./forYou";
import MyComponent from './MyComponent';

const root = document.getElementById("root");
const reactRoot = createRoot(root);

reactRoot.render(
  <BrowserRouter>
    <Nav />
    <MyComponent />
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/" element={<News newsName="null" />} />
      <Route path="/Apple" element={<News newsName="iphone" />} />
      <Route path="/Tesla" element={<News newsName="tesla" />} />
      <Route path="/Bitcoin" element={<News newsName="bitcoin" />} />
      <Route path="/Nasa" element={<News newsName="nasa" />} />
      <Route path="/upsc" element={<News newsName="upsc" />} />
      <Route path="/userInfo" element={<UserInfo />} />
      <Route path="/forYou" element={<ForYou />} />
    </Routes>
  </BrowserRouter>
);