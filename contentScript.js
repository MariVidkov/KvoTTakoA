// gapi.load('client:auth2', function() {
// console.log("Client ");
// })
// console.log(chrome.identity);
// chrome.identity.getAuthToken({ 'interactive': true }, function (token) {
//     console.log(token);
//   });









// gapi.load('client:auth2', function() {
//   gapi.client.init({
//     apiKey: 'AIzaSyBL3ZOUTXa41lzleFGITBnQQHB8AV5A65s',
//     clientId: '476671900409-aj1uh2956l6kkagdg7l25em58fb1av14.apps.googleusercontent.com',
//     discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest'],
//     scope: 'https://www.googleapis.com/auth/gmail.readonly'
//   }).then(function() {
//     // Authenticate the user and fetch the last 10 emails
//     return gapi.auth2.getAuthInstance().signIn().then(function() {
//       return gapi.client.gmail.users.messages.list({
//         'userId': 'me',
//         'maxResults': 10 
//       });
//     });
//   }).then(function(response) {
//     console.log(response.result);
//   }, function(reason) {
//     console.error('Error: ' + reason.result.error.message);
//   });
// });

// // Fetch the last 10 emails using the Gmail API and the Chrome identity API
// chrome.identity.getAuthToken({interactive: true}, function(token) {
//   fetch('https://www.googleapis.com/gmail/v1/users/me/messages?maxResults=10', {
//     headers: {
//       'Authorization': 'Bearer ' + token
//     }
//   }).then(function(response) {
//     return response.json();
//   }).then(function(data) {
//     var messages = data.messages;
//     messages.forEach(function(message) {
//       fetch('https://www.googleapis.com/gmail/v1/users/me/messages/' + message.id, {
//         method: 'GET',  
//         headers: {
//           'Authorization': 'Bearer ' + token
//         }
//       }).then(function(response) {
//         return response.json();
//       }).then(function(data) {
//         console.log(data.snippet);
//       });
//     });
//   });
// });

// // Define a function to fetch the last n emails using the Gmail API
// function getLastEmailsFromGmail(maxResults, callback) {
//   gapi.client.gmail.users.messages.list({
//     'userId': 'me',
//     'maxResults': maxResults
//   }).then(function(response) {
//     callback(response.result);
//   }, function(reason) {
//     console.error('Error: ' + reason.result.error.message);
//   });
// }

// // Add a click event listener to a button with ID "EmailScraper"
// document.getElementById("EmailScraper").addEventListener("click", function() {
//   console.log("Button clicked");
// });