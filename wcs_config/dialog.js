
const fs = require('fs');
const PropertiesReader = require('properties-reader');
const props = PropertiesReader('./wcs_config/raw/strings/responses');
const _intent_phrases = PropertiesReader('./wcs_config/raw/strings/intent_phrases');
const _entity_phrases = PropertiesReader('./wcs_config/raw/strings/entity_phrases');
const _landmark_phrases = PropertiesReader('wcs_config/raw/strings/landmark_phrases');
const _landmark_addresses = PropertiesReader('wcs_config/raw/strings/landmark_addresses');

//allow 2 address failures, maximum
//(increment failed_address by 1 for rejected address, by 1 for out-of-bounds address, and by 2 for undecipherable address)
const _address_failure_limit = 2;
//allow 3 complaint type failures, maximum
//(increment failed_ct by 2 for misclassification (rejected classification), and by 3 for unclassifiable input)
const _ct_failure_limit = 6;


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

const _landmark_entities = exportRaw('./wcs_config/raw/entities/landmark');

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

const get_issue = () => {
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
        dialog_node: "Get Issue",
        digress_out: "allow_all",
        previous_sibling: "Welcome",
        digress_out_slots: "not_allowed"
      }, [
          node({
        		type: "event_handler",
        		title: null,
        		text: "Please describe, in a few words, the issue you wish to report to 311.",
        		context: null,
        		metadata: {},
        		next_step: null,
        		conditions: null,
        		event_name: "focus",
        		description: null,
        	}),
          node({
              type: "slot",
              title: null,
              output: {},
              context: null,
              metadata: {},
              variable: "$agency",
              next_step: null,
              conditions: null,
              description: null,
            }, [
                      node({
                        type: "event_handler",
                        title: null,
                        output: {},
                        context: {
                          ct: "noise",
                          agency: "dep"
                        },
                        metadata: {},
                        next_step: null,
                        conditions: "#report-noise && @dep",
                        event_name: "input",
                        description: null,
                      }),
                      node({
                        type: "event_handler",
                        title: null,
                        output: {},
                        context: null,
                        metadata: null,
                        next_step: null,
                        conditions: null,
                        event_name: "focus",
                        description: null,
                      })
                  ]),
          node({
            type: "slot",
            title: null,
            output: {},
            context: null,
            metadata: {},
            variable: "$agency",
            next_step: null,
            conditions: null,
            description: null,
          }, [
                      node({
                        type: "event_handler",
                        title: null,
                        output: {},
                        context: {
                          ct: "noise",
                          agency: "nypd"
                        },
                        metadata: {},
                        next_step: null,
                        conditions: "#report-noise && @nypd",
                        event_name: "input",
                        description: null,
                      }),
                      node({
                        type: "event_handler",
                        title: null,
                        output: {},
                        context: null,
                        metadata: null,
                        next_step: null,
                        conditions: null,
                        event_name: "focus",
                        description: null,
                      })
                  ]),
                  node({
                		type: "slot",
                		title: null,
                		output: {},
                		context: null,
                		metadata: {},
                		variable: "$agency",
                		next_step: null,
                		conditions: null,
                		description: null,
                	}, [
                                node({
                              		type: "event_handler",
                              		title: null,
                              		output: {},
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
                              	}),
                                node({
                              		type: "event_handler",
                              		title: null,
                              		output: {},
                              		context: null,
                              		metadata: {},
                              		next_step: null,
                              		conditions: null,
                              		event_name: "focus",
                              		description: null,
                              	})
                            ]),
                  node({
                		type: "slot",
                		title: null,
                		output: {},
                		context: null,
                		metadata: {},
                		variable: "$agency",
                		next_step: null,
                		conditions: null,
                		description: null,
                	}, [
                                node({
                              		type: "event_handler",
                              		title: null,
                              		output: {},
                              		context: {
                              			agency: "dpr",
                              			entity: "@dpr.value"
                              		},
                              		metadata: {},
                              		next_step: null,
                              		conditions: "#report-damaged-tree && @dpr",
                              		event_name: "input",
                              		description: null,
                              	}),
                                node({
                              		type: "event_handler",
                              		title: null,
                              		output: {},
                              		context: null,
                              		metadata: {},
                              		next_step: null,
                              		conditions: null,
                              		event_name: "focus",
                              		description: null,
                              	})
                            ]),
          node({
          		type: "slot",
          		title: null,
          		output: {},
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
          	}, [
                  node({
                		type: "event_handler",
                		title: null,
                		output: {},
                		context: {
                			ct: "noise"
                		},
                		metadata: {},
                		next_step: null,
                		conditions: "#report-noise",
                		event_name: "input",
                		description: null,
                	}),
                  node({
                		type: "event_handler",
                		title: null,
                		output: {},
                		context: null,
                		metadata: {},
                		next_step: null,
                		conditions: null,
                		event_name: "focus",
                		description: null,
                	})
                ]),
          node({
          		type: "slot",
          		title: null,
          		output: {},
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
          	}, [
                      node({
                    		type: "event_handler",
                    		title: null,
                    		output: {},
                    		context: {
                    			ct: "tree damage"
                    		},
                    		metadata: {},
                    		next_step: null,
                    		conditions: "#report-damaged-tree",
                    		event_name: "input",
                    		description: null,
                    	}),
                      node({
                    		type: "event_handler",
                    		title: null,
                    		output: {},
                    		context: null,
                    		metadata: {},
                    		next_step: null,
                    		conditions: null,
                    		event_name: "focus",
                    		description: null,
                    		previous_sibling: null
                    	})
                  ]),
          node({
        		type: "slot",
        		title: null,
        		output: {},
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
        	}, [
                        node({
                      		type: "event_handler",
                      		title: null,
                      		output: {},
                      		context: {
                      			ct: "graffiti"
                      		},
                      		metadata: {},
                      		next_step: null,
                      		conditions: "#report-graffiti",
                      		event_name: "input",
                      		description: null,
                      	}),
                        node({
                      		type: "event_handler",
                      		title: null,
                      		output: {},
                      		context: null,
                      		metadata: {},
                      		next_step: null,
                      		conditions: null,
                      		event_name: "focus",
                      		description: null,
                      	})
                  ]),
          node({
        		type: "slot",
        		title: null,
        		output: {},
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
        	}, [
                      node({
                    		type: "event_handler",
                    		title: null,
                    		output: {},
                    		context: {
                    			ct: "poor street conditions"
                    		},
                    		metadata: {},
                    		next_step: null,
                    		conditions: "#report-street-condition",
                    		event_name: "input",
                    		description: null,
                    	}),
                      node({
                    		type: "event_handler",
                    		title: null,
                    		output: {},
                    		context: null,
                    		metadata: {},
                    		next_step: null,
                    		conditions: null,
                    		event_name: "focus",
                    		description: null,
                    	})
                  ])
        ])
  ];
}


