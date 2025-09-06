import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import TestPage from './pages/TestPage';
import HomePage from './pages/HomePage';
import KakaoRedirect from './pages/KakaoRedirect'
import CreateRoom from './pages/CreateRoom';
import JoinRoom from './pages/JoinRoom';
import StockCard from './pages/StockCard';
import GameGuide from './pages/GameGuide';
import Lobby from './pages/Lobby';
import TeamLobby from './pages/TeamLobby';
import Rule from './pages/Rule';
import Invest from './pages/Invest';
import Lock from './pages/Lock';
import Result from './pages/Result';
import Final from './pages/Final';

function App() {
  return (
    <Routes>
      <Route path="*" element={<Navigate to="/" replace />} />
      <Route path="/test" element={<TestPage />} />
      <Route path="/" element={<HomePage />} />
      <Route path="/oauth/kakao" element={<KakaoRedirect />} />
      <Route path="/create-room" element={<CreateRoom />} />
      <Route path="/join-room" element={<JoinRoom />} />
      <Route path="/stock-card" element={<StockCard />} />
      <Route path="/game-guide" element={<GameGuide />} />
      <Route path="/lobby/:roomId" element={<Lobby />} />
      <Route path="/team-lobby/:roomId/:teamId" element={<TeamLobby />} />
      <Route path="/rule" element={<Rule />} />
      <Route path="/invest" element={<Invest />} />
      <Route path="/lock" element={<Lock />} />
      <Route path="/result" element={<Result />} />
      <Route path="/final" element={<Final />} />
    </Routes>
  );
}

export default App;
