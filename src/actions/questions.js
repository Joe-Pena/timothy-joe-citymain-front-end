import {API_BASE_URL} from '../config';

export const GET_PROGRESS = 'GET_PROGRESS';
export const getProgress = () => ({
  type: GET_PROGRESS,
});

export const FETCH_QUESTION_SUCCESS = 'FETCH_QUESTION_SUCCESS';
export const fetchQuestionSuccess = (question) => ({
  type: FETCH_QUESTION_SUCCESS,
  question,
});

export const FETCH_STATS_SUCCESS = 'FETCH_STATS_SUCCESS';
export const fetchStatsSuccess = (stats) => ({
  type: FETCH_STATS_SUCCESS,
  stats,
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
      return dispatch(fetchQuestionSuccess(data));
    }).catch(err => {
      alert('Error returning a question');
    })
  )
}

export const answeredQuestion = (answeredCorrectly) => (dispatch, getState) => {
  const token = getState().auth.authToken;
  // dispatch(answeredCorrectly);

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

export const fetchStats = () => (dispatch, getState) => {
  const token = getState().auth.authToken;

  return (
    fetch(`${API_BASE_URL}/api/stats`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    }).then(response => {
      return response.json();
    }).then(data => {
      return dispatch(fetchStatsSuccess(data));
    }).catch(err => {
      alert('Error returning stats');
    })
  )
}