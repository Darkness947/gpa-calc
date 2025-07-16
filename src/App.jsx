import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import Home from '../pages/home';
import Calc from '../pages/calc';
import Contact from '../pages/contact';

function App() {
  return (
    <>
      <Router>
      <div className='d-flex flex-column min-vh-100 bg-dark text-white'>
      <Navbar />
      <div className='container flex-grow-1 mt-4'>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/calc" element={<Calc />} />
        <Route path="/contact" element={<Contact />} />
        {/* Add more routes as needed */}
      </Routes>
      </div>
      <Footer />
      </div>
    </Router>
    </>
  )
}

export default App
