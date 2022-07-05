import { combineReducers } from '@reduxjs/toolkit';

import { categoryReducer } from './categoryModule';
import { itemsListReducer, itemDetailReducer } from './itemModule';
import { modalModeReducer, modalOpenReducer } from './modalModule';
import { userDataReducer, userProfileReducer } from './userModule';

const rootReducer = combineReducers({
  category: categoryReducer,

  itemsList: itemsListReducer,
  itemDetail: itemDetailReducer,

  isModalOpen: modalOpenReducer,
  modeOfModal: modalModeReducer,

  userData: userDataReducer,
  userProfile: userProfileReducer,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
