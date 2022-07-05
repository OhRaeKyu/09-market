import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { PALLETS } from '@/utils/constants';
import axios from '@/api/axios';

interface ItemUploadFormData {
  itemImageUrl: string;
  name: string;
  itemInfo: string;
  price: number;
  amount: number;
  category: string;
  instagramUrl: string;
}

export default function ItemUploadForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<ItemUploadFormData>({
    itemImageUrl: '',
    name: '',
    itemInfo: '',
    price: 0,
    amount: 0,
    category: '',
    instagramUrl: '',
  });

  const [disabledBtn, setDisabledBtn] = useState<boolean>(true);

  const uploadVerify = () => {
    const {
      itemImageUrl,
      name,
      itemInfo,
      price,
      amount,
      category,
      instagramUrl,
    } = formData;
    if (
      itemImageUrl.length > 0 &&
      name.length > 0 &&
      itemInfo.length > 0 &&
      price > 0 &&
      amount > 0 &&
      category.length > 0 &&
      instagramUrl.length > 0
    ) {
      setDisabledBtn(false);
    } else {
      setDisabledBtn(true);
    }
  };

  const encodeFileToBase64 = (fileBlob: Blob) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    return new Promise<void>((resolve) => {
      reader.onload = () => {
        setFormData({
          ...formData,
          itemImageUrl: String(reader.result),
        });
        resolve();
      };
    });
  };

  const handleInputImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      encodeFileToBase64(e.target.files[0]);
    }
  };

  const handleFormData = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: string
  ) => {
    if (key === ('price' || 'amount')) {
      setFormData({ ...formData, [key]: parseInt(e.target.value) });
    } else {
      setFormData({ ...formData, [key]: e.target.value });
    }
  };

  const handleUploadBtn = (uploadData: ItemUploadFormData) => {
    const data = {
      ...uploadData,
      itemImageUrl: uploadData.itemImageUrl.replace(
        /^data:image\/[a-z]+;base64,/,
        ''
      ),
    };
    const userToken = sessionStorage.getItem('token');
    const headers = {
      Authorization: `Bearer ${userToken}`,
    };

    axios
      .post(`/item`, data, { headers })
      .then(() => {
        navigate('/');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <PostUploadWrap>
      <Form>
        <ImgUpload itemImgUrl={formData.itemImageUrl}>
          <input
            type="file"
            className="blind"
            accept="image/*"
            onChange={handleInputImg}
          />
          {formData.itemImageUrl.length === 0 && '+'}
        </ImgUpload>
        <label htmlFor="inpName">상품명</label>
        <input
          type="text"
          placeholder="상품명 입력"
          required
          id="inpName"
          value={formData.name}
          onChange={(e) => handleFormData(e, 'name')}
          onKeyUp={uploadVerify}
        />
        <label htmlFor="inpInfo">상품정보</label>
        <input
          type="textarea"
          placeholder="상품정보 입력"
          required
          id="inpInfo"
          value={formData.itemInfo}
          onChange={(e) => handleFormData(e, 'itemInfo')}
          onKeyUp={uploadVerify}
        />
        <label htmlFor="inpPrice">가격</label>
        <input
          type="number"
          placeholder="가격 입력"
          required
          id="inpPrice"
          value={formData.price}
          onChange={(e) => handleFormData(e, 'price')}
          onKeyUp={uploadVerify}
        />
        <label htmlFor="inpAmount">수량</label>
        <input
          type="number"
          placeholder="수량 입력"
          required
          id="inpAmount"
          value={formData.amount}
          onChange={(e) => handleFormData(e, 'amount')}
          onKeyUp={uploadVerify}
        />
        <label htmlFor="inpCategory">카테고리(수정 예정)</label>
        <input
          type="text"
          placeholder="카테고리 입력"
          required
          id="inpCategory"
          value={formData.category}
          onChange={(e) => handleFormData(e, 'category')}
          onKeyUp={uploadVerify}
        />
        <label htmlFor="inpUrl">Instgram URL</label>
        <input
          type="text"
          placeholder="URL 입력"
          required
          id="inpUrl"
          value={formData.instagramUrl}
          onChange={(e) => handleFormData(e, 'instagramUrl')}
          onKeyUp={uploadVerify}
        />
      </Form>
      <UploadButton
        type="button"
        disabled={disabledBtn}
        onClick={() => handleUploadBtn(formData)}
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
  width: 90vw;

  input {
    border: 1px solid ${PALLETS.LIGHT_GRAY};
    padding: 10px;
    margin-bottom: 10px;
  }

  label {
    margin: 0 0 5px 10px;
  }

  @media screen and (min-width: 420px) {
    width: 70vw;
  }
`;

const ImgUpload = styled.label<{ itemImgUrl: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 300px;
  height: 300px;
  margin: 0 auto 20px !important;
  font-size: 3rem;
  color: rgba(0, 0, 0, 0.3);

  ${(props) =>
    props.itemImgUrl.length > 0 && `background-image:url(${props.itemImgUrl});`}
  background-size: cover;
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 5px;

  @media screen and (min-width: 420px) {
    width: 500px;
    height: 500px;
  }
`;

const UploadButton = styled.button`
  background-color: ${PALLETS.PURPLE};
  color: ${PALLETS.WHITE};
  padding: 15px 0;
  width: 70vw;

  &:disabled {
    cursor: inherit;
    opacity: 0.5;
  }
`;
