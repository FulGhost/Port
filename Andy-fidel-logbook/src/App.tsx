import { Routes, Route } from 'react-router';
import { HomePage } from './pages/Homepage';
import './App.css'

export function App() {

  return (
    <>
    <Routes>
      <Route index element={< HomePage />}/>
    </Routes>
    </>
  )
}

export default App
