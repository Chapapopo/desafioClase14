import express from 'express';
import passport from "passport";

const router = express.Router();

router.post("/", passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/log',
  }));

export default router;