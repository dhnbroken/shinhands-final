import EditProduct from '~/components/EditProduct/EditProduct';
import Login from '~/pages/Login/Login';
import Products from '~/pages/Products/Products';
import Register from '~/pages/Register/Register';
import User from '~/pages/User/User';
import UserInfo from '~/pages/UserInfo/UserInfo';

const publicRoutes = [
  { path: '/user/:id', component: UserInfo },
  { path: '/shop/sneaker', component: Products },
];

const adminRoute = [
  { path: '/user', component: User },
  { path: '/products', component: Products },
  { path: '/products/:id', component: EditProduct },
  { path: '/products/add', component: EditProduct },
];

const authRoutes = [
  { path: '/login', component: Login },
  { path: '/register', component: Register },
];

export { publicRoutes, authRoutes, adminRoute };
