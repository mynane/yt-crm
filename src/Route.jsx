/**
 * @file Route.js
 * @author denglingbo
 *
 * Route 被 framework 引入，用于创建路由
 */

import React from 'react';
import { Switch } from 'react-router-dom';
import { getMatchRoute }  from './util/route';
import routes  from './routes';

/**
 * 获取 route
 * @param item
 * @constructor
 */
const GetRoutes = (item) => {
    return item.component();
}

export default (props) => {
    let menus = [];

    // 当前权限可用 Routes
    const usableRoutes = [routes[0]];

    // 获取所有可跳转的菜单，主菜单无 Link
    props.siderList.map(item => {
        if (item.submenu) {
            menus = menus.concat(item.submenu);
        }
    });

    // 所有的子菜单
    menus.map(item => {
        const matchRoute = getMatchRoute(item.key);

        if (matchRoute && matchRoute.component) {
            usableRoutes.push(matchRoute);
        }
    });

    return (
        <Switch>
            {usableRoutes && usableRoutes.map((item, i) => {
                return <GetRoutes key={i} {...item} />
            })}
        </Switch>
    )
}
