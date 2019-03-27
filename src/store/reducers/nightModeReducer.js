import {NIGHT_MODE_TOGGLE} from "../actions/actionTypes";

const dayMode = {background : "#ffffff", textColor:"#000000"};
const nightMode = {background : "#1c1c1c", textColor:"#9b9b9b"};

const NightModeToggleReducer = (state = dayMode, action) => {
  switch (action.type) {
    case NIGHT_MODE_TOGGLE:
      return state === dayMode ? nightMode: dayMode;

    default:
      return state;
  }
};

export default NightModeToggleReducer;