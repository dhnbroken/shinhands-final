import { ISneakerData } from '~/store/interface';
import * as shoesApi from '../../API/shoes';

export const getAllShoes = () => async (dispatch: any) => {
  dispatch({ type: 'GETSHOES_START' });
  try {
    const res = await shoesApi.getAllShoes();
    dispatch({ type: 'GETSHOES_SUCCESS', data: res });
  } catch (error) {
    console.error(error);
    dispatch({ type: 'GETSHOES_FAIL' });
  }
};

export const getShoesData = (id: string | undefined) => async (dispatch: any) => {
  try {
    const res = await shoesApi.getShoesData(id);
    dispatch({ type: 'GETSNEAKER_DETAILS', data: res });
  } catch (error) {
    console.error(error);
    dispatch({ type: 'GETSHOES_FAIL' });
  }
};

export const addShoes =
  (data: ISneakerData, accessToken: string | null) => async (dispatch: any) => {
    try {
      const res = await shoesApi.addShoes(data, accessToken);
      dispatch({ type: 'ADD_SNEAKER_SUCCESS', data: res });
    } catch (err) {
      console.error(err);
    }
  };

export const updateShoes =
  (data: ISneakerData, accessToken: string | null, id: string | undefined) =>
  async (dispatch: any) => {
    try {
      const res = await shoesApi.updateShoesData(data, accessToken, id);
      dispatch({ type: 'UPDATE_SNEAKER_SUCCESS', data: res });
    } catch (err) {
      console.error(err);
    }
  };
