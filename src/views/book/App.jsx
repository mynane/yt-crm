/**
 * @file App.jsx
 * @author denglingbo
 *
 */

import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Link, Switch, Prompt, Route } from 'react-router-dom';
import { bookListAction } from '../../actions/book';

@connect(
    state => ({
        user: state.toJS().user,
        book: state.toJS().book,
    }),
    dispatch => bindActionCreators({bookListAction}, dispatch)
)
class App extends PureComponent {
    constructor(props) {
        super(props);
    }
    
    componentWillMount() {
        this.props.bookListAction();
    }

    render() {
        const { book, user } = this.props;
        console.log('render book.');

        return(
            <div>
                <div>books {user.data.name}</div>

                {book.list && book.list.map((item, index) => (
                    <div key={index}>
                        <Link to={`/book/${item.id}`}>{item.name}</Link>
                    </div>
                ))}

                {/*<Prompt message="确定要离开？" />*/}
            </div>
        )
    }
}

export default withRouter(App);
