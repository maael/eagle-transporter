import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import promise from 'redux-promise'
import createLogger from 'redux-logger'
import rootReducer from '../reducers'

export default function configureStore (initialState) {
  const logger = createLogger()
  const middleware = process.env.ENV === 'production'
    ? applyMiddleware(thunk, promise)
    : applyMiddleware(thunk, promise, logger)
  const store = createStore(
    rootReducer,
    initialState,
    middleware
  )

  return store
}
