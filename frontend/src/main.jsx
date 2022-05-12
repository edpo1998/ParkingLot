
  
import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './routes/App';

import reducer from './reducers'
import {createStore, compose} from 'redux';

const initialState ={
  "user":{},
  "message_error":{}
}
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, initialState, composeEnhancers());

const rootElement = document.getElementById("root");

const root = ReactDOMClient.createRoot(rootElement);

root.render(
    <Provider store={store}>
      <App />
    </Provider>
  );


