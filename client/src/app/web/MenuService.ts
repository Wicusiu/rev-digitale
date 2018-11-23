import { IUser } from 'app/business/user/User';

export interface MenuItem {
  title: string;
  iconClass: string;
  disabled: boolean;
  uri: string;
}

const isCollectiveOutingEnable = () => true;

const getWorkspaceMenu = (user: IUser): MenuItem[] => {
  const menuItems: Array<MenuItem> = [
    {
      title: 'Les (R)Bricks',
      iconClass: 'icon-Llist4',
      uri: `/bricks`,
      disabled: false,
    },
    {
      title: 'Mes (R)Sessions',
      uri: '/sessions',
      iconClass: 'icon-Lcolor-sampler',
      disabled: false,
    },
  ];

  return menuItems;
};

export { getWorkspaceMenu };
