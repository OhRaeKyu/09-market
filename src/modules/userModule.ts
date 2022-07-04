const SET_USER_DATA = 'user/SET_USER_DATA';
const DELETE_USER_DATA = 'user/DELETE_USER_DATA';
const OTHER_USER_DATA = 'user/OTHER_USER_DATA';

export const setUserProfileData = (data: {}) => ({
  type: OTHER_USER_DATA,
  payload: data,
});

export const deleteUserData = () => ({
  type: DELETE_USER_DATA,
});

interface Item {
  id: string;
  itemImageUrl: string;
  itemInfo: string;
}

interface InitUserData {
  userId: string;
  nickname: string;
  userImageUrl: string | null;
  userInfo: string | null;
  items: Item[];
}

const initOtherUserData = {} as InitUserData;

type UserDataAction = ReturnType<typeof setUserProfileData>;

export const userDataReducer = (
  state: InitUserData = initOtherUserData,
  action: UserDataAction
) => {
  switch (action.type) {
    case OTHER_USER_DATA:
      return {
        ...state,
        ...action.payload,
      };
    case DELETE_USER_DATA:
      return { ...state, ...initOtherUserData };
    default:
      return state;
  }
};
