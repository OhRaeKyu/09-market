import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { PALLETS } from '@/utils/constants';

interface GoBackHeaderProps {
  headerTitle: string;
  setStep?: (step: string) => string;
  optionBtn?: boolean;
}

export default function GoBackHeader({
  headerTitle,
  setStep,
  optionBtn,
}: GoBackHeaderProps) {
  const navigate = useNavigate();
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
        {optionBtn && <OptionBtn />}
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
  width: 1.5rem;
  height: 1.5rem;

  &::after {
    content: '';
    background-image: url('/images/more.png');
  }
`;
