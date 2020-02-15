import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Join from './components/Join/Join';
import Chat from './components/Chat/Chat';


const App = () => (
  // when users visit app, greet with / login page and get redirected to chat
  <Router>
    <Route path='/' exact component={Join} />
    <Route path='/chat' component={Chat} />
  </Router>
);

export default App;
