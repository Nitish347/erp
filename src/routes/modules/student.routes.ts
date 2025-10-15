import { Router } from 'express';
import {
  createStudentHandler,
  deleteStudentHandler,
  getStudentByIdHandler,
  listStudentsHandler,
  updateStudentHandler,
} from '../../controllers/student.controller';

const router = Router();

router.post('/', createStudentHandler);
router.get('/', listStudentsHandler);
router.get('/:id', getStudentByIdHandler);
router.patch('/:id', updateStudentHandler);
router.delete('/:id', deleteStudentHandler);

export default router;


