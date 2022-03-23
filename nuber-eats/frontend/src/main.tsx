import React from 'react'
import ReactDOM from 'react-dom'
import { ApolloProvider } from '@apollo/client'
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async'

import "./index.css";

import App from './components/app'
import { client } from './apollo'

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <HelmetProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </HelmetProvider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
