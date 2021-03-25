import React from 'react';


const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'));
const Comments = React.lazy(() => import('./views/comments/Comments'));
const Articles = React.lazy(() => import('./views/articles/Articles'));
const Companies = React.lazy(() => import('./views/companies/Companies'));
const News = React.lazy(() => import('./views/news/News'));
const Sectors = React.lazy(() => import('./views/sectors/Sectors'));
const UsersInfo = React.lazy(() => import('./views/users/usersInfo/UsersInfo'));
const UsersRequests = React.lazy(() => import('./views/users/usersRequests/UsersRequests'));


const routes = [
  { path: '/',  name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/companies', name: 'Companies', component: Companies },
  { path: '/news', name: 'News', component: News },
  { path: '/sectors', name: 'Sectors', component: Sectors },

  { path: '/comments', name: 'Comments', component: Comments },
  { path: '/articles', name: 'Articles', component: Articles },
  
  { path: '/users', name: 'Users'},
  { path: '/users/usersInfo', name: 'UsersInfo', component: UsersInfo },
  { path: '/users/usersRequests', name: 'UsersRequests', component: UsersRequests },


];

export default routes;
