import './global.css';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import { Router } from './Routes';
import { AuthProvider } from './context/AuthProvider';

function App() {

  return (
    <AuthProvider>
      <HashRouter>
        <Router />
      </HashRouter>
    </AuthProvider>
  )
}

export default App
