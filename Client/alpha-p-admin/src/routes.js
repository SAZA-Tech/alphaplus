import React from 'react';


const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'));
const Comments = React.lazy(() => import('./views/comments/Comments'));
const Articles = React.lazy(() => import('./views/articles/Articles'));
const Companies = React.lazy(() => import('./views/companies/Companies'));
const News = React.lazy(() => import('./views/news/News'));
const Sectors = React.lazy(() => import('./views/sectors/Sectors'));
const Users = React.lazy(() => import('./views/users/Users'));

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/companies', name: 'Companies', component: Companies },
  { path: '/news', name: 'News', component: News },
  { path: '/sectors', name: 'Sectors', component: Sectors },

  { path: '/comments', name: 'Comments', component: Comments },
  { path: '/articles', name: 'Articles', component: Articles },
  
  { path: '/users', exact: true,  name: 'Users', component: Users },
];

export default routes;
