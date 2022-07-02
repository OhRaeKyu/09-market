const SET_ITEMS_LIST = 'item/SET_ITEMS_LIST';
const SET_DETAIL_ITEM = 'item/SET_DETAIL_ITEM';
const DELETE_ITEM = 'item/DELETE_ITEM';

export const setItemsList = (items: object[]) => ({
  type: SET_ITEMS_LIST,
  payload: items,
});

export const setDetailItem = (item: object) => ({
  type: SET_DETAIL_ITEM,
  payload: item,
});

export const deleteItem = () => ({
  type: DELETE_ITEM,
});

interface InitItemsState {
  items: object[];
}

const initItemsState: InitItemsState = {
  items: [],
};

type ItemsReducer = ReturnType<typeof setItemsList>;

export const itemsListReducer = (
  state = initItemsState,
  action: ItemsReducer
) => {
  switch (action.type) {
    case SET_ITEMS_LIST:
      return { ...state, items: action.payload };
    default:
      return state;
  }
};

type ItemDetailReducer = {
  type: string;
  payload?: object;
};

export const itemDatailReducer = (state = {}, action: ItemDetailReducer) => {
  switch (action.type) {
    case SET_DETAIL_ITEM:
      return { ...state, ...action.payload };
    case DELETE_ITEM:
      return {};
    default:
      return state;
  }
};
