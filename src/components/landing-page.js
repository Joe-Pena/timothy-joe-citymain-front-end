import React from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';
import citymainlogo from '../images/citymainlogoname.svg';

import LoginForm from './login-form';

export function LandingPage(props) {
    // If we are logged in redirect straight to the user's dashboard
    if (props.loggedIn) {
        return <Redirect to="/dashboard" />;
    }

    return (
        <div className="home">
        <section className="home-navbar">
            <img className="citymain-logo" src={citymainlogo} alt="citymain logo" />
        </section>
        
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
