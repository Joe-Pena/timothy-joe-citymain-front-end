import { FETCH_QUESTION_SUCCESS } from '../actions/questions';

const initialState = {
  question: null,
  answer: null
}

const questionsReducer = (state = initialState, action) => {
  if(action.type === FETCH_QUESTION_SUCCESS) {

    const { question, answer } = action.question;

    return {
      ...state,
      question,
      answer
    };   
  } else {
    return state;
  }
}

export default questionsReducer;

