// assets
import { IconDashboard,IconUsers } from '@tabler/icons-react';

// constant
const icons = { IconDashboard ,IconUsers};

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const admin = [{
  id: 'dashboard',
  title: '',
  type: 'group',
  children: [
    {
      id: 'default',
      title: 'Dashboard',
      type: 'item',
      url: '/admin/dashboard',
      icon: icons.IconDashboard,
      breadcrumbs: false
    }
  ]
},
{
  id: 'configration',
  title: 'configration',
  type: 'group',
  children: [
    {
      id: 'defaul1',
      title: 'User',
      type: 'item',
      url: '/admin/config/user',
      icon: icons.IconUsers,
      breadcrumbs: false
    }
  ]
}];

export default admin;
