import { FETCH_DOCUMENTS } from "../../constants";

const initalState = [];

export default (state = initalState, action) => {
  switch (action.type) {
    case FETCH_DOCUMENTS:
      return action.payload;

    default:
      return state;
  }
};