const proceed_with_issue_report = () => {
  return [
    node(
      {
        type: "standard",
        title: "proceed with issue report",
        text: "Ok, great.",
        context: null,
        metadata: {},
        next_step: {
          behavior: "jump_to",
          selector: "body",
          dialog_node: "Issue confirmed-need address"
        },
        conditions: "$ct != null && $c_ct != null",
        description: null,
        dialog_node: "proceed with issue report",
      }
    )
  ];
}

const get_another_issue_report = () => {
  return [
    node(
      {
        type: "standard",
        title: "get another issue report",
        text: "Oops. Let's try again. Please describe, in a few words, the issue you'd like to report to 311.",
        context: null,
        metadata: {},
        next_step: {
          behavior: "jump_to",
          selector: "user_input",
          dialog_node: "Get Issue"
        },
        conditions: "true",
        description: null,
        dialog_node: "get another issue report",
      }
    )
  ];
}


const process_issue_confirmation = () => {
  let result = [
    node({
    		type: "frame",
    		title: "process_issue_confirmation",
    		text: null,
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
    		dialog_node: "process_issue_confirmation",
    		digress_out: "allow_all",
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
          		context: null,
              // DISABLED???!
          		disabled: true,
          		metadata: {},
          		next_step: null,
          		conditions: null,
          		description: null,
          	}),
            node({
              type: "slot",
              title: null,
              output: {},
              context: null,
              metadata: {},
              variable: "$c_ct",
              next_step: null,
              conditions: null,
              description: null,
            }, [
                  node({
                    type: "event_handler",
                    title: null,
                    output: {},
                    context: {
                      c_ct: "$ct",
                      c_agency: "$agency"
                    },
                    metadata: {},
                    next_step: null,
                    conditions: "#affirmative",
                    event_name: "input",
                    description: null,
                  })
            ]),
            node({
          		type: "slot",
          		title: null,
          		output: {},
          		context: null,
          		metadata: {},
          		variable: "$ct",
          		next_step: null,
          		conditions: null,
          		description: null,
          	}, [
                    node({
                		type: "event_handler",
                		title: null,
                		output: {},
                		context: {
                			ct: null
                		},
                		metadata: {},
                		next_step: null,
                		conditions: "#negative",
                		event_name: "input",
                		description: null,
                	})
              ])

    ].concat( proceed_with_issue_report() )
    .concat( get_another_issue_report() )
    )
  ];

  return result;
}

