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
  firstname?: string;
  lastname?: string;
  avatar?: string;
  phoneNumber?: string;
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  relationship?: string;
  country?: string;
}

export interface ISneakerData {
  _id?: string;
  name: string;
  price: number;
  image: string;
  description: string;
}
