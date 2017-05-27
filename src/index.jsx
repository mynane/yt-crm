/**
 * @file index.jsx
 * @author deo
 *
 */
import React from 'react';
import ReactDOM from 'react-dom';
import FrameApp from 'freed-spa/lib/App';
import App from './App';
import reducers from './reducers';

ReactDOM.render(
    <FrameApp asyncReducers={reducers}>
        <App />
    </FrameApp>,
    document.getElementById('root')
);