const confirm_the_issue = () => {

  let result = [
    node (
      {
      type: "standard",
      title: "Confirm The Issue",
      output: {},
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
      dialog_node: "Confirm The Issue",
      digress_out: "allow_all",
    }, [
        node({
      		type: "response_condition",
      		title: null,
      		text: "I have a report about '$ct'. Is that right?",
      		context: null,
      		metadata: {},
      		next_step: null,
      		conditions: "$agency == null",
      		description: null,
      	}),
        node({
      		type: "response_condition",
      		title: null,
      		text: "I have a report about '$ct', specifically about '$entity'. Is that right?",
      		context: null,
      		metadata: {},
      		next_step: null,
      		conditions: "$agency != \"null\"",
      		description: null,
      	})
      ].concat(process_issue_confirmation())
    )
  ];

  return result;
}

const issue_confirmed_need_address = () => {
  return [
    node(
      {
    		type: "standard",
    		title: "Issue confirmed-need address",
    		text: "Next, I'll need to get an address where the reported issue is located.",
    		context: null,
    		metadata: {},
    		next_step: {
    			behavior: "jump_to",
    			selector: "condition",
    			dialog_node: "Get Address"
    		},
    		conditions: "true",
    		description: null,
    		dialog_node: "Issue confirmed-need address",
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
    		dialog_node: "get landmark address",
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
    		context: null,
    		metadata: {},
    		next_step: {
    			behavior: "jump_to",
    			selector: "condition",
    			dialog_node: "Confirm The Address"
    		},
    		conditions: "$landmark == null",
    		description: null,
    		dialog_node: "no landmark given",
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
    		dialog_node: "Get Address",
    		digress_out: "allow_all",
    		digress_out_slots: "not_allowed"
    	}, [
            node({
          		type: "event_handler",
          		title: null,
          		text: "I'll need a street number, street name, and a street word (like \"road\", \"st\", \"blvd\", \"way\", etc.). Or, you can give me the name of a Manhattan landmark.",
          		context: null,
          		metadata: {},
          		next_step: null,
          		conditions: null,
          		event_name: "focus",
          		description: null,
          	}),
            node({
          		type: "slot",
          		title: null,
          		output: {},
          		context: null,
          		metadata: {},
          		variable: "$landmark",
          		next_step: null,
          		conditions: null,
          		description: null,
          	}, [
                    node({
                  		type: "event_handler",
                  		title: null,
                  		output: {},
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
                  	}),
                    node({
                  		type: "event_handler",
                  		title: null,
                  		output: {},
                  		context: null,
                  		metadata: {},
                  		next_step: null,
                  		conditions: null,
                  		event_name: "focus",
                  		description: null,
                  	})
            ]),
            node({
              type: "slot",
              title: null,
              output: {},
              context: null,
              metadata: {},
              variable: "$sub_component",
              next_step: null,
              conditions: null,
              description: null,
            }, [
                    node({
                  		type: "event_handler",
                  		title: null,
                  		output: {},
                  		context: {
                  			sub_component: "<? input.text.extract('\\d+\\s(\\w)\\s',1) ?>"
                  		},
                  		metadata: {},
                  		next_step: null,
                  		conditions: "@sub_component",
                  		event_name: "input",
                  		description: null,
                  	}),
                    node({
                  		type: "event_handler",
                  		title: null,
                  		output: {},
                  		context: null,
                  		metadata: {},
                  		next_step: null,
                  		conditions: null,
                  		event_name: "focus",
                  		description: null,
                  	})
            ]),
            node({
          		type: "slot",
          		title: null,
          		output: {},
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
          	}, [
                    node({
                  		type: "event_handler",
                  		title: null,
                  		output: {},
                  		context: {
                  			street_number: "@sys-number"
                  		},
                  		metadata: {},
                  		next_step: null,
                  		conditions: "@sys-number",
                  		event_name: "input",
                  		description: null,
                  	}),
                    node({
                  		type: "event_handler",
                  		title: null,
                  		text: "Can I get a street number for that address? Ex: \"55\", \"1\", \"102\", etc.",
                  		context: null,
                  		metadata: null,
                  		next_step: null,
                  		conditions: "true",
                  		event_name: "nomatch",
                  		description: null,
                  	}),
                    node({
                  		type: "event_handler",
                  		title: null,
                  		text: "Ok, street number is updated from '<?event.previous_value?>' to '<?event.current_value?>'.",
                  		context: null,
                  		metadata: null,
                  		next_step: null,
                  		conditions: "event.previous_value != null && event.previous_value != event.current_value",
                  		event_name: "filled",
                  		description: null,
                  	}),
                    node({
                  		type: "event_handler",
                  		title: null,
                  		text: "Can I get a street number for that address?",
                  		context: null,
                  		metadata: {},
                  		next_step: null,
                  		conditions: null,
                  		event_name: "focus",
                  		description: null,
                  	})
            ]),
            node({
          		type: "slot",
          		title: null,
          		output: {},
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
          	}, [
                    node({
                  		type: "event_handler",
                  		title: null,
                  		text: "Can I get a street name for that address? Ex: \"main\", \"mlk\", \"astor\", \"1st\", \"fifth\", etc.",
                  		context: null,
                  		metadata: null,
                  		next_step: null,
                  		conditions: "true",
                  		event_name: "nomatch",
                  		description: null,
                  	}),
                    node({
                  		type: "event_handler",
                  		title: null,
                  		output: {},
                  		context: {
                  			street_name: "@street_name"
                  		},
                  		metadata: {},
                  		next_step: null,
                  		conditions: "@street_name",
                  		event_name: "input",
                  		description: null,
                  	}),
                    node({
                  		type: "event_handler",
                  		title: null,
                  		text: "Ok, street name is updated from <?event.previous_value?> to <?event.current_value?>.",
                  		context: null,
                  		metadata: null,
                  		next_step: null,
                  		conditions: "event.previous_value != null && event.previous_value != event.current_value",
                  		event_name: "filled",
                  		description: null,
                  	}),
                    node({
                  		type: "event_handler",
                  		title: null,
                  		text: "Can I get a street name for that address?",
                  		context: null,
                  		metadata: {},
                  		next_step: null,
                  		conditions: null,
                  		event_name: "focus",
                  		description: null,
                  	})
            ]),
            node({
          		type: "slot",
          		title: null,
          		output: {},
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
          	}, [
                    node({
                  		type: "event_handler",
                  		title: null,
                  		text: "Ok, street word is updated from <?event.previous_value?> to <?event.current_value?>.",
                  		context: null,
                  		metadata: null,
                  		next_step: null,
                  		conditions: "event.previous_value != null && event.previous_value != event.current_value",
                  		event_name: "filled",
                  		description: null,
                  	}),
                    node({
                  		type: "event_handler",
                  		title: null,
                  		text: "Can I get a street word for that address? Examples: \"st\", \"rd\", \"avenue\", \"place\", etc.",
                  		context: null,
                  		metadata: null,
                  		next_step: null,
                  		conditions: "true",
                  		event_name: "nomatch",
                  		description: null,
                  	}),
                    node({
                  		type: "event_handler",
                  		title: null,
                  		output: {},
                  		context: {
                  			street_word: "@street_word"
                  		},
                  		metadata: {},
                  		next_step: null,
                  		conditions: "@street_word",
                  		event_name: "input",
                  		description: null,
                  	}),
                    node({
                  		type: "event_handler",
                  		title: null,
                  		text: "Can I get a street word for that address? Ex: \"st\", \"rd\", \"avenue\", \"place\", etc.",
                  		context: null,
                  		metadata: {},
                  		next_step: null,
                  		conditions: null,
                  		event_name: "focus",
                  		description: null,
                  	})
            ])

        ].concat( get_landmark_address() )
        .concat( no_landmark_given() )
      )
  ];
}

