import { Router } from 'express';
import { authenticateToken, requireRole } from '../../middlewares/auth';
import * as noticeController from '../../controllers/notice.controller';

const router = Router();

router.use(authenticateToken);

// Create notice - Teachers, Admins
router.post(
    '/',
    requireRole(['teacher', 'admin']),
    noticeController.createNoticeHandler
);

// List notices - All roles
router.get('/', noticeController.listNoticesHandler);

// Get notice by ID - All roles
router.get('/:id', noticeController.getNoticeByIdHandler);

// Update notice - Creator, Admins
router.put(
    '/:id',
    requireRole(['teacher', 'admin']),
    noticeController.updateNoticeHandler
);

// Delete notice - Creator, Admins
router.delete(
    '/:id',
    requireRole(['teacher', 'admin']),
    noticeController.deleteNoticeHandler
);

export default router;
