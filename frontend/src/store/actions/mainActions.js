export const MAINPAGE_SET_USERNAME = 'MAINPAGE.SET_USERNAME';
export const MAINPAGE_SET_ACTIVE_USERS = 'DMAINPAGE.SET_ACTIVE_USERS';
export const MAINPAGE_SET_GROUP_CALL_ROOMS = 'MAINPAGE.SET_GROUP_CALL_ROOMS';

export const setUsername = (username) => {
  return {
    type: MAINPAGE_SET_USERNAME,
    username
  };
};

export const setActiveUsers = (activeUsers) => {
  return {
    type: MAINPAGE_SET_ACTIVE_USERS,
    activeUsers
  };
};

export const setGroupCalls = (groupCallRooms) => {
  return {
    type: MAINPAGE_SET_GROUP_CALL_ROOMS,
    groupCallRooms
  };
};
