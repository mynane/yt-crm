/**
 * @file userinfo.js
 * @author deo
 */

import { fetchUser } from '../service';
import ActionType from './ActionType';
import Promise from 'bluebird';

const receive = (data) => ({
    type: ActionType.RECEIVE_USER,
    payload: data,
});

export default () => dispatch => (
    new Promise((resolve, reject) => {
        fetchUser()
            .then(res => {
                dispatch(receive(res));
            })
            .catch(err => {
                reject(err);
            })
    })
)
