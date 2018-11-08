import { SHOW_POPUP } from '../actions/popup';

const initialState = {
  showPopup: false
};

export default function reducer(state = initialState, action) {
  if (action.type === SHOW_POPUP) {
    return Object.assign({}, state, {
      showPopup: !this.state.showPopup
    });
  }
  return state;
}
