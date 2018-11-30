import React from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';

import LoginForm from './login-form';

export function LandingPage(props) {
    // If we are logged in redirect straight to the user's dashboard
    if (props.loggedIn) {
        return <Redirect to="/dashboard" />;
    }

    return (
        <div className="home">
            <div className="landing-page-container">
                <h2 className="welcome-message">Welcome to CityMain!</h2>
                <p className="app-description">
                    Here, you will be learning about all the different capital cities <br />
                    there are in the world, so that when you see them <br /> 
                    out in the wild, you will know what country they're from!
                </p>
                <LoginForm className="login-form"/>
                <span className="signup-btn">Not a member? <Link to="/register">Sign Up</Link></span>
            </div>
        </div>
    );
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(LandingPage);
