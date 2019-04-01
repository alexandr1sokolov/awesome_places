import {SET_PICKED_IMAGE, CLEAR_PICKED_IMAGE} from "./actionTypes";

export const setPickedImage = (pickedImage) => {
  return {
    type: SET_PICKED_IMAGE,
    payload: pickedImage
  };
};

export const clearPickedImage = () => {
  return {
    type: CLEAR_PICKED_IMAGE,

  };
};