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
import { bookListAction, bookDetailAction, showDetail, hideDetail } from '../../actions/book';
import { Modal, Button } from 'antd';

@connect(
    state => ({
        user: state.toJS().user,
        book: state.toJS().book,
    }),
    dispatch => bindActionCreators({
        bookListAction, bookDetailAction, showDetail, hideDetail
    }, dispatch)
)
class App extends PureComponent {
    constructor(props) {
        super(props);

        this.handleShowModal = ::this.handleShowModal;
        this.handleClose = ::this.handleClose;
    }
    
    componentWillMount() {
        this.props.bookListAction();
    }

    handleShowModal(e) {
        const id = e.currentTarget.getAttribute('data-id');

        this.props.bookDetailAction({ id })
            .then(() => {
                this.props.showDetail();
            });
    }

    handleClose() {
        this.props.hideDetail();
    }

    render() {
        const { book, user } = this.props;
        console.log('render book.');

        return(
            <div>
                <div>books {user.data.name}</div>

                {book.list && book.list.map((item, index) => (
                    <div key={index}>
                        {item.name}
                        <Button>
                            <Link to={`/book/update/${item.id}`}>修改</Link>
                        </Button>
                        <Button data-id={item.id} onClick={this.handleShowModal}>查看</Button>
                    </div>
                ))}

                <Modal
                    title={`Title ${book.detail.title}`}
                    visible={book.visible}
                    onCancel={this.handleClose}
                    footer={false}
                >
                    <p>some contents...</p>
                    <p>{book.detail.content}</p>
                </Modal>

                {/*<Prompt message="确定要离开？" />*/}
            </div>
        )
    }
}

export default withRouter(App);
