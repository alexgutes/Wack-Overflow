import {
  FETCH_QUESTIONS_REQUEST,
  FETCH_QUESTIONS_ERROR,
  FETCH_QUESTIONS_SUCCESS
} from '../actions/question';

const initialState = {
  loading: false,
  questions: [],
  error: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_QUESTIONS_REQUEST:
      return Object.assign({}, state, { loading: true });

    case FETCH_QUESTIONS_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        error: null,
        questions: action.questions
      });

    case FETCH_QUESTIONS_ERROR:
      return Object.assign({}, state, {
        loading: false,
        error: action.error
      });

    default:
      return state;
  }
};
