import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Main from './pages/main';
import ParkingInfo from './pages/info';
import Filter from './pages/filter';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/info" element={<ParkingInfo />} />
                <Route path="/" element={<Main />} />
                <Route path="/filter" element={<Filter />} />
            </Routes>
        </Router>
    );
}

export default App;