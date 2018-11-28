const FETCH_QUESTION_SUCCESS = 'FETCH_QUESTION_SUCCESS';
const fetchQuestionSuccess = (question) => ({
  type: FETCH_QUESTION_SUCCESS,
  question,
})

const fetchQuestion = (token) => dispatch => {
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
      return dispatch(fetchQuestionSuccess);
    }).catch(err => {
      alert('Error returning a question');
    })
}