import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import EventDetail from './pages/EventDetail'

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} exact></Route>
          <Route path="/events/:id" element={<EventDetail />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;