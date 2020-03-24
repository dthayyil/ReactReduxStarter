import React from 'react';
import { Route } from 'react-router';
import './App.css';
import Layout from './components/Layout';
import Home from './components/home'

export default () => (
  <Layout>
      <Route exact path='/' component={Home} />    
  </Layout>
);
