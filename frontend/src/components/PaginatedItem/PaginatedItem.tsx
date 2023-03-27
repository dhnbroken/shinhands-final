import * as React from 'react';
import { GridColDef, DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import { useDemoData } from '@mui/x-data-grid-generator';
import { GlobalContextProvider } from '~/Context/GlobalContext';

import DeleteIcon from '@mui/icons-material/Delete';
import EditModal from '../EditModal/EditModal';
import { deleteUser } from '~/API/user';
import EditIcon from '@mui/icons-material/Edit';
import { signout } from '~/API/auth';
import { CircularProgress } from '@mui/material';
import { IUser } from '~/store/interface';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function PaginatedItems({ loadingComponent }: any) {
  const { setUsers, users, loading, setLoading, setUser } = React.useContext(GlobalContextProvider);

  const accessToken = sessionStorage.getItem('accessToken');
  const userId = sessionStorage.getItem('userId');

  const [userInfo, setUserInfo] = React.useState<IUser>({});

  const [open, setOpen] = React.useState(false);
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

  const navigate = useNavigate();

  const handleUpdate = (params: any) => {
    setOpen(true);
    navigate(`/user/${params.id}`);
  };

  const columns: GridColDef[] = [
    { field: 'id', hideable: true },
    {
      field: 'username',
      headerName: 'Username',
      // width: 200,
      flex: 1,
    },
    {
      field: 'email',
      headerName: 'Email',
      flex: 2,
    },
    { field: 'isAdmin', headerName: 'Admin', flex: 1 },
    {
      field: 'createdAt',
      headerName: 'Created At',
      flex: 1,
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
          onClick={() => deleteUserAccount(accessToken, params.id as any)}
          disabled={!user?.isAdmin}
          showInMenu
        />,
        <GridActionsCellItem
          key={params.id}
          icon={<EditIcon />}
          label='Update'
          onClick={() => handleUpdate(params)}
          disabled={params.id !== userId}
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
      <EditModal
        open={open}
        setOpen={setOpen}
        loading={loading}
        userInfo={userInfo}
        setUserInfo={setUserInfo}
      />
    </div>
  );
}
