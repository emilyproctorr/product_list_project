import logo from './logo.svg';
import './App.css';
import AppRoutes from './components/Router';
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <AppRoutes></AppRoutes>
      </Router>
    </div>
  );
}

export default App;
