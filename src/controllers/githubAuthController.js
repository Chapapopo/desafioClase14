import passport from 'passport';

const githubAuthController = {};

githubAuthController.githubAuth = passport.authenticate('github', { scope: ['user:email'] });

githubAuthController.githubCallback = passport.authenticate('github', {
  failureRedirect: '/log',
  successRedirect: '/'
});

export default githubAuthController;
