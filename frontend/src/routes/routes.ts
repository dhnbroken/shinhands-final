import EditProduct from '~/components/EditProduct/EditProduct';
import Home from '~/pages/Home/Home';
import Login from '~/pages/Login/Login';
import Products from '~/pages/Products/Products';
import Register from '~/pages/Register/Register';
import User from '~/pages/User/User';
import UserInfo from '~/pages/UserInfo/UserInfo';

const publicRoutes = [
  { path: '/', component: Home },
  { path: '/user/:id', component: UserInfo },
  { path: '/sneaker', component: Products },
];

const adminRoute = [
  { path: '/user', component: User },
  { path: '/products', component: Products },
  { path: '/products/:id', component: EditProduct },
];

const authRoutes = [
  { path: '/login', component: Login },
  { path: '/register', component: Register },
];

export { publicRoutes, authRoutes, adminRoute };
