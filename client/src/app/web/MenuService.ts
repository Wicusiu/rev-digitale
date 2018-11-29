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
      title: 'Mon Parcours',
      uri: '/pathway',
      iconClass: 'icon-Llist4',
      disabled: false,
    },
    {
      title: 'Les Bricks',
      iconClass: 'icon-Lcolor-sampler',
      uri: `/bricks`,
      disabled: false,
    },
  ];

  return menuItems;
};

export { getWorkspaceMenu };
