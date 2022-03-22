import { Fragment } from "react";
import { Routes, Route } from 'react-router-dom'

import { useMe } from '../hooks/useMe'
import { Header } from "../components/header";

import { NotFound } from "../pages/404";
import { Restaurants } from "../pages/client/restaurants";
import { ConfirmEmail } from "../pages/user/confirm-email";
import { EditProfile } from "../pages/user/edit-profile";
import { Search } from "../pages/client/search";
import { Category } from "../pages/client/category";
import { Restaurant } from "../pages/client/restaurant";

const ClientRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Restaurants />} />
      <Route path="/confirm" element={<ConfirmEmail />} />
      <Route path="/edit-profile" element={<EditProfile />} />
      <Route path="/search" element={<Search />} />
      <Route path="/category/:slug" element={<Category />} />
      <Route path="/restaurants/:id" element={<Restaurant />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export const LoggedInRouter = () => {
  const { data, loading, error } = useMe();

  if (!data || loading || error) {
    return (
      <div className="h-screen flex justify-center items-center">
        <span className="font-medium text-xl tracking-wide">
          Loading...
        </span>
      </div>
    )
  }

  return (
    <Fragment>
      <Header />
      {data.me.role === 'Client' && <ClientRouter />}
    </Fragment>
  )
}