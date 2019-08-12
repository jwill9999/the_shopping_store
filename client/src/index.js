import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { store, persistor } from './redux/store';
import * as serviceWorker from './serviceWorker';
import collectionsArray from "./pages/shop/shop.data";
import './index.css';
import App from './App';


/*********************************************************
 *  @description 
 *  connects redux store to App
 *  React router intergration
 *  Persists state with redux- persist 
 * 
 *  @params Provider - store
 *  @params PersistGate - persistor
 *********************************************************/

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <PersistGate persistor={persistor}>
                <App collectionsArray={collectionsArray} />
            </PersistGate>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);

serviceWorker.register();
