import { Router } from 'express';
const router = new Router();

router.get('/', async (req, res) => {
  res.json({ users: [] });
  res.status(200);
});

export default router;
