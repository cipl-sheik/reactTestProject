 import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import UserDetails from './components/UserDetails';
import axios from 'axios';
import { createRoot } from 'react-dom/client';
import PreviousAddress from './components/PreviousAddress';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
createRoot(document.getElementById('UserDetails')).render(<UserDetails />);

export default UserDetails;







