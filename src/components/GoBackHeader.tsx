import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { useSelector } from '@/hooks/useTypedSelector';

import { PALLETS } from '@/utils/constants';
import { setModalMode, setModalOpen } from '@/modules/modalModule';

interface GoBackHeaderProps {
  headerTitle?: string;
  setStep?: React.Dispatch<React.SetStateAction<string>>;
  optionBtn?: boolean;
}

export default function GoBackHeader({
  headerTitle,
  setStep,
  optionBtn,
}: GoBackHeaderProps) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const currentUserId = sessionStorage.getItem('userId');
  const { userId: itemWriterId } = useSelector((state) => state.itemDetail);
  const authorization = currentUserId == itemWriterId;

  const modalOpen = () => {
    dispatch(setModalMode('아이템삭제'));
    dispatch(setModalOpen(true));
  };

  return (
    <GoBackHeaderWrap>
      <GoBackHeaderItems>
        <GoBackButton
          type="button"
          onClick={() => {
            setStep ? setStep('basic') : navigate(-1);
          }}
        >
          <span className="blind">뒤로가기 버튼</span>
        </GoBackButton>
        {headerTitle && <h1>{headerTitle}</h1>}
        {}
        {optionBtn && authorization && (
          <OptionBtn onClick={modalOpen}>
            <span className="blind">옵션 버튼</span>
          </OptionBtn>
        )}
      </GoBackHeaderItems>
    </GoBackHeaderWrap>
  );
}

const GoBackHeaderWrap = styled.header`
  position: fixed;
  top: 0;
  width: 100%;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  background-color: ${PALLETS.WHITE};
  z-index: 9999;
`;

const GoBackHeaderItems = styled.div`
  position: relative;
  max-width: 90vw;
  height: 70px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;

  @media screen and (min-width: 420px) {
    max-width: 80vw;
  }
`;

const GoBackButton = styled.button`
  position: absolute;
  left: 0;
  font-size: 1.5rem;
  color: ${PALLETS.BLACK};

  &::after {
    content: '<';
  }
`;

const OptionBtn = styled.button`
  position: absolute;
  right: 0;

  &::after {
    content: '';
    display: block;
    width: 1.5rem;
    height: 1.5rem;
    background-image: url('/images/more.png');
    background-size: cover;
  }
`;
