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
        if (this.props.loggedIn) {
            logOutButton = (
                <button onClick={() => this.logOut()}>Log out</button>
            );
            progressButton = (
                <button onClick={() => this.checkProgress()}>Progress</button>
            );
        }
        return (
            <div className="header-bar">
                <h1>CityMain</h1>
                {logOutButton}
                {progressButton}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(HeaderBar);
