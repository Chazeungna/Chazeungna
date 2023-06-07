import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Main from './pages/main';
import ParkingInfo from './pages/info';
import { RecoilRoot } from 'recoil';

function App() {
    return (
        <RecoilRoot>
            <Router>
                    <Routes>
                
                            <Route path="/info" element={<ParkingInfo />} />
                            <Route path="/" element={<Main />} />
                    </Routes>
                </Router>
        </RecoilRoot>
    );
}

export default App;