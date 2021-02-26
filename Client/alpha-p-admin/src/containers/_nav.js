import React from 'react'
import CIcon from '@coreui/icons-react'

const _nav =  [
  {
    _tag: 'CSidebarNavItem',
    name: 'Dashboard',
    to: '/dashboard',    
  },

  {
    _tag: 'CSidebarNavItem',
    name: 'Users',
    to: '/users',
  },
 
  {
    _tag: 'CSidebarNavItem',
    name: 'Companies',
    to: '/companies',
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Articles',
    to: '/articles',
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'News',
    to: '/news',
  },

  {
    _tag: 'CSidebarNavItem',
    name: 'Sectors',
    to: '/sectors',
  },


  {
    _tag: 'CSidebarNavItem',
    name: 'Comments',
    to: '/comments',
  },
 
  
  
  {
    _tag: 'CSidebarNavDivider',
    className: 'm-2'
  },
  
  {
    _tag: 'CSidebarNavDivider',
    className: 'm-2'
  }
]

export default _nav
