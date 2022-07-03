const SET_ITEMS_LIST = 'item/SET_ITEMS_LIST';
const SET_ITEM_DETAIL = 'item/SET_ITEM_DETAIL';

const DELETE_USER_ITEM = 'item/DELETE_ITEM';

export const setItemsList = (items: []) => ({
  type: SET_ITEMS_LIST,
  payload: items,
});

export const setItemDetail = (item: {}) => ({
  type: SET_ITEM_DETAIL,
  payload: item,
});

export const deleteItem = () => ({
  type: DELETE_USER_ITEM,
});

interface Item {
  itemId: string;
  name: string;
  itemImageUrl: string;
}

interface InitItemsList {
  items: (Item & {
    comments: number;
  })[];
}

interface InitItemDetail extends Item {
  comments: [];
  userId: string;
  instagramUrl: string;
}

type ItemsListAction = ReturnType<typeof setItemsList>;
type ItemDetailAction = ReturnType<typeof setItemDetail>;

const initItemsList = {
  items: [],
} as InitItemsList;

const initItem = {} as InitItemDetail;

export const itemsListReducer = (
  state: InitItemsList = initItemsList,
  action: ItemsListAction
) => {
  switch (action.type) {
    case SET_ITEMS_LIST:
      return { ...state, items: action.payload };
    default:
      return state;
  }
};

export const itemDetailReducer = (
  state: InitItemDetail = initItem,
  action: ItemDetailAction
) => {
  switch (action.type) {
    case SET_ITEM_DETAIL:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
