
const fs = require('fs');
const PropertiesReader = require('properties-reader');
const props = PropertiesReader('./wcs_config/raw/strings/responses');
const _intent_phrases = PropertiesReader('./wcs_config/raw/strings/intent_phrases');
const _entity_phrases = PropertiesReader('./wcs_config/raw/strings/entity_phrases');
const _landmark_phrases = PropertiesReader('wcs_config/raw/strings/landmark_phrases');
const _landmark_addresses = PropertiesReader('wcs_config/raw/strings/landmark_addresses');

const exportRaw = (path) => {
  return fs.readFileSync(path).toString().split("\n")
  .filter(d => {
    if (d.trim() != '') {
      return true;
    } else {
      return false;
    }
  })
  .map(d => {
		let d_array = d.split(",");
    for (let i in d_array) {
      d_array[i] = d_array[i].trim();
    }
    return { value: d_array.shift(), synonyms: d_array};
  });
};


const _landmark_entites = exportRaw('./wcs_config/raw/entities/landmark');


const _address_uninitialized = 'none';

//allow 2 address failures, maximum
//(increment failed_address by 1 for rejected address, by 1 for out-of-bounds address, and by 2 for undecipherable address)
const _address_failure_limit = 2;
//allow 3 complaint type failures, maximum
//(increment failed_ct by 2 for misclassification (rejected classification), and by 3 for unclassifiable input)
const _ct_failure_limit = 6;

//** The following are used for address confirmation. **
//** These thresholds will likely need to be adjusted as training data is added. **
//a valid address negation must be fairly confident ...
//don't want to ask user to rephrase address if they use a negative word AND supply an address
const _negative_intent_confidence_threshold = 0.60;


const export_file = (path) => {
  return fs.readFileSync(path).toString().split("\n").filter(line => line.trim() != '');
};



const welcome = () => {
  return [
    node({
      type: "standard",
      title: "Welcome",
      text: "Hello. I am a 311 chatbot, and I am here to help you file 311 issues. Please describe, in a few words, the issue you'd like to file with 311.",
      parent: null,
      context: null,
      metadata: {},
      next_step: null,
      conditions: "welcome",
      description: null,
      dialog_node: "Welcome",
      previous_sibling: null
    })
  ];
}

