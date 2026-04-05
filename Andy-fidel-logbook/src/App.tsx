import { Routes, Route } from 'react-router';
import { HomePage } from './pages/Homepage';
import { Header } from './pages/Header';
import './App.css'

function App() {

  return (
    <>
    <Routes>
      <Route index element={< HomePage />}/>
    </Routes>
    <Header />
    </>
  )
}

export default App
