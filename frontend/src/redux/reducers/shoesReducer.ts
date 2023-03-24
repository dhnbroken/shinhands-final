import { GETSHOES_START, GETSHOES_SUCCESS, GETSHOES_FAIL } from './../actions/types';

const initialState = { isLoggedIn: false, shoes: null, shoesInfo: null };

export default function (state = initialState, action: any) {
  const { type, data } = action;

  switch (type) {
    case GETSHOES_START:
      return { ...state };
    case GETSHOES_SUCCESS:
      return { ...state, shoes: data };
    case GETSHOES_FAIL:
      return { ...state, error: true };

    default:
      return state;
  }
}
