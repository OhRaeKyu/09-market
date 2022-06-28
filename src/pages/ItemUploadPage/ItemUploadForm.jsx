import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { PALLETS } from 'utils/constants';
import axios from '../../api/axios';

export default function ItemUploadForm() {
  const navigate = useNavigate();

  const [inputImgUrl, setInputImgUrl] = useState('');
  const [inputName, setInputName] = useState('');
  const [inputInfo, setInputInfo] = useState('');
  const [inputPrice, setInputPrice] = useState(0);
  const [inputAmount, setInputAmount] = useState(0);
  const [inputCategory, setInputCategory] = useState('');
  const [inputUrl, setInputUrl] = useState('');

  const [postData, setPostData] = useState({});

  const [disabledBtn, setDisabledBtn] = useState(true);

  useEffect(() => {
    if (
      inputImgUrl.length > 0 &&
      inputName.length > 0 &&
      inputInfo.length > 0 &&
      inputPrice > 0 &&
      inputAmount > 0 &&
      inputCategory.length > 0 &&
      inputUrl.length > 0
    ) {
      setDisabledBtn(false);
    } else {
      setDisabledBtn(true);
    }
  }, [
    inputImgUrl,
    inputName,
    inputInfo,
    inputPrice,
    inputAmount,
    inputCategory,
    inputUrl,
  ]);

  const handleUserData = (key, value) => {
    setPostData((prevObject) => ({ ...prevObject, [key]: value }));
  };

  const handleInputImg = (e) => {
    encodeFileToBase64(e.target.files[0]);
  };

  const encodeFileToBase64 = (fileBlob) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    return new Promise((resolve) => {
      reader.onload = () => {
        setInputImgUrl(reader.result);
        handleUserData(
          'itemImageUrl',
          reader.result.replace(/^data:image\/[a-z]+;base64,/, '')
        );
        resolve();
      };
    });
  };

  const handleInputName = (e) => {
    setInputName(e.target.value);
    handleUserData('name', e.target.value);
  };

  const handleInputInfo = (e) => {
    setInputInfo(e.target.value);
    handleUserData('itemInfo', e.target.value);
  };

  const handleInputPrice = (e) => {
    setInputPrice(e.target.value);
    handleUserData('price', parseInt(e.target.value, 10));
  };

  const handleInputAmount = (e) => {
    setInputAmount(e.target.value);
    handleUserData('amount', parseInt(e.target.value, 10));
  };

  const handleInputCategory = (e) => {
    setInputCategory(e.target.value);
    handleUserData('category', e.target.value);
  };

  const handleInputUrl = (e) => {
    setInputUrl(e.target.value);
    handleUserData('instagramUrl', e.target.value);
  };

  const handleUploadBtn = (postData) => {
    const userToken = localStorage.getItem('token');
    const data = postData;
    const headers = {
      Authorization: `Bearer ${userToken}`,
    };

    axios
      .post(`/item`, data, { headers })
      .then((res) => {
        navigate('/');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <PostUploadWrap>
      <Form>
        <ImgUpload itemImgUrl={inputImgUrl}>
          <input
            type="file"
            className="blind"
            accept="image/*"
            onChange={handleInputImg}
          />
          {inputImgUrl.length === 0 && '+'}
        </ImgUpload>
        <label htmlFor="inpName">상품명</label>
        <input
          type="text"
          placeholder="상품명 입력"
          required
          id="inpName"
          value={inputName}
          onChange={handleInputName}
        />
        <label htmlFor="inpInfo">상품정보</label>
        <input
          type="textarea"
          placeholder="상품정보 입력"
          required
          id="inpInfo"
          value={inputInfo}
          onChange={handleInputInfo}
        />
        <label htmlFor="inpPrice">가격</label>
        <input
          type="number"
          placeholder="가격 입력."
          required
          id="inpPrice"
          value={inputPrice}
          onChange={handleInputPrice}
        />
        <label htmlFor="inpAmount">수량</label>
        <input
          type="number"
          placeholder="수량 입력"
          required
          id="inpAmount"
          value={inputAmount}
          onChange={handleInputAmount}
        />
        <label htmlFor="inpCategory">카테고리(수정 예정)</label>
        <input
          type="text"
          placeholder="카테고리 입력"
          required
          id="inpCategory"
          value={inputCategory}
          onChange={handleInputCategory}
        />
        <label htmlFor="inpUrl">Instgram URL</label>
        <input
          type="text"
          placeholder="URL 입력"
          required
          id="inpUrl"
          value={inputUrl}
          onChange={handleInputUrl}
        />
      </Form>
      <UploadButton
        type="button"
        disabled={disabledBtn}
        onClick={() => handleUploadBtn(postData)}
      >
        게시하기
      </UploadButton>
    </PostUploadWrap>
  );
}

const PostUploadWrap = styled.main`
  margin-top: 80px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 95vw;

  input {
    border: 1px solid ${PALLETS.LIGHT_GRAY};
    padding: 10px;
    margin-bottom: 10px;
  }

  label {
    margin: 0 0 5px 10px;
  }
`;

const ImgUpload = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${PALLETS.WHITE};
  width: 100%;
  height: 250px;
  margin: 0 auto 20px !important;
  font-size: 3rem;

  ${(props) =>
    props.itemImgUrl.length > 0
      ? `background-image:url(${props.itemImgUrl});`
      : `background-color : ${PALLETS.PURPLE};`}
  background-size: cover;
  border-radius: 5px;

  @media screen and (min-width: 420px) {
    height: 500px;
  }
`;

const UploadButton = styled.button`
  background-color: ${PALLETS.PURPLE};
  color: ${PALLETS.WHITE};
  padding: 15px 0;
  width: 80%;

  &:disabled {
    cursor: inherit;
    opacity: 0.5;
  }
`;
