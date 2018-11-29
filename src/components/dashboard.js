import React from 'react';
import './dashboard.css';
import {connect} from 'react-redux';
import requiresLogin from './requires-login';
// import {fetchProtectedData} from '../actions/protected-data';
import {fetchQuestion, newGuess, guessSent} from '../actions/questions';

export class Dashboard extends React.Component {
    componentDidMount() {
        // this.props.dispatch(fetchProtectedData());
        this.props.dispatch(fetchQuestion(this.props.token));
    }

    render() {
        if(this.props.question) {
            return (
                <div className="dashboard">
                    <div className="dashboard-username">
                        Username: {this.props.username}
                    </div>
                    <div className="dashboard-name">Name: {this.props.name}</div>
                    <div className="dashboard-protected-data">
                        Protected data: {this.props.protectedData}
                    </div>
                    <h3>What language is this written in?</h3>
                    <div className="question-box">
                        <h2>{this.props.question.question}</h2>
                    </div>
                    <form onSubmit={(event) => {
                        event.preventDefault();
                        this.props.dispatch(guessSent(this.props.currentGuess, this.props.question, this.props.token))
                        }
                    }>
                        <input type="text" placeholder="Your answer here" onChange={(event) => this.props.dispatch(newGuess(event.target.value))} value={this.props.currentGuess}></input>
                        <button type="submit">submit!</button>
                    </form>
                </div>
            );
        } else {
            return(
                <div>
                    <h1>Waiting</h1>
                </div>
            )
        }
    }
}

const mapStateToProps = state => {
    const {currentUser} = state.auth;
    return {
        username: state.auth.currentUser.username,
        token: state.auth.authToken,
        currentGuess: state.question.currentGuess,
        name: `${currentUser.firstName} ${currentUser.lastName}`,
        question: state.question.currentQuestion,
        protectedData: state.protectedData.data
    };
};

export default requiresLogin()(connect(mapStateToProps)(Dashboard));
