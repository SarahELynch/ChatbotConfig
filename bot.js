
const EventEmitter = require('events');
const util = require('util');
const chalk = require('chalk');
const _conversation = require('watson-developer-cloud/conversation/v1');

const PropertiesReader = require('properties-reader');
const _landmark_addresses = PropertiesReader('wcs_config/raw/strings/landmark_addresses');


//const _control = require('./custom_classifiers/control');
//const _address = require('./custom_classifiers/addresses/features');
//const _cs = require('./custom_classifiers/crossstreets/features');
//const _ny_streets = require('./custom_classifiers/lib/ny_street.js');
//const _geocode = require('./lib/geocode.js');
//const _geonames = require('./lib/geonames.js');
//const _address_uninitialized = require('./wcs_config/dialog')._address_uninitialized;


const conversation = new _conversation({
    username: process.env.CONVERSATION_USERNAME,
    password: process.env.CONVERSATION_PASSWORD,
    version_date: '2017-05-26'
});

const resolve_locations = (context, address, geo_address, log_level) => {
  let result = false;
  // if both texts are the same, only set the higher confidence one
  if(log_level > 1) console.log("address:", address);
  if(log_level > 1) console.log("geo address:", geo_address);

  if(geo_address) {
    if(context['c_address'] == _address_uninitialized && address.confidence > 0.3) {
      context['address'] = _geocode.get_formatted_address(geo_address);
      context['in_manhattan'] = _geocode.is_in_manhattan(geo_address);
      result = _geocode.getLatLng(geo_address);
    }
  }
  return result;
};

const _fields_and_val = {
  //'address': _address_uninitialized,
  //'cs': '',
  //'c_address': _address_uninitialized,
  //'c_cs': '',
  'failed_ct': 0,
  'failed_address': 0,
  'c_ct': '',
  'ct': '',
  'landmark': null,
  'in_manhattan': false
};

const ensure_init = (context) => {
  for(let field in _fields_and_val) {
    if(!(field in context)) {
      context[field] = _fields_and_val[field];
    }
  }
};


class Bot extends EventEmitter {

  constructor() {
    super();

    this._bot_ready = false;
    setTimeout(() => {
      this._bot_ready = true;
      this.emit('ready');
    }, 1000);
  }

  // BEWARE - HACKY CODE BELOW - MODIFY AT YOUR OWN PERIL!
  // this is the best effort at working around misclassifications by WCS
  // blame Joe for what follows....

  // true if the user input is more than half occupied by a landmark word
  // TODO - this is crap - all we do is check the length! not even the word! what!
  // userInputIsProbablyJustALandMark (resp) {
  //   let input_len = resp['input']['text'].length;
  //   for (let entity of resp['entities']) {
  //     if(entity['entity'] == 'landmark') {
  //       let len = entity['location'][1] - entity['location'][0];
  //       return (len / input_len) > 0.5;
  //     }
  //   }
  //   return false;
  // }
  //
  // // true if more than half of the user's input are also in the address
  // userInputIsProbablyJustAnAddress (resp, context) {
  //   let user_input_arr = resp['input']['text'].toLowerCase().split(" ");
  //   let address_arr = context['address'].toLowerCase().split(" ");
  //   let num_matches = 0;
  //   for(let user_input of user_input_arr) {
  //     if(address_arr.indexOf(user_input) > -1) {
  //       num_matches++;
  //     }
  //   }
  //   return (num_matches / user_input_arr.length) > 0.5;
  // }
  //
  // shouldEmitReportFound (resp, context, geocode_thinks_its_an_address) {
  //   let result = false;
  //
  //   let wcs_thinks_its_a_report = resp['intents'].length > 0 && resp['intents'][0]['intent'].match(/^report-*/);
  //   let dialog_thinks_its_a_report = 'ct_friendly' in context && context['ct_friendly'] != '';
  //
  //   // :|
  //   let wcs_is_really_confident_its_a_report = wcs_thinks_its_a_report && resp['intents'][0].confidence > 0.5;
  //
  //   let probably_landmark = this.userInputIsProbablyJustALandMark(resp);
  //   let probably_address = this.userInputIsProbablyJustAnAddress(resp, context);
  //
  //   // so bare minimum requirement, wcs has to sort of think it might be a report
  //   if (wcs_thinks_its_a_report) {
  //     // because our dialog has it's own rules for guessing if something is really a report,
  //     // we also need to make sure the dialog is in agreement with WCS
  //     if (dialog_thinks_its_a_report) {
  //
  //       // and here's where things get terrible
  //
  //       // if we're really confident, ok go ahead - if we're not that confident
  //       // BUT geocode thinks it's not an address, also go ahead since they can't both be wrong, right? right?
  //       if(!geocode_thinks_its_an_address || wcs_is_really_confident_its_a_report) {
  //
  //         // last hurdle - and perhaps the most hacky of them all - did we manually detect low levels of
  //         // locationy type stuff in the utterance? if not, go on ahead
  //         if (!probably_landmark && !probably_address) {
  //           result = true;
  //         } else {
  //           //console.log("hacky: not a report b/c probably a location");
  //         }
  //       } else {
  //         //console.log("hacky: not a report b/c just not confident enough");
  //       }
  //     } else {
  //       //console.log("hacky: not a report b/c dialog doesn't think so");
  //     }
  //   } else {
  //     //console.log("hacky: not a report b/c WCS doesn't think so");
  //   }
  //
  //   return result;
  // }

  // BEWARE - HACKY CODE ABOVE - MODIFY AT YOUR OWN PERIL!

  handleEmit (resp_loc, previous_context, error_message) {
    if(error_message) {
      this.emit('receiveMessage', error_message, previous_context);
    } else {

      let resp = resp_loc['resp'];
      let context = resp['context'];

      if(resp_loc['found_location']) {
        this.emit('addressFound', resp_loc['found_location']);
      }
      /*
      if(this.shouldEmitReportFound(resp, context, resp_loc['found_location'])) {
        this.emit('reportFound', context, resp['intents'], resp['entities']);
      }
      */

      // for fun show the bot typing
      if(resp['output']['text'].length > 0) {
        this.emit('startTyping', context);
      }

      let typing_time = 0;
      let end_chat_time = 500;


      // break out the {PAUSE:DDDD} stuff here
      // TODO - make this regex more flexible to support 3 digits and 5+ digits
      let botMessagesAndTimes = [];
      for(let message of resp['output']['text']) {
        let split = message.split(/\{PAUSE:([0-9][0-9][0-9][0-9])\}/g).filter(t => t != "");
        if(split.length % 2 == 1) {
          split.push(1000);
        }
        botMessagesAndTimes = botMessagesAndTimes.concat(split);
      }

      for(let i = 0; i < botMessagesAndTimes.length; i += 2) {
        typing_time += parseInt(botMessagesAndTimes[i + 1]);
        setTimeout(() => {
          this.emit('receiveMessage', botMessagesAndTimes[i], context);
          if(i == botMessagesAndTimes.length - 2) {
            // do we need a stop typing event ?
            this.emit('stopTyping', context);
          } else {
            this.emit('startTyping', context);
          }
          setTimeout(() => {
            // if we get to the 'end-thanks' node emit endOfChat
            if('end-thanks' in resp['context']['system']['_node_output_map']) {
                this.emit('endOfChat', context);
            }
          }, end_chat_time);
        }, typing_time);
      }
    }
  }

  preprocess (input, context, log_level) {
    return new Promise((resolve, reject) => {
      Promise.all([
        //_control.classify(input, _address, './addresses/gen/model'),
      ])
      // .then(custom => {
      //   let address = custom[0];
      //   return Promise.all([
      //     address.text != '' ? _geocode.eval(address.text) : Promise.resolve(null),
      //     Promise.resolve(address),
      //   ]);
      // })
      .then(custom => {
        //let geo_address = custom[0];
        //let address = custom[1];

        //let found_location = resolve_locations(context, address, geo_address, log_level);

        let payload = {
          workspace_id: process.env.WORKSPACE_ID,
          input: {
            text: input
          },
          context: context,
          alternate_intents: true
        };
        if(log_level > 1) console.log("payload:", payload);

        conversation.message(payload, (err, resp) => {
          if (err) {
            let message = "unknown wcs error";
            if(process.env.ENV.indexOf("prod") == -1) {
              console.log("error:", util.inspect(err, false, null));
            } else if (err.hasOwnProperty('error')) {
              message = err.error;
            } else {
              console.log("error: handling unknown error:", util.inspect(err, false, null));
            }
            reject(message);
          } else {
            if(log_level > 1) console.log("resp:", util.inspect(resp, false, null));

            let landmark_address = resp['entities'].find(e => e.entity == 'landmark');
            // if(landmark_address) {
            //   _geocode.eval(_landmark_addresses.get(landmark_address.value))
            //   .then(loc => {
            //     resolve({ resp: resp, found_location: _geocode.getLatLng(loc) });
            //   });
            // } else {
              //resolve({ resp: resp, found_location: found_location });
              resolve({ resp: resp });  //** This line  temporarily replaces the above line - can be deleted after putting "found_location" logic back in
            //}
          }
        });
      })
      .catch(err => console.log("error:", __filename, "LINE_N", err));
    });
  }

  message (input, context, log_level) {
    // make sure we set the default values
    ensure_init(context);
    // don't let failed_ct or failed_address go negative
    context['failed_ct'] = Math.max(0, context['failed_ct']);
    context['failed_address'] = Math.max(0, context['failed_address']);

    // intercept input for an initial pass before we invoke the service or any custom classifiers
    if(!this._bot_ready) {
      this.handleEmit(null, context, "Oops, I'm still booting up!");
    } else {
      this.preprocess(input, context, log_level)
      .then((resp_loc) => {
        this.handleEmit(resp_loc, context);
      });
    }
  }

  /*
   * Eventless style messaging when you just want the full response back, no delaying or typing
   */
  messageEventless (input, context, log_level) {
    // make sure we set the default values
    ensure_init(context);
    // don't let failed_ct or failed_address go negative
    context['failed_ct'] = Math.max(0, context['failed_ct']);
    context['failed_address'] = Math.max(0, context['failed_address']);

    return this.preprocess(input, context, log_level)
    .then((res) => {
      return {
        "text": res['resp']['output']['text'].reduce((all, current) => all += current, ""),
        "context": res['resp']['context'],
        "intents": res['resp']['intents']
      };
    });
  }

}


module.exports = Bot;
