import ChartBarIcon from '@heroicons/react/24/solid/ChartBarIcon';
import HomeIcon from '@heroicons/react/24/solid/HomeIcon';
import ListBulletIcon from '@heroicons/react/24/solid/ListBulletIcon';
import BanknotesIcon from '@heroicons/react/24/solid/BanknotesIcon';
import { SvgIcon } from '@mui/material';

export const items = [
  {
    title: 'Principal',
    path: '/',
    icon: (
      <SvgIcon fontSize="small">
        <HomeIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Posições',
    path: '/positions',
    icon: (
      <SvgIcon fontSize="small">
        <ListBulletIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Proventos',
    path: '/payments',
    icon: (
      <SvgIcon fontSize="small">
        <BanknotesIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Relatorios',
    path: '/reports',
    icon: (
      <SvgIcon fontSize="small">
        <ChartBarIcon />
      </SvgIcon>
    )
  }
];
