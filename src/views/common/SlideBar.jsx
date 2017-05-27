/**
 * @file Nav.jsx
 * @author deo
 */
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

/**
 * 当前导航是否激活
 * @param match
 * @param location
 * @returns {boolean}
 */
const isActive = (match, location) => {
    if (!match) {
        return false;
    }

    return match.path === location.pathname;
};

/**
 * 导航
 * @type {Array}
 */
const arr = [
    {
        path: '/',
        title: 'Home',
    },
    {
        path: '/book',
        title: 'Book',
    },
    {
        path: '/topic',
        title: 'Topic',
    },
];

/**
 * 创建导航
 * @param items
 * @returns {XML}
 */
const create = (items) => {
    return (
        <div>
            {items.map((item, index) => (
                <div key={index}>
                    <NavLink
                        to={item.path}
                        isActive={isActive}
                    >
                        {item.title}
                    </NavLink>

                    <div className="slide-bar-sub">
                        {item.sub && create(item.sub)}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default class SlideBar extends Component {
    constructor(props) {
        super(props);

        // this.handleLogout = ::this.handleLogout;
    }

    render () {
        return <div className="slide-bar">{create(arr)}</div>;
    }
}