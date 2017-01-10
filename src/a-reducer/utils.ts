/**
 * @fileOverview reducer工具方法, 消灭switch
 * @author Max
 **/

export function createReducer(initialState: any, handlers: any) {
    return function reducer(state = initialState, action: any) {
        if(handlers.hasOwnProperty(action.type)) {
            return handlers[action.type](state, action);
        } else {
            return state;
        }
    };
}
