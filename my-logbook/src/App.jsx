import { Routes, Route } from 'react-router';
import { HomePage } from './pages/HomePage';
import { VisitorPage } from './pages/VisitorPage';
import './App.css'

export function App() {

  return (
    <>
    <Routes>
      <Route index element={< HomePage />}/>
      <Route path='visitor' element={<VisitorPage />}/>
    </Routes>
    </>
  )
}

export default App
