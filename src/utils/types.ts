// 아이템
interface Item {
  itemId: string;
  name: string;
  itemImageUrl: string;
}

interface Comment {
  commentId: string;
  userId: string;
  content: string;
  nickname: string;
  userImageUrl: string | null;
}

export interface InitItemsList {
  items: (Item & {
    comments: number;
  })[];
}

export interface InitItemDetail extends Item {
  comments: Comment[];
  userId: string;
  instagramUrl: string;
  itemInfo: string;
  price: number;
  amount: number;
  category: string;
}

// 유저
interface ProfileItem {
  id: string;
  itemImageUrl: string;
  itemInfo: string;
}

export interface InitUserData {
  email: string;
  nickname: string;
  mobile: string;
  address: string;
  zipcode: string;
  userImageUrl: string | null;
  userInfo: string | null;
}

export interface InitUserProfile {
  userId: string;
  nickname: string;
  userImageUrl: string | null;
  userInfo: string;
  items: ProfileItem[];
}
