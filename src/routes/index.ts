import express from 'express';
import { AuthRoutes } from '../app/modules/auth/auth.route';
import { UserRoutes } from '../app/modules/user/user.route';
import { InternRoutes } from '../app/modules/internForm/internRoutes';
import { AdminFormRoutes } from '../app/modules/adminForm/admin.routes';
import { TemporaryRouter } from '../app/modules/temporaryForm/temporaryRoutes';
const router = express.Router();

const apiRoutes = [
  {
    path: '/user',
    route: UserRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/internForm',
    route: InternRoutes,
  },
  {
    path: '/temporaryForm',
    route: TemporaryRouter,
  },
  {
    path: '/admin',
    route: AdminFormRoutes,
  },
];

apiRoutes.forEach(route => router.use(route.path, route.route));

export default router;
