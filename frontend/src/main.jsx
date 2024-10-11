import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { Toaster } from './components/ui/sonner.jsx'
import { Provider } from 'react-redux'
import store from './redux/store.js'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'

const persistor = persistStore(store); //used to create a persistor object that manages the rehydration (loading the saved state) and persisting (saving the state) 

ReactDOM.createRoot(document.getElementById('root')).render( 
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App /> 
        <Toaster />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
);

//render: the root component (index.html file), provides better performance and features like concurrent rendering.
//Strict Mode:wrapper that helps identify potential problems. activates additional checks and warnings for its descendants, making it useful for development.
//Store: makes the Redux store available to any nested components that need to access the Redux state. The store contains your application's state and actions.
//PersistGate, will control the loading state of your application while the persisted state is being retrieved.
//'loading' prop can take any JSX to display while waiting for the state to load. Null indicate during loading nothing displayed or we can show loding indicator
//App: main application component that contains the rest of the React app's structure and logic.