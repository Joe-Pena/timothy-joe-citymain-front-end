import React from 'react';
import './dashboard.css';
import {connect} from 'react-redux';
import requiresLogin from './requires-login';
// import {fetchProtectedData} from '../actions/protected-data';
import { fetchQuestion, answeredQuestion, getProgress, fetchStats } from '../actions/questions';

export class Dashboard extends React.Component {


    constructor(props){
        super(props);
        this.state = {
            answered: false,
            feedback: null,
            value: ''
        }
    }


    componentDidMount() {
        this.props.dispatch(fetchQuestion());
        this.props.dispatch(fetchStats());
    }

    next(){
        this.setState({ 
            answered: false, 
            feedback: null,
            value: ''
        });
        this.props.dispatch(fetchQuestion());
    }

    onSubmit(event){
        event.preventDefault();
        const { correctAnswer } = this.props;
        const answeredCorrectly = this.state.value.toLowerCase().trim() === correctAnswer.toLowerCase().trim();
        this.props.dispatch(answeredQuestion(answeredCorrectly));
        const feedback = answeredCorrectly ? 'Correct!': `Incorrect. The correct answer is ${correctAnswer}.`;

        this.setState({
            answered: true,
            feedback
        });
    }

    capitalizeCity(name) {
        console.log(name);
        const capital = name.charAt(0);
        console.log(capital);
        const rest = name.slice(1).toLowerCase();
        console.log(rest);
        return capital + rest;
    }

    render() {
        const { answered, feedback, value } = this.state;
        const { question, stats, username } = this.props;

        if(this.props.checkProgress) {
            return (
                <div className="dashboard">
                    <div className="progress-container">
                        <h3 className="progress-message">Here's how well you've done, {this.props.username}</h3>
                        <div className="progress-box">
                            <h2>{stats.map((stat, index) => <li key={index}>{stat.answer}: {stat.numberOfSuccesses}</li>)}</h2>
                        </div>
                        <button className="goback-button" onClick={() => this.props.dispatch(getProgress())}>Go back</button>
                    </div>
                </div>
            )
        } else if(this.props.question) {
            return (
                <div className="dashboard">
                    {/* <div className="dashboard-username">
                        {username}
                    </div> */}
                    <div className="dashboard-name">Hello, {this.props.name}!</div>
                    <h3 className="what-country-q">Which country is this capital city from?</h3>
                    <div className="question-box">
                        <h2>{this.capitalizeCity(question)}</h2>
                    </div>
                    {
                        answered ? 
                            <div className="feedback-after-guess"> 
                                <p className='feedback'>{feedback}</p>
                                <button className='next-button' onClick={() => {
                                    this.next();
                                    this.props.dispatch(fetchStats());
                                    }}>Next</button>
                            </div>
                            :
                            <form className="guess-form" onSubmit={(e) => this.onSubmit(e)}>
                                <input type="text" placeholder="Your answer here" onChange={(e) => this.setState({value: e.target.value})} value={value}></input>
                                <button type="submit">submit!</button>
                            </form>
                    }
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
    const { question, answer, checkProgress, stats} = state.currentQuestion;

    return {
        username: state.auth.currentUser.username,
        name: `${currentUser.firstName} ${currentUser.lastName}`,
        question,
        correctAnswer: answer,
        checkProgress,
        stats,
    };
};

export default requiresLogin()(connect(mapStateToProps)(Dashboard));