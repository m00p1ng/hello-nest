import { Fragment } from "react";
import { Routes, Route } from 'react-router-dom'

import { Restaurants } from "../pages/client/restaurants";
import { useMe } from '../hooks/useMe'
import { Header } from "../components/header";

const ClientRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Restaurants />} />
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