import { API_BASE_URL } from '../config';

export const FETCH_QUESTIONS_REQUEST = 'FETCH_QUESTIONS_REQUEST';
export const fetchQuestionsRequest = () => {
  return {
    type: FETCH_QUESTIONS_REQUEST
  };
};

export const FETCH_QUESTIONS_SUCCESS = 'FETCH_QUESTIONS_SUCCESS';
export const fetchQuestionsSuccess = questions => {
  return {
    type: FETCH_QUESTIONS_SUCCESS,
    questions
  };
};

export const FETCH_QUESTIONS_ERROR = 'FETCH_QUESTIONS_ERROR';
export const fetchQuestionsError = error => {
  return {
    type: FETCH_QUESTIONS_ERROR,
    error
  };
};

export const fetchQuestions = () => dispatch => {
  dispatch(fetchQuestionsRequest());
  fetch(`${API_BASE_URL}/api/questions`)
    .then(res => res.json())
    .then(res => dispatch(fetchQuestionsSuccess(res)))
    .catch(err => dispatch(fetchQuestionsError(err)));
};
