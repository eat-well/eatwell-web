export const ActionsTypes = {
  SET_USER_DETAILS: 'SET_USER_DETAILS',
  ADD_USER_POINTS: 'ADD_USER_POINTS',
};

export const setUserDetails = userDetails => {
  return { type: ActionsTypes.SET_USER_DETAILS, userDetails };
};

export const addUserPointsAction = points => {
  return { type: ActionsTypes.ADD_USER_POINTS, points };
};
