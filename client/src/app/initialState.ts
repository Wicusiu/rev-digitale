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
    pathway: {},
  },
  routing: null,
};

export default appInitialState;
