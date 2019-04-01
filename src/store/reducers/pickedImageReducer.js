import {SET_PICKED_IMAGE,CLEAR_PICKED_IMAGE} from "../actions/actionTypes";


const pickedImageReducer = (state = null, action) => {
  switch (action.type) {

    case SET_PICKED_IMAGE:
      return action.payload;


    case CLEAR_PICKED_IMAGE:
      return null;

    default:
      return state;
  }
};

export default pickedImageReducer;