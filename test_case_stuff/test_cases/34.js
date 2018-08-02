
const responses = require('properties-reader')('./wcs_config/raw/strings/responses');
const intent_phrases = require('properties-reader')('./wcs_config/raw/strings/intent_phrases');
const entities = require('properties-reader')('./wcs_config/raw/strings/entity_phrases');

const geo_code_address = '51 Astor Pl, New York, NY 10003, USA';

module.exports = {
  active: true,
  description: "C.T. Failure limit test - Implicit negation of complaint type THREE times, confirm last address",
  test: [
    {
      input: "big potholes in the pavement",
      output: responses.get("confirm-street-condition-entity")
        .replace('<? context.entity_friendly ?>', entities.get('pavement_quality'))
    },
    {
      input: "there is a broken tree near the sidewalk",
      output: responses.get("confirm-damaged-tree")
    },
    {
      input: "screaming going on from next door neighbor",
      output: responses.get("confirm-noise-entity")
        .replace('<? context.entity_friendly ?>', entities.get('neighbor'))
    },
    {
      input: "please remove this graffiti",
      output: responses.get("confirm-graffiti-entity")
        .replace('<? context.entity_friendly ?>', entities.get('removal'))
    },
    {
      input: "yes that's right",
      output: responses.get("reference-dsny")
              .replace('<? context.c_entity_friendly ?>', entities.get('removal'))
              +
              responses.get("get-address")
    },
    {
      input: "51 astor pl",
      output: responses.get("confirm-address")
        .replace('<? context.address ?>', geo_code_address)
    },
    {
      input: "yep that's right",
      output: responses.get("end-dsny")
          .replace('<? context.c_entity_friendly ?>', entities.get('removal'))
          .replace('<? context.c_address ?>', geo_code_address)
          .replace('<? context.c_ct_friendly ?>', intent_phrases.get('report-graffiti'))
          +
          responses.get("get-addtl-report")
    },
    {
          input: "no",
          output: responses.get("end-thanks")
    }
  ]
};
