exports.handler = (event, context, callback) => {
    console.log("Drive Webhook Received");
    console.log(event);
    console.log(context);
    callback(null, {
        statusCode: 200,
        body: 'Drive Webhook received!'
    })
};
