import { Router } from 'express';
import {
  createTeacherHandler,
  deleteTeacherHandler,
  getTeacherByIdHandler,
  listTeachersHandler,
  updateTeacherHandler,
} from '../../controllers/teacher.controller';

const router = Router();

router.post('/', createTeacherHandler);
router.get('/', listTeachersHandler);
router.get('/:id', getTeacherByIdHandler);
router.patch('/:id', updateTeacherHandler);
router.delete('/:id', deleteTeacherHandler);

export default router;


