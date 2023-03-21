export type TLoginData = {
  username: string;
  password: string;
};

export type TRegisterData = {
  username: string;
  password: string;
  email: string;
};

export interface IUser {
  _id?: string;
  username?: string;
  password?: string;
  email?: string;
  createdAt?: string;
  isAdmin?: boolean;
  avatar?: string;
}

export interface ISneakerData {
  name: string;
  price: number;
  image: string;
  description: string;
}
