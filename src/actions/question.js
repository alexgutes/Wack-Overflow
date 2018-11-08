import { API_BASE_URL } from '../config';

//GET single question
export const FETCH_SINGLE_QUESTION_REQUEST = 'FETCH_SINGLE_QUESTION_REQUEST';
export const fetchSingleQuestionRequest = () => {
  return {
    type: FETCH_SINGLE_QUESTION_REQUEST
  };
};

export const FETCH_SINGLE_QUESTION_SUCCESS = 'FETCH_SINGLE_QUESTION_SUCCESS';
export const fetchSingleQuestionSuccess = question => {
  return {
    type: FETCH_SINGLE_QUESTION_SUCCESS,
    question
  };
};

export const FETCH_SINGLE_QUESTION_ERROR = 'FETCH_SINGLE_QUESTION_ERROR';
export const fetchSingleQuestionError = error => {
  return {
    type: FETCH_SINGLE_QUESTION_ERROR,
    error
  };
};
export const fetchSingleQuestion = id => dispatch => {
  dispatch(fetchSingleQuestionRequest());
  fetch(`${API_BASE_URL}/questions/${id}`)
    .then(res => res.json())
    .then(res => dispatch(fetchSingleQuestionSuccess(res)))
    .catch(err => dispatch(fetchSingleQuestionError(err)));
};

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

//POST answer to question
export const POST_ANSWER_REQUEST = 'POST_ANSWER_REQUEST';
export const POST_ANSWER_SUCCESS = 'POST_ANSWER_SUCCESS';
export const POST_ANSWER_ERROR = 'POST_ANSWER_ERROR';

export const postAnswerRequest = () => {
  return {
    type: POST_ANSWER_REQUEST
  };
};

export const postAnswerSuccess = newAnswer => {
  return {
    type: POST_ANSWER_SUCCESS,
    newAnswer
  };
};

export const postAnswerError = error => {
  return {
    type: POST_QUESTION_ERROR,
    error
  };
};

export const postAnswer = (content, id) => (dispatch, getState) => {
  dispatch(postAnswerRequest());
  const authToken = getState().auth.authToken;
  return fetch(`${API_BASE_URL}/questions/answer/${id}`, {
    method: 'post',
    body: JSON.stringify({ content: content }),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`
    }
  })
    .then(res => res.json())
    .then(res => dispatch(postAnswerSuccess(res)))
    .catch(err => dispatch(postAnswerError(err)));
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
