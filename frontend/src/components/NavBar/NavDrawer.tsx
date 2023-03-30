/* eslint-disable react-hooks/rules-of-hooks */
import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import ListDrawer from './ListDrawer';
import { Grid } from '@mui/material';
import { Menu } from '@mui/icons-material';

type Anchor = 'top' | 'left' | 'bottom' | 'right';

export default function NavDrawer() {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer =
    (anchor: Anchor, open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

  const list = (anchor: Anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role='presentation'
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <ListDrawer />
    </Box>
  );

  return (
    <div>
      <React.Fragment key={'right'}>
        <Grid
          item
          xs={5}
          sx={{
            paddingTop: '0px !important',
            display: { md: 'none' },
          }}
        >
          <Button sx={{ marginLeft: '80px' }} onClick={toggleDrawer('right', true)}>
            <Menu
              sx={{ display: { xs: 'flex', md: 'none' }, color: '#18b7d9', fontSize: '40px' }}
            />
          </Button>
          <Drawer anchor={'right'} open={state['right']} onClose={toggleDrawer('right', false)}>
            {list('right')}
          </Drawer>
        </Grid>
      </React.Fragment>
    </div>
  );
}
