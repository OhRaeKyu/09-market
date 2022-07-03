const SET_MODAL_OPEN = 'modal/SET_MODAL_OPEN';
const SET_MODAL_MODE = 'modal/SET_MODAL_MODE';

export const setModalOpen = (isOpen: boolean) => ({
  type: SET_MODAL_OPEN,
  payload: isOpen,
});

export const setModalMode = (mode: string) => ({
  type: SET_MODAL_MODE,
  payload: mode,
});

type ModalOpenAction = ReturnType<typeof setModalOpen>;
type ModalModeAction = ReturnType<typeof setModalMode>;

const initModalOpen = false;
const initModalMode = '';

export const modalOpenReducer = (
  state: boolean = initModalOpen,
  action: ModalOpenAction
) => {
  switch (action.type) {
    case SET_MODAL_OPEN:
      return action.payload;
    default:
      return state;
  }
};

export const modalModeReducer = (
  state: string = initModalMode,
  action: ModalModeAction
) => {
  switch (action.type) {
    case SET_MODAL_MODE:
      return action.payload;
    default:
      return state;
  }
};
