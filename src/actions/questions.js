import {API_BASE_URL} from '../config';

export const FETCH_QUESTION_SUCCESS = 'FETCH_QUESTION_SUCCESS';
export const fetchQuestionSuccess = (question) => ({
  type: FETCH_QUESTION_SUCCESS,
  question,
})

export const NEW_GUESS = 'NEW_GUESS';
export const newGuess = (guess) => ({
  type: NEW_GUESS,
  guess
})

export const fetchQuestion = (token) => dispatch => {
  return (
    fetch(`${API_BASE_URL}/api/questions`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    }).then(response => {
      return response.json();
    }).then(data => {
      console.log(data);
      return dispatch(fetchQuestionSuccess(data));
    }).catch(err => {
      alert('Error returning a question');
    })
  )
}

export const ANSWERED_CORRECTLY = 'ANSWERED_CORRECTLY';
export const answeredCorrectly = {
  type: ANSWERED_CORRECTLY
}

export const ANSWERED_INCORRECTLY = 'ANSWERED_INCORRECTLY';
export const answeredIncorrectly = {
  type: ANSWERED_INCORRECTLY
}

export const GUESS_SENT = 'GUESS_SENT';
export const guessSent = (guess, question, token) => (dispatch, getState) => {
  if(guess === question.answer) {
    dispatch(answeredCorrectly);
    console.log('sent to mlab, correct');
    fetch(`${API_BASE_URL}/api/questions`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        'numberOfSuccesses': getState().question.currentQuestion.numberOfSuccesses,
        'numberOfAttempts': getState().question.currentQuestion.numberOfAttempts,
        'memoryStrength': getState().question.currentQuestion.memoryStrength,
      })
    }).catch(err => {
      alert('There has been an error');
    })
  } else {
    dispatch(answeredIncorrectly);
    console.log('sent to mlab, wrong');
    fetch(`${API_BASE_URL}/api/questions`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        'numberOfSuccesses': getState().question.currentQuestion.numberOfSuccesses,
        'numberOfAttempts': getState().question.currentQuestion.numberOfAttempts,
        'memoryStrength': getState().question.currentQuestion.memoryStrength,
      })
    }).catch(err => {
      alert('There has been an error');
    })
  }
}