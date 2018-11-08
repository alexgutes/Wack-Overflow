import {
  FETCH_QUESTIONS_REQUEST,
  FETCH_QUESTIONS_ERROR,
  FETCH_QUESTIONS_SUCCESS,
  POST_QUESTION_REQUEST,
  POST_QUESTION_SUCCESS,
  POST_QUESTION_ERROR,
  FETCH_SINGLE_QUESTION_REQUEST,
  FETCH_SINGLE_QUESTION_SUCCESS,
  FETCH_SINGLE_QUESTION_ERROR,
  POST_ANSWER_REQUEST,
  POST_ANSWER_SUCCESS,
  POST_ANSWER_ERROR
} from '../actions/question';

const initialState = {
  loading: false,
  questions: [],
  question: {},
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
    case FETCH_SINGLE_QUESTION_REQUEST:
      return Object.assign({}, state, { loading: true });

    case FETCH_SINGLE_QUESTION_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        error: null,
        question: action.question
      });

    case FETCH_SINGLE_QUESTION_ERROR:
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

    case POST_ANSWER_REQUEST:
      return Object.assign({}, state, { loading: true });

    case POST_ANSWER_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        error: null,
      });

    case POST_ANSWER_ERROR:
      return Object.assign({}, state, {
        loading: false,
        error: action.error
      });



    default:
      return state;
  }
};
