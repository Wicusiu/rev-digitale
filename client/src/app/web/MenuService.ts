import { IUser } from 'app/business/user/User';

export interface MenuItem {
  title: string;
  iconClass: string;
  disabled: boolean;
  uri: string;
}

const getWorkspaceMenu = (user: IUser): MenuItem[] => {
  const menuItems: Array<MenuItem> = [
    {
      title: 'Les Bricks',
      iconClass: 'icon-Llist4',
      uri: `/bricks`,
      disabled: false,
    },
    {
      title: 'Mes Sessions',
      uri: '/sessions',
      iconClass: 'icon-Lcolor-sampler',
      disabled: false,
    },
  ];

  return menuItems;
};

export { getWorkspaceMenu };