const get_issue = () {
  return [
    node({
        type: "frame",
        title: "Get Issue",
        text: null,
        parent: null,
        context: null,
        metadata: {
          fallback: "leave"
        },
        next_step: {
          behavior: "jump_to",
          selector: "condition",
          dialog_node: "Confirm The Issue"
        },
        conditions: "#report-street-condition || #report-graffiti || #report-noise || #report-damaged-tree",
        digress_in: "does_not_return",
        description: null,
        //dialog_node: "node_1_1520357929976",
        digress_out: "allow_all",
        previous_sibling: "Welcome",
        digress_out_slots: "not_allowed"
      }, [
          node({
        		type: "event_handler",
        		title: null,
        		text: "Please describe, in a few words, the issue you wish to report to 311.",
        		//parent: "node_1_1520357929976",
        		context: null,
        		metadata: {},
        		next_step: null,
        		conditions: null,
        		event_name: "focus",
        		description: null,
        		//dialog_node: "handler_5_1520358086185",
        		//previous_sibling: "slot_6_1520358278972"
        	}),
          node({
          		type: "slot",
          		title: null,
          		output: {},
          		//parent: "node_1_1520357929976",
          		context: null,
          		metadata: {
          			_customization: {
          				mcr: true
          			}
          		},
          		variable: "$ct",
          		next_step: null,
          		conditions: null,
          		description: null,
          		////dialog_node: "node_9_1520358290116",
          		//previous_sibling: "slot_12_1520358319388"
          	}, [
                  node({
                		type: "event_handler",
                		title: null,
                		output: {},
                		//parent: "slot_9_1520358290116",
                		context: {
                			ct: "noise"
                		},
                		metadata: {},
                		next_step: null,
                		conditions: "#report-noise",
                		event_name: "input",
                		description: null,
                		//dialog_node: "handler_10_1520358290116",
                		//previous_sibling: "handler_11_1520358290116"
                	}),
                  node({
                		type: "event_handler",
                		title: null,
                		output: {},
                		//parent: "slot_9_1520358290116",
                		context: null,
                		metadata: {},
                		next_step: null,
                		conditions: null,
                		event_name: "focus",
                		description: null,
                		//dialog_node: "handler_11_1520358290116",
                		previous_sibling: null
                	})
                ]),
          node({
          		type: "slot",
          		title: null,
          		output: {},
          		//parent: "node_1_1520357929976",
          		context: null,
          		metadata: {
          			_customization: {
          				mcr: true
          			}
          		},
          		variable: "$ct",
          		next_step: null,
          		conditions: null,
          		description: null,
          		////dialog_node: "node_6_1520358278972",
          		//previous_sibling: "slot_2_1520358026402"
          	}, [
                      node({
                    		type: "event_handler",
                    		title: null,
                    		output: {},
                    		//parent: "slot_6_1520358278972",
                    		context: {
                    			ct: "tree damage"
                    		},
                    		metadata: {},
                    		next_step: null,
                    		conditions: "#report-damaged-tree",
                    		event_name: "input",
                    		description: null,
                    		//dialog_node: "handler_7_1520358278972",
                    		//previous_sibling: "handler_8_1520358278972"
                    	}),
                      node({
                    		type: "event_handler",
                    		title: null,
                    		output: {},
                    		//parent: "slot_6_1520358278972",
                    		context: null,
                    		metadata: {},
                    		next_step: null,
                    		conditions: null,
                    		event_name: "focus",
                    		description: null,
                    		//dialog_node: "handler_8_1520358278972",
                    		previous_sibling: null
                    	})
                  ]),
          node({
        		type: "slot",
        		title: null,
        		output: {},
        		//parent: "node_1_1520357929976",
        		context: null,
        		metadata: {
        			_customization: {
        				mcr: true
        			}
        		},
        		variable: "$ct",
        		next_step: null,
        		conditions: null,
        		description: null,
        		////dialog_node: "node_12_1520358319388",
        		//previous_sibling: "slot_22_1521220770556"
        	}, [
                        node({
                      		type: "event_handler",
                      		title: null,
                      		output: {},
                      		//parent: "slot_12_1520358319388",
                      		context: {
                      			ct: "graffiti"
                      		},
                      		metadata: {},
                      		next_step: null,
                      		conditions: "#report-graffiti",
                      		event_name: "input",
                      		description: null,
                      		//dialog_node: "handler_13_1520358319388",
                      		//previous_sibling: "handler_14_1520358319388"
                      	}),
                        node({
                      		type: "event_handler",
                      		title: null,
                      		output: {},
                      		//parent: "slot_12_1520358319388",
                      		context: null,
                      		metadata: {},
                      		next_step: null,
                      		conditions: null,
                      		event_name: "focus",
                      		description: null,
                      		//dialog_node: "handler_14_1520358319388",
                      		//previous_sibling: null
                      	})
                  ]),
          node({
          		type: "slot",
          		title: null,
          		output: {},
          		//parent: "node_1_1520357929976",
          		context: null,
          		metadata: {},
          		variable: "$agency",
          		next_step: null,
          		conditions: null,
          		description: null,
          		//dialog_node: "slot_13_1521220555649",
          		//previous_sibling: "slot_10_1521220551613"
          	}, [
                      node({
                    		type: "event_handler",
                    		title: null,
                    		output: {},
                    		//parent: "slot_13_1521220555649",
                    		context: {
                    			ct: "noise",
                    			agency: "dep"
                    		},
                    		metadata: {},
                    		next_step: null,
                    		conditions: "#report-noise && @dep",
                    		event_name: "input",
                    		description: null,
                    		//dialog_node: "handler_14_1521220555649",
                    		//previous_sibling: "handler_15_1521220555649"
                    	}),
                      node({
                    		type: "event_handler",
                    		title: null,
                    		output: {},
                    		//parent: "slot_13_1521220555649",
                    		context: null,
                    		metadata: null,
                    		next_step: null,
                    		conditions: null,
                    		event_name: "focus",
                    		description: null,
                    		//dialog_node: "handler_15_1521220555649",
                    		//previous_sibling: null
                    	})
                  ]),
          node({
        		type: "slot",
        		title: null,
        		output: {},
        		//parent: "node_1_1520357929976",
        		context: null,
        		metadata: {},
        		variable: "$agency",
        		next_step: null,
        		conditions: null,
        		description: null,
        		//dialog_node: "slot_22_1521220770556",
        		//previous_sibling: "slot_13_1521220555649"
        	}, [
                      node({
                    		type: "event_handler",
                    		title: null,
                    		output: {},
                    		//parent: "slot_22_1521220770556",
                    		context: {
                    			ct: "noise",
                    			agency: "nypd"
                    		},
                    		metadata: {},
                    		next_step: null,
                    		conditions: "#report-noise && @nypd",
                    		event_name: "input",
                    		description: null,
                    		//dialog_node: "handler_23_1521220770556",
                    		//previous_sibling: "handler_24_1521220770556"
                    	}),
                      node({
                    		type: "event_handler",
                    		title: null,
                    		output: {},
                    		//parent: "slot_22_1521220770556",
                    		context: null,
                    		metadata: null,
                    		next_step: null,
                    		conditions: null,
                    		event_name: "focus",
                    		description: null,
                    		//dialog_node: "handler_24_1521220770556",
                    		//previous_sibling: null
                    	})
                  ]),
          node({
        		type: "slot",
        		title: null,
        		output: {},
        		//parent: "node_1_1520357929976",
        		context: null,
        		metadata: {
        			_customization: {
        				mcr: true
        			}
        		},
        		variable: "$ct",
        		next_step: null,
        		conditions: null,
        		description: null,
        		//dialog_node: "slot_2_1520358026402",
        		//previous_sibling: "slot_9_1520358290116"
        	}, [
                      node({
                    		type: "event_handler",
                    		title: null,
                    		output: {},
                    		//parent: "slot_2_1520358026402",
                    		context: {
                    			ct: "poor street conditions"
                    		},
                    		metadata: {},
                    		next_step: null,
                    		conditions: "#report-street-condition",
                    		event_name: "input",
                    		description: null,
                    		//dialog_node: "handler_3_1520358026402",
                    		//previous_sibling: "handler_4_1520358026402"
                    	}),
                      node({
                    		type: "event_handler",
                    		title: null,
                    		output: {},
                    		//parent: "slot_2_1520358026402",
                    		context: null,
                    		metadata: {},
                    		next_step: null,
                    		conditions: null,
                    		event_name: "focus",
                    		description: null,
                    		//dialog_node: "handler_4_1520358026402",
                    		//previous_sibling: null
                    	})
                  ]),
          node({
        		type: "slot",
        		title: null,
        		output: {},
        		//parent: "node_1_1520357929976",
        		context: null,
        		metadata: {},
        		variable: "$agency",
        		next_step: null,
        		conditions: null,
        		description: null,
        		//dialog_node: "slot_10_1521220551613",
        		//previous_sibling: "slot_4_1521220486223"
        	}, [
                        node({
                      		type: "event_handler",
                      		title: null,
                      		output: {},
                      		//parent: "slot_10_1521220551613",
                      		context: {
                      			ct: "graffiti",
                      			agency: "dsny",
                      			entity: "@dsny.value"
                      		},
                      		metadata: {},
                      		next_step: null,
                      		conditions: "#report-graffiti && @dsny",
                      		event_name: "input",
                      		description: null,
                      		//dialog_node: "handler_11_1521220551613",
                      		//previous_sibling: "handler_12_1521220551613"
                      	}),
                        node({
                      		type: "event_handler",
                      		title: null,
                      		output: {},
                      		//parent: "slot_10_1521220551613",
                      		context: null,
                      		metadata: {},
                      		next_step: null,
                      		conditions: null,
                      		event_name: "focus",
                      		description: null,
                      		//dialog_node: "handler_12_1521220551613",
                      		//previous_sibling: null
                      	})
                    ]),
          node({
        		type: "slot",
        		title: null,
        		output: {},
        		//parent: "node_1_1520357929976",
        		context: null,
        		metadata: {},
        		variable: "$agency",
        		next_step: null,
        		conditions: null,
        		description: null,
        		//dialog_node: "slot_4_1521220486223",
        		//previous_sibling: null
        	}, [
                        node({
                      		type: "event_handler",
                      		title: null,
                      		output: {},
                      		//parent: "slot_4_1521220486223",
                      		context: {
                      			agency: "dpr",
                      			entity: "@dpr.value"
                      		},
                      		metadata: {},
                      		next_step: null,
                      		conditions: "#report-damaged-tree && @dpr",
                      		event_name: "input",
                      		description: null,
                      		//dialog_node: "handler_5_1521220486223",
                      		//previous_sibling: "handler_6_1521220486223"
                      	}),
                        node({
                      		type: "event_handler",
                      		title: null,
                      		output: {},
                      		//parent: "slot_4_1521220486223",
                      		context: null,
                      		metadata: {},
                      		next_step: null,
                      		conditions: null,
                      		event_name: "focus",
                      		description: null,
                      		//dialog_node: "handler_6_1521220486223",
                      		//previous_sibling: null
                      	})
                    ])
        ])
  ];
}


