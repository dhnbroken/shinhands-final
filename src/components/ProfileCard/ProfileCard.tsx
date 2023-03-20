import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { IUser } from '~/store/interface';
import Cookies from 'js-cookie';

interface Props {
  user: IUser | undefined;
}
export default function ProfileCard(props: Props) {
  const currentUser = sessionStorage.getItem('userId');
  const { user } = props;

  const handleUpdateUser = () => {
    // console.log(user);
  };
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        image='https://images.squarespace-cdn.com/content/v1/54b7b93ce4b0a3e130d5d232/1519987020970-8IQ7F6Z61LLBCX85A65S/icon.png?format=500w'
        title='green iguana'
      />
      <CardContent>
        <Typography gutterBottom variant='h5' component='div'>
          {user?.username}
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          Email: {user?.email}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size='small'
          disabled={!!user && user._id !== currentUser}
          onClick={() => handleUpdateUser()}
        >
          Modify
        </Button>
        <Button size='small'>Learn More</Button>
      </CardActions>
    </Card>
  );
}
