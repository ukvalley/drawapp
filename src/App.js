import logo from './logo.svg';
import './App.css';

import Main from './components/Main/Main';
import CustomerMain from './components/CustomerMain/CustomerMain'

import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
       <Route path="/*" element={<Main />} />
        <Route path="/customer/*" element={<CustomerMain />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