const proceed_with_issue_report = () => {
  node(
    {
      type: "standard",
      title: "proceed with issue report",
      text: "Ok, great.",
      //parent: "node_16_1520457025654",
      context: null,
      metadata: {},
      next_step: {
        behavior: "jump_to",
        selector: "body",
        dialog_node: "Issue confirmed, need address"
      },
      conditions: "$ct != null && $c_ct != null",
      description: null,
      //dialog_node: "slot_34_1520458045780",
      //previous_sibling: null
    }
  )
}

const get_another_issue_report = () => {
  node(
    {
      type: "standard",
      title: "get another issue report",
      output: {
      text: "Oops. Let's try again. Please describe, in a few words, the issue you'd like to report to 311.",
      //parent: "node_16_1520457025654",
      context: null,
      metadata: {},
      next_step: {
        behavior: "jump_to",
        selector: "user_input",
        dialog_node: "Get Issue"
      },
      conditions: "true",
      description: null,
      //dialog_node: "node_35_1520458089865",
      //previous_sibling: "node_34_1520458045780"
    }
  )
}


const process_issue_confirmation = () => {
  return [
    node(
      {
    		type: "frame",
    		title: "process_issue_confirmation",
    		text: null,
    		//parent: "node_15_1520456922489",
    		context: null,
    		metadata: {
    			fallback: "leave",
    			_customization: {
    				mcr: false
    			}
    		},
    		next_step: {
    			behavior: "skip_user_input"
    		},
    		conditions: "true",
    		description: null,
    		//dialog_node: "node_16_1520457025654",
    		digress_out: "allow_all",
    		//previous_sibling: "node_28_1521221791354",
    		digress_out_slots: "not_allowed"
    	},
      [
            node({
              //**** This node is disabled... can I remove it?
          		type: "response_condition",
          		title: null,
          		output: {
          			text: {
          				"values": []
          			}
          		},
          		//parent: "node_16_1520457025654",
          		context: null,
              // DISABLED???!
          		disabled: true,
          		metadata: {},
          		next_step: null,
          		conditions: null,
          		description: null,
          		//dialog_node: "node_58_1521227765093",
          		//previous_sibling: "node_35_1520458089865"
          	}),
            node({
              type: "slot",
              title: null,
              output: {},
              //parent: "node_16_1520457025654",
              context: null,
              metadata: {},
              variable: "$c_ct",
              next_step: null,
              conditions: null,
              description: null,
              //dialog_node: "slot_17_1520457096281",
              //previous_sibling: "node_58_1521227765093"
            }, [
                  node({
                    type: "event_handler",
                    title: null,
                    output: {},
                    //parent: "slot_17_1520457096281",
                    context: {
                      c_ct: "$ct",
                      c_agency: "$agency"
                    },
                    metadata: {},
                    next_step: null,
                    conditions: "#affirmative",
                    event_name: "input",
                    description: null,
                    //dialog_node: "handler_18_1520457096281",
                    //previous_sibling: "handler_19_1520457096281"
                  })
            ]),
            node({
          		type: "slot",
          		title: null,
          		output: {},
          		//parent: "node_16_1520457025654",
          		context: null,
          		metadata: {},
          		variable: "$ct",
          		next_step: null,
          		conditions: null,
          		description: null,
          		//dialog_node: "slot_22_1520457485837",
          		//previous_sibling: "slot_17_1520457096281"
          	}, [
                    node({
                		type: "event_handler",
                		title: null,
                		output: {},
                		//parent: "slot_22_1520457485837",
                		context: {
                			ct: null
                		},
                		metadata: {},
                		next_step: null,
                		conditions: "#negative",
                		event_name: "input",
                		description: null,
                		//dialog_node: "handler_23_1520457485837",
                		//previous_sibling: "handler_24_1520457485837"
                	})
              ]),
            proceed_with_issue_report(),
            get_another_issue_report()
    ])
  ];
}

const confirm_the_issue = () => {
  return [
    node (
      {
      type: "standard",
      title: "Confirm The Issue",
      output: {},
      //parent: null,
      context: null,
      metadata: {
        _customization: {
          mcr: true
        }
      },
      next_step: null,
      conditions: "$ct != null && $ct != ''",
      digress_in: "does_not_return",
      description: null,
      //dialog_node: "node_15_1520456922489",
      digress_out: "allow_all",
      //previous_sibling: "node_1_1520357929976"
    }, [
        node({
      		type: "response_condition",
      		title: null,
      		text: "I have a report about '$ct'. Is that right?",
      		//parent: "node_15_1520456922489",
      		context: null,
      		metadata: {},
      		next_step: null,
      		conditions: "$agency == null",
      		description: null,
      		//dialog_node: "node_27_1521221715274",
      		//previous_sibling: null
      	}),
        node({
      		type: "response_condition",
      		title: null,
      		text: "I have a report about '$ct', specifically about '$entity'. Is that right?",
      		//parent: "node_15_1520456922489",
      		context: null,
      		metadata: {},
      		next_step: null,
      		conditions: "$agency != \"null\"",
      		description: null,
      		//dialog_node: "node_28_1521221791354",
      		//previous_sibling: "node_27_1521221715274"
      	}),
        process_issue_confirmation()
    ])
  ];
}

const issue_confirmed_need_address = () => {
  return [
    node(
      {
    		type: "standard",
    		title: "Issue confirmed, need address",
    		text: "Next, I'll need to get an address where the reported issue is located.",
    		//parent: null,
    		context: null,
    		metadata: {},
    		next_step: {
    			behavior: "jump_to",
    			selector: "condition",
    			dialog_node: "Get Address"
    		},
    		conditions: "true",
    		description: null,
    		//dialog_node: "node_27_1520358866193",
    		//previous_sibling: "node_15_1520456922489"
    	}
    )
  ];
}


const get_landmark_address = () => {
  return [
    node (
      {
    		type: "standard",
    		title: "get landmark address",
    		output: {},
    		//parent: "node_6_1521146866801",
    		context: {
    			landmark_address: "City Hall Park, New York, NY 10007, USA"
    		},
    		metadata: {},
    		next_step: {
    			behavior: "jump_to",
    			selector: "condition",
    			dialog_node: "Confirm The Address"
    		},
    		conditions: "$landmark != null",
    		description: null,
    		//dialog_node: "node_19_1520974010769",
    		//previous_sibling: null
    	}
    )
  ];
}

const no_landmark_given = () => {
  return [
    node (
      {
    		type: "standard",
    		title: "no landmark given",
    		output: {},
    		//parent: "node_6_1521146866801",
    		context: null,
    		metadata: {},
    		next_step: {
    			behavior: "jump_to",
    			selector: "condition",
    			dialog_node: "Confirm The Address"
    		},
    		conditions: "$landmark == null",
    		description: null,
    		//dialog_node: "node_37_1521147552788",
    		//previous_sibling: "node_19_1520974010769"
    	}
    )
  ];
}

const get_address = () => {
  return [
    node ({
    		type: "frame",
    		title: "Get Address",
    		text: "Ok, got it.",
    		//parent: null,
    		context: null,
    		metadata: {
    			fallback: "leave"
    		},
    		next_step: {
    			behavior: "skip_user_input"
    		},
    		conditions: "true",
    		digress_in: "does_not_return",
    		description: null,
    		//dialog_node: "node_6_1521146866801",
    		digress_out: "allow_all",
    		//previous_sibling: "node_27_1520358866193",
    		digress_out_slots: "not_allowed"
    	}, [
            node({
          		type: "event_handler",
          		title: null,
          		text: "I'll need a street number, street name, and a street word (like \"road\", \"st\", \"blvd\", \"way\", etc.). Or, you can give me the name of a Manhattan landmark.",
          		//parent: "node_6_1521146866801",
          		context: null,
          		metadata: {},
          		next_step: null,
          		conditions: null,
          		event_name: "focus",
          		description: null,
          		//dialog_node: "handler_7_1521146883633",
          		//previous_sibling: "node_37_1521147552788"
          	}),
            node({
          		type: "slot",
          		title: null,
          		output: {},
          		//parent: "node_6_1521146866801",
          		context: null,
          		metadata: {},
          		variable: "$landmark",
          		next_step: null,
          		conditions: null,
          		description: null,
          		//dialog_node: "slot_8_1521146883638",
          		//previous_sibling: "handler_7_1521146883633"
          	}, [
                    node({
                  		type: "event_handler",
                  		title: null,
                  		output: {},
                  		//parent: "slot_8_1521146883638",
                  		context: {
                  			landmark: "@landmark",
                  			street_name: "placeholder",
                  			street_word: "placeholder",
                  			street_number: "placeholder",
                  			sub_component: "placeholder"
                  		},
                  		metadata: {},
                  		next_step: null,
                  		conditions: "@landmark",
                  		event_name: "input",
                  		description: null,
                  		//dialog_node: "handler_9_1521146883638",
                  		//previous_sibling: "handler_10_1521146883638"
                  	}),
                    node({
                  		type: "event_handler",
                  		title: null,
                  		output: {},
                  		//parent: "slot_8_1521146883638",
                  		context: null,
                  		metadata: {},
                  		next_step: null,
                  		conditions: null,
                  		event_name: "focus",
                  		description: null,
                  		//dialog_node: "handler_10_1521146883638",
                  		//previous_sibling: null
                  	})
            ]),
            node({
              type: "slot",
              title: null,
              output: {},
              //parent: "node_6_1521146866801",
              context: null,
              metadata: {},
              variable: "$sub_component",
              next_step: null,
              conditions: null,
              description: null,
              //dialog_node: "slot_20_1521146903715",
              //previous_sibling: "slot_8_1521146883638"
            }, [
                    node({
                  		type: "event_handler",
                  		title: null,
                  		output: {},
                  		//parent: "slot_20_1521146903715",
                  		context: {
                  			sub_component: "<? input.text.extract('\\d+\\s(\\w)\\s',1) ?>"
                  		},
                  		metadata: {},
                  		next_step: null,
                  		conditions: "@sub_component",
                  		event_name: "input",
                  		description: null,
                  		//dialog_node: "handler_21_1521146903715",
                  		//previous_sibling: "handler_22_1521146903715"
                  	}),
                    node({
                  		type: "event_handler",
                  		title: null,
                  		output: {},
                  		//parent: "slot_20_1521146903715",
                  		context: null,
                  		metadata: {},
                  		next_step: null,
                  		conditions: null,
                  		event_name: "focus",
                  		description: null,
                  		//dialog_node: "handler_22_1521146903715",
                  		//previous_sibling: null
                  	})
            ]),
            node({
          		type: "slot",
          		title: null,
          		output: {},
          		//parent: "node_6_1521146866801",
          		context: null,
          		metadata: {
          			_customization: {
          				mcr: true
          			}
          		},
          		variable: "$street_number",
          		next_step: null,
          		conditions: null,
          		description: null,
          		//dialog_node: "slot_11_1521146898185",
          		//previous_sibling: "slot_20_1521146903715"
          	}, [
                    node({
                  		type: "event_handler",
                  		title: null,
                  		output: {},
                  		//parent: "slot_11_1521146898185",
                  		context: {
                  			street_number: "@sys-number"
                  		},
                  		metadata: {},
                  		next_step: null,
                  		conditions: "@sys-number",
                  		event_name: "input",
                  		description: null,
                  		//dialog_node: "handler_12_1521146898185",
                  		//previous_sibling: "handler_13_1521146898185"
                  	}),
                    node({
                  		type: "event_handler",
                  		title: null,
                  		text: "Can I get a street number for that address? Ex: \"55\", \"1\", \"102\", etc.",
                  		//parent: "slot_11_1521146898185",
                  		context: null,
                  		metadata: null,
                  		next_step: null,
                  		conditions: "true",
                  		event_name: "nomatch",
                  		description: null,
                  		//dialog_node: "handler_26_1521147057621",
                  		//previous_sibling: "handler_25_1521147057621"
                  	}),
                    node({
                  		type: "event_handler",
                  		title: null,
                  		text: "Ok, street number is updated from '<?event.previous_value?>' to '<?event.current_value?>'.",
                  		//parent: "slot_11_1521146898185",
                  		context: null,
                  		metadata: null,
                  		next_step: null,
                  		conditions: "event.previous_value != null && event.previous_value != event.current_value",
                  		event_name: "filled",
                  		description: null,
                  		//dialog_node: "handler_25_1521147057621",
                  		//previous_sibling: "handler_12_1521146898185"
                  	}),
                    node({
                  		type: "event_handler",
                  		title: null,
                  		text: "Can I get a street number for that address?",
                  		//parent: "slot_11_1521146898185",
                  		context: null,
                  		metadata: {},
                  		next_step: null,
                  		conditions: null,
                  		event_name: "focus",
                  		description: null,
                  		//dialog_node: "handler_13_1521146898185",
                  		//previous_sibling: null
                  	})
            ]),
            node({
          		type: "slot",
          		title: null,
          		output: {},
          		//parent: "node_6_1521146866801",
          		context: null,
          		metadata: {
          			_customization: {
          				mcr: true
          			}
          		},
          		variable: "$street_name",
          		next_step: null,
          		conditions: null,
          		description: null,
          		//dialog_node: "node_14_1521146900539",
          		//previous_sibling: "slot_11_1521146898185"
          	}, [
                    node({
                  		type: "event_handler",
                  		title: null,
                  		text: "Can I get a street name for that address? Ex: \"main\", \"mlk\", \"astor\", \"1st\", \"fifth\", etc.",
                  		//parent: "slot_14_1521146900539",
                  		context: null,
                  		metadata: null,
                  		next_step: null,
                  		conditions: "true",
                  		event_name: "nomatch",
                  		description: null,
                  		//dialog_node: "handler_32_1521147143364",
                  		//previous_sibling: "handler_31_1521147143364"
                  	}),
                    node({
                  		type: "event_handler",
                  		title: null,
                  		output: {},
                  		//parent: "slot_14_1521146900539",
                  		context: {
                  			street_name: "@street_name"
                  		},
                  		metadata: {},
                  		next_step: null,
                  		conditions: "@street_name",
                  		event_name: "input",
                  		description: null,
                  		//dialog_node: "handler_15_1521146900539",
                  		//previous_sibling: "handler_16_1521146900539"
                  	}),
                    node({
                  		type: "event_handler",
                  		title: null,
                  		text: "Ok, street name is updated from <?event.previous_value?> to <?event.current_value?>.",
                  		//parent: "slot_14_1521146900539",
                  		context: null,
                  		metadata: null,
                  		next_step: null,
                  		conditions: "event.previous_value != null && event.previous_value != event.current_value",
                  		event_name: "filled",
                  		description: null,
                  		//dialog_node: "handler_31_1521147143364",
                  		//previous_sibling: "handler_15_1521146900539"
                  	}),
                    node({
                  		type: "event_handler",
                  		title: null,
                  		text: "Can I get a street name for that address?",
                  		//parent: "slot_14_1521146900539",
                  		context: null,
                  		metadata: {},
                  		next_step: null,
                  		conditions: null,
                  		event_name: "focus",
                  		description: null,
                  		//dialog_node: "handler_16_1521146900539",
                  		//previous_sibling: null
                  	})
            ]),
            node({
          		type: "slot",
          		title: null,
          		output: {},
          		//parent: "node_6_1521146866801",
          		context: null,
          		metadata: {
          			_customization: {
          				mcr: true
          			}
          		},
          		variable: "$street_word",
          		next_step: null,
          		conditions: null,
          		description: null,
          		//dialog_node: "node_17_1521146902279",
          		//previous_sibling: "slot_14_1521146900539"
          	}, [
                    node({
                  		type: "event_handler",
                  		title: null,
                  		text: "Ok, street word is updated from <?event.previous_value?> to <?event.current_value?>.",
                  		//parent: "slot_17_1521146902279",
                  		context: null,
                  		metadata: null,
                  		next_step: null,
                  		conditions: "event.previous_value != null && event.previous_value != event.current_value",
                  		event_name: "filled",
                  		description: null,
                  		//dialog_node: "handler_33_1521147206517",
                  		//previous_sibling: "handler_18_1521146902279"
                  	}),
                    node({
                  		type: "event_handler",
                  		title: null,
                  		text: "Can I get a street word for that address? Examples: \"st\", \"rd\", \"avenue\", \"place\", etc.",
                  		//parent: "slot_17_1521146902279",
                  		context: null,
                  		metadata: null,
                  		next_step: null,
                  		conditions: "true",
                  		event_name: "nomatch",
                  		description: null,
                  		//dialog_node: "handler_34_1521147206517",
                  		//previous_sibling: "handler_33_1521147206517"
                  	}),
                    node({
                  		type: "event_handler",
                  		title: null,
                  		output: {},
                  		//parent: "slot_17_1521146902279",
                  		context: {
                  			street_word: "@street_word"
                  		},
                  		metadata: {},
                  		next_step: null,
                  		conditions: "@street_word",
                  		event_name: "input",
                  		description: null,
                  		//dialog_node: "handler_18_1521146902279",
                  		//previous_sibling: "handler_19_1521146902279"
                  	}),
                    node({
                  		type: "event_handler",
                  		title: null,
                  		text: "Can I get a street word for that address? Ex: \"st\", \"rd\", \"avenue\", \"place\", etc.",
                  		//parent: "slot_17_1521146902279",
                  		context: null,
                  		metadata: {},
                  		next_step: null,
                  		conditions: null,
                  		event_name: "focus",
                  		description: null,
                  		//dialog_node: "handler_19_1521146902279",
                  		//previous_sibling: null
                  	})
            ]),
            get_landmark_address(),
            no_landmark_given()
        ])
  ];
}

const proceed_with_address = () => {
  return [
    node(
      {
    		type: "standard",
    		title: "proceed with address",
    		text: "Ok, great.",
    		//parent: "node_37_1520460846461",
    		context: null,
    		metadata: {},
    		next_step: {
    			behavior: "jump_to",
    			selector: "condition",
    			dialog_node: "Report complete"
    		},
    		conditions: "$address != null",
    		description: null,
    		//dialog_node: "node_38_1520460846461",
    		//previous_sibling: null
    	}
    )
  ];
}

const get_another_address = () => {
  return [
    node(
      {
    		type: "standard",
    		title: "get another address",
    		text: "Oops. Let's try that address again. I'll need a street number, street name, and street word.",
    		context: {
    				street_name: null,
    				street_word: null,
    				street_number: null,
    				sub_component: null
    			}
    		},
    		//parent: "node_37_1520460846461",
    		context: null,
    		metadata: {},
    		next_step: null,
    		conditions: "true",
    		description: null,
    		//dialog_node: "node_39_1520460846461",
    		//previous_sibling: "node_38_1520460846461"
    	}
    )
  ];
}

