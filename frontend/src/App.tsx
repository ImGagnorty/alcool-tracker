import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/authStore';
import Layout from './components/Layout';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Catalogue from './pages/Catalogue';
import Statistics from './pages/Statistics';
import Profile from './pages/Profile';
import Premium from './pages/Premium';
import Leaderboard from './pages/Leaderboard';
import Clans from './pages/Clans';
import ConsumptionHistory from './pages/ConsumptionHistory';

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { token, user } = useAuthStore();
  
  // If no token or user, redirect to login
  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Layout />
            </PrivateRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="catalogue" element={<Catalogue />} />
          <Route path="statistics" element={<Statistics />} />
          <Route path="profile" element={<Profile />} />
          <Route path="premium" element={<Premium />} />
          <Route path="leaderboard" element={<Leaderboard />} />
          <Route path="clans" element={<Clans />} />
          <Route path="history" element={<ConsumptionHistory />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

