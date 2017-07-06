import { errorLoading, getAsyncInjectors } from "utils/asyncInjectors";

export default (store, cb) => {
  const { injectReducer, injectSagas } = getAsyncInjectors(store);
  const importModules = Promise.all([
    import("./reducer"),
    import("./sagas"),
    import("./index")
  ]);

  console.log('this is password reset loader');

  importModules.then(([reducer, sagas, component]) => {
    injectReducer("passwordReset", reducer.default);
    injectSagas("passwordResetSaga", sagas.default);

    cb(component);
  });

  importModules.catch(errorLoading);
};