const confirmation_address = () => {
  return [
    node({
    		type: "frame",
    		title: "confirmation_address",
    		output: {},
    		//parent: "node_36_1520460846441",
    		context: null,
    		metadata: {
    			fallback: "leave"
    		},
    		next_step: {
    			behavior: "skip_user_input"
    		},
    		conditions: "true",
    		description: null,
    		//dialog_node: "node_37_1520460846461",
    		//previous_sibling: null
    	}, [
            node({
          		type: "slot",
          		title: null,
          		output: {},
          		//parent: "node_37_1520460846461",
          		context: null,
          		metadata: {},
          		variable: "$address",
          		next_step: null,
          		conditions: null,
          		description: null,
          		//dialog_node: "node_40_1520460846461",
          		//previous_sibling: "node_39_1520460846461"
          	}, [
                    node({
                  		type: "event_handler",
                  		title: null,
                  		output: {},
                  		//parent: "slot_40_1520460846461",
                  		context: {
                  			address: "$street_number $street_name $street_word"
                  		},
                  		metadata: {},
                  		next_step: null,
                  		conditions: "#affirmative",
                  		event_name: "input",
                  		description: null,
                  		//dialog_node: "handler_42_1520460846461",
                  		//previous_sibling: "handler_41_1520460846461"
                  	}),
                    node({
                  		type: "event_handler",
                  		title: null,
                  		output: {},
                  		//parent: "slot_40_1520460846461",
                  		context: null,
                  		metadata: {},
                  		next_step: null,
                  		conditions: null,
                  		event_name: "focus",
                  		description: null,
                  		//dialog_node: "handler_41_1520460846461",
                  		//previous_sibling: null
                  	})
            ]),
            node({
          		type: "slot",
          		title: null,
          		output: {},
          		//parent: "node_37_1520460846461",
          		context: null,
          		metadata: {},
          		variable: "$street_number",
          		next_step: null,
          		conditions: null,
          		description: null,
          		//dialog_node: "node_43_1520460846461",
          		//previous_sibling: "slot_40_1520460846461"
          	}, [
                  node({
                		type: "event_handler",
                		title: null,
                		output: {},
                		//parent: "slot_43_1520460846461",
                		context: {
                			address: null,
                			landmark: null,
                			street_name: null,
                			street_word: null,
                			street_number: null,
                			landmark_address: null
                		},
                		metadata: {},
                		next_step: null,
                		conditions: "#negative",
                		event_name: "input",
                		description: null,
                		//dialog_node: "handler_45_1520460846461",
                		//previous_sibling: "handler_44_1520460846461"
                	}),
                  // node({
                  //   //TODO -  *** Does this belong here??? Seems very out of place in this node... ***
                  //   //   *** Commenting this out for now, I think it is a mistake. Address rejection is handled in get_another_address node.
                	// 	type: "event_handler",
                	// 	title: null,
                	// 	output: {
                	// 		text: {
                	// 			"values": ["Oops, let's try again. Tell me in a few words the issue you would like to report to 311."],
                	// 			"selection_policy": "sequential"
                	// 		}
                	// 	},
                	// 	parent: "slot_43_1520460846461",
                	// 	context: null,
                	// 	metadata: {},
                	// 	next_step: null,
                	// 	conditions: null,
                	// 	event_name: "filled",
                	// 	description: null,
                	// 	dialog_node: "handler_46_1520460846461",
                	// 	previous_sibling: "handler_45_1520460846461"
                	// }),
                  node({
                		type: "event_handler",
                		title: null,
                		output: {},
                		//parent: "slot_43_1520460846461",
                		context: null,
                		metadata: {},
                		next_step: null,
                		conditions: null,
                		event_name: "focus",
                		description: null,
                		//dialog_node: "handler_44_1520460846461",
                		//previous_sibling: null
                	})
            ]),
            proceed_with_address(),
            get_another_address()
    ])
  ];
}

const confirm_the_address = () => {
  return [
    node(
      {
    		type: "standard",
    		title: "Confirm The Address",
    		output: {},
    		//parent: null,
    		context: null,
    		metadata: {
    			_customization: {
    				mcr: true
    			}
    		},
    		next_step: null,
    		conditions: "true",
    		digress_in: "does_not_return",
    		description: null,
    		//dialog_node: "node_36_1520460846441",
    		digress_out: "allow_all",
    		//previous_sibling: "node_6_1521146866801"
    	}, [
            node({
          		type: "response_condition",
          		title: null,
          		text: "I have the address as ' $landmark_address ', which is the address for '$landmark'. Is that right?",
          		//parent: "node_36_1520460846441",
          		context: null,
          		metadata: {},
          		next_step: null,
          		conditions: "$landmark_address != null",
          		description: null,
          		//dialog_node: "node_7_1520971063998",
          		//previous_sibling: "node_37_1520460846461"
          	}),
            node({
          		type: "response_condition",
          		title: null,
          		text: "I have the address as ' $street_number $sub_component $street_name $street_word '. Is that right?",
          		//parent: "node_36_1520460846441",
          		context: null,
          		metadata: {},
          		next_step: null,
          		conditions: "$street_number != null && $street_name != null && $street_word != null",
          		description: null,
          		//dialog_node: "node_6_1520971048725",
          		//previous_sibling: "node_7_1520971063998"
          	}),
            confirmation_address()
    ])
  ];
}


