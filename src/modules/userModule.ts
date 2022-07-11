import { InitUserData, InitUserProfile } from '@/utils/types';
const SET_USER_DATA = 'user/SET_USER_DATA';
const DELETE_USER_DATA = 'user/DELETE_USER_DATA';
const SET_USER_PROFILE = 'user/SET_USER_PROFILE';

export const setUserData = (data: {}) => ({
  type: SET_USER_DATA,
  payload: data,
});

export const deleteUserData = () => ({
  type: DELETE_USER_DATA,
});

export const setUserProfile = (data: {}) => ({
  type: SET_USER_PROFILE,
  payload: data,
});

const initUserData = {
  email: '',
  nickname: '',
  mobile: '',
  address: '',
  zipcode: '',
  userInfo: null,
} as InitUserData;

const initUserProfile = {} as InitUserProfile;

type UserDataAction = ReturnType<typeof setUserData>;
type UserProfileAction = ReturnType<typeof setUserProfile>;

export const userDataReducer = (
  state: InitUserData = initUserData,
  action: UserDataAction
) => {
  switch (action.type) {
    case SET_USER_DATA:
      return { ...state, ...action.payload };
    case DELETE_USER_DATA:
      return { ...state, ...initUserData };
    default:
      return state;
  }
};

export const userProfileReducer = (
  state: InitUserProfile = initUserProfile,
  action: UserProfileAction
) => {
  switch (action.type) {
    case SET_USER_PROFILE:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
