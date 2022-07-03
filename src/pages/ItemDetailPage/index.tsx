import styled from 'styled-components';
import { useSelector } from '@/hooks/useTypedSelector';

import GoBackHeader from '@/components/GoBackHeader';
import ItemData from './ItemData';
import CommentsData from './CommentsData';
import InputComment from './InputComment';
import OptionModal from '@/components/OptionModal';

export default function ItemDetailPage() {
  const modalOpen = useSelector((state) => state.isModalOpen);

  return (
    <>
      <GoBackHeader headerTitle="상품" optionBtn />
      <ItemDetailWrap>
        <ItemData />
        <CommentsData />
        <InputComment />
      </ItemDetailWrap>
      {!!modalOpen && <OptionModal />}
    </>
  );
}

const ItemDetailWrap = styled.main``;
