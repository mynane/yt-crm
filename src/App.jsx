/**
 * @file App.js
 * @author denglingbo
 *
 * 此处调用 framework 的 App.js
 */
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import SlideBar from './views/common/SlideBar';
import Route from './Route';
import userAction from './actions/user';

@connect(
    state => state.toJS().user,
    dispatch => bindActionCreators({ userAction }, dispatch)
)
class App extends PureComponent {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.userAction();
    }

    render() {
        return (
            <div>
                <div><SlideBar /></div>
                <div><Route /></div>
            </div>
        );
    }
}

export default withRouter(App);
