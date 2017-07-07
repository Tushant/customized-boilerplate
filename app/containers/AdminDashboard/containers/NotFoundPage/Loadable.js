/**
 * Asynchronously loads the modules for HomePage
 */
import Loadable from "routing/Loadable";

export default Loadable({
  loader: () => import("./index")
});
