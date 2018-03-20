
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


/*

The following methods are OLD - from old non-slots design:


const get_reset_context = () => {
  return {
    address: _address_uninitialized,
    c_address: _address_uninitialized,
    ct: "",
    ct_friendly: "",
    c_ct: "",
    c_ct_friendly: "",
    entity: "",
    entity_friendly: "",
    c_entity: "",
    c_entity_friendly: "",
    agency: "",
    failed_ct: 0,
    failed_address: 0,
    landmark: "",
    landmark_friendly: "",
    landmark_address: ""
  };
};

const get_greeting = () => {
  return [
    node({
      conditions: "intents[0] == 'greeting' && intents[0].confidence > 0.7",
      text: props.get('greeting'),
    })
  ];
};

const get_function_question = () => {
  return [
    node({
      conditions: "intent == 'what-function'",
      text: props.get('explain_purpose'),
    })
  ];
};

const get_generic_report = () => {
  return [
    node({
      dialog_node: "generic-report",
      conditions: "intent == 'generic-report'",
      text: props.get('more_detail'),
    })
  ];
};

const get_unclassifiable = () => {
  return [
    node({
      dialog_node: "unclassifiable",
      conditions: "context['ct'] == ''",
      text: props.get('retry_unclassifiable'),
      context: {
        failed_ct: "<? context['failed_ct'] + 3 ?>"
      }
    })
  ];
};

const get_misclassified = () => {
  return [
    node({
      dialog_node: "misclassified",
      conditions: "context['c_ct'] == ''",
      text: props.get('retry_misclassified'),
      context: {
        ct: ''
      }
    })
  ];
};

const get_failed_ct = () => {
  return [
    node({
      dialog_node: "failed-ct",
      conditions: `context['failed_ct'] >= ${_ct_failure_limit}`,
      text: props.get('call-human'),
      //Clear context for the next conversation in the app
      context: get_reset_context(),
      next_step: {
        dialog_node: "generic-resource",
        selector: "body"
      }
    }),
    node({
      dialog_node: "generic-resource",
      text: props.get('resource-generic'),
      selector: "body"
    })
  ];
};

//generic node-generating fxn for noise & DEP entities
const get_noise_dep_entities = () => {
  let result = [];
  let _entities = _entities_dep;
  for (let i in _entities) {
    result.push(
      node({
        conditions: `intent == 'report-noise' && entities['` + _entities[i] + `'] && context['failed_ct'] <= ${_ct_failure_limit}`,
        dialog_node: "noise-" + _entities[i],
        context: {
          ct: 'report-noise',
          ct_friendly: _intent_phrases.get('report-noise'),
          entity: _entities[i],
          entity_friendly: _entity_phrases.get(_entities[i])
        },
        text: props.get('confirm-noise-entity')
      }, [
        node({
          conditions: "intent == 'affirmative' || entities['affirmative']",
          context: {
            c_ct: "<? context['ct'] ?>",
            c_ct_friendly: "<? context['ct_friendly'] ?>",
            c_entity: "<? context['entity'] ?>",
            c_entity_friendly: "<? context['entity_friendly'] ?>",
            agency: "dep",
            failed_ct: "<? context['failed_ct'] - 1 ?>"
          },
          text: props.get('reference-dep'),
          next_step: {
            dialog_node: "0",
            selector: "condition"
          }
        }),
        node({
          conditions: "intent == 'negative' || entities['negative']",
          context: {
            failed_ct: "<? context['failed_ct'] + 2 ?>"
          },
          next_step: {
            dialog_node: "0",
            selector: "condition"
          }
        }),
        node({
          conditions: `context['address'] != '${_address_uninitialized}'`,
          context: {
            c_ct: "<? context['ct'] ?>",
            c_ct_friendly: "<? context['ct_friendly'] ?>",
            c_entity: "<? context['entity'] ?>",
            c_entity_friendly: "<? context['entity_friendly'] ?>",
            agency: "dep",
            failed_ct: "<? context['failed_ct'] - 1 ?>"
          },
          next_step: {
            dialog_node: "0",
            selector: "condition"
          }
        }),
        node({
          conditions: "true",
          context: {
            failed_ct: "<? context['failed_ct'] + 2 ?>",
          },
          next_step: {
            dialog_node: "0",
            selector: "condition"
          }
        })
      ])
    );
  }
  return result
};

//generic node-generating fxn for noise & NYPD entities
const get_noise_nypd_entities = () => {
  let result = [];
  let _entities = _entities_nypd;
  for (let i in _entities) {
    result.push(
      node({
        conditions: `intent == 'report-noise' && entities['` + _entities[i] + `'] && context['failed_ct'] <= ${_ct_failure_limit}`,
        dialog_node: "noise-" + _entities[i],
        context: {
          ct: 'report-noise',
          ct_friendly: _intent_phrases.get('report-noise'),
          entity: _entities[i],
          entity_friendly: _entity_phrases.get(_entities[i])
        },
        text: props.get('confirm-noise-entity')
      }, [
        node({
          conditions: "intent == 'affirmative' || entities['affirmative']",
          context: {
            c_ct: "<? context['ct'] ?>",
            c_ct_friendly: "<? context['ct_friendly'] ?>",
            c_entity: "<? context['entity'] ?>",
            c_entity_friendly: "<? context['entity_friendly'] ?>",
            agency: "nypd",
            failed_ct: "<? context['failed_ct'] - 1 ?>"
          },
          text: props.get('reference-nypd'),
          next_step: {
            dialog_node: "0",
            selector: "condition"
          }
        }),
        node({
          conditions: "intent == 'negative' || entities['negative']",
          context: {
            failed_ct: "<? context['failed_ct'] + 2 ?>"
          },
          next_step: {
            dialog_node: "0",
            selector: "condition"
          }
        }),
        node({
          conditions: `context['address'] != '${_address_uninitialized}'`,
          context: {
            c_ct: "<? context['ct'] ?>",
            c_ct_friendly: "<? context['ct_friendly'] ?>",
            c_entity: "<? context['entity'] ?>",
            c_entity_friendly: "<? context['entity_friendly'] ?>",
            agency: "nypd",
            failed_ct: "<? context['failed_ct'] - 1 ?>"
          },
          next_step: {
            dialog_node: "0",
            selector: "condition"
          }
        }),
        node({
          conditions: "true",
          context: {
            failed_ct: "<? context['failed_ct'] + 2 ?>",
          },
          next_step: {
            dialog_node: "0",
            selector: "condition"
          }
        })
      ])
    );
  }
  return result
};


//custom node-generating fxn for noise & alarm, with follow-up question
const get_noise_alarm = () => {
    return [
      node({
        conditions: `intent == 'report-noise' && entities['alarm']  && context['failed_ct'] <= ${_ct_failure_limit}`,
        dialog_node: "noise-alarm",
        context: {
          ct: 'report-noise',
          ct_friendly: _intent_phrases.get('report-noise'),
          entity: 'alarm',
          entity_friendly: _entity_phrases.get('alarm')
        },
        text: props.get('confirm-noise-entity')
      }, [
        node({
          conditions: "intent == 'affirmative' || entities['affirmative']",
          text: props.get('noise-alarm-follow-up'),
          context: {
            failed_ct: "<? context['failed_ct'] - 1 ?>"
          }
        },
        [
          node({
            conditions: "intent == 'affirmative' || entities['affirmative']",
            context: {
              c_ct: "<? context['ct'] ?>",
              c_ct_friendly: "<? context['ct_friendly'] ?>",
              c_entity: "<? context['entity'] ?>",
              c_entity_friendly: "<? context['entity_friendly'] ?>",
              agency: "nypd"
            },
            text: props.get('reference-nypd-alarm-in-progress'),
            next_step: {
              dialog_node: "0",
              selector: "condition"
            }
          }),
          node({
            conditions: "intent == 'negative'",
            context: {
              c_ct: "<? context['ct'] ?>",
              c_ct_friendly: "<? context['ct_friendly'] ?>",
              c_entity: "<? context['entity'] ?>",
              c_entity_friendly: "<? context['entity_friendly'] ?>",
              agency: "dep"
            },
            text: props.get('reference-dep-alarm-past'),
            next_step: {
              dialog_node: "0",
              selector: "condition"
            }
          })
        ]),
        node({
          conditions: "intent == 'negative' || entities['negative']",
          context: {
            failed_ct: "<? context['failed_ct'] + 2 ?>"
          },
          next_step: {
            dialog_node: "0",
            selector: "condition"
          }
        }),
        node({
          conditions: `context['address'] != '${_address_uninitialized}'`,
          context: {
            //don't assign entity or agency...
            //can't know which one applies without the follow up question
            c_ct: "<? context['ct'] ?>",
            c_ct_friendly: "<? context['ct_friendly'] ?>",
            failed_ct: "<? context['failed_ct'] - 1 ?>"
          },
          next_step: {
            dialog_node: "0",
            selector: "condition"
          }
        }),
        node({
          conditions: "true",
          context: {
            failed_ct: "<? context['failed_ct'] + 2 ?>"
          },
          next_step: {
            dialog_node: "0",
            selector: "condition"
          }
        })
      ])
    ];
};


//custom node-generating fxn for 'graffiti' && 'removal'
const get_graffiti_dsny_entities = () => {
    return [
      node({
        conditions: `intent == 'report-graffiti' && entities['removal']  && context['failed_ct'] <= ${_ct_failure_limit}`,
        dialog_node: "graffiti-removal",
        context: {
          ct: 'report-graffiti',
          ct_friendly: _intent_phrases.get('report-graffiti'),
          entity: "removal",
          entity_friendly: _entity_phrases.get('removal')
        },
        text: props.get('confirm-graffiti-entity')
      }, [
        node({
          conditions: "intent == 'affirmative' || entities['affirmative']",
          context: {
            c_ct: "<? context['ct'] ?>",
            c_ct_friendly: "<? context['ct_friendly'] ?>",
            c_entity: "<? context['entity'] ?>",
            c_entity_friendly: "<? context['entity_friendly'] ?>",
            agency: "dsny",
            failed_ct: "<? context['failed_ct'] - 1 ?>"
          },
          text: props.get('reference-dsny'),
          next_step: {
            dialog_node: "0",
            selector: "condition"
          }
        }),
        node({
          conditions: "intent == 'negative' || entities['negative']",
          context: {
            failed_ct: "<? context['failed_ct'] + 2 ?>"
          },
          next_step: {
            dialog_node: "0",
            selector: "condition"
          }
        }),
        node({
          conditions: `context['address'] != '${_address_uninitialized}'`,
          context: {
            c_ct: "<? context['ct'] ?>",
            c_ct_friendly: "<? context['ct_friendly'] ?>",
            c_entity: "<? context['entity'] ?>",
            c_entity_friendly: "<? context['entity_friendly'] ?>",
            agency: "dsny",
            failed_ct: "<? context['failed_ct'] - 1 ?>"
          },
          next_step: {
            dialog_node: "0",
            selector: "condition"
          }
        }),
        node({
          conditions: "true",
          context: {
            failed_ct: "<? context['failed_ct'] + 2 ?>"
          },
          next_step: {
            dialog_node: "0",
            selector: "condition"
          }
        })
      ])
    ];
};


//generic node-generating fxn for street condition & DOT entities
const get_street_condition_dot_entities = () => {
  let result = [];
  let _entities = _entities_dot;
  for (let i in _entities) {
    result.push(
      node({
        conditions: `intent == 'report-street-condition' && entities['` + _entities[i] + `'] && context['failed_ct'] <= ${_ct_failure_limit}`,
        dialog_node: "street-condition-" + _entities[i],
        context: {
          ct: 'report-street-condition',
          ct_friendly: _intent_phrases.get('report-street-condition'),
          entity: _entities[i],
          entity_friendly: _entity_phrases.get(_entities[i])
        },
        text: props.get('confirm-street-condition-entity')
      }, [
        node({
          conditions: "intent == 'affirmative' || entities['affirmative']",
          context: {
            c_ct: "<? context['ct'] ?>",
            c_ct_friendly: "<? context['ct_friendly'] ?>",
            c_entity: "<? context['entity'] ?>",
            c_entity_friendly: "<? context['entity_friendly'] ?>",
            agency: "dot",
            failed_ct: "<? context['failed_ct'] - 1 ?>"
          },
          text: props.get('reference-dot'),
          next_step: {
            dialog_node: "0",
            selector: "condition"
          }
        }),
        node({
          conditions: "intent == 'negative' || entities['negative']",
          context: {
            failed_ct: "<? context['failed_ct'] + 2 ?>"
          },
          next_step: {
            dialog_node: "0",
            selector: "condition"
          }
        }),
        node({
          conditions: `context['address'] != '${_address_uninitialized}'`,
          context: {
            c_ct: "<? context['ct'] ?>",
            c_ct_friendly: "<? context['ct_friendly'] ?>",
            c_entity: "<? context['entity'] ?>",
            c_entity_friendly: "<? context['entity_friendly'] ?>",
            agency: "dot",
            failed_ct: "<? context['failed_ct'] - 1 ?>"
          },
          next_step: {
            dialog_node: "0",
            selector: "condition"
          }
        }),
        node({
          conditions: "true",
          context: {
            failed_ct: "<? context['failed_ct'] + 2 ?>"
          },
          next_step: {
            dialog_node: "0",
            selector: "condition"
          }
        })
      ])
    );
  }
  return result
};

//generic node-generating fxn for damaged tree & DPR entities
const get_damaged_tree_dpr_entities = () => {
  let result = [];
  let _entities = _entities_dpr;
  for (let i in _entities) {
    result.push(
      node({
        conditions: `intent == 'report-damaged-tree' && entities['` + _entities[i] + `'] && context['failed_ct'] <= ${_ct_failure_limit}`,
        dialog_node: "damaged-tree-" + _entities[i],
        context: {
          ct: 'report-damaged-tree',
          ct_friendly: _intent_phrases.get('report-damaged-tree'),
          entity: _entities[i],
          entity_friendly: _entity_phrases.get(_entities[i])
        },
        text: props.get('confirm-damaged-tree-entity')
      }, [
        node({
          conditions: "intent == 'affirmative' || entities['affirmative']",
          context: {
            c_ct: "<? context['ct'] ?>",
            c_ct_friendly: "<? context['ct_friendly'] ?>",
            c_entity: "<? context['entity'] ?>",
            c_entity_friendly: "<? context['entity_friendly'] ?>",
            agency: "dpr",
            failed_ct: "<? context['failed_ct'] - 1 ?>"
          },
          text: props.get('reference-dpr'),
          next_step: {
            dialog_node: "0",
            selector: "condition"
          }
        }),
        node({
          conditions: "intent == 'negative' || entities['negative']",
          context: {
            failed_ct: "<? context['failed_ct'] + 2 ?>"
          },
          next_step: {
            dialog_node: "0",
            selector: "condition"
          }
        }),
        node({
          conditions: `context['address'] != '${_address_uninitialized}'`,
          context: {
            c_ct: "<? context['ct'] ?>",
            c_ct_friendly: "<? context['ct_friendly'] ?>",
            c_entity: "<? context['entity'] ?>",
            c_entity_friendly: "<? context['entity_friendly'] ?>",
            agency: "dpr",
            failed_ct: "<? context['failed_ct'] - 1 ?>"
          },
          next_step: {
            dialog_node: "0",
            selector: "condition"
          }
        }),
        node({
          conditions: "true",
          context: {
            failed_ct: "<? context['failed_ct'] + 2 ?>"
        },
          next_step: {
            dialog_node: "0",
            selector: "condition"
          }
        })
      ])
    );
  }
  return result
};


//custom node-generating fxn for 'graffiti' or 'graffiti' & 'in_progress_graffiti', with follow-up question
const get_graffiti = () => {
    return [
      node({
        conditions: `intent == 'report-graffiti'  && context['failed_ct'] <= ${_ct_failure_limit}`,
        dialog_node: "graffiti-and-in_progress_graffiti",
        context: {
          ct: 'report-graffiti',
          ct_friendly: _intent_phrases.get('report-graffiti'),
          entity: 'in_progress_graffiti',
          entity_friendly: _entity_phrases.get('in_progress_graffiti')
        },
        text: props.get('confirm-graffiti')
      }, [
        node({
          conditions: "intent == 'affirmative' || entities['affirmative']",
          context: {
            c_ct: "<? context['ct'] ?>",
            c_ct_friendly: "<? context['ct_friendly'] ?>",
            failed_ct: "<? context['failed_ct'] - 1 ?>"
          },
          text: props.get('graffiti-in-progress-follow-up')
        },
        [
          node({
            conditions: "intent == 'affirmative' || entities['affirmative']",
            context: {
              c_entity: "<? context['entity'] ?>",
              c_entity_friendly: "<? context['entity_friendly'] ?>",
              agency: "911"
            },
            text: props.get('reference-911'),
            next_step: {
              dialog_node: "0",
              selector: "condition"
            }
          }),
          node({
            conditions: "intent == 'negative'",
            context: {
              entity: '',
              entity_friendly: ''
            },
            text: props.get('reference-agency-generic'),
            next_step: {
              dialog_node: "0",
              selector: "condition"
            }
          })
        ]),
        node({
          conditions: "intent == 'negative' || entities['negative']",
          context: {
            failed_ct: "<? context['failed_ct'] + 2 ?>"
          },
          next_step: {
            dialog_node: "0",
            selector: "condition"
          }
        }),
        node({
          conditions: `context['address'] != '${_address_uninitialized}'`,
          context: {
            //don't assign entity or agency
            //can't know the status (in progress, or past) without follow up
            c_ct: "<? context['ct'] ?>",
            c_ct_friendly: "<? context['ct_friendly'] ?>",
            entity: '',
            entity_friendly: '',
            failed_ct: "<? context['failed_ct'] - 1 ?>"
          },
          next_step: {
            dialog_node: "0",
            selector: "condition"
          }
        }),
        node({
          conditions: "true",
          context: {
            failed_ct: "<? context['failed_ct'] + 2 ?>"
          },
          next_step: {
            dialog_node: "0",
            selector: "condition"
          }
        })
      ])
    ];
};


//custom function for generating intent-only node for noise
const get_noise = () => {
        return [
          node({
            conditions: `intent == 'report-noise' && context['failed_ct'] <= ${_ct_failure_limit}`,
            dialog_node: "noise",
            text: props.get("confirm-noise"),
            context: {
              ct: 'report-noise',
              ct_friendly: _intent_phrases.get('report-noise'),
            }
          }, [
            node({
              conditions: "intent == 'affirmative' || entities['affirmative']",
              context: {
                c_ct: "<? context['ct'] ?>",
                c_ct_friendly: "<? context['ct_friendly'] ?>",
                failed_ct: "<? context['failed_ct'] - 1 ?>"
              },
              text: props.get('reference-agency-generic'),
              next_step: {
                dialog_node: "0",
                selector: "condition"
              }
            }),
            node({
              conditions: "intent == 'negative' || entities['negative']",
              context: {
                failed_ct: "<? context['failed_ct'] + 2 ?>"
              },
              next_step: {
                dialog_node: "0",
                selector: "condition"
              }
            }),
            node({
              conditions: `context['address'] != '${_address_uninitialized}'`,
              context: {
                c_ct: "<? context['ct'] ?>",
                c_ct_friendly: "<? context['ct_friendly'] ?>",
                failed_ct: "<? context['failed_ct'] - 1 ?>"
              },
              next_step: {
                dialog_node: "0",
                selector: "condition"
              }
            }),
            node({
              conditions: "true",
              context: {
                failed_ct: "<? context['failed_ct'] + 2 ?>"
              },
              next_step: {
                dialog_node: "0",
                selector: "condition"
              }
            })
          ])
        ];
};


//custom function for generating intent-only node for street condition
const get_street_condition = () => {
        return [
          node({
            conditions: `intent == 'report-street-condition' && context['failed_ct'] <= ${_ct_failure_limit}`,
            dialog_node: "street-condition",
            text: props.get("confirm-street-condition"),
            context: {
              ct: 'report-street-condition',
              ct_friendly: _intent_phrases.get('report-street-condition'),
            }
          }, [
            node({
              conditions: "intent == 'affirmative' || entities['affirmative']",
              context: {
                c_ct: "<? context['ct'] ?>",
                c_ct_friendly: "<? context['ct_friendly'] ?>",
                failed_ct: "<? context['failed_ct'] - 1 ?>"
              },
              text: props.get('reference-agency-generic'),
              next_step: {
                dialog_node: "0",
                selector: "condition"
              }
            }),
            node({
              conditions: "intent == 'negative' || entities['negative']",
              context: {
                failed_ct: "<? context['failed_ct'] + 2 ?>"
              },
              next_step: {
                dialog_node: "0",
                selector: "condition"
              }
            }),
            node({
              conditions: `context['address'] != '${_address_uninitialized}'`,
              context: {
                c_ct: "<? context['ct'] ?>",
                c_ct_friendly: "<? context['ct_friendly'] ?>",
                failed_ct: "<? context['failed_ct'] - 1 ?>"
              },
              next_step: {
                dialog_node: "0",
                selector: "condition"
              }
            }),
            node({
              conditions: "true",
              context: {
                failed_ct: "<? context['failed_ct'] + 2 ?>"
              },
              next_step: {
                dialog_node: "0",
                selector: "condition"
              }
            })
          ])
        ];
};

//custom function for generating intent-only node for damaged tree
const get_damaged_tree = () => {
        return [
          node({
            conditions: `intent == 'report-damaged-tree' && context['failed_ct'] <= ${_ct_failure_limit}`,
            dialog_node: "damaged-tree",
            text: props.get("confirm-damaged-tree"),
            context: {
              ct: 'report-damaged-tree',
              ct_friendly: _intent_phrases.get('report-damaged-tree'),
            }
          }, [
            node({
              conditions: "intent == 'affirmative' || entities['affirmative']",
              context: {
                c_ct: "<? context['ct'] ?>",
                c_ct_friendly: "<? context['ct_friendly'] ?>",
                failed_ct: "<? context['failed_ct'] - 1 ?>"
              },
              text: props.get('reference-agency-generic'),
              next_step: {
                dialog_node: "0",
                selector: "condition"
              }
            }),
            node({
              conditions: "intent == 'negative' || entities['negative']",
              context: {
                failed_ct: "<? context['failed_ct'] + 2 ?>"
              },
              next_step: {
                dialog_node: "0",
                selector: "condition"
              }
            }),
            node({
              conditions: `context['address'] != '${_address_uninitialized}'`,
              context: {
                c_ct: "<? context['ct'] ?>",
                c_ct_friendly: "<? context['ct_friendly'] ?>",
                failed_ct: "<? context['failed_ct'] - 1 ?>"
              },
              next_step: {
                dialog_node: "0",
                selector: "condition"
              }
            }),
            node({
              conditions: "true",
              context: {
                failed_ct: "<? context['failed_ct'] + 2 ?>"
              },
              next_step: {
                dialog_node: "0",
                selector: "condition"
              }
            })
          ])
        ];
};


const get_failed_address_noise = () => {
  return [
    node({
      dialog_node: "failed-address-noise",
      conditions: `context['failed_address'] >= ${_address_failure_limit} && context['c_ct'] == 'report-noise' &&  context['c_address'] == ''  || context['failed_address'] >= ${_address_failure_limit} && context['c_ct'] == 'report-noise' && context['c_address'] == '${_address_uninitialized}' || context['failed_address'] >= ${_address_failure_limit} && context['c_ct'] == 'report-noise' && context['c_address'] == 'rejected'`,
      text: props.get('call-human'),
      //Clear context for the next conversation in the app
      context: get_reset_context(),
      next_step: {
        dialog_node: "resource-noise",
        selector: "body"
      }
    }),
    node({
      dialog_node: "resource-noise",
      text: props.get('resource-noise')
    })
  ];
};

const get_failed_address_graffiti = () => {
  return [
    node({
      dialog_node: "failed-address-graffiti",
      conditions: `context['failed_address'] >= ${_address_failure_limit} && context['c_ct'] == 'report-graffiti' &&  context['c_address'] == ''  || context['failed_address'] >= ${_address_failure_limit} && context['c_ct'] == 'report-graffiti' && context['c_address'] == '${_address_uninitialized}' || context['failed_address'] >= ${_address_failure_limit} && context['c_ct'] == 'report-graffiti' && context['c_address'] == 'rejected'`,
      text: props.get('call-human'),
      //Clear context for the next conversation in the app
      context: get_reset_context(),
      next_step: {
        dialog_node: "resource-graffiti",
        selector: "body"
      }
    }),
    node({
      dialog_node: "resource-graffiti",
      text: props.get('resource-graffiti')
    })
  ];
};

const get_failed_address_damaged_tree = () => {
  return [
    node({
      dialog_node: "failed-address-damaged-tree",
      conditions: `context['failed_address'] >= ${_address_failure_limit} && context['c_ct'] == 'report-damaged-tree' &&  context['c_address'] == ''  || context['failed_address'] >= ${_address_failure_limit} && context['c_ct'] == 'report-damaged-tree' && context['c_address'] == '${_address_uninitialized}' || context['failed_address'] >= ${_address_failure_limit} && context['c_ct'] == 'report-damaged-tree' && context['c_address'] == 'rejected'`,
      text: props.get('call-human'),
      //Clear context for the next conversation in the app
      context: get_reset_context(),
      next_step: {
        dialog_node: "resource-damaged-tree",
        selector: "body"
      }
    }),
    node({
      dialog_node: "resource-damaged-tree",
      text: props.get('resource-damaged-tree')
    })
  ];
};

const get_failed_address_street_condition = () => {
  return [
    node({
      dialog_node: "failed-address-street-condition",
      conditions: `context['failed_address'] >= ${_address_failure_limit} && context['c_ct'] == 'report-street-condition' &&  context['c_address'] == ''  || context['failed_address'] >= ${_address_failure_limit} && context['c_ct'] == 'report-street-condition' && context['c_address'] == '${_address_uninitialized}' || context['failed_address'] >= ${_address_failure_limit} && context['c_ct'] == 'report-street-condition' && context['c_address'] == 'rejected'`,
      text: props.get('call-human'),
      //Clear context for the next conversation in the app
      context: get_reset_context(),
      next_step: {
        dialog_node: "resource-street-condition",
        selector: "body"
      }
    }),
    node({
      dialog_node: "resource-street-condition",
      text: props.get('resource-street-condition')
    })
  ];
};

const get_unusable_address = () => {
      //when user has given an unusable/undecipherable address
  return [
    node({
      dialog_node: "retry-unusable-address",
      conditions: `context['address'] == '' && context['c_address'] == '${_address_uninitialized}' && context['c_ct'] != ''`,
      text: props.get('retry-unusable-address'),
      context: {
        failed_address: "<? context['failed_address'] + 2 ?>"
      }
    })
  ];
};

const get_rejected_address = () => {
    //when user has rejected the collected address when asked for confirmation
return [
  node({
    dialog_node: "retry-rejected-address",
    conditions: "context['address'] == '' && context['c_address'] == 'rejected' && context['c_ct'] != '' || context['landmark_address'] == '' && context['c_address'] == 'rejected' && context['c_ct'] != ''",
    context: {
      c_address: _address_uninitialized
    },
    text: props.get('retry-rejected-address')
  })
  ];
};

const get_report_address = () => {
  //when user has not attempted to give an address yet, but has confirmed a C.T.
  return [
    node({
      dialog_node: "report-address",
      conditions: `context['address'] == '${_address_uninitialized}' && context['c_address'] == '${_address_uninitialized}' && context['c_ct'] != ''`,
      context: {
        address: ''
      },
      text: props.get('get-address')
    })
  ];
};

const get_address_out_of_bounds = () => {
  return [
    node({
      dialog_node: "address-not-in-manhattan",
      conditions: `context['address'] != '' && context['address'] != '${_address_uninitialized}' && context['c_address'] == '${_address_uninitialized}' && context['c_ct'] != '' && context['in_manhattan'] == false`,
      text: props.get("address-out-of-bounds"),
      context: {
        address: _address_uninitialized,
        failed_address: "<? context['failed_address'] + 1 ?>"
      },
      next_step: {
        dialog_node: "0",
        selector: "condition"
      }
    })
  ];
};

const get_confirm_address = () => {
  //when user has provided a usable address (located within manhattan), but has not yet confirmed it
  return [
    node({
      dialog_node: "confirm-address-in-manhattan",
      conditions: `context['address'] != '' && context['address'] != '${_address_uninitialized}' && context['c_address'] == '${_address_uninitialized}' && context['c_ct'] != '' && context['in_manhattan'] == true && context['failed_address'] <= ${_address_failure_limit}`,
      text: props.get('confirm-address')
    }, [
      node({
        conditions: "intent == 'affirmative' || entities['affirmative']",
        context: {
          c_address: "<? context['address'] ?>",
          failed_address: "<? context['failed_address'] - 1 ?>"
        },
        next_step: {
          dialog_node: "0",
          selector: "condition"
        }
      }),
      node({
        //set a confidence threshold, in case user's input contains a negative word and an address, like "No, it's at 123 main street/empire state building"
        conditions: `intents[0] == 'negative' && intents[0].confidence > ${_negative_intent_confidence_threshold}`,
        context: {
          address: '',
          c_address: 'rejected',
          failed_address: "<? context['failed_address'] + 1 ?>"
        },
        next_step: {
          dialog_node: "0",
          selector: "condition"
        }
      }),
      node({
      //user's input will meet this condition in all other cases ...
      // re-evaluation of context is required
      conditions: "true",
       context: {
        failed_address: "<? context['failed_address'] + 1 ?>"
      },
      next_step: {
        dialog_node: "0",
        selector: "condition"
      }
    })
    ])
  ];
};

const get_landmark_address = () => {
  let result = [];
      for(let entity of _landmark_entites) {
      result.push(node({
        dialog_node: "get-landmark-address-" + entity.value,
        conditions: `context['landmark'] == '' && entities['landmark'] && entities['landmark'].value == '${entity.value}'`,
        context: {
          landmark: entity.value,
          landmark_friendly: _landmark_phrases.get(entity.value),
          landmark_address: _landmark_addresses.get(entity.value),
          c_address: _address_uninitialized
        },
        next_step: {
          dialog_node: "0",
          selector: "condition"
        }
      }));
    }
  return result;
};


const get_confirm_landmark_address = () => {
  //when user has provided a usable address, but has not yet confirmed it
  return [
    node({
      dialog_node: "confirm-landmark-address",
      conditions: `context['landmark_address'] != '' && context['landmark_address'] != '${_address_uninitialized}' && context['c_address'] == '${_address_uninitialized}' && context['c_ct'] != '' && context['landmark'] != '' && context['failed_address'] <= ${_address_failure_limit}`,
      text: props.get('confirm-address-landmark')
    }, [
      node({
        conditions: "intent == 'affirmative' || entities['affirmative']",
        context: {
          c_address: "<? context['landmark_address'] ?>",
          failed_address: "<? context['failed_address'] - 1 ?>"
        },
        next_step: {
          dialog_node: "0",
          selector: "condition"
        }
      }),
      node({
        //set a confidence threshold, in case user's input contains a negative word and an address, like "No, it's at 123 main street/empire state building"
        conditions: `intents[0] == 'negative' && intents[0].confidence > ${_negative_intent_confidence_threshold}`,
        context: {
          landmark_address: '',
          c_address: 'rejected',
          landmark: '',
          landmark_friendly: '',
          failed_address: "<? context['failed_address'] + 1 ?>"
        },
        next_step: {
          dialog_node: "0",
          selector: "condition"
        }
      }),
      node({
        //set a confidence threshold, in case user's input contains a negative word and an address, like "No, it's at 123 main street/empire state building"
        conditions: "entities['landmark']",
        context: {
          landmark_address: '',
          landmark: '',
          landmark_friendly: '',
          failed_address: "<? context['failed_address'] + 1 ?>"
        },
        next_step: {
          dialog_node: "0",
          selector: "condition"
        }
      }),
      node({
        //check if street address found in the input (Note: context['address'], NOT context['landmark_address'])
      conditions: `context['address'] != '' && context['address'] != '${_address_uninitialized}'`,
      context: {
        landmark: '',
        landmark_friendly: '',
        failed_address: "<? context['failed_address'] + 1 ?>"
      },
      next_step: {
        dialog_node: "0",
        selector: "condition"
        }
      }),
      node({
        //user's input will meet this condition in all other cases ...
        // re-evaluation of context is required
      conditions: 'true',
      context: {
        failed_address: "<? context['failed_address'] + 1 ?>"
      },
      next_step: {
        dialog_node: "0",
        selector: "condition"
      }
    })
    ])
  ];
};


const get_report_cs = () => {
  return [
    node({
      dialog_node: "report-cs",
      conditions: "context['cs'] == '' && context['c_ct'] != ''",
      text: props.get('get_cs')
    })
  ];
};

const get_confirm_cs = () => {
  return [
    node({
      dialog_node: "confirm-cs",
      conditions: "context['c_cs'] == '' && context['cs'] != '' && context['c_ct'] != ''",
      text: props.get('confirm_cs')
    }, [
      node({
        conditions: "intent == 'affirmative' || entities['affirmative']",
        context: {
          c_cs: "<? context['cs'] ?>"
        },
        next_step: {
          dialog_node: "0",
          selector: "condition"
        }
      }),
      node({
        conditions: "intent == 'negative'",
        next_step: {
          dialog_node: "confirm-cs",
          selector: "body"
        }
      }),
      node({
        conditions: "intent == 'negative'",
        next_step: {
          dialog_node: "report-cs",
          selector: "body"
        }
      })
    ])
  ];
};

const get_success_generic = () => {
  return [
    node({
      conditions: "context['c_address'] != '' && context['c_address'] != 'rejected' && context['c_ct'] != ''",
      dialog_node: "report-success-generic",
      text: props.get('end-no-entity'),
      next_step: {
        dialog_node: "get-addtl-report",
        selector: "body"
      }
    })
  ];
};




const get_issue_report = () => {
  return [
    node({
      dialog_node: "get-issue-report",
      conditions: `intent == 'affirmative' && context['address'] == '${_address_uninitialized}' && context['c_address'] == '${_address_uninitialized}' && context['ct'] == '' && context['c_ct'] == '' && context['failed_ct'] == 0 && context['failed_address'] == 0 && context['landmark'] == '' && context['landmark_address'] == ''`,
      text: props.get('get-issue-report')
    })
    ];
};


const get_end_thanks = () => {
  return [
    node({
      dialog_node: "end-thanks",
      text: props.get('end-thanks')
    })
  ];
};

const get_default = () => {
  return [
    node({
      conditions: "anything_else",
      text: props.get('default')
    })
  ];
};

*/


