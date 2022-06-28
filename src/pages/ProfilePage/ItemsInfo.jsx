import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';

import axios from '../../api/axios';
import { setImgSrc } from 'utils/setImgSrc';

export default function ItemsInfo() {
  const userId = useParams().userId;

  const [itemsData, setItemsData] = useState([]);

  const getUserItem = async (profileUserId) => {
    const userToken = localStorage.getItem('token');

    await axios
      .get(`/user/${profileUserId}`, {
        headers: { Authorization: `Bearer ${userToken}` },
      })
      .then((res) => {
        console.log(res.data.items);
        setItemsData(res.data.items);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getUserItem(userId);
  }, [userId]);

  if (itemsData.length > 0) {
    return (
      <FeedInfoWrap>
        <h2 className="blind">업로드한 상품 정보</h2>
        <PostsContainer>
          {itemsData.map((item, index) => (
            <PostItem key={index}>
              <Link to={`/item/detail/${item.id}`}>
                <img src={setImgSrc(item.itemImageUrl)} alt={item.itemInfo} />
              </Link>
            </PostItem>
          ))}
        </PostsContainer>
      </FeedInfoWrap>
    );
  } else {
    return <NotExist>상품을 업로드하세요!</NotExist>;
  }
}

const FeedInfoWrap = styled.section`
  max-width: 95vw;
  margin: 1rem auto 5px;
`;

const PostsContainer = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2px;
`;

const PostItem = styled.li`
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const NotExist = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 550px;
`;
