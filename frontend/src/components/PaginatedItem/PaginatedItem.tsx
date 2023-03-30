import * as React from 'react';
import { GridColDef, DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import { useDemoData } from '@mui/x-data-grid-generator';
import { GlobalContextProvider } from '~/Context/GlobalContext';

import DeleteIcon from '@mui/icons-material/Delete';
import { deleteUser } from '~/API/user';
import { signout } from '~/API/auth';
import { CircularProgress, Switch } from '@mui/material';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '~/redux/hooks';
import { updateIsAdmin } from '~/redux/actions/userActions';
import Swal from 'sweetalert2';
import { swalConfig } from '~/utils/swalConfig';

export default function PaginatedItems({ loadingComponent }: any) {
  const { setUsers, users, setLoading, setUser } = React.useContext(GlobalContextProvider);

  const accessToken = sessionStorage.getItem('accessToken');
  const { user } = useSelector((state: any) => state.userReducer);

  const { data } = useDemoData({
    dataSet: 'Commodity',
    rowLength: 100,
    maxColumns: 6,
  });

  const deleteUserAccount = async (accessToken: string | null, userId: string | null) => {
    try {
      if (!user?.isAdmin) {
        signout(accessToken).then(() => {
          setUsers([]);
          setUser({});
        });
      }
      await deleteUser(accessToken, userId);
      setLoading(true);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteUser = (accessToken: string | null, userId: string | null) => {
    Swal.fire(swalConfig).then((result) => {
      if (result.isConfirmed) {
        deleteUserAccount(accessToken, userId).then(() => {
          Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
        });
      }
    });
  };

  const dispatch = useAppDispatch();

  const handleChange = (params: any) => {
    dispatch(updateIsAdmin({ ...params.row, isAdmin: !params.isAdmin }, accessToken, params.id));
  };
  const columns: GridColDef[] = [
    { field: 'index', headerName: 'Index', width: 50, hideable: false },
    {
      field: 'username',
      headerName: 'Username',
      width: 150,
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 200,
    },
    {
      field: 'isAdmin',
      headerName: 'Admin',
      width: 150,

      type: 'actions',
      getActions: (params) => [
        <Switch
          key={params.id}
          defaultChecked={params.row.isAdmin}
          onChange={() => handleChange(params.row)}
        />,
      ],
    },
    {
      field: 'createdAt',
      headerName: 'Created At',
      width: 150,
    },
    {
      field: 'actions',
      type: 'actions',
      width: 80,
      getActions: (params) => [
        <GridActionsCellItem
          key={params.id}
          icon={<DeleteIcon />}
          label='Delete'
          onClick={() => handleDeleteUser(accessToken, params.id as any)}
          disabled={!user?.isAdmin}
          showInMenu
        />,
      ],
    },
  ];

  return (
    <div style={{ height: '50vh', width: '100%' }}>
      {!accessToken && <div>You need to login to see this feature</div>}
      {loadingComponent ? (
        <CircularProgress />
      ) : (
        !!users && (
          <DataGrid
            {...users}
            initialState={{
              ...data.initialState,
              pagination: { paginationModel: { pageSize: 5 } },
            }}
            rows={users}
            columns={columns}
            pageSizeOptions={[5, 10]}
          />
        )
      )}
    </div>
  );
}
