import Transformer from 'renderer/pages/Transformer';
import Viewer from 'renderer/pages/Viewer';
import { ArrowsPointingInIcon, CubeIcon } from '@heroicons/react/24/outline';

export default [
  {
    name: 'transformer',
    path: '/',
    element: <Transformer />,
    icon: (clasName: string) => <ArrowsPointingInIcon className={clasName} />,
  },
  {
    name: 'viewer',
    path: '/viewer',
    element: <Viewer />,
    icon: (clasName: string) => <CubeIcon className={clasName} />,
  },
];
