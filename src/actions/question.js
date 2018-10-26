import { API_BASE_URL } from '../config';

//GET all
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
  fetch(`${API_BASE_URL}/questions`)
    .then(res => res.json())
    .then(res => dispatch(fetchQuestionsSuccess(res)))
    .catch(err => dispatch(fetchQuestionsError(err)));
};

//POST new question
export const POST_QUESTION_REQUEST = 'POST_QUESTION_REQUEST';
export const POST_QUESTION_SUCCESS = 'POST_QUESTION_SUCCESS';
export const POST_QUESTION_ERROR = 'POST_QUESTION_ERROR';

export const postQuestionRequest = () => {
  return {
    type: POST_QUESTION_REQUEST
  };
};

export const postQuestionSuccess = newQuestion => {
  return {
    type: POST_QUESTION_SUCCESS,
    newQuestion
  };
};

export const postQuestionError = error => {
  return {
    type: POST_QUESTION_ERROR,
    error
  };
};

export const postQuestion = (title, content) => (dispatch, getState) => {
  dispatch(postQuestionRequest());
  const authToken = getState().auth.authToken;

  return fetch(`${API_BASE_URL}/questions`, {
    method: 'post',
    body: JSON.stringify({
      title: title,
      content: content
    }),
    headers: {
      'Content-Type': 'application/json',

      Authorization: `Bearer ${authToken}`
    }
  })
    .then(res => res.json())
    .then(res => dispatch(postQuestionSuccess(res)))
    .catch(err => dispatch(postQuestionError(err)));
};
