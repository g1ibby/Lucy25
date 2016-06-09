let mongoose = require('mongoose');

let OAuthUsers = mongoose.model('Users');
let OAuthClients = mongoose.model('Clients');
let OAuthAccessTokens = mongoose.model('AccessTokens');
let OAuthRefreshTokens = mongoose.model('RefreshTokens');

// let client = new OAuthClients({
//   clientId: 'toto',
//   clientSecret: 'secret',
//   redirectUri: 'google.com'
// });
//
// client.save(function(err, client) {
//
//   if (!err) {
//     console.log('New client - ' + client.clientId + ':' + client.clientSecret);
//   }
//   else {
//     return console.log(err);
//   }
// });

OAuthUsers.remove({}, function() {
 let user = new OAuthUsers({
   username: 'wss',
   password: 'pas',
   firstname: 'Sergei',
   lastname: 'Waribrus',
   email: 'mail@mail.ru'
 });

 user.save(function(err, user) {
   if (!err) {
     console.log(`New user - ${user.username}:${user.username}`);
   }
   else {
     return console.error(err);
   }
 });

 OAuthClients.remove({}, function() {
   let client = new OAuthClients({
     clientId: 'toto',
     clientSecret: 'secret',
     redirectUri: 'google.com'
   });

   client.save(function(err, client) {

     if (!err) {
       console.log('New client - ' + client.clientId + ':' + client.clientSecret);
     }
     else {
       return console.log(err);
     }
   });
 });

 OAuthAccessTokens.remove({}, function(err) {
   if (err) {
     return console.log(err);
   }
 });

 OAuthRefreshTokens.remove({}, function(err) {
   if (err) {
     return console.log(err);
   }
 });
});
