'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let currentState = { ...state };
  const result = [];

  for (const action of actions) {
    let nextState = { ...currentState };

    if (action.type === 'addProperties') {
      nextState = { ...currentState, ...action.extraData };
    } else if (action.type === 'clear') {
      nextState = {};
    } else if (action.type === 'removeProperties') {
      if (Array.isArray(action.keysToRemove)) {
        for (const key of action.keysToRemove) {
          delete nextState[key];
        }
      }
    }
    currentState = nextState;
    result.push(currentState);
  }

  return result;
}

module.exports = transformStateWithClones;
