const SET_USER_DATA = 'user/SET_USER_DATA';
const DELETE_USER_DATA = 'user/DELETE_USER_DATA';

export const setUserData = (data: {}) => ({
  type: SET_USER_DATA,
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

const initUserData = {} as InitUserData;

type UserDataAction = ReturnType<typeof setUserData>;

export const userDataReducer = (
  state: InitUserData = initUserData,
  action: UserDataAction
) => {
  switch (action.type) {
    case SET_USER_DATA:
      return { ...state, ...action.payload };
    case DELETE_USER_DATA:
      return initUserData;
    default:
      return state;
  }
};
