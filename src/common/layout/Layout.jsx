/**
 * @file Layout
 * @author denglingbo
 */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import { Layout, Icon } from 'antd';
import SiderMenu from '../siderMenu/SiderMenu';
import Breadcrumb from '../breadcrumb/Breadcrumb';
import userAction from '../../actions/user';
import './layout.scss';

const { Header, Content, Sider } = Layout;

class AppLayout extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            collapsed: false,
        };

        this.handleCollapseChange = ::this.handleCollapseChange;
    }

    handleCollapseChange() {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }

    render() {
        const { collapsed } = this.state;

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
                            {this.props.children}
                        </div>
                    </Content>
                </Layout>
            </Layout>
        );
    }
}

AppLayout.propTypes = {

}

AppLayout.defaultProps = {
    breadcrumb: 'Breadcrumb',
}

export default withRouter(AppLayout);
