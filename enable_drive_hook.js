//const tokenManager = require('./googleTokenManager');
//const axios = require('axios');
const {google} = require('googleapis');

async function enableDriveWatching() {
    const credentials = {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n')  //Stupid env variable escaping
    };
    const auth = await google.auth.getClient({
        credentials: credentials,
        // Scopes can be specified either as an array or as a single, space-delimited string.
        scopes: ['https://www.googleapis.com/auth/drive']
    });

    const drive = google.drive({version: 'v3', auth});
    const options = {
        kind: 'api#channel',
        id: '01234567-89ac-cdef-0123456789ac',
        resourceId: 'TimDevFolder',
        resourceUri: 'https://drive.google.com/drive/u/0/folders/1esx3p7alBwcmLdjAmQzIeGenwKFlVH07',
        token: "tim",
        type: 'web_hook',
        address: 'https://lammy.cyface.com/.netlify/functions/drivecatcher',
        params: {
            ttl: 600
        }
    };
    return drive.files.watch({
        fileId: '1YG6H-nU_qheSim0P5LU7MXvts-KfcdvrWQ1GlMINRAE',
        resource: options
    }, (err, res) => {
        if (err) return console.log('The API returned an error: ' + err);
        console.log(res);
    });


}

//enableDriveWatching();

async function listFiles() {
    const auth = new google.auth.OAuth2();
    auth.setCredentials(JSON.parse(process.env.GOOGLE_TOKEN));
    return new Promise(function (resolve, reject) {
        const drive = google.drive({version: 'v3', auth});
        return drive.files.list({
            pageSize: 50,
            q: `'1esx3p7alBwcmLdjAmQzIeGenwKFlVH07' in parents`,
            fields: 'files(id, name)'
        }, (err, res) => {
            if (err) return console.log('The API returned an error: ' + err);
            const files = res.data.files;
            if (files.length) {
                resolve(files);
                files.forEach((file, index) => {
                    console.log(file);
                });
            } else {
                reject(Error("Yikes, we didn't find anything"))
            }
        });
    })
}

listFiles();

// let config = {
//         headers: {
//             'Content-Type': 'application/json',
//         }
//     };
// axios.post('/https://www.googleapis.com/drive/v3/files/1esx3p7alBwcmLdjAmQzIeGenwKFlVH07/watch', {
//     "id": "01234567-89ac-cdef-0123456789ac", // Your channel ID.
//     "type": "web_hook",
//     "address": "https://lammy.cyface.com/.netlify/functions/drivecatcher", // Your receiving URL.
// }, config)
//     .then(function (response) {
//         console.log(response);
//     })
//     .catch(function (error) {
//         console.log(error);
//     });
/*
// Doc Example of what to send
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

/*
// Expected Response
{
  "kind": "api#channel",
  "id": "01234567-89ac-cdef-0123456789ac"", // ID you specified for this channel.
  "resourceId": "o3hgv1538sdjfh", // ID of the watched resource.
  "resourceUri": "https://www.googleapis.com/drive/v3/files/o3hgv1538sdjfh", // Version-specific ID of the watched resource.
  "token": "target=myApp-myFilesChannelDest", // Present only if one was provided.
  "expiration": 1426325213000, // Actual expiration time as Unix timestamp (in ms), if applicable.
}
 */
