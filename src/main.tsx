import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import NotePage from './notes/NotePage.tsx'
import NotesIndex from './notes/NotesIndex.tsx'
import CaseStudyPage from './portfolio/CaseStudyPage.tsx'
import PortfolioPage from './portfolio/PortfolioPage.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
        <Route path="/portfolio/p/:slug" element={<CaseStudyPage />} />
        <Route path="/portfolio/:filter" element={<PortfolioPage />} />
        <Route path="/notes" element={<NotesIndex />} />
        <Route path="/notes/:slug" element={<NotePage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
