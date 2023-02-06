
import React from 'react'
import { Route, Routes } from "react-router-dom";
import Home from './pages/home/Home';
import LoginPage from './pages/loginPage';

function Router() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </>
  );
}

export default Router