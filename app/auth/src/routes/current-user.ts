import { Router } from 'express';

import { currentUser, requireAuth } from '@akatickets/common';

const router = Router();

router.get('/api/users/currentuser', currentUser, (req, res) => {
  return res.send({ currentUser: req.currentUser || null });
});

export { router as currentUserRouter };
