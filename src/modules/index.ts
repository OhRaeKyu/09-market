import { combineReducers } from '@reduxjs/toolkit';

import { categoryReducer } from './categoryModule';
import { itemsListReducer, itemDatailReducer } from './itemModule';

const rootReducer = combineReducers({
  category: categoryReducer,
  itemsList: itemsListReducer,
  itemDetail: itemDatailReducer,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
