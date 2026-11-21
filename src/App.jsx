import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';

import Invitation from './pages/Invitation';
import Admin from './pages/Admin';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/eli-will" replace />} />

        <Route path="/:slug" element={<Invitation />} />

        <Route path="/admin" element={<Admin />} />
      </Routes>
    </HashRouter>
  );
}

export default App;