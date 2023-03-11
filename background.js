const fetchMessages = async (token) => {
    const response = await fetch('https://www.googleapis.com/gmail/v1/users/me/messages?maxResults=10', {
        headers: {
        'Authorization': 'Bearer ' + token
        }
    })
    const responseJson = await response.json()
    return responseJson.messages
}

const fetchMessage = async (token, id) => {
    const response = await fetch(`https://gmail.googleapis.com/gmail/v1/users/me/messages/${id}`, {
        headers: {
        'Authorization': 'Bearer ' + token
        }
    })
    const responseJson = await response.json()
    const snippet = responseJson.snippet;
        if (containsURL(snippet)) {
            checkURLSecurity(snippet);
        }
    return responseJson
}
const containsURL = (text) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return urlRegex.test(text);
}

const checkURLSecurity = (text) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const match = urlRegex.exec(text);
    if (match && match[0].startsWith('http://')) {
        console.log("URL in message snippet uses insecure http protocol:", match[0]);
    }else{
        console.log("its safe")
    }
}

const init = async (token) => {
    const messages = await fetchMessages(token)
    const message = await fetchMessage(token, messages[0].id)
    console.log(message)
}

chrome.identity.getAuthToken({ 'interactive': true }, init)



// chrome.identity.getAuthToken({ 'interactive': true }, function (token) {
//     console.log(token);
//   fetch('https://www.googleapis.com/gmail/v1/users/me/messages?maxResults=10', {
//     headers: {
//       'Authorization': 'Bearer ' + token
//     }
//   }).then(function(response) {
//     return response.json();
//   }).then(function(data) {
//     console.log("Data: ", data.messages[0]);
//   });
//   });
