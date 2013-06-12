var url = require('url');

module.exports = function(req, res, next){
  if(!req.session){
    console.log('express-force-login: Are sessions enabled? It does not appear that they are. Unable to force login.')
    next();
  }

  if(!req.session.loggedIn){
    //If the user isn't logged in, get the URL of the page they were attempting to visit
    req.session.afterLogin = url.parse(req.url).path
    res.redirect('/login')
  } else if(req.session.loggedIn && req.session.afterLogin && req.session.afterLogin.length)  {
    var destination = req.session.afterLogin;
    delete req.session.afterLogin;
    res.redirect(destination);
  } else {
    next()
  }
}