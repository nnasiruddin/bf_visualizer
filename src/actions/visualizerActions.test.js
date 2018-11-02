import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import state from '../reducers/initialState';
import * as types from '../constants/actionTypes';
import * as actionCreators from './visualizerActions';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

describe('Visualizer Actions', () => {
    const createMockStore = configureMockStore([thunk]);
    let store;

    beforeEach(() => {
        const stateCopy = {
            ...state,
            visualizeReducer: state.visualizer
        };
        store = createMockStore(stateCopy);
        const mock = new MockAdapter(axios);
        const data = { data: '' };
        mock.onPost('https://sec.meetkaruna.com/api/v1/brainfuck?user_id=nnasiruddin&script=').reply(200, data);

    });

    it('should create an action to load brainfuck script', async () => {
        const expected = [{
            type: types.LOAD_BRAINFUCK_SUCCESS,
            payload: {data: ''}
        }];

        await store.dispatch(actionCreators.loadBrainFuck());
        expect(store.getActions()).toEqual(expected);
    });
});

