const cookieParser = require('cookie-parser')
    , passportSocketIo = require('passport.socketio')
    , MongoDBStore = require('./MongoDBStore');

function onAuthorizeSuccess(data, accept){
    console.log('successful connection to socket.io');

    // The accept-callback still allows us to decide whether to
    // accept the connection or not.
    accept(null, true);
}
    
function onAuthorizeFail(data, message, error, accept){
    if(error)
        console.log(message)
        throw new Error(message);
    console.log('failed connection to socket.io:', message);

    // We use this callback to log all of our failed connections.
    accept(null, false);
}
    
module.exports = passportSocketIo.authorize({
    cookieParser,       // the same middleware you registrer in express
    key:          'connect.sid',       // the name of the cookie where express/connect stores its session_id
    secret:       process.env.SESSION_SECRET_KEY,    // the session_secret to parse the cookie
    store:        MongoDBStore,        // we NEED to use a sessionstore. no memorystore please
    success:      onAuthorizeSuccess,  // *optional* callback on success - read more below
    fail:         onAuthorizeFail,     // *optional* callback on fail/error - read more below
});