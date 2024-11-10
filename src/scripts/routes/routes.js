import RestoList from '../views/pages/resto-list';
import Favorite from '../views/pages/favorite';
import Detail from '../views/pages/detail';
 
const routes = {
  '/': RestoList, // default page
  '/resto-list': RestoList,
  '/favorite': Favorite,
  '/detail/:id': Detail,
};
 
export default routes;