const router = require('express').Router();
const passport = require('passport');

router.get('/login', passport.authenticate('github'));

router.get('/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/' }),
  (req,res)=> res.redirect('/api-docs')
);

router.get('/logout',(req,res)=>{
  req.logout(()=> res.send('Logged out'));
});

module.exports = router;