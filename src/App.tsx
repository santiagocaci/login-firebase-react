import { Routes, Route, Navigate } from 'react-router-dom';
import { Login, Home } from './components/index';
import { AuthProvider } from './context/AuthProvider';
import { Register } from './components/Register';
import { ProtectedRoute } from './components/ProtectedRoute';
import { ForgotPassword } from './components/ForgotPassword';

function App() {
  return (
    <div className='h-screen bg-gradient-to-b from-gray-800 to-gray-600 flex'>
      <AuthProvider>
        <Routes>
          <Route
            path='/'
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route path='login' element={<Login />} />
          <Route path='register' element={<Register />} />
          <Route path='forgot-password' element={<ForgotPassword />} />
          <Route path='/*' element={<Navigate to='/' />} />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
