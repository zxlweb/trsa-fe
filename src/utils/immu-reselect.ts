/**
 * @fileOverview Immutable兼容的reselect
 * @author Max
 **/

import {createSelectorCreator, defaultMemoize} from 'reselect';
import * as Immutable from 'immutable';

const createSelector = createSelectorCreator(
    defaultMemoize,
    Immutable.is
);

export default createSelector;
