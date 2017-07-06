import conformsTo from "lodash/conformsTo";
import isEmpty from "lodash/isEmpty";
import isFunction from "lodash/isFunction";
import isObject from "lodash/isObject";
import isString from "lodash/isString";
import invariant from "invariant";
import warning from "warning";

import createReducer from "../reducers";

/**
 * Validate the shape of redux store
 */
export function checkStore(store) {
  const shape = {
    dispatch: isFunction,
    subscribe: isFunction,
    getState: isFunction,
    replaceReducer: isFunction,
    runSaga: isFunction,
    asyncReducers: isObject
  };
  invariant(
    conformsTo(store, shape),
    "(app/utils...) asyncInjectors: Expected a valid redux store"
  );
}

/**
 * Inject an asynchronously loaded reducer
 */
export function injectAsyncReducer(store, isValid) {
  return function injectReducer(name, asyncReducer) {
    if (!isValid) checkStore(store);

    invariant(
      isString(name) && !isEmpty(name) && isFunction(asyncReducer),
      "(app/utils...) injectAsyncReducer: Expected `asyncReducer` to be a reducer function"
    );

    if (Reflect.has(store.asyncReducers, name)) return;

    store.asyncReducers[name] = asyncReducer; // eslint-disable-line no-param-reassign
    store.replaceReducer(createReducer(store.asyncReducers));
  };
}

/**
 * Inject an asynchronously loaded saga
 */
export function injectAsyncSagas(store, isValid) {
  return function injectSagas(name, sagas) {
    if (!isValid) checkStore(store);
    if (store.asyncSagas[name]) {
      return;
    }
    invariant(
      Array.isArray(sagas),
      "(app/utils...) injectAsyncSagas: Expected `sagas` to be an array of generator functions"
    );

    warning(
      !isEmpty(sagas),
      "(app/utils...) injectAsyncSagas: Received an empty `sagas` array"
    );

    sagas.map(store.runSaga);
    store.asyncSagas[name] = sagas;
  };
}

/**
 * Helper for creating injectors
 */
export function getAsyncInjectors(store) {
  checkStore(store);

  return {
    injectReducer: injectAsyncReducer(store, true),
    injectSagas: injectAsyncSagas(store, true)
  };
}

/**
 * Helper to log an error when asynchronous loading fails.
 */
export function errorLoading(err) {
  if (process.env.NODE_ENV !== "production") {
    /* istanbul ignore next */
    console.error(
      "Error while loading or handling loaded components, sagas, or reducers\n",
      err
    ); // eslint-disable-line no-console
  }
}
