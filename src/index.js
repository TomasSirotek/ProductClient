
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import * as React from "react";
import {AuthProvider} from './context/AuthProvider';
import {BrowserRouter,Routes,Route} from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route path="/*" element={<App/>}/>
                </Routes>
            </AuthProvider>
        </BrowserRouter>

        {/* <BrowserRouter>
            <div>
                <h1>Hello, React Router!</h1>
                <Routes>
                    <Route path="/" element={<Home />} />
                </Routes>
            </div>
        </BrowserRouter> */}
    </React.StrictMode>
)




