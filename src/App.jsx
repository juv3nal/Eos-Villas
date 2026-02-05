import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Destination from './pages/Destination'
import Destinations from './pages/Destinations'
import PropertyDetail from './pages/PropertyDetail'
import Search from './pages/Search'

function App() {
  return (
    <div className="app">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/destination/:area" element={<Destination />} />
          <Route path="/destinations" element={<Destinations />} />
          <Route path="/property/:id" element={<PropertyDetail />} />
          <Route path="/villa/:slug" element={<PropertyDetail />} />
          <Route path="/search" element={<Search />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
