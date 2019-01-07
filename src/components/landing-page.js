import React from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';
import citymainlogo from '../images/citymainlogoname.svg';
import Particles from 'react-particles-js';
import worldMap from '../images/worldmap.svg';

import LoginForm from './login-form';

export function LandingPage(props) {
    // If we are logged in redirect straight to the user's dashboard
    if (props.loggedIn) {
        return <Redirect to="/dashboard" />;
    }

    const particleOptions = {
        "particles": {
          "number": {
            "value": 100,
            "density": {
              "enable": true,
              "value_area": 800
            }
          },
          "color": {
            "value": "#20f3be"
          },
          "shape": {
            "type": "circle",
            "stroke": {
              "width": 0,
              "color": "#000000"
            },
            "polygon": {
              "nb_sides": 5
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
            "opacity": 0.4,
            "width": 1
          },
          "move": {
            "enable": true,
            "speed": 6,
            "direction": "none",
            "random": false,
            "straight": false,
            "out_mode": "out",
            "bounce": false,
            "attract": {
              "enable": false,
              "rotateX": 600,
              "rotateY": 1200
            }
          }
        },
        "interactivity": {
          "detect_on": "window",
          "events": {
            "onhover": {
              "enable": true,
              "mode": "repulse"
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
              "distance": 400,
              "size": 40,
              "duration": 2,
              "opacity": 8,
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

    const particleOptionsTwo = {
	    fps_limit: 28,
	    particles: {
	        number: {
	            value: 200,
	            density: {
	                enable: false
	            }
	        },
	        line_linked: {
	            enable: true,
	            distance: 30,
	            opacity: 0.4
	        },
	        move: {
	            speed: 1
	        },
	        opacity: {
	            anim: {
	                enable: true,
	                opacity_min: 0.05,
	                speed: 2,
	                sync: false
	            },
	            value: 0.4
	        }
	    },
	    polygon: {
	        enable: true,
	        scale: 0.5,
	        type: "inline",
	        move: {
	            radius: 10
	        },
	        url: worldMap,
	        inline: {
	            arrangement: "equidistant"
	        },
	        draw: {
	            enable: true,
	            stroke: {
	                color: "#20f3be"
	            }
	        }
	    },
	    retina_detect: false,
	    interactivity: {
	        events: {
	            onhover: {
	                enable: true,
	                mode: "bubble"
	            }
	        },
	        modes: {
	            bubble: {
	                size: 6,
	                distance: 40
	            }
	        }
	    }
    }
    
    return (
        <div className="home">
        <section className="home-navbar">
            <img className="citymain-logo" src={citymainlogo} alt="citymain logo" />
        </section>
        <Particles 
            className="particles"
            params={particleOptions} 
        />
        <section className="landing-page-container">
            <h2 className="welcome-message">Welcome!</h2>
            <p className="app-description">
                Learn the name of all the different capital cities
                in the world!
            </p>
            <LoginForm className="login-form"/>
            <span className="signup-btn">Not a member? <Link to="/register" className="signup-btn-link">Sign Up</Link></span>
        </section>
        </div>
    );
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(LandingPage);
