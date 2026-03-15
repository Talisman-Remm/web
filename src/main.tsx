import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { App, LanguageWrapper } from './App';
import LandingV2 from './components/LandingV2';
import LandingV3 from './components/LandingV3';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/en" replace />} />

        {/* V2 y V3 — antes del /:lang */}
        <Route path="/v2" element={<LandingV2 />} />
        <Route path="/v3" element={<LandingV3 />} />

        <Route path="/:lang" element={
          <LanguageWrapper>
            <App />
          </LanguageWrapper>
        } />

        <Route path="*" element={<Navigate to="/en" replace />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);