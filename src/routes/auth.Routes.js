import express from 'express';
import githubAuthController from '../controllers/githubAuthController.js';

const router = express.Router();

router.get('/github', githubAuthController.githubAuth);

router.get('/github/callback', githubAuthController.githubCallback);

export default router;
