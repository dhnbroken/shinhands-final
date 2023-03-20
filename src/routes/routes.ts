import DashBoard from '~/pages/DashBoard/DashBoard';
import Home from '~/pages/Home/Home';
import Login from '~/pages/Login/Login';
import Register from '~/pages/Register/Register';
import User from '~/pages/User/User';

const publicRoutes = [
  { path: '/', component: Home },
  { path: '/dashboard', component: DashBoard },
  { path: '/user', component: User },
  { path: '/user/:id', component: User },
];

const authRoutes = [
  { path: '/login', component: Login },
  { path: '/register', component: Register },
];

export { publicRoutes, authRoutes };
