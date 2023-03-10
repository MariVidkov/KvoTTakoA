gapi.load('client:auth2', function() {
  gapi.client.init({
    apiKey: 'api',
    clientId: 'id',
    discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest'],
    scope: 'https://www.googleapis.com/auth/gmail.readonly'
  }).then(function() {
    return gapi.auth2.getAuthInstance().signIn();
  }).then(function() {
    return gapi.client.gmail.users.messages.list({
      'userId': 'me',
      'maxResults': 10 
    });
  }).then(function(response) {
    console.log(response.result);
  }, function(reason) {
    console.error('Error: ' + reason.result.error.message);
  });
});
chrome.identity.getAuthToken({interactive: true}, function(token) {
  fetch('https://www.googleapis.com/gmail/v1/users/me/messages?maxResults=10', {
    headers: {
      'Authorization': 'Bearer ' + token
    }
  }).then(function(response) {
    return response.json();
  }).then(function(data) {
    // Process the email messages
    var messages = data.messages;
    messages.forEach(function(message) {
      fetch('https://www.googleapis.com/gmail/v1/users/me/messages/' + message.id, {
        headers: {
          'Authorization': 'Bearer ' + token
        }
      }).then(function(response) {
        console.log(response.json());
        return response.json();
      }).then(function(data) {
        console.log(data.snippet);
      });
    });
  });
});
