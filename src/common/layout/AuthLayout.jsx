/**
 * @file Layout
 * @author denglingbo
 */

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import { Layout, Icon } from 'antd';
import SiderMenu from '../siderMenu/SiderMenu';
import Breadcrumb from '../breadcrumb/Breadcrumb';
import siderAction from '../../actions/sider';
import AuthRoute from '../../Route';
import './layout.scss';

const { Header, Content, Sider } = Layout;

@connect(
    state => ({
        user: state.toJS().user,
        sider: state.toJS().sider.data,
    }),
    dispatch => bindActionCreators({ siderAction }, dispatch)
)
class AuthLayout extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            collapsed: false,
        };

        this.handleCollapseChange = ::this.handleCollapseChange;
    }

    componentWillMount() {
        this.props.siderAction();
    }

    handleCollapseChange() {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }

    render() {
        const { collapsed } = this.state;
        const { user, sider } = this.props;

        if (!user.isAuth) {
            return null;
        }

        return (
            <Layout>
                <Header>Header</Header>
                {/* Layout */}
                <Layout>

                    {/* 侧边栏容器 */}
                    <Sider
                        collapsed={collapsed}
                    >
                        <div className="ant-layout-menu">
                            <SiderMenu
                                sider={sider}
                                collapsed={collapsed}
                            />
                        </div>
                        <div
                            className="ant-side-collapse-button"
                            onClick={this.handleCollapseChange}
                        >
                            {<Icon
                                className="trigger"
                                type={collapsed ? 'menu-unfold' : 'menu-fold'}
                            />}
                        </div>
                    </Sider>

                    {/* 内容主容器 */}
                    <Content>

                        {/* 面包屑 */}
                        <Breadcrumb />

                        {/* 内容容器 */}
                        <div className="content-main">
                            <AuthRoute sider={sider} />
                        </div>
                    </Content>
                </Layout>
            </Layout>
        );
    }
}

AuthLayout.propTypes = {}

AuthLayout.defaultProps = {
    breadcrumb: 'Breadcrumb',
}

export default withRouter(AuthLayout);
