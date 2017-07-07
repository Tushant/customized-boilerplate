import { createSelector } from "reselect";

export const selectCloudinary = () => state =>
  state.getIn(["cloudinary", "cloudinary"]);
