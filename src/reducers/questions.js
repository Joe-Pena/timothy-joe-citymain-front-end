import {FETCH_QUESTION_SUCCESS, NEW_GUESS, ANSWERED_CORRECTLY, ANSWERED_INCORRECTLY} from '../actions/questions';

const initialState = {
  currentQuestion: null,
  // questionAnswer: null,
  // attempts: 0,
  // corrects: 0,
  // incorrects: 0,
  // questionMemoryStrength: 0,
  currentGuess: '',
}

const questionsReducer = (state = initialState, action) => {
  if(action.type === FETCH_QUESTION_SUCCESS) {
    return Object.assign({}, state, {
      currentQuestion: action.question,
    })
  } else if(action.type === NEW_GUESS) {
    return Object.assign({}, state, {
      currentGuess: action.guess,
    })
  } else if(action.type === ANSWERED_CORRECTLY) {
    console.log('Answered correctly');
    return Object.assign({}, state, {
      currentQuestion: {...state.currentQuestion,
        numberOfAttempts: state.currentQuestion.numberOfAttempts + 1,
        numberOfSuccesses: state.currentQuestion.numberOfSuccesses + 1,
        memoryStrength: state.currentQuestion.memoryStrength * 2}
    })
  } else if(action.type === ANSWERED_INCORRECTLY) {
    console.log('answered ewrongf');
    return Object.assign({}, state, {
      currentQuestion: {...state.currentQuestion,
        numberOfAttempts: state.currentQuestion.numberOfAttempts + 1,
        memoryStrength: 1}
    })
  } else {
    return state;
  }
}

export default questionsReducer;

