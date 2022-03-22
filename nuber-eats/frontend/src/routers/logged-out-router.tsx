import { Routes, Route } from "react-router-dom";

import { CreateAccount } from "../pages/create-account";
import { Login } from "../pages/login";
import { NotFound } from "../pages/404";

export const LoggedOutRouter = () => {
  return (
    <Routes>
      <Route path="/create-account" element={<CreateAccount />} />
      <Route path="/" element={<Login />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}