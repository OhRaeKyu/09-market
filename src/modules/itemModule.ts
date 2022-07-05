const SET_ITEMS_LIST = 'item/SET_ITEMS_LIST';
const SET_ITEM_DETAIL = 'item/SET_ITEM_DETAIL';

export const setItemsList = (items: []) => ({
  type: SET_ITEMS_LIST,
  payload: items,
});

export const setItemDetail = (item: {}) => ({
  type: SET_ITEM_DETAIL,
  payload: item,
});

interface Item {
  itemId: string;
  name: string;
  itemImageUrl: string;
}

interface Comment {
  commentId: string;
  content: string;
}

interface InitItemsList {
  items: (Item & {
    comments: number;
  })[];
}

export interface InitItemDetail extends Item {
  comments: Comment[];
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
