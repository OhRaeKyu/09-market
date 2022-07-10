import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { useSelector } from '@/hooks/useTypedSelector';

import { PALLETS } from '@/utils/constants';
import { setCategory } from '@/modules/categoryModule';
import { RootState } from '@/modules/index';

export default function Category() {
  const categoryData = ['전체', '패션', '뷰티', '식품', '기타'];

  const dispatch = useDispatch();
  const { currentCategory } = useSelector((state: RootState) => state.category);

  const handleCategory = (e: React.MouseEvent) => {
    const eventTarget = e.target as HTMLElement;
    if (currentCategory !== eventTarget.innerText) {
      dispatch(setCategory(eventTarget.innerText));
    }
  };

  return (
    <CategoryWrap>
      <CategoryContainer>
        {categoryData.map((category) => {
          if (category === currentCategory) {
            return (
              <ClickedCategoryItem key={category}>
                {category}
              </ClickedCategoryItem>
            );
          } else {
            return (
              <CategoryItem onClick={handleCategory} key={category}>
                {category}
              </CategoryItem>
            );
          }
        })}
      </CategoryContainer>
    </CategoryWrap>
  );
}

const CategoryWrap = styled.div`
  width: 100%;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

const CategoryContainer = styled.ul`
  display: flex;
  align-items: center;
  max-width: 90vw;
  height: 50px;
  margin: 0 auto;

  @media screen and (min-width: 420px) {
    max-width: 70vw;
  }
`;

const CategoryItem = styled.li`
  cursor: pointer;

  & + li {
    margin-left: 10px;
  }
`;

const ClickedCategoryItem = styled(CategoryItem)`
  font-family: 'GmarketSansBold';
  color: ${PALLETS.PURPLE};
`;
