import { memo } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header, Footer } from './components';
import { Home, Movie, Error } from './pages';

function RoutesApp() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/movie/:id' element={<Movie />} />
        <Route path='*' element={<Error />}/>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default memo(RoutesApp);