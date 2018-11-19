import { InstanceState } from 'app/reducers';
import { checkValidity } from 'common/utils/jwt';

export const PATH_TO_REDIRECT_AFTER_LOGIN = 'lkfjbvndfkj5415';

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state');

    // Check the token validity
    if (serializedState === null) {
      return undefined;
    }
    const state : InstanceState = JSON.parse(serializedState);

    // Check some validity
    return state ;
  } catch (err) {
    return undefined;
  }
};

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch (err) {
    console.debug(err);
  }
};

export const clearState = () => {
  try {
    const pathToRedirect = localStorage.getItem(PATH_TO_REDIRECT_AFTER_LOGIN);
    localStorage.clear();
    localStorage.setItem(PATH_TO_REDIRECT_AFTER_LOGIN, pathToRedirect);
  } catch (err) {
    console.debug(err);
  }
};
