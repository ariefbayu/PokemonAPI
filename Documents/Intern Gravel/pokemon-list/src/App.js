import logo from './logo.svg';
import './App.css';
import React, {lazy} from "react";
// import { Routes as Switch, Route, Navigate} from "react-router-dom";
import { BrowserRouter as Router,Routes, Route, Link } from 'react-router-dom';

const Home = lazy(() => import("./pages/PokemonList"));

function App() {
  return (
    <Router>
        <Routes>
              <Route exact path='/' element={< Home />}></Route>
      </Routes>
    </Router>

  );
}

export default App;
