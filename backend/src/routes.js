import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import PlanController from './app/controllers/PlanController';
import FileController from './app/controllers/FileController';
import SessionController from './app/controllers/SessionController';
import StudentController from './app/controllers/StudentController';
import CheckinController from './app/controllers/CheckinController';
import DashboardController from './app/controllers/DashboardController';
import HelpOrderController from './app/controllers/HelpOrderController';
import RegistrationController from './app/controllers/RegistrationController';
import SessionStudentController from './app/controllers/SessionStudentController';

import authMiddleware from './app/middlewares/auth';
import adminMiddleware from './app/middlewares/admin';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/sessions', SessionController.store);
routes.post('/sessions/student', SessionStudentController.store);

routes.post('/students/:id/checkins', CheckinController.store);
routes.get('/students/:id/checkins', CheckinController.index);

routes.post('/students/:id/help-orders', HelpOrderController.store);
routes.get('/students/:id/help-orders', HelpOrderController.index);

routes.use(authMiddleware);
routes.use(adminMiddleware);

routes.get('/dashboard', DashboardController.index);

routes.post('/plans', PlanController.store);
routes.get('/plans', PlanController.index);
routes.get('/plans/:id', PlanController.show);
routes.put('/plans/:id', PlanController.update);
routes.delete('/plans/:id', PlanController.delete);

routes.post('/users', UserController.store);
routes.get('/users', UserController.index);
routes.put('/users', UserController.update);

routes.post('/files', upload.single('file'), FileController.store);

routes.post('/students', StudentController.store);
routes.get('/students', StudentController.index);
routes.get('/students/:id', StudentController.show);
routes.put('/students/:id', StudentController.update);
routes.delete('/students/:id', StudentController.delete);

routes.post('/registrations', RegistrationController.store);
routes.get('/registrations', RegistrationController.index);
routes.get('/registrations/:id', RegistrationController.show);
routes.put('/registrations/:id', RegistrationController.update);
routes.delete('/registrations/:id', RegistrationController.delete);

routes.get('/help-orders', HelpOrderController.show);
routes.post('/help-orders/:id/answer', HelpOrderController.store);
routes.put('/help-orders/:id/answer', HelpOrderController.update);

export default routes;
