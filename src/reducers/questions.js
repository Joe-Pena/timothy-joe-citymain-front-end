import {FETCH_QUESTION_SUCCESS, NEW_GUESS, ANSWERED_CORRECTLY, ANSWERED_INCORRECTLY, ANSWER_RESET} from '../actions/questions';

const initialState = {
  currentQuestion: null,
  currentGuess: '',
  gotRightAnswer: null,
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
      gotRightAnswer: true,
      currentQuestion: {...state.currentQuestion,
        numberOfAttempts: state.currentQuestion.numberOfAttempts + 1,
        numberOfSuccesses: state.currentQuestion.numberOfSuccesses + 1,
        memoryStrength: state.currentQuestion.memoryStrength * 2},
    })
  } else if(action.type === ANSWERED_INCORRECTLY) {
    console.log('answered wrong');
    return Object.assign({}, state, {
      gotRightAnswer: false,
      currentQuestion: {...state.currentQuestion,
        numberOfAttempts: state.currentQuestion.numberOfAttempts + 1,
        memoryStrength: 1},
    })
  } else if(action.type === ANSWER_RESET) {
    return Object.assign({}, state, {
      gotRightAnswer: null,
    })
  } else {
    return state;
  }
}

export default questionsReducer;

