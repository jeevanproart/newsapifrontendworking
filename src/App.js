import React from 'react';
import './App.css'; // Import your CSS styles if needed
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import News from './News';
import Nav from './Nav';
import LoginPage from './LoginPage'; 
import RegisterPage from './RegisterPage';
import MyComponent from './MyComponent'; // Import MyComponent

function App() {
  return (
    <>
      <BrowserRouter>
        <div className="App">
          <Nav />
          <MyComponent />
          <MyComponent /> {/* Use MyComponent */}
          <Switch>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/Apple" element={<News newsName="iphone" />} />
            <Route path="/Tesla" element={<News newsName="tesla" />} />
            <Route path="/Bitcoin" element={<News newsName="bitcoin" />} />
            <Route path="/Nasa" element={<News newsName="nasa" />} />
            <Route path="/upsc" element={<News newsName="upsc" />} />
          </Switch>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;


