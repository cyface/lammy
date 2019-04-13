const axios = require('axios');

let config = {
    headers: {
        'Content-Type': 'application/json',
    }
};

axios.post('/https://www.googleapis.com/drive/v3/files/1esx3p7alBwcmLdjAmQzIeGenwKFlVH07/watch', {
    "id": "01234567-89ac-cdef-0123456789ac", // Your channel ID.
    "type": "web_hook",
    "address": "https://lammy.cyface.com/.netlify/functions/drivecatcher", // Your receiving URL.
}, config)
    .then(function (response) {
        console.log(response);
    })
    .catch(function (error) {
        console.log(error);
    });

/*
POST https://www.googleapis.com/drive/v3/files/fileId/watch
    Authorization: Bearer auth_token_for_current_user
Content-Type: application/json

{
    "id": "01234567-89ab-cdef-0123456789ab", // Your channel ID.
    "type": "web_hook",
    "address": "https://mydomain.com/notifications", // Your receiving URL.
...
    "token": "target=myApp-myFilesChannelDest", // (Optional) Your channel token.
    "expiration": 1426325213000 // (Optional) Your requested channel expiration time.
}
 */
