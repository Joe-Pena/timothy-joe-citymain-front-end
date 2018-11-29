import {API_BASE_URL} from '../config';

export const FETCH_QUESTION_SUCCESS = 'FETCH_QUESTION_SUCCESS';
export const fetchQuestionSuccess = (question) => ({
  type: FETCH_QUESTION_SUCCESS,
  question,
});

export const fetchQuestion = () => (dispatch, getState) => {
  const token = getState().auth.authToken;
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

export const answeredQuestion = (answeredCorrectly) => (dispatch, getState) => {
  const token = getState().auth.authToken;
  // dispatch(answeredCorrectly);

  console.log('sent to mlab, correct');
  fetch(`${API_BASE_URL}/api/questions`, 
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ answeredCorrectly })
    }
  )
  .catch(err => {
    alert('There has been an error');
  });
};