const report_complete = () => {
  return [
    node({
    		type: "standard",
    		title: "Report complete",
    		output: {},
    		//parent: null,
    		context: null,
    		metadata: {
    			_customization: {
    				mcr: true
    			}
    		},
    		next_step: null,
    		conditions: "$c_ct != null && $address != null || c_ct != null && $landmark_address != null",
    		digress_in: "does_not_return",
    		description: null,
    		//dialog_node: "node_54_1520461610873",
    		digress_out: "allow_all",
    		//previous_sibling: "node_36_1520460846441"
    	}, [
            node({
          		type: "response_condition",
          		title: null,
          		text: "This report about ' $c_ct ', at ' $address ', will be filed with 311.",
          		//parent: "node_54_1520461610873",
          		context: null,
          		metadata: {},
          		next_step: null,
          		conditions: "$address != null",
          		description: null,
          		//dialog_node: "node_38_1521147872666",
          		//previous_sibling: "node_39_1521147942322"
          	}),
            node({
          		type: "response_condition",
          		title: null,
          		text: "This report about ' $c_ct ', at ' $landmark_address ', will be filed with 311.",
          		//parent: "node_54_1520461610873",
          		context: null,
          		metadata: {},
          		next_step: null,
          		conditions: "$landmark_address != null",
          		description: null,
          		//dialog_node: "node_39_1521147942322",
          		//previous_sibling: null
          	})
      ])
  ];
}

const anything_else = () => {
  return [
    node(
      {
    		type: "standard",
    		title: "Anything else",
    		text: "I didn't understand. You can try rephrasing.", "Can you reword your statement? I'm not understanding.", "I didn't get your meaning.",
    		//parent: null,
    		context: null,
    		metadata: {},
    		next_step: null,
    		conditions: "anything_else",
    		description: null,
    		//dialog_node: "Anything else",
    		//previous_sibling: "node_54_1520461610873"
    	}
    )
  ];
}





const node = (values, children) => {
  let result = {
    children: children || null,
    override_node_name: values['title'] || null,
    node: {}
  };

  if ('conditions' in values && values['conditions'] != null) {
    result['node']['conditions'] = values['conditions'];
  }

  if ('next_step' in values && values['next_step'] != null) {
    //next_step doesn't need "selector" or "dialog_node" if the behavior is 'skip_user_input'
    if values['next_step']['behavior'] == 'skip_user_input' {
        result['node']['next_step'] = {
          behavior: values['next_step']['behavior'],
        }
      } else {
        result['node']['next_step'] = {
          behavior: values['next_step']['behavior'],
          dialog_node: values['next_step']['dialog_node'],
          selector: values['next_step']['selector']
        }
      }
  }

  if ('context' in values && values['context'] != null) {
    result['node']['context'] = values['context'];
  }

  if ('text' in values && values['text'] != null) {
    result['node']['output'] = {
      text: {
        values: [ values['text'] ],
        selection_policy: "sequential"
      }
    };
  }

  if ('type' in values && values['type'] != null) {
    result['node']['type'] = values['type'];
  }

  if ('metadata' in values && values['metadata'] != null) {
    result['node']['metadata'] = values['metadata'];
    //TODO - does "metadata" need to be broken up into its parts (if they're != null)?
  }

  if ('event_name' in values && values['event_name'] != null) {
    result['node']['event_name'] = values['event_name'];
  }

  if ('variable' in values && values['variable'] != null) {
    result['node']['variable'] = values['variable'];
  }


  return result;
};