const welcome = () => {
  return [
    node({
      "type": "standard",
      "title": "Welcome",
      "output": {
        "text": {
          "values": ["Hello. I am a 311 chatbot, and I am here to help you file 311 issues. Please describe, in a few words, the issue you'd like to file with 311."],
          "selection_policy": "sequential"
        }
      },
      "parent": null,
      "context": null,
      "metadata": {},
      "next_step": null,
      "conditions": "welcome",
      "description": null,
      "dialog_node": "Welcome",
      "previous_sibling": null
    })
  ];
}

const get_issue = () {
  return [
    node({
        "type": "frame",
        "title": "Get Issue",
        "output": {
          "text": {
            "values": [],
            "selection_policy": "sequential"
          }
        },
        "parent": null,
        "context": null,
        "metadata": {
          "fallback": "leave"
        },
        "next_step": {
          "behavior": "jump_to",
          "selector": "condition",
          "dialog_node": "node_15_1520456922489"
        },
        "conditions": "#report-street-condition || #report-graffiti || #report-noise || #report-damaged-tree",
        "digress_in": "does_not_return",
        "description": null,
        "dialog_node": "node_1_1520357929976",
        "digress_out": "allow_all",
        "previous_sibling": "Welcome",
        "digress_out_slots": "not_allowed"
      }, [
          node({
        		"type": "event_handler",
        		"title": null,
        		"output": {
        			"text": {
        				"values": ["Please describe, in a few words, the issue you wish to report to 311."],
        				"selection_policy": "sequential"
        			}
        		},
        		"parent": "node_1_1520357929976",
        		"context": null,
        		"metadata": {},
        		"next_step": null,
        		"conditions": null,
        		"event_name": "focus",
        		"description": null,
        		"dialog_node": "handler_5_1520358086185",
        		"previous_sibling": "slot_6_1520358278972"
        	}),
          node({
          		"type": "slot",
          		"title": null,
          		"output": {},
          		"parent": "node_1_1520357929976",
          		"context": null,
          		"metadata": {
          			"_customization": {
          				"mcr": true
          			}
          		},
          		"variable": "$ct",
          		"next_step": null,
          		"conditions": null,
          		"description": null,
          		"dialog_node": "slot_9_1520358290116",
          		"previous_sibling": "slot_12_1520358319388"
          	}, [
                  node({
                		"type": "event_handler",
                		"title": null,
                		"output": {},
                		"parent": "slot_9_1520358290116",
                		"context": {
                			"ct": "noise"
                		},
                		"metadata": {},
                		"next_step": null,
                		"conditions": "#report-noise",
                		"event_name": "input",
                		"description": null,
                		"dialog_node": "handler_10_1520358290116",
                		"previous_sibling": "handler_11_1520358290116"
                	}),
                  node({
                		"type": "event_handler",
                		"title": null,
                		"output": {},
                		"parent": "slot_9_1520358290116",
                		"context": null,
                		"metadata": {},
                		"next_step": null,
                		"conditions": null,
                		"event_name": "focus",
                		"description": null,
                		"dialog_node": "handler_11_1520358290116",
                		"previous_sibling": null
                	})
                ]),
          node({
          		"type": "slot",
          		"title": null,
          		"output": {},
          		"parent": "node_1_1520357929976",
          		"context": null,
          		"metadata": {
          			"_customization": {
          				"mcr": true
          			}
          		},
          		"variable": "$ct",
          		"next_step": null,
          		"conditions": null,
          		"description": null,
          		"dialog_node": "slot_6_1520358278972",
          		"previous_sibling": "slot_2_1520358026402"
          	}, [
                      node({
                    		"type": "event_handler",
                    		"title": null,
                    		"output": {},
                    		"parent": "slot_6_1520358278972",
                    		"context": {
                    			"ct": "tree damage"
                    		},
                    		"metadata": {},
                    		"next_step": null,
                    		"conditions": "#report-damaged-tree",
                    		"event_name": "input",
                    		"description": null,
                    		"dialog_node": "handler_7_1520358278972",
                    		"previous_sibling": "handler_8_1520358278972"
                    	}),
                      node({
                    		"type": "event_handler",
                    		"title": null,
                    		"output": {},
                    		"parent": "slot_6_1520358278972",
                    		"context": null,
                    		"metadata": {},
                    		"next_step": null,
                    		"conditions": null,
                    		"event_name": "focus",
                    		"description": null,
                    		"dialog_node": "handler_8_1520358278972",
                    		"previous_sibling": null
                    	})
                  ]),
          node({
        		"type": "slot",
        		"title": null,
        		"output": {},
        		"parent": "node_1_1520357929976",
        		"context": null,
        		"metadata": {
        			"_customization": {
        				"mcr": true
        			}
        		},
        		"variable": "$ct",
        		"next_step": null,
        		"conditions": null,
        		"description": null,
        		"dialog_node": "slot_12_1520358319388",
        		"previous_sibling": "slot_22_1521220770556"
        	}, [
                        node({
                      		"type": "event_handler",
                      		"title": null,
                      		"output": {},
                      		"parent": "slot_12_1520358319388",
                      		"context": {
                      			"ct": "graffiti"
                      		},
                      		"metadata": {},
                      		"next_step": null,
                      		"conditions": "#report-graffiti",
                      		"event_name": "input",
                      		"description": null,
                      		"dialog_node": "handler_13_1520358319388",
                      		"previous_sibling": "handler_14_1520358319388"
                      	}),
                        node({
                      		"type": "event_handler",
                      		"title": null,
                      		"output": {},
                      		"parent": "slot_12_1520358319388",
                      		"context": null,
                      		"metadata": {},
                      		"next_step": null,
                      		"conditions": null,
                      		"event_name": "focus",
                      		"description": null,
                      		"dialog_node": "handler_14_1520358319388",
                      		"previous_sibling": null
                      	})
                  ]),
          node({
          		"type": "slot",
          		"title": null,
          		"output": {},
          		"parent": "node_1_1520357929976",
          		"context": null,
          		"metadata": {},
          		"variable": "$agency",
          		"next_step": null,
          		"conditions": null,
          		"description": null,
          		"dialog_node": "slot_13_1521220555649",
          		"previous_sibling": "slot_10_1521220551613"
          	}, [
                      node({
                    		"type": "event_handler",
                    		"title": null,
                    		"output": {},
                    		"parent": "slot_13_1521220555649",
                    		"context": {
                    			"ct": "noise",
                    			"agency": "dep"
                    		},
                    		"metadata": {},
                    		"next_step": null,
                    		"conditions": "#report-noise && @dep",
                    		"event_name": "input",
                    		"description": null,
                    		"dialog_node": "handler_14_1521220555649",
                    		"previous_sibling": "handler_15_1521220555649"
                    	}),
                      node({
                    		"type": "event_handler",
                    		"title": null,
                    		"output": {},
                    		"parent": "slot_13_1521220555649",
                    		"context": null,
                    		"metadata": null,
                    		"next_step": null,
                    		"conditions": null,
                    		"event_name": "focus",
                    		"description": null,
                    		"dialog_node": "handler_15_1521220555649",
                    		"previous_sibling": null
                    	})
                  ]),
          node({
        		"type": "slot",
        		"title": null,
        		"output": {},
        		"parent": "node_1_1520357929976",
        		"context": null,
        		"metadata": {},
        		"variable": "$agency",
        		"next_step": null,
        		"conditions": null,
        		"description": null,
        		"dialog_node": "slot_22_1521220770556",
        		"previous_sibling": "slot_13_1521220555649"
        	}, [
                      node({
                    		"type": "event_handler",
                    		"title": null,
                    		"output": {},
                    		"parent": "slot_22_1521220770556",
                    		"context": {
                    			"ct": "noise",
                    			"agency": "nypd"
                    		},
                    		"metadata": {},
                    		"next_step": null,
                    		"conditions": "#report-noise && @nypd",
                    		"event_name": "input",
                    		"description": null,
                    		"dialog_node": "handler_23_1521220770556",
                    		"previous_sibling": "handler_24_1521220770556"
                    	}),
                      node({
                    		"type": "event_handler",
                    		"title": null,
                    		"output": {},
                    		"parent": "slot_22_1521220770556",
                    		"context": null,
                    		"metadata": null,
                    		"next_step": null,
                    		"conditions": null,
                    		"event_name": "focus",
                    		"description": null,
                    		"dialog_node": "handler_24_1521220770556",
                    		"previous_sibling": null
                    	})
                  ]),
          node({
        		"type": "slot",
        		"title": null,
        		"output": {},
        		"parent": "node_1_1520357929976",
        		"context": null,
        		"metadata": {
        			"_customization": {
        				"mcr": true
        			}
        		},
        		"variable": "$ct",
        		"next_step": null,
        		"conditions": null,
        		"description": null,
        		"dialog_node": "slot_2_1520358026402",
        		"previous_sibling": "slot_9_1520358290116"
        	}, [
                      node({
                    		"type": "event_handler",
                    		"title": null,
                    		"output": {},
                    		"parent": "slot_2_1520358026402",
                    		"context": {
                    			"ct": "poor street conditions"
                    		},
                    		"metadata": {},
                    		"next_step": null,
                    		"conditions": "#report-street-condition",
                    		"event_name": "input",
                    		"description": null,
                    		"dialog_node": "handler_3_1520358026402",
                    		"previous_sibling": "handler_4_1520358026402"
                    	}),
                      node({
                    		"type": "event_handler",
                    		"title": null,
                    		"output": {},
                    		"parent": "slot_2_1520358026402",
                    		"context": null,
                    		"metadata": {},
                    		"next_step": null,
                    		"conditions": null,
                    		"event_name": "focus",
                    		"description": null,
                    		"dialog_node": "handler_4_1520358026402",
                    		"previous_sibling": null
                    	})
                  ]),
          node({
        		"type": "slot",
        		"title": null,
        		"output": {},
        		"parent": "node_1_1520357929976",
        		"context": null,
        		"metadata": {},
        		"variable": "$agency",
        		"next_step": null,
        		"conditions": null,
        		"description": null,
        		"dialog_node": "slot_10_1521220551613",
        		"previous_sibling": "slot_4_1521220486223"
        	}, [
                        node({
                      		"type": "event_handler",
                      		"title": null,
                      		"output": {},
                      		"parent": "slot_10_1521220551613",
                      		"context": {
                      			"ct": "graffiti",
                      			"agency": "dsny",
                      			"entity": "@dsny.value"
                      		},
                      		"metadata": {},
                      		"next_step": null,
                      		"conditions": "#report-graffiti && @dsny",
                      		"event_name": "input",
                      		"description": null,
                      		"dialog_node": "handler_11_1521220551613",
                      		"previous_sibling": "handler_12_1521220551613"
                      	}),
                        node({
                      		"type": "event_handler",
                      		"title": null,
                      		"output": {},
                      		"parent": "slot_10_1521220551613",
                      		"context": null,
                      		"metadata": {},
                      		"next_step": null,
                      		"conditions": null,
                      		"event_name": "focus",
                      		"description": null,
                      		"dialog_node": "handler_12_1521220551613",
                      		"previous_sibling": null
                      	})
                    ]),
          node({
        		"type": "slot",
        		"title": null,
        		"output": {},
        		"parent": "node_1_1520357929976",
        		"context": null,
        		"metadata": {},
        		"variable": "$agency",
        		"next_step": null,
        		"conditions": null,
        		"description": null,
        		"dialog_node": "slot_4_1521220486223",
        		"previous_sibling": null
        	}, [
                        node({
                      		"type": "event_handler",
                      		"title": null,
                      		"output": {},
                      		"parent": "slot_4_1521220486223",
                      		"context": {
                      			"agency": "dpr",
                      			"entity": "@dpr.value"
                      		},
                      		"metadata": {},
                      		"next_step": null,
                      		"conditions": "#report-damaged-tree && @dpr",
                      		"event_name": "input",
                      		"description": null,
                      		"dialog_node": "handler_5_1521220486223",
                      		"previous_sibling": "handler_6_1521220486223"
                      	}),
                        node({
                      		"type": "event_handler",
                      		"title": null,
                      		"output": {},
                      		"parent": "slot_4_1521220486223",
                      		"context": null,
                      		"metadata": {},
                      		"next_step": null,
                      		"conditions": null,
                      		"event_name": "focus",
                      		"description": null,
                      		"dialog_node": "handler_6_1521220486223",
                      		"previous_sibling": null
                      	})
                    ])
        ])
  ];
}


