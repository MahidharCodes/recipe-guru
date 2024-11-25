import AppRoutes from './routes/AppRoutes';
import { UserProvider } from './context/UserContext';
import './App.css';
import NavBar from './components/NavBar';

function App() {
  return (
    <UserProvider>
      <div className="app">
        <NavBar />
        <AppRoutes />
      </div>
    </UserProvider>
  );
}

export default App;