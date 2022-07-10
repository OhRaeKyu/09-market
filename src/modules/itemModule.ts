const SET_ITEMS_LIST = 'item/SET_ITEMS_LIST';
const SET_ITEM_DETAIL = 'item/SET_ITEM_DETAIL';
const SET_DELETE_COMMENT = 'item/SET_DELETE_COMMENT';

export const setItemsList = (items: []) => ({
  type: SET_ITEMS_LIST,
  payload: items,
});

export const setItemDetail = (item: {}) => ({
  type: SET_ITEM_DETAIL,
  payload: item,
});

export const setDeleteComment = (commentId: string) => ({
  type: SET_DELETE_COMMENT,
  payload: commentId,
});

interface Item {
  itemId: string;
  name: string;
  itemImageUrl: string;
}

interface Comment {
  commentId: string;
  userId: string;
  content: string;
  nickname: string;
  userImageUrl: string | null;
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
  itemInfo: string;
  price: number;
  amount: number;
  category: string;
}

interface InitDeleteComment {
  commentId: string;
}

type ItemsListAction = ReturnType<typeof setItemsList>;
type ItemDetailAction = ReturnType<typeof setItemDetail>;
type DeleteCommentAction = ReturnType<typeof setDeleteComment>;

const initItemsList = {
  items: [],
} as InitItemsList;

const initItemDetail = {} as InitItemDetail;

const initDeleteComment = {} as InitDeleteComment;

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
  state: InitItemDetail = initItemDetail,
  action: ItemDetailAction
) => {
  switch (action.type) {
    case SET_ITEM_DETAIL:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export const deleteCommentReducer = (
  state: InitDeleteComment = initDeleteComment,
  action: DeleteCommentAction
) => {
  switch (action.type) {
    case SET_DELETE_COMMENT:
      return { ...state, commentId: action.payload };
    default:
      return state;
  }
};
