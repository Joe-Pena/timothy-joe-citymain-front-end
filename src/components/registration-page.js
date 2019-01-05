import React from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';
import citymainlogo from '../images/citymainlogoname.svg';

import RegistrationForm from './registration-form';

export function RegistrationPage(props) {
    // If we are logged in (which happens automatically when registration
    // is successful) redirect to the user's dashboard
    if (props.loggedIn) {
        return <Redirect to="/dashboard" />;
    }
    return (
        <div className="home">
            <section className="home-navbar">
                <img className="citymain-logo" src={citymainlogo} alt="citymain logo" />
            </section>
            <div className="signup-page-container">
                <h2 className="register-message">Register!</h2>
                <RegistrationForm className="signup-form"/>
                <span className="btn-to-login">Already a member? <Link to="/" className="btn-to-login-link">Login</Link></span>
            </div>
        </div>
    );
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(RegistrationPage);
