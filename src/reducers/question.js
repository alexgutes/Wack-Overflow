import {
  FETCH_QUESTIONS_REQUEST,
  FETCH_QUESTIONS_ERROR,
  FETCH_QUESTIONS_SUCCESS,
  POST_QUESTION_REQUEST,
  POST_QUESTION_SUCCESS,
  POST_QUESTION_ERROR
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

    case POST_QUESTION_REQUEST:
      return Object.assign({}, state, { loading: true });

    case POST_QUESTION_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        error: null,
        // ??
        question: [...state, action.newQuestion]
      });

    case POST_QUESTION_ERROR:
      return Object.assign({}, state, {
        loading: false,
        error: action.error
      });

    default:
      return state;
  }
};
