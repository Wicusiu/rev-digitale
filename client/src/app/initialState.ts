import { InstanceState } from './reducers';

const appInitialState: InstanceState = {
  application: {
    message: {
      entity: [],
    },
    brick: {
    },
    user: {
    },
    session: {
    },
    module: {},
  },
  routing: null,
};

export default appInitialState;
