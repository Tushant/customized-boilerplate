import {
  LOAD_FEATURES,
  LOAD_FEATURES_SUCCESS,
  LOAD_FEATURES_FAILURE,
  LIST_FEATURE,
  LIST_FEATURE_SUCCESS,
  LIST_FEATURE_FAILURE,
  EDIT_FEATURE,
  EDIT_FEATURE_SUCCESS,
  EDIT_FEATURE_FAILURE
} from "./constants";

import action from "utils/action";

export const getFeatures = action(LOAD_FEATURES);
export const featuresLoaded = action(LOAD_FEATURES_SUCCESS, "features");
export const featuresLoadingError = action(LOAD_FEATURES_FAILURE, "error");

export const listFeature = action(LIST_FEATURE, "features", "feature_type");
export const featureListed = action(
  LIST_FEATURE_SUCCESS,
  "response",
  "features"
);
export const featureListingError = action(LIST_FEATURE_FAILURE, "error");

export const editFeature = action(EDIT_FEATURE, "features", "feature_type");
export const featureEdited = action(
  EDIT_FEATURE_SUCCESS,
  "response",
  "features"
);
export const featureEditingError = action(EDIT_FEATURE_FAILURE, "error");
