import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import TestPage from './pages/TestPage';
import CreateRoom from './pages/CreateRoom';
import JoinRoom from './pages/JoinRoom';

function App() {
  return (
    <Routes>
      <Route path="*" element={<Navigate to="/" replace />} />
      <Route path="/test" element={<TestPage />} />
      <Route path="/create-room" element={<CreateRoom />} />
      <Route path="/join-room" element={<JoinRoom />} />
    </Routes>
  );
}

export default App;
