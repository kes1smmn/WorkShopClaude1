import { Routes, Route } from 'react-router'
import Layout from './components/Layout'
import Home from './pages/Home'
import Upload from './pages/Upload'
import Status from './pages/Status'
import Tables from './pages/Tables'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/tables" element={<Tables />} />
        <Route path="/status" element={<Status />} />
      </Route>
    </Routes>
  )
}

export default App
