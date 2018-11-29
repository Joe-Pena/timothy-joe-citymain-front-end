import { FETCH_QUESTION_SUCCESS, GET_PROGRESS, FETCH_STATS_SUCCESS } from '../actions/questions';

const initialState = {
  question: null,
  answer: null,
  checkProgress: false,
  stats: [],
}

const questionsReducer = (state = initialState, action) => {
  if(action.type === FETCH_QUESTION_SUCCESS) {

    const { question, answer } = action.question;

    return {
      ...state,
      question,
      answer
    };   
  } else if(action.type === GET_PROGRESS) {
    return Object.assign({}, state, {
      checkProgress: !state.checkProgress
    })
  } else if(action.type === FETCH_STATS_SUCCESS) {
    return Object.assign({}, state, {
      stats: action.stats,
    })
  } else {
    return state;
  }
}

export default questionsReducer;

