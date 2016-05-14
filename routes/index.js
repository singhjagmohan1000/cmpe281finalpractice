
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('login', { title: 'Login or Sign up' });
};