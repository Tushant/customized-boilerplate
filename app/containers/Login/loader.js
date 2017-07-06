// import { errorLoading, getAsyncInjectors } from "utils/asyncInjectors";
//
// export default (store, cb) => {
//   const { injectReducer, injectSagas } = getAsyncInjectors(store);
//   const importModules = Promise.all([
//     import("./reducer"),
//     import("./sagas"),
//     import("./index")
//   ]);
//
//   importModules.then(([reducer, sagas, component]) => {
//     injectReducer("login", reducer.default);
//     injectSagas("loginSaga", sagas.default);
//
//     cb(component);
//   });
//
//   importModules.catch(errorLoading);
// };
