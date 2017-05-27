/**
 * @file userinfo.js
 * @author deo
 */

import Immutable from 'immutable';
import ActionType from '../actions/ActionType';

const initState = Immutable.fromJS({
    data: {},
});

export default function (state = initState, action) {
    switch (action.type) {
        case ActionType.RECEIVE_USER:
            return state.set('data', action.payload);

        default:
            return state;
    }
}
