import * as shoesApi from '../../API/shoes';

export const getAllShoes = () => async (dispatch: any) => {
  dispatch({ type: 'GETSHOES_START' });
  try {
    const res = await shoesApi.getAllShoes();
    dispatch({ type: 'GETSHOES_SUCCESS', data: res });
  } catch (error) {
    console.log(error);
    dispatch({ type: 'GETSHOES_FAIL' });
  }
};
