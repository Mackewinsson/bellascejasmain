import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from './reducers'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
// Logger with default options
import logger from 'redux-logger'

const persistConfig = {
  key: 'persist-key',
  storage,
}
 
const persistedReducer = persistReducer(persistConfig, rootReducer)
const store = createStore(persistedReducer, applyMiddleware(logger,thunk))
const persistor = persistStore(store)
export default store
export {persistor}
