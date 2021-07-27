import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import { HomePage } from "./containers";

function App() {
  return (
    <Router>
      <Route path="*" component={HomePage} />
    </Router>
  );
}

export default App;
