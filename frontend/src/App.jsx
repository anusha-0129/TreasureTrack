import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import Signup from './components/Signup';
import Login from './components/Login';
import Sidebar from './components/Sidebar';
import Home from './components/Home';
import IncomeForm from './components/IncomeForm';
import ExpenseForm from './components/ExpenseForm';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css'; 
import Dashboard from './components/Dashboard';
import Logout from './components/Logout';
import Currency from './components/Currency';
import VoiceCommands from './components/VoiceCommands';
import { useSelector } from 'react-redux';
import { persistor } from './components/stores/store'
function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <>
      <BrowserRouter>
        <PersistGate loading={null} persistor={persistor}>
          <ToastContainer />
          <div className="app">
            {isAuthenticated && <Sidebar />}
            <div className="content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/income" element={<IncomeForm />} />
                <Route path="/expense" element={<ExpenseForm />} />
                <Route path="/dash" element={<Dashboard />}></Route>
                <Route path="/logout" element={<Logout />}></Route>
                <Route path="/currency" element={<Currency />}></Route>
                <Route path="/voice-commands" element={<VoiceCommands />}></Route>
              </Routes>
            </div>
          </div>
        </PersistGate>
      </BrowserRouter>
    </>
  );
}

export default App;
