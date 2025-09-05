import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import TestPage from './pages/TestPage';
import HomePage from './pages/HomePage';
import CreateRoom from './pages/CreateRoom';
import JoinRoom from './pages/JoinRoom';
import StockCard from './pages/StockCard';
import GameGuide from './pages/GameGuide';

function App() {
  return (
    <Routes>
      <Route path="*" element={<Navigate to="/" replace />} />
      <Route path="/test" element={<TestPage />} />
      <Route path="/" element={<HomePage />} />
      <Route path="/create-room" element={<CreateRoom />} />
      <Route path="/join-room" element={<JoinRoom />} />
      <Route path="/stock-card" element={<StockCard />} />
      <Route path="/game-guide" element={<GameGuide />} />
    </Routes>
  );
}

export default App;
