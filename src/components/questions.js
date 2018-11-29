import React from 'react';
import './dashboard.css';
import {connect} from 'react-redux';
import requiresLogin from './requires-login';
import {newGuess, guessSent, fetchQuestion, answerReset} from '../actions/questions';

export class Question extends React.Component {
  render() {
    if(this.props.gotRightAnswer === null) {
      return (
        <React.Fragment>
            <h3>What language is this written in?</h3>
            <div className="question-box">
                <h2>{this.props.question.question}</h2>
            </div>
            <form onSubmit={(event) => {
                event.preventDefault();
                this.props.dispatch(guessSent(this.props.currentGuess.toLowerCase(), this.props.question, this.props.token))
                }
            }>
                <input type="text" placeholder="Your answer here" onChange={(event) => this.props.dispatch(newGuess(event.target.value))} value={this.props.currentGuess}></input>
                <button type="submit">submit!</button>
            </form>
        </React.Fragment>
      )
    } else if(this.props.gotRightAnswer === true) {
      return (
        <React.Fragment>
            <h3>What language is this written in?</h3>
            <div className="question-box">
                <h2>You got it right, Good Job!</h2>
            </div>
            <button className="next-question-btn">Next</button>
        </React.Fragment>
      )
    } else {
      return (
        <React.Fragment>
            <h3>What language is this written in?</h3>
            <div className="question-box">
                <h2>You got it wrong, study more!</h2>
            </div>
            <button className="next-question-btn" onClick={() => {
              this.props.dispatch(fetchQuestion(this.props.token));
              this.props.dispatch(answerReset());
              console.log(this.props.gotRightAnswer);
            }}>Next</button>
        </React.Fragment>
      )
    }
  }
} 

const mapStateToProps = state => {
    const {currentUser} = state.auth;
    return {
        username: state.auth.currentUser.username,
        token: state.auth.authToken,
        gotRightAnswer: state.question.gotRightAnswer,
        currentGuess: state.question.currentGuess,
        name: `${currentUser.firstName} ${currentUser.lastName}`,
        question: state.question.currentQuestion,
        protectedData: state.protectedData.data
    };
};

export default requiresLogin()(connect(mapStateToProps)(Question));
