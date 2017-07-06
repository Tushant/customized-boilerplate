import { errorLoading, getAsyncInjectors } from "utils/asyncInjectors";

export default (store, cb) => {
  const { injectReducer, injectSagas } = getAsyncInjectors(store);
  const importModules = Promise.all([
    import("./reducer"),
    import("./sagas"),
    import("./index")
  ]);

  console.log('this is forgot password loader');

  importModules.then(([reducer, sagas, component]) => {
    injectReducer("forgotPassword", reducer.default);
    injectSagas("forgotSaga", sagas.default);

    cb(component);
  });

  importModules.catch(errorLoading);
};