const parseBranch = (branch, name, parentName, previousSiblingName, result) => {
  let node = branch['node'];
  let dialog_node = branch['override_node_name'] || name.toString();
  node['dialog_node'] = dialog_node;
  if (parentName != null) {
    node['parent'] = parentName;
  }
  if (previousSiblingName != null) {
    node['previous_sibling'] = previousSiblingName;
  }
  result.push(node);
  if('children' in branch && branch['children']) {
    let lastName = '';
    for(let i = 0; i < branch['children'].length; i++) {
      let child_name = dialog_node + '_' + i;
      let child = branch['children'][i];
      if (i == 0) {
        lastName = parseBranch(child, child_name, dialog_node, null, result);
      } else {
        lastName = parseBranch(child, child_name, dialog_node, lastName, result);
      }
    }
  }
  return dialog_node;
};

let _entities_dpr = export_file('./wcs_config/raw/strings/entity_agency_mappings/damaged_tree_dpr');
let _entities_dep = export_file('./wcs_config/raw/strings/entity_agency_mappings/noise_dep');
let _entities_nypd = export_file('./wcs_config/raw/strings/entity_agency_mappings/noise_nypd');
let _entities_dot = export_file('./wcs_config/raw/strings/entity_agency_mappings/street_condition_dot');
let _agencies = export_file('./wcs_config/raw/strings/agencies');

// this function collapses subtrees into a 1D array with proper parent names and previous siblings
const exportDialogTree = () => {

  // remember - order here is important!
  let groups = [

    welcome(),

    get_issue(),

    confirm_the_issue(),

    issue_confirmed_need_address(),

    get_address(),

    confirm_the_address(),

    report_complete(),

    anything_else()

  ];


  let lastName = null;
  let result = [];
  let counter = 0;
  for(let i = 0; i < groups.length; i++) {
    for(let j = 0; j < groups[i].length; j++) {
      lastName = parseBranch(groups[i][j], counter, null, lastName, result);
      counter++;
    }
  }
  return result;
};

module.exports = {
  dialog: exportDialogTree(),
  _address_uninitialized: _address_uninitialized,
  _address_failure_limit: _address_failure_limit,
  _ct_failure_limit: _ct_failure_limit
};
