import React from 'react';
import './styles/styles';
import GrandOverlay from './components/GrandOverlay';
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from './store/store';

const App: React.FC = () => {

    return (
        <Provider store={store}>
            <BrowserRouter>
                <div className='text-stone-800 text-lg relative text-teko'>
                    <GrandOverlay />
                    <Header />
                    <Main />
                    <Footer />
                </div>
            </BrowserRouter>
        </Provider>
    )
}

export default App;