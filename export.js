const envLoaded = require('dotenv').load({silent: true});
if(!envLoaded)
    console.log("warning:", __filename, "LINE_N", "Error: .env cannot be found");

const util = require('util');
const _conversation = require('watson-developer-cloud/conversation/v1');
const _workspace = require('./wcs_config/workspace').workspace;

const conversation = new _conversation({
    username: process.env.CONVERSATION_USERNAME,
    password: process.env.CONVERSATION_PASSWORD,
    version_date: '2017-05-26'
});

_workspace['workspace_id'] = process.env.WORKSPACE_ID;
console.log(util.inspect(_workspace, false, null));
