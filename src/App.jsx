import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import TestPage from './pages/TestPage';
import CreateRoom from './pages/CreateRoom';

function App() {
  return (
    <Routes>
      <Route path="*" element={<Navigate to="/" replace />} />
      <Route path="/test" element={<TestPage />} />
      <Route path="/create-room" element={<CreateRoom />} />
    </Routes>
  );
}

export default App;
