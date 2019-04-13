const {google} = require('encoding');
const {google} = require('googleapis');
exports.handler = (event, context, callback) => {
    console.log("Drive Webhook Received");
    console.log(event);
    console.log(context);
    const auth = new google.auth.OAuth2();
    auth.setCredentials(JSON.parse(process.env.GOOGLE_TOKEN));
    const drive = google.drive({version: 'v3', auth});
    drive.files.list({
        pageSize: 50,
        q: `'1esx3p7alBwcmLdjAmQzIeGenwKFlVH07' in parents`,
        fields: 'files(id, name)'
    }, (err, res) => {
        if (err) return console.log('The API returned an error: ' + err);
        const files = res.data.files;
        if (files.length) {
            resolve(files);
            let fileList = "";
            files.forEach((file, index) => {
                fileList += file;
            });
            callback(null, {
                statusCode: 200,
                body: fileList
            })
        } else {
            reject(Error("Yikes, we didn't find anything"))
        }
    });
};