const proceed_with_issue_report = () => {
  node(
    {
      "type": "standard",
      "title": "proceed with issue report",
      "output": {
        "text": {
          "values": ["Ok, great."],
          "selection_policy": "sequential"
        }
      },
      "parent": "node_16_1520457025654",
      "context": null,
      "metadata": {},
      "next_step": {
        "behavior": "jump_to",
        "selector": "body",
        "dialog_node": "node_27_1520358866193"
      },
      "conditions": "$ct != null && $c_ct != null",
      "description": null,
      "dialog_node": "node_34_1520458045780",
      "previous_sibling": null
    }
  )
}

const get_another_issue_report = () => {
  node(
    {
      "type": "standard",
      "title": "get another issue report",
      "output": {
        "text": {
          "values": ["Oops. Let's try again. Please describe, in a few words, the issue you'd like to report to 311."],
          "selection_policy": "sequential"
        }
      },
      "parent": "node_16_1520457025654",
      "context": null,
      "metadata": {},
      "next_step": {
        "behavior": "jump_to",
        "selector": "user_input",
        "dialog_node": "node_1_1520357929976"
      },
      "conditions": "true",
      "description": null,
      "dialog_node": "node_35_1520458089865",
      "previous_sibling": "node_34_1520458045780"
    }
  )
}


