import { ISneakerData } from '~/store/interface';
import {
  GETSHOES_START,
  GETSHOES_SUCCESS,
  GETSHOES_FAIL,
  GETSNEAKER_DETAILS,
  UPDATE_SNEAKER_SUCCESS,
  ADD_SNEAKER_SUCCESS,
} from './../actions/productTypes';

const shoesInfoInit: ISneakerData = {
  name: '',
  price: 0,
  salePercents: 0,
  image: 'dfshoes.png',
  description: '',
  category: '',
  brands: '',
};

const initialState = { isLoggedIn: false, shoes: null, shoesInfo: shoesInfoInit };

export default function (state = initialState, action: any) {
  const { type, data } = action;

  switch (type) {
    case GETSHOES_START:
      return { ...state };
    case GETSHOES_SUCCESS:
      return { ...state, shoes: data };
    case GETSHOES_FAIL:
      return { ...state, error: true };
    case GETSNEAKER_DETAILS:
      return { ...state, shoesInfo: data };
    case UPDATE_SNEAKER_SUCCESS:
      return { ...state, shoesInfo: data };
    case ADD_SNEAKER_SUCCESS:
      return { ...state, shoesInfo: data };
    default:
      return state;
  }
}
