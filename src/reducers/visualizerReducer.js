import initialState from './initialState';
import * as actions from '../constants/actionTypes';

const visualizeReducer = (
    state = initialState.visualizer,
    action
) => {
    switch (action.type) {
        case actions.UPDATE_INPUT_SCRIPT:
            return {
                ...state,
                inputScript: encodeURIComponent(action.payload.value)
            };
        case actions.LOAD_BRAINFUCK_SUCCESS:
            return {
                ...state,
                data: action.payload.data,
                script: action.payload.script,
                scrollToColumnScript: action.payload.instruction_pointer,
                scrollToColumnData: action.payload.data_pointer,
                output: action.payload.output,
                editMode: false,
                id: action.payload.id
            };

        case actions.LOAD_STEP_SUCCESS:
            return {
                ...state,
                data: action.payload.data,
                script: action.payload.script,
                scrollToColumnScript: action.payload.instruction_pointer,
                scrollToColumnData: action.payload.data_pointer,
                output: action.payload.output,
                done: action.payload.done
            };
        case actions.STEP_INTERVAL_STARTED:
            return {
                ...state,
                interval: action.payload.interval
            };
        case actions.LOAD_BRAINFUCK_FAILURE:
            return {
                ...initialState.visualizer,
                showError: true,
                done: true
            };
        default:
            return state;
    }
};

export default visualizeReducer;
