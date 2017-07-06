import { createSelector } from "reselect";

const selectFeatureState = state => state.get("featureReducer");

const selectFeatureById = (state, ownProps) =>
  state.get("_id") && state.get("_id");

const selectFeatures = () =>
  createSelector(selectFeatureState, featureState =>
    featureState.get("features")
  );

const selectFeaturesResponse = () =>
  createSelector(selectFeatureState, featureState =>
    featureState.get("response")
  );

const selectFeatureLoadingState = () =>
  createSelector(selectFeatureState, loadingState =>
    loadingState.get("requesting")
  );

const selectFeatureToEditById = () =>
  createSelector(
    selectFeatureState,
    selectFeatureById,
    (features, featureId) => {
      console.log("features", features, featureId);
    }
  );

export {
  selectFeatures,
  selectFeatureLoadingState,
  selectFeaturesResponse,
  selectFeatureById,
  selectFeatureToEditById
};
