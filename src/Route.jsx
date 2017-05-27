/**
 * @file Route.js
 * @author denglingbo
 *
 * Route 被 framework 引入，用于创建路由
 */

import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Bundle from 'freed-spa/lib/bundle';

import Home from 'bundle-loader?lazy!./views/home/App';
import Book from 'bundle-loader?lazy!./views/book/App';
import Topic from 'bundle-loader?lazy!./views/topic/App';
import BookDetail from 'bundle-loader?lazy!./views/book/Detail';

export default () => (
    <Switch>
        <Route
            path="/"
            exact
            render={() => {
                return <Bundle load={Home}>{(Home) => <Home />}</Bundle>;
            }}
        />
        <Route
            path="/book"
            exact
            render={() => {
                return <Bundle load={Book}>{(Book) => <Book />}</Bundle>;
            }}
        />
        <Route
            path="/book/:id"
            render={() => {
                return <Bundle load={BookDetail}>{(BookDetail) => <BookDetail />}</Bundle>;
            }}
        />
        <Route
            path="/topic"
            render={() => {
                return <Bundle load={Topic}>{(Topic) => <Topic />}</Bundle>;
            }}
        />
    </Switch>
);
