import express from 'express';
import { temporaryFormController } from './temporaryController';
import auth from '../../middlewares/auth';
import { USER_ROLES } from '../../../enums/user';
import fileUploadHandler from '../../middlewares/fileUploadHandler';

const router = express.Router();

router.post(
  '/temporary',

  fileUploadHandler(),
  temporaryFormController.createForm
);

router.get(
  '/temporary',

  temporaryFormController.getAllForms
);
router.get(
  '/temporary/:id',

  temporaryFormController.getFormById
);
router.patch(
  '/temporary/update/:id',
  fileUploadHandler(),
  temporaryFormController.updateForm
);
router.delete(
  '/temporary/:id',

  temporaryFormController.deleteForm
);

export const TemporaryRouter = router;
