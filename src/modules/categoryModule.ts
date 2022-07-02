const SET_CATEGORY = 'category/SET_CATEGORY';

export const setCategory = (category: string) => ({
  type: SET_CATEGORY,
  payload: category,
});

type ReducerProps = ReturnType<typeof setCategory>;

export const categoryReducer = (
  state = '전체',
  { type, payload }: ReducerProps
) => {
  switch (type) {
    case SET_CATEGORY:
      return payload;

    default:
      return state;
  }
};
