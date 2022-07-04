const SET_CATEGORY = 'category/SET_CATEGORY';

export const setCategory = (category: string) => ({
  type: SET_CATEGORY,
  payload: category,
});

interface InitCategory {
  currentCategory: string;
}

type ReducerProps = ReturnType<typeof setCategory>;

const initCategory = {
  currentCategory: '전체',
} as InitCategory;

export const categoryReducer = (
  state: InitCategory = initCategory,
  action: ReducerProps
) => {
  switch (action.type) {
    case SET_CATEGORY:
      return { ...state, currentCategory: action.payload };

    default:
      return state;
  }
};
