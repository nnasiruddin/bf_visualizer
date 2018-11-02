import * as types from '../constants/actionTypes';
import Api from '../util/api';

/**
 * Hits the Api to Load the brain fuck script to execute
 * @returns {Function}
 */

export const loadBrainFuck = () => {

    return async (dispatch, getState) => {
        const state = getState();

        try {
            const response = await Api.loadBrainFuck(state.visualizeReducer.inputScript);
            return dispatch ({
                type: types.LOAD_BRAINFUCK_SUCCESS,
                payload: response.data
            })
        }
        catch (err) {
            return dispatch ({
                type: types.LOAD_BRAINFUCK_FAILURE,
                payload: err
            })
        }
    };
};

/**
 * Steps through the brainfuck execution and updates the UI
 * @returns {Function}
 */
export const step = () => {
    return async (dispatch, getState) => {

        const state = getState();

        try {
            const response = await Api.step(state.visualizeReducer.id);
            return dispatch({
                type: types.LOAD_STEP_SUCCESS,
                payload: response.data
            })
        }
        catch (err) {
            return dispatch ({
                type: types.LOAD_BRAINFUCK_FAILURE,
                payload: err
            })
        }
    };
};

/**
 * Stops the execution once the done parameter is returned as true
 * @returns {Function}
 */
export const stop = () => {
    return (dispatch, getState) => {

        const state = getState();

        if(state.visualizeReducer.interval) {
            window.clearInterval(state.visualizeReducer.interval);
        }
    };
};

/**
 * Keeps stepping through till an error occurs or done is received
 * @returns {function(*, *): *}
 */
export const play = () => {
    return (dispatch, getState) => {

        const state = getState();

        const interval = window.setInterval( async function() {
            try {
                const response = await Api.step(state.visualizeReducer.id);
                return dispatch ({
                    type: types.LOAD_STEP_SUCCESS,
                    payload: response.data
                })
            }
            catch (err) {
                return dispatch ({
                    type: types.LOAD_BRAINFUCK_FAILURE,
                    payload: err
                })
            }
        }, 1000);

        return dispatch ({
            type: types.STEP_INTERVAL_STARTED,
            payload: {
                interval
            }
        })
    };
};

/**
 * Handler to update the input script
 * @param value
 * @returns {function(*): *}
 */
export const updateInputScript = (value) => {
    return (dispatch) => {
        return dispatch({
            type: types.UPDATE_INPUT_SCRIPT,
            payload: {
                value
            }
        });
    };
};
