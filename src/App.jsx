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
import AppLayout from './common/layout/Layout';
import Route from './Route';
import userAction from './actions/user';
import './style/common.scss';

@connect(
    state => ({
        user: state.toJS().user.data,
        sider: state.toJS().sider.data,
    }),
    dispatch => bindActionCreators({ userAction }, dispatch)
)
class App extends PureComponent {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.userAction()
            .then(() => {
                console.log(123)
            })
            .catch(msg => {
                console.log(555);
                console.log(msg);
            });

        // 监听当前的地址变换
        this.unlisten = this.props.history.listen(location => {
            // console.log('history location: ' + location.pathname);
        });
    }

    componentWillUnmount() {
        this.unlisten();
    }

    render() {
        const { sider } = this.props;

        const getRoute = () => {
            if (sider && sider.length > 0) {
                return (
                    <Route
                        siderList={sider}
                    />
                )
            }

            return null;
        }

        return (
            <AppLayout>
                {getRoute()}
            </AppLayout>
        );
    }
}

export default withRouter(App);
