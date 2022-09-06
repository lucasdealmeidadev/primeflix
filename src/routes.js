import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Home, Movie } from './pages';

function RoutesApp() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home />}></Route>
                <Route path='/movie/:id' element={<Movie />} />
            </Routes>
        </BrowserRouter>
    );
}

export default RoutesApp;