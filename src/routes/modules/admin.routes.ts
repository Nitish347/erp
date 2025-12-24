import { Router } from 'express';
import {
  createAdminHandler,
  deleteAdminHandler,
  getAdminByIdHandler,
  listAdminsHandler,
  updateAdminHandler,
  createInstituteHandler,
  listInstitutesHandler,
  getInstituteByIdHandler,
  updateInstituteHandler,
  deleteInstituteHandler,
  getAllTeachersHandler,
  getAllStudentsHandler,
} from '../../controllers/admin.controller';
import { authenticateToken, requireRole } from '../../middlewares/auth';

const router = Router();

// Admin CRUD operations - only admins can manage other admins
router.post('/', authenticateToken, requireRole(['admin']), createAdminHandler);
router.get('/', authenticateToken, requireRole(['admin']), listAdminsHandler);
router.get('/:id', authenticateToken, requireRole(['admin']), getAdminByIdHandler);
router.patch('/:id', authenticateToken, requireRole(['admin']), updateAdminHandler);
router.delete('/:id', authenticateToken, requireRole(['admin']), deleteAdminHandler);

// Admin managing institutes
router.post('/institutes', authenticateToken, requireRole(['admin']), createInstituteHandler);
router.get('/institutes', authenticateToken, requireRole(['admin']), listInstitutesHandler);
router.get('/institutes/:id', authenticateToken, requireRole(['admin']), getInstituteByIdHandler);
router.patch('/institutes/:id', authenticateToken, requireRole(['admin']), updateInstituteHandler);
router.delete('/institutes/:id', authenticateToken, requireRole(['admin']), deleteInstituteHandler);

// Admin viewing all teachers and students
router.get('/teachers/all', authenticateToken, requireRole(['admin']), getAllTeachersHandler);
router.get('/students/all', authenticateToken, requireRole(['admin']), getAllStudentsHandler);

export default router;