const proceed_with_address = () => {
  return [
    node(
      {
    		type: "standard",
    		title: "proceed with address",
    		text: "Ok, great.",
    		context: null,
    		metadata: {},
    		next_step: {
    			behavior: "jump_to",
    			selector: "condition",
    			dialog_node: "Report complete"
    		},
    		conditions: "$address != null",
    		description: null,
    		dialog_node: "proceed with address",
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
        //TODO - context variables are already reset in confirmation_address node, don't need to do it here
        context: {
    				street_name: null,
    				street_word: null,
    				street_number: null,
    				sub_component: null
    		},
    		metadata: {},
    		next_step: null,
    		conditions: "true",
    		description: null,
    		dialog_node: "get another address",
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
    		context: null,
    		metadata: {
    			fallback: "leave"
    		},
    		next_step: {
    			behavior: "skip_user_input"
    		},
    		conditions: "true",
    		description: null,
    		dialog_node: "confirmation_address",
    	}, [
            node({
          		type: "slot",
          		title: null,
          		output: {},
          		context: null,
          		metadata: {},
          		variable: "$address",
          		next_step: null,
          		conditions: null,
          		description: null,
          	}, [
                    node({
                  		type: "event_handler",
                  		title: null,
                  		output: {},
                  		context: {
                  			address: "$street_number $street_name $street_word"
                  		},
                  		metadata: {},
                  		next_step: null,
                  		conditions: "#affirmative",
                  		event_name: "input",
                  		description: null,
                  	}),
                    node({
                  		type: "event_handler",
                  		title: null,
                  		output: {},
                  		context: null,
                  		metadata: {},
                  		next_step: null,
                  		conditions: null,
                  		event_name: "focus",
                  		description: null,
                  	})
            ]),
            node({
          		type: "slot",
          		title: null,
          		output: {},
          		context: null,
          		metadata: {},
          		variable: "$street_number",
          		next_step: null,
          		conditions: null,
          		description: null,
          	}, [
                  node({
                		type: "event_handler",
                		title: null,
                		output: {},
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
                	}),
                  node({
                		type: "event_handler",
                		title: null,
                		output: {},
                		context: null,
                		metadata: {},
                		next_step: null,
                		conditions: null,
                		event_name: "focus",
                		description: null,
                	})
            ])
    ].concat( proceed_with_address() )
    .concat( get_another_address() )
  )
  ];
}

