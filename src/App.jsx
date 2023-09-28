import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Search from "./pages/Search"
import Data from "./pages/Data"
import "./App.css"

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/data" element={<Data />} />
      </Routes>
    </>
  )
}

export default App
