import { Routes, Route, Navigate } from 'react-router-dom';
import TestPage from './pages/TestPage';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="*" element={<Navigate to="/" replace />} />
      <Route path="/test" element={<TestPage />} />
    </Routes>
  );
}

export default App;
