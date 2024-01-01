import { legacy_createStore as createStore,applyMiddleware } from 'redux';
import pokemonReducer from './reducers/pokemonReducer';
import createSagaMiddleware from "redux-saga"
import pokemonSaga from './effects/pokemonSaga';

// Create middleware
const sagaMiddleware = createSagaMiddleware();


export const store =createStore(pokemonReducer,applyMiddleware(sagaMiddleware))


sagaMiddleware.run(pokemonSaga)




