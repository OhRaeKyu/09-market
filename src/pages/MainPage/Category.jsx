import React from 'react';
import styled from 'styled-components';
import { PALLETS } from 'utils/constants';

export default function Category({ currentCategory, setCurrentCategory }) {
  const categoryData = ['전체', '화장품', '기타'];

  const handleCategory = (e) => {
    if (currentCategory !== e.target.innerText) {
      setCurrentCategory(e.target.innerText);
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
