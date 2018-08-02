
const responses = require('properties-reader')('./wcs_config/raw/strings/responses');
const entities = require('properties-reader')('./wcs_config/raw/strings/entity_phrases');
const intent_phrases = require('properties-reader')('./wcs_config/raw/strings/intent_phrases');

const geo_code_address = 'Broadway & Exchange Pl, New York, NY 10005, USA';

module.exports = {
  active: false,
  description: "Intent & Entity Flow - Graffiti & removal - Location given as Intersection",
  test: [
    {
      input: "Can the graffiti on my apartment building be removed?",
      output: responses.get("confirm-graffiti-entity")
        .replace('<? context.entity_friendly ?>', entities.get('removal'))
    },
    {
      input: "yeah",
      output: responses.get("reference-dsny")
        .replace('<? context.c_entity_friendly ?>', entities.get('removal'))
      +
      responses.get("get-address")
    },
    {
      input: "the intersection of Broadway and exchange ",
      output: responses.get("confirm-address")
        .replace('<? context.address ?>', geo_code_address)
    },
    {
      input: "exactly",
      output: responses.get("end-dsny")
      .replace('<? context.c_address ?>', geo_code_address)
      .replace('<? context.c_entity_friendly ?>', entities.get('removal'))
      .replace('<? context.c_ct_friendly ?>', intent_phrases.get('report-graffiti'))
      + responses.get("get-addtl-report")
  },
  {
    input: "no",
    output: responses.get("end-thanks")
  }
  ]
};
