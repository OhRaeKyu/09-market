const SET_MODAL_OPEN = 'modal/SET_MODAL_OPEN';
const SET_MODAL_MODE = 'modal/SET_MODAL_MODE';

export const setModalOpen = (modalOpen: boolean) => ({
  type: SET_MODAL_OPEN,
  payload: modalOpen,
});

export const setModalMode = (mode: string) => ({
  type: SET_MODAL_MODE,
  payload: mode,
});

interface InitModalOpen {
  modalOpen: boolean;
}

interface InitModalMode {
  mode: string;
}

type ModalOpenAction = ReturnType<typeof setModalOpen>;
type ModalModeAction = ReturnType<typeof setModalMode>;

const initModalOpen = { modalOpen: false } as InitModalOpen;
const initModalMode = { mode: '' } as InitModalMode;

export const modalOpenReducer = (
  state: InitModalOpen = initModalOpen,
  action: ModalOpenAction
) => {
  switch (action.type) {
    case SET_MODAL_OPEN:
      return { ...state, modalOpen: action.payload };
    default:
      return state;
  }
};

export const modalModeReducer = (
  state: InitModalMode = initModalMode,
  action: ModalModeAction
) => {
  switch (action.type) {
    case SET_MODAL_MODE:
      return { ...state, mode: action.payload };
    default:
      return state;
  }
};
