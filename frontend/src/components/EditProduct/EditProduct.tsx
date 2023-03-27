import { Box, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getShoesData } from '~/API/shoes';
import { ISneakerData } from '~/store/interface';

const EditProduct: React.FC = () => {
  const { id } = useParams();
  console.log(id);
  const [sneaker, setSneaker] = useState<ISneakerData>();

  const getSneaker = async (id: string | undefined) => {
    try {
      const res = await getShoesData(id);
      setSneaker(res);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getSneaker(id);
  }, []);
  return (
    <Box marginTop={2}>
      <Grid container spacing={2}>
        <Grid item xs={6} container spacing={3}>
          <Grid item xs={12}>
            <Typography variant='h6'>Product Name</Typography>
            <TextField
              variant='outlined'
              className='user_textfield'
              fullWidth
              placeholder={sneaker?.name}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant='h6'>Description</Typography>
            <TextField
              multiline
              rows={12}
              fullWidth
              sx={{ height: '100%' }}
              className='user_textfield'
              defaultValue={sneaker?.description}
            />
          </Grid>
        </Grid>
        <Grid item xs={6}>
          s
        </Grid>
      </Grid>
    </Box>
  );
};

export default EditProduct;
