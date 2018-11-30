import React from 'react';
import {connect} from 'react-redux';
import {clearAuth} from '../actions/auth';
import { getProgress } from '../actions/questions';
import {clearAuthToken} from '../local-storage';

export class HeaderBar extends React.Component {
    logOut() {
        this.props.dispatch(clearAuth());
        clearAuthToken();
    }

    checkProgress() {
        this.props.dispatch(getProgress())
    }

    render() {
        // Only render the log out button if we are logged in
        let logOutButton;
        let progressButton;
        let userName;
        if (this.props.loggedIn) {
            logOutButton = (
                <button className="logout-btn" onClick={() => this.logOut()}>Log out</button>
            );
            progressButton = (
                <button className="progress-btn" onClick={() => this.checkProgress()}>Progress</button>
            );
        }
        return (
            <div className="header-bar">
                <h1>CityMain</h1>
                <h2 className="header-username">{this.props.username}</h2>
                {progressButton}
                {logOutButton}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null,
    username: state.auth.currentUser ? state.auth.currentUser.username : null,
});

export default connect(mapStateToProps)(HeaderBar);
