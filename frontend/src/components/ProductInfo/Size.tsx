import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

export default function SneakerSize() {
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number,
  ) => {
    setSelectedIndex(index);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <List
        component='ul'
        aria-label='main mailbox folders'
        sx={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}
      >
        <ListItemButton
          sx={{ width: { xs: '35%', md: '18%' } }}
          selected={selectedIndex === 0}
          onClick={(event) => handleListItemClick(event, 0)}
        >
          <ListItemText primary='33' />
        </ListItemButton>
        <ListItemButton
          sx={{ width: { xs: '35%', md: '18%' } }}
          selected={selectedIndex === 1}
          onClick={(event) => handleListItemClick(event, 1)}
        >
          <ListItemText primary='34' />
        </ListItemButton>
        <ListItemButton
          sx={{ width: { xs: '35%', md: '18%' } }}
          selected={selectedIndex === 2}
          onClick={(event) => handleListItemClick(event, 2)}
        >
          <ListItemText primary='35' />
        </ListItemButton>
        <ListItemButton
          sx={{ width: { xs: '35%', md: '18%' } }}
          selected={selectedIndex === 3}
          onClick={(event) => handleListItemClick(event, 3)}
        >
          <ListItemText primary='36' />
        </ListItemButton>
        <ListItemButton
          sx={{ width: { xs: '35%', md: '18%' } }}
          selected={selectedIndex === 4}
          onClick={(event) => handleListItemClick(event, 4)}
        >
          <ListItemText primary='37' />
        </ListItemButton>
        <ListItemButton
          sx={{ width: { xs: '35%', md: '18%' } }}
          selected={selectedIndex === 5}
          onClick={(event) => handleListItemClick(event, 5)}
        >
          <ListItemText primary='38' />
        </ListItemButton>
        <ListItemButton
          sx={{ width: { xs: '35%', md: '18%' } }}
          selected={selectedIndex === 6}
          onClick={(event) => handleListItemClick(event, 6)}
        >
          <ListItemText primary='39' />
        </ListItemButton>
        <ListItemButton
          sx={{ width: { xs: '35%', md: '18%' } }}
          selected={selectedIndex === 7}
          onClick={(event) => handleListItemClick(event, 7)}
        >
          <ListItemText primary='40' />
        </ListItemButton>
        <ListItemButton
          sx={{ width: { xs: '35%', md: '18%' } }}
          selected={selectedIndex === 8}
          onClick={(event) => handleListItemClick(event, 8)}
        >
          <ListItemText primary='41' />
        </ListItemButton>
        <ListItemButton
          sx={{ width: { xs: '35%', md: '18%' } }}
          selected={selectedIndex === 9}
          onClick={(event) => handleListItemClick(event, 9)}
        >
          <ListItemText primary='42' />
        </ListItemButton>
      </List>
    </Box>
  );
}
