const envLoaded = require('dotenv').load({silent: true});
if(!envLoaded)
    console.log("warning:", __filename, "LINE_N", "Error: .env cannot be found");

const util = require('util');

const _conversation = require('watson-developer-cloud/conversation/v1');

const workspace = require('./wcs_config/workspace').workspace;

const conversation = new _conversation({
    username: process.env.CONVERSATION_USERNAME,
    password: process.env.CONVERSATION_PASSWORD,
    version_date: '2017-05-26'
});


const _initial_wait = 20; // invalid training status if check too soon
const _increment = 1; // time interval to wait to check if training is done, in seconds
let _seconds = 0;

const check_training_status = (onDone) => {
  setTimeout(() => {
    _seconds += _increment;
    conversation.workspaceStatus({ workspace_id: process.env.WORKSPACE_ID }, (err, resp) => {
      if(err) console.log("error: check status:", err);

      if (resp['training']) {
        check_training_status(onDone);
      } else {
        onDone();
      }
    });
  }, _increment * 1000);
};

conversation.workspaceStatus({ workspace_id: process.env.WORKSPACE_ID }, (err, resp) => {
  if (err) {
    console.log("error: workspace status, ", err);
  
    conversation.createWorkspace( workspace, (err, resp) => {
      if(err) console.log("error: workspace create:", util.inspect(err, false, null));
      console.log("info: create workspace resp:", resp);

      // TAKE THE WORKSPACE_ID FROM THE RESP AND DROP IN .ENV
    });
  } else if (resp['training']) {
    console.log(`error: model is currently being trained, please try again later`);
    process.exit(0);
  } else if (process.env.ENV != '') {
    workspace['workspace_id'] = process.env.WORKSPACE_ID;
    workspace['name'] = "rokerbot-" + process.env.ENV;
    // don't fill prod logs with the blob 
    if(process.env.ENV.indexOf("prod") == -1) {
      console.log(util.inspect(workspace, false, null));
    }
    conversation.updateWorkspace( workspace, (err, resp) => {
      if(err) console.log("error: ", util.inspect(err, false, null));
      console.log(`info: workspace update started, name: ${resp.name}, workspace_id: ${resp.workspace_id}, description: ${resp.description}`);
      setTimeout(() => {
        _seconds += _initial_wait;
        check_training_status(() => {
          console.log(`info: workspace update complete, wcs_training_time=${_seconds}`);
          process.exit(0);
        });
      }, _initial_wait * 1000 );
    });

  } else {
    console.log("error: please set ENV in your .env file to some identifiable value, ex: ENV=joe_dev");
  }
});