const process_issue_confirmation = () => {
  return [
    node(
      {
    		"type": "frame",
    		"title": "process_issue_confirmation",
    		"output": {
    			"text": {
    				"values": []
    			}
    		},
    		"parent": "node_15_1520456922489",
    		"context": null,
    		"metadata": {
    			"fallback": "leave",
    			"_customization": {
    				"mcr": false
    			}
    		},
    		"next_step": {
    			"behavior": "skip_user_input"
    		},
    		"conditions": "true",
    		"description": null,
    		"dialog_node": "node_16_1520457025654",
    		"digress_out": "allow_all",
    		"previous_sibling": "node_28_1521221791354",
    		"digress_out_slots": "not_allowed"
    	},
      [
            node({
              //**** This node is disabled... can I remove it?
          		"type": "response_condition",
          		"title": null,
          		"output": {
          			"text": {
          				"values": []
          			}
          		},
          		"parent": "node_16_1520457025654",
          		"context": null,
              // DISABLED???!
          		"disabled": true,
          		"metadata": {},
          		"next_step": null,
          		"conditions": null,
          		"description": null,
          		"dialog_node": "node_58_1521227765093",
          		"previous_sibling": "node_35_1520458089865"
          	}),
            node({
              "type": "slot",
              "title": null,
              "output": {},
              "parent": "node_16_1520457025654",
              "context": null,
              "metadata": {},
              "variable": "$c_ct",
              "next_step": null,
              "conditions": null,
              "description": null,
              "dialog_node": "slot_17_1520457096281",
              "previous_sibling": "node_58_1521227765093"
            }, [
                  node({
                    "type": "event_handler",
                    "title": null,
                    "output": {},
                    "parent": "slot_17_1520457096281",
                    "context": {
                      "c_ct": "$ct",
                      "c_agency": "$agency"
                    },
                    "metadata": {},
                    "next_step": null,
                    "conditions": "#affirmative",
                    "event_name": "input",
                    "description": null,
                    "dialog_node": "handler_18_1520457096281",
                    "previous_sibling": "handler_19_1520457096281"
                  })
            ]),
            node({
          		"type": "slot",
          		"title": null,
          		"output": {},
          		"parent": "node_16_1520457025654",
          		"context": null,
          		"metadata": {},
          		"variable": "$ct",
          		"next_step": null,
          		"conditions": null,
          		"description": null,
          		"dialog_node": "slot_22_1520457485837",
          		"previous_sibling": "slot_17_1520457096281"
          	}, [
                    node({
                		"type": "event_handler",
                		"title": null,
                		"output": {},
                		"parent": "slot_22_1520457485837",
                		"context": {
                			"ct": null
                		},
                		"metadata": {},
                		"next_step": null,
                		"conditions": "#negative",
                		"event_name": "input",
                		"description": null,
                		"dialog_node": "handler_23_1520457485837",
                		"previous_sibling": "handler_24_1520457485837"
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
      "type": "standard",
      "title": "Confirm The Issue",
      "output": {},
      "parent": null,
      "context": null,
      "metadata": {
        "_customization": {
          "mcr": true
        }
      },
      "next_step": null,
      "conditions": "$ct != null && $ct != ''",
      "digress_in": "does_not_return",
      "description": null,
      "dialog_node": "node_15_1520456922489",
      "digress_out": "allow_all",
      "previous_sibling": "node_1_1520357929976"
    }, [
        node({
      		"type": "response_condition",
      		"title": null,
      		"output": {
      			"text": {
      				"values": ["I have a report about '$ct'. Is that right?"],
      				"selection_policy": "sequential"
      			}
      		},
      		"parent": "node_15_1520456922489",
      		"context": null,
      		"metadata": {},
      		"next_step": null,
      		"conditions": "$agency == null",
      		"description": null,
      		"dialog_node": "node_27_1521221715274",
      		"previous_sibling": null
      	}),
        node({
      		"type": "response_condition",
      		"title": null,
      		"output": {
      			"text": {
      				"values": ["I have a report about '$ct', specifically about '$entity'. Is that right?"]
      			}
      		},
      		"parent": "node_15_1520456922489",
      		"context": null,
      		"metadata": {},
      		"next_step": null,
      		"conditions": "$agency != \"null\"",
      		"description": null,
      		"dialog_node": "node_28_1521221791354",
      		"previous_sibling": "node_27_1521221715274"
      	}),
        process_issue_confirmation()
    ])
  ];
}

const issue_confirmed_need_address = () => {
  return [
    node(
      {
    		"type": "standard",
    		"title": "Issue confirmed, need address",
    		"output": {
    			"text": {
    				"values": ["Next, I'll need to get an address where the reported issue is located."],
    				"selection_policy": "sequential"
    			}
    		},
    		"parent": null,
    		"context": null,
    		"metadata": {},
    		"next_step": {
    			"behavior": "jump_to",
    			"selector": "condition",
    			"dialog_node": "node_6_1521146866801"
    		},
    		"conditions": "true",
    		"description": null,
    		"dialog_node": "node_27_1520358866193",
    		"previous_sibling": "node_15_1520456922489"
    	}
    )
  ];
}


const get_landmark_address = () => {
  return [
    node (
      {
    		"type": "standard",
    		"title": "get landmark address",
    		"output": {},
    		"parent": "node_6_1521146866801",
    		"context": {
    			"landmark_address": "City Hall Park, New York, NY 10007, USA"
    		},
    		"metadata": {},
    		"next_step": {
    			"behavior": "jump_to",
    			"selector": "condition",
    			"dialog_node": "node_36_1520460846441"
    		},
    		"conditions": "$landmark != null",
    		"description": null,
    		"dialog_node": "node_19_1520974010769",
    		"previous_sibling": null
    	}
    )
  ];
}

const no_landmark_given = () => {
  return [
    node (
      {
    		"type": "standard",
    		"title": "no landmark given",
    		"output": {},
    		"parent": "node_6_1521146866801",
    		"context": null,
    		"metadata": {},
    		"next_step": {
    			"behavior": "jump_to",
    			"selector": "condition",
    			"dialog_node": "node_36_1520460846441"
    		},
    		"conditions": "$landmark == null",
    		"description": null,
    		"dialog_node": "node_37_1521147552788",
    		"previous_sibling": "node_19_1520974010769"
    	}
    )
  ];
}

const get_address = () => {
  return [
    node ({
    		"type": "frame",
    		"title": "Get Address",
    		"output": {
    			"text": {
    				"values": ["Ok, got it."],
    				"selection_policy": "sequential"
    			}
    		},
    		"parent": null,
    		"context": null,
    		"metadata": {
    			"fallback": "leave"
    		},
    		"next_step": {
    			"behavior": "skip_user_input"
    		},
    		"conditions": "true",
    		"digress_in": "does_not_return",
    		"description": null,
    		"dialog_node": "node_6_1521146866801",
    		"digress_out": "allow_all",
    		"previous_sibling": "node_27_1520358866193",
    		"digress_out_slots": "not_allowed"
    	}, [
            node({
          		"type": "event_handler",
          		"title": null,
          		"output": {
          			"text": {
          				"values": ["I'll need a street number, street name, and a street word (like \"road\", \"st\", \"blvd\", \"way\", etc.). Or, you can give me the name of a Manhattan landmark."],
          				"selection_policy": "sequential"
          			}
          		},
          		"parent": "node_6_1521146866801",
          		"context": null,
          		"metadata": {},
          		"next_step": null,
          		"conditions": null,
          		"event_name": "focus",
          		"description": null,
          		"dialog_node": "handler_7_1521146883633",
          		"previous_sibling": "node_37_1521147552788"
          	}),
            node({
          		"type": "slot",
          		"title": null,
          		"output": {},
          		"parent": "node_6_1521146866801",
          		"context": null,
          		"metadata": {},
          		"variable": "$landmark",
          		"next_step": null,
          		"conditions": null,
          		"description": null,
          		"dialog_node": "slot_8_1521146883638",
          		"previous_sibling": "handler_7_1521146883633"
          	}, [
                    node({
                  		"type": "event_handler",
                  		"title": null,
                  		"output": {},
                  		"parent": "slot_8_1521146883638",
                  		"context": {
                  			"landmark": "@landmark",
                  			"street_name": "placeholder",
                  			"street_word": "placeholder",
                  			"street_number": "placeholder",
                  			"sub_component": "placeholder"
                  		},
                  		"metadata": {},
                  		"next_step": null,
                  		"conditions": "@landmark",
                  		"event_name": "input",
                  		"description": null,
                  		"dialog_node": "handler_9_1521146883638",
                  		"previous_sibling": "handler_10_1521146883638"
                  	}),
                    node({
                  		"type": "event_handler",
                  		"title": null,
                  		"output": {},
                  		"parent": "slot_8_1521146883638",
                  		"context": null,
                  		"metadata": {},
                  		"next_step": null,
                  		"conditions": null,
                  		"event_name": "focus",
                  		"description": null,
                  		"dialog_node": "handler_10_1521146883638",
                  		"previous_sibling": null
                  	})
            ]),
            node({
              "type": "slot",
              "title": null,
              "output": {},
              "parent": "node_6_1521146866801",
              "context": null,
              "metadata": {},
              "variable": "$sub_component",
              "next_step": null,
              "conditions": null,
              "description": null,
              "dialog_node": "slot_20_1521146903715",
              "previous_sibling": "slot_8_1521146883638"
            }),
            node({
          		"type": "slot",
          		"title": null,
          		"output": {},
          		"parent": "node_6_1521146866801",
          		"context": null,
          		"metadata": {
          			"_customization": {
          				"mcr": true
          			}
          		},
          		"variable": "$street_number",
          		"next_step": null,
          		"conditions": null,
          		"description": null,
          		"dialog_node": "slot_11_1521146898185",
          		"previous_sibling": "slot_20_1521146903715"
          	}),
            node({
          		"type": "slot",
          		"title": null,
          		"output": {},
          		"parent": "node_6_1521146866801",
          		"context": null,
          		"metadata": {
          			"_customization": {
          				"mcr": true
          			}
          		},
          		"variable": "$street_name",
          		"next_step": null,
          		"conditions": null,
          		"description": null,
          		"dialog_node": "slot_14_1521146900539",
          		"previous_sibling": "slot_11_1521146898185"
          	}),
            node({
          		"type": "slot",
          		"title": null,
          		"output": {},
          		"parent": "node_6_1521146866801",
          		"context": null,
          		"metadata": {
          			"_customization": {
          				"mcr": true
          			}
          		},
          		"variable": "$street_word",
          		"next_step": null,
          		"conditions": null,
          		"description": null,
          		"dialog_node": "slot_17_1521146902279",
          		"previous_sibling": "slot_14_1521146900539"
          	}),
            get_landmark_address(),
            no_landmark_given()
        ])
  ];
  //TODO - *** Need event handlers for each of the slots for get_address ^^ ***
}

const proceed_with_address = () => {
  return [
    node(
      {
    		"type": "standard",
    		"title": "proceed with address",
    		"output": {
    			"text": {
    				"values": ["Ok, great."],
    				"selection_policy": "sequential"
    			}
    		},
    		"parent": "node_37_1520460846461",
    		"context": null,
    		"metadata": {},
    		"next_step": {
    			"behavior": "jump_to",
    			"selector": "condition",
    			"dialog_node": "node_54_1520461610873"
    		},
    		"conditions": "$address != null",
    		"description": null,
    		"dialog_node": "node_38_1520460846461",
    		"previous_sibling": null
    	}
    )
  ];
}

const get_another_address = () => {
  return [
    node(
      {
    		"type": "standard",
    		"title": "get another address",
    		"output": {
    			"text": {
    				"values": ["Oops. Let's try that address again. I'll need a street number, street name, and street word."],
    				"selection_policy": "sequential"
    			},
    			"context": {
    				"street_name": null,
    				"street_word": null,
    				"street_number": null,
    				"sub_component": null
    			}
    		},
    		"parent": "node_37_1520460846461",
    		"context": null,
    		"metadata": {},
    		"next_step": null,
    		"conditions": "true",
    		"description": null,
    		"dialog_node": "node_39_1520460846461",
    		"previous_sibling": "node_38_1520460846461"
    	}
    )
  ];
}

const confirmation_address = () => {
  return [
    node(
      {
    		"type": "frame",
    		"title": "confirmation_address",
    		"output": {},
    		"parent": "node_36_1520460846441",
    		"context": null,
    		"metadata": {
    			"fallback": "leave"
    		},
    		"next_step": {
    			"behavior": "skip_user_input"
    		},
    		"conditions": "true",
    		"description": null,
    		"dialog_node": "node_37_1520460846461",
    		"previous_sibling": null
    	},
      proceed_with_address(),
      get_another_address()
    )
    //TODO: *** Need event handler/response_condition for #affirmative and #negative for confirmation_address ^^ ***
  ];
}

const confirm_the_address = () => {
  return [
    node(
      {
    		"type": "standard",
    		"title": "Confirm The Address",
    		"output": {},
    		"parent": null,
    		"context": null,
    		"metadata": {
    			"_customization": {
    				"mcr": true
    			}
    		},
    		"next_step": null,
    		"conditions": "true",
    		"digress_in": "does_not_return",
    		"description": null,
    		"dialog_node": "node_36_1520460846441",
    		"digress_out": "allow_all",
    		"previous_sibling": "node_6_1521146866801"
    	}
      //TODO: *** Need response_condition nodes for two conditions in ^^ (???) ***
    ,
      confirmation_address()
    )
  ];
}


const report_complete = () => {
  return [
    node(
      {
    		"type": "standard",
    		"title": "Report complete",
    		"output": {},
    		"parent": null,
    		"context": null,
    		"metadata": {
    			"_customization": {
    				"mcr": true
    			}
    		},
    		"next_step": null,
    		"conditions": "$c_ct != null && $address != null || c_ct != null && $landmark_address != null",
    		"digress_in": "does_not_return",
    		"description": null,
    		"dialog_node": "node_54_1520461610873",
    		"digress_out": "allow_all",
    		"previous_sibling": "node_36_1520460846441"
    	}
    )
    //TODO: *** Need report_conditions/handlers for landmark vs. address conditions for report_complete ***
  ];
}

const anything_else = () => {
  return [
    node(
      {
    		"type": "standard",
    		"title": "Anything else",
    		"output": {
    			"text": {
    				"values": ["I didn't understand. You can try rephrasing.", "Can you reword your statement? I'm not understanding.", "I didn't get your meaning."],
    				"selection_policy": "sequential"
    			}
    		},
    		"parent": null,
    		"context": null,
    		"metadata": {},
    		"next_step": null,
    		"conditions": "anything_else",
    		"description": null,
    		"dialog_node": "Anything else",
    		"previous_sibling": "node_54_1520461610873"
    	}
    )
  ];
}





const node = (values, children) => {
  let result = {
    children: children || null,
    override_node_name: values['dialog_node'] || null,
    node: {}
  };

  if ('conditions' in values && values['conditions'] != null) {
    result['node']['conditions'] = values['conditions'];
  }

  if ('next_step' in values && values['next_step'] != null) {
    result['node']['next_step'] = {
      behavior: 'jump_to',
      dialog_node: values['next_step']['dialog_node'],
      selector: values['next_step']['selector']
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
