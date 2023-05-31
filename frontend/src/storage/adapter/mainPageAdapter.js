import * as mainActions from '../actions/mainPageActions';

const initState = {
  username: '',
  activeUsers: [],
  groupCallRooms: []
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case mainActions.DASHBOARD_SET_USERNAME:
      return {
        ...state,
        username: action.username
      };
    case mainActions.DASHBOARD_SET_ACTIVE_USERS:
      return {
        ...state,
        activeUsers: action.activeUsers
      };
    case mainActions.DASHBOARD_SET_GROUP_CALL_ROOMS:
      return {
        ...state,
        groupCallRooms: action.groupCallRooms
      };
    default:
      return state;
  }
};

export default reducer;
