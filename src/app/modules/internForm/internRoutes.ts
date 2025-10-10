import express from 'express';
import { InternController } from './internController';
import { USER_ROLES } from '../../../enums/user';
import auth from '../../middlewares/auth';
import fileUploadHandler from '../../middlewares/fileUploadHandler';

const router = express.Router();

router.post('/intern', fileUploadHandler(), InternController.createIntern);

router.get('/intern', InternController.getAllInterns);

router.get('/intern/:id', InternController.getIntern);

router.patch('/intern/:id', fileUploadHandler(), InternController.updateIntern);

router.delete('/intern/:id', InternController.deleteIntern);

export const InternRoutes = router;
