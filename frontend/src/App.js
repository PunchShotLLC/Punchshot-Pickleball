import logo from './logo.svg';
import './App.css';
import {Main, About} from "./pages/about/about.js"
import Header from './components/header/header.js';
import { Home } from "./pages/home/home.js";


function App() {
  return (
    <div className="App">
      <About />
    </div>
  );
}

export default App;
