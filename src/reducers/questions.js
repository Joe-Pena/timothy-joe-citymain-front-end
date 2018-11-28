const initialState = {
  currentQuestion: null,
  questionAnswer: null,
  attempts: 0,
  corrects: 0,
  currentGuess: null,
  questionMemoryStrength: 0,
}

const questionsReducer = (state = initialState, action) => {
  if(action.type === 'FETCH_QUESTION_SUCCESS') {
    return Object.assign({}, state, {
      currentQuestion: action.question.question,
      questionAnswer: action.question.answer,
      attempts: action.question.numberOfAttempts,
      corrects: action.question.numberOfSuccesses,
      questionMemoryStrength: action.question.memoryStrength
    })
  } else {
    return state;
  }
}

export default questionsReducer;

