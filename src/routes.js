import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components';
import { Home, Movie } from './pages';

function RoutesApp() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/movie/:id' element={<Movie />} />
      </Routes>
    </BrowserRouter>
  );
}

export default RoutesApp;