import React from 'react';
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSelector } from '@/hooks/useTypedSelector';

import axios from '@/api/axios';
import { isLogined } from '@/utils/isLogined';

import GoBackHeader from '@/components/GoBackHeader';
import OptionModal from '@/components/OptionModal';
import ItemData from './ItemData';
import CommentsData from './CommentsData';
import InputComment from './InputComment';
import ItemLoading from './ItemLoading';

import { setItemDetail } from '@/modules/itemModule';

export default function ItemDetailPage() {
  const dispatch = useDispatch();
  const itemId = useParams().itemId;

  const { modalOpen } = useSelector((state) => state.isModalOpen);
  const storedItemId = useSelector((state) => state.itemDetail.itemId);

  const [loading, setLoading] = useState(true);

  const getItem = async () => {
    await axios
      .get(`/item/detail/${itemId}`)
      .then((res) => {
        dispatch(
          setItemDetail({ ...res.data, itemId: String(res.data.itemId) })
        );
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (itemId !== storedItemId) {
      getItem();
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <>
      <GoBackHeader headerTitle="상품" optionBtn />
      <ItemDetailWrap>
        {!loading ? (
          <>
            <ItemData />
            <CommentsData />
          </>
        ) : (
          <ItemLoading />
        )}
        {isLogined() && <InputComment />}
      </ItemDetailWrap>
      {!!modalOpen && <OptionModal />}
    </>
  );
}

const ItemDetailWrap = styled.main`
  padding-bottom: 150px;
`;
