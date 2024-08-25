// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/dashboard'
import Header from './components/header'
import Footer from './components/footer';

function App() {
  return (
    <Router>
      <div className="flex-1">
        <Header /> 
        <main>
          <Routes>
            <Route path="/" element={<Dashboard />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;