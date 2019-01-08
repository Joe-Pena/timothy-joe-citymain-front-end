import React from 'react';
import './dashboard.css';
import {connect} from 'react-redux';
import requiresLogin from './requires-login';
// import {fetchProtectedData} from '../actions/protected-data';
import { fetchQuestion, answeredQuestion, getProgress, fetchStats } from '../actions/questions';
import Particles from 'react-particles-js';

const particleOptions = {
    "particles": {
      "number": {
        "value": 154,
        "density": {
          "enable": true,
          "value_area": 800
        }
      },
      "color": {
        "value": "#20f3be"
      },
      "shape": {
        "type": "edge",
        "stroke": {
          "width": 0,
          "color": "#000000"
        },
        "polygon": {
          "nb_sides": 3
        },
        "image": {
          "src": "img/github.svg",
          "width": 100,
          "height": 100
        }
      },
      "opacity": {
        "value": 0.5,
        "random": false,
        "anim": {
          "enable": false,
          "speed": 1,
          "opacity_min": 0.1,
          "sync": false
        }
      },
      "size": {
        "value": 3,
        "random": true,
        "anim": {
          "enable": false,
          "speed": 40,
          "size_min": 0.1,
          "sync": false
        }
      },
      "line_linked": {
        "enable": true,
        "distance": 150,
        "color": "#20f3be",
        "opacity": 0,
        "width": 0
      },
      "move": {
        "enable": true,
        "speed": 1,
        "direction": "top-right",
        "random": true,
        "straight": true,
        "out_mode": "out",
        "bounce": false,
        "attract": {
          "enable": false,
          "rotateX": 8818.766334760376,
          "rotateY": 8417.913319543995
        }
      }
    },
    "interactivity": {
      "detect_on": "window",
      "events": {
        "onhover": {
          "enable": true,
          "mode": "bubble"
        },
        "onclick": {
          "enable": false,
          "mode": "push"
        },
        "resize": true
      },
      "modes": {
        "grab": {
          "distance": 400,
          "line_linked": {
            "opacity": 1
          }
        },
        "bubble": {
          "distance": 146.16558937213767,
          "size": 2,
          "duration": 2.030077630168579,
          "opacity": 0.37353428395101856,
          "speed": 3
        },
        "repulse": {
          "distance": 100,
          "duration": 0.4
        },
        "push": {
          "particles_nb": 4
        },
        "remove": {
          "particles_nb": 2
        }
      }
    },
    "retina_detect": true
  }

export class Dashboard extends React.Component {


    constructor(props){
        super(props);
        this.answerInput = React.createRef();
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
        const capital = name.charAt(0);
        const rest = name.slice(1).toLowerCase();
        return capital + rest;
    }

    render() {
        const { answered, feedback, value } = this.state;
        const { question, stats, username } = this.props;

        if(this.props.checkProgress) {
            return (
                <div className="dashboard">
                    <Particles className="particles" params={particleOptions}/>
                    <div className="progress-container">
                        <p className="progress-message">Here's how well you know your capitals, {this.props.username}</p>
                        <div className="progress-box">
                            {stats.map((stat, index) => <span className="progress-object" key={index}>{stat.answer}: {stat.numberOfSuccesses}</span>).sort()}
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
                    <Particles className="particles" params={particleOptions}/>
                    <div className="dashboard-name">Hello, {this.props.name}!</div>
                    <h3 className="what-country-q">Which country is this capital city from?</h3>
                    <section className="question-area">
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
                                <form className="guess-form" onSubmit={(e) => {
                                    console.log('about to change state', this.answerInput.current.value);
                                    e.preventDefault();
                                    this.setState({value: this.answerInput.current.value}, () => this.onSubmit(e));
                                    // this.onSubmit(e);
                                    }
                                }>
                                    <input type="text" placeholder="Your answer here" ref={this.answerInput}
                                    // onChange={(e) => this.setState({value: e.target.value})} value={value}
                                    ></input>
                                    <button type="submit">submit!</button>
                                </form>
                        }
                    </section>
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