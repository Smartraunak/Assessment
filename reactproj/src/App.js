import Header from './components/header';
import Footer from './components/footer';
import Home from './pages/home';
import Adminsdashboard from './pages/admindashboard';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
function App() {
  return (
    <div className="App">
      <Header />
      <BrowserRouter>
        <Routes>
          <Route
            path='/'
            element={
              <Adminsdashboard />
            }
          />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
