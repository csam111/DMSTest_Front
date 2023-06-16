import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    title: true,
    name: 'Administracion'
  },
  {
    name: 'Usuarios',
    url: '/ListUser',
    iconComponent: { name: 'cilUserFollow' }
  },
  {
    name: 'MyAccount',
    url: '/MyAccount',
    iconComponent: { name: 'cilUserFollow' }
  },
];
