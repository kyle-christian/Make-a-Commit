import { BrowserRouter, Routes, Route } from 'react-router-dom'

// pages and components
import Home from './pages/Home'
import Profile from './pages/Profile'
import About from './pages/About'
import Tree from './pages/Tree'
import Navbar from './components/navbar'
import Footer from './components/footer'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route
              path="/"
              element={<Home />}
            />
            <Route
              path="/profile"
              element={<Profile />}
            />
            <Route
              path="/about"
              element={<About />}
            />
            <Route
              path="profile/tree/:id"
              element={<Tree />}
            />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App
