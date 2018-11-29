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
            <h2>Welcome to CityMain!</h2>
            <p>
                Here, you will be learning about all the different capital cities <br />
                there are in the world, so that when you see them <br /> 
                out in the wild, you will know what country they're from!
            </p>
            <LoginForm />
            <Link to="/register">Sign Up</Link>
        </div>
    );
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(LandingPage);