const confirm_the_address = () => {
  return [
    node(
      {
    		type: "standard",
    		title: "Confirm The Address",
    		output: {},
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
    		dialog_node: "Confirm The Address",
    		digress_out: "allow_all",
    	}, [
            node({
          		type: "response_condition",
          		title: null,
          		text: "I have the address as ' $landmark_address ', which is the address for '$landmark'. Is that right?",
          		context: null,
          		metadata: {},
          		next_step: null,
          		conditions: "$landmark_address != null",
          		description: null,
          	}),
            node({
          		type: "response_condition",
          		title: null,
          		text: "I have the address as ' $street_number $sub_component $street_name $street_word '. Is that right?",
          		context: null,
          		metadata: {},
          		next_step: null,
          		conditions: "$street_number != null && $street_name != null && $street_word != null",
          		description: null,
          	})
    ].concat(confirmation_address())
  )
  ];
}


const report_complete = () => {
  return [
    node({
    		type: "standard",
    		title: "Report complete",
    		output: {},
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
    		dialog_node: "Report complete",
    		digress_out: "allow_all",
    	}, [
            node({
          		type: "response_condition",
          		title: null,
          		text: "This report about ' $c_ct ', at ' $address ', will be filed with 311.",
          		context: null,
          		metadata: {},
          		next_step: null,
          		conditions: "$address != null",
          		description: null,
          	}),
            node({
          		type: "response_condition",
          		title: null,
          		text: "This report about ' $c_ct ', at ' $landmark_address ', will be filed with 311.",
          		context: null,
          		metadata: {},
          		next_step: null,
          		conditions: "$landmark_address != null",
          		description: null,
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
    		text: ["I didn't understand. Can you try rephrasing?"],
    		context: null,
    		metadata: {},
    		next_step: null,
    		conditions: "anything_else",
    		description: null,
    		dialog_node: "Anything else",
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
    if (values['next_step']['behavior'] == 'skip_user_input') {
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
    if ('event_name' in values && values['event_name'] == 'focus') {
      result['node']['output'] = {
        text: values['text']
      };
    } else {
        result['node']['output'] = {
          text: {
            values: [ values['text'] ],
            selection_policy: "sequential"
          }
        };
      }
  };

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

  if ('digress_in' in values && values['digress_in'] != null) {
    result['node']['digress_in'] = values['digress_in'];
  }

  if ('digress_out' in values && values['digress_out'] != null) {
    result['node']['digress_out'] = values['digress_out'];
  }

  if ('digress_out_slots' in values && values['digress_out_slots'] != null) {
    result['node']['digress_out_slots'] = values['digress_out_slots'];
  }

  return result;
};


const parseBranch = (branch, name, parentName, previousSiblingName, result) => {
  let node = branch['node'];

  let dialog_node = branch['override_node_name'] || name.toString();

  node['title'] = dialog_node;
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
  _address_failure_limit: _address_failure_limit,
  _ct_failure_limit: _ct_failure_limit
};
