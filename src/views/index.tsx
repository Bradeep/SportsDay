import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Rentee from './rentee';
import { Rentor } from './rentor';
import { IntroPage } from './intro-page';

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                    <Route path="/" index element={<IntroPage />} />
                    <Route path="rentee" element={<Rentee />} />
                    <Route path="rentor" element={<Rentor />} />
                    {/* <Route path="*" element={<NoPage />} /> */}
            </Routes>
        </BrowserRouter>
    );
}

export { App }