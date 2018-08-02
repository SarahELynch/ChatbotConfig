
const responses = require('properties-reader')('./wcs_config/raw/strings/responses');
const entities = require('properties-reader')('./wcs_config/raw/strings/entity_phrases');
const intent_phrases = require('properties-reader')('./wcs_config/raw/strings/intent_phrases');

const geo_code_address = '2 Moore St, New York, NY 10004, USA';

module.exports = {
  active: true,
  description: "Intent & Entity Flow - Graffiti - Misclassification (correct: Street Conditions, markings_quality - (entity surface form: 'lane line'))",
  test: [
    {
      input: "paint",
      output: responses.get("confirm-street-condition-entity")
        .replace('<? context.entity_friendly ?>', entities.get('markings_quality'))
    },
    {
      input: "uh no",
      output: responses.get("retry_misclassified")
    },
    {
      input: "someboy spray painted graffiti",
      output: responses.get("confirm-graffiti")
    },
    {
      input: "yes!",
      output: responses.get("graffiti-in-progress-follow-up"),
    },
    {
      input: "no",
      output: responses.get("reference-agency-generic")
        +
        responses.get("get-address")
    },
    {
      input: "in front of 2 moore st ",
      output: responses.get("confirm-address")
        .replace('<? context.address ?>', geo_code_address)
    },
    {
      input: "yes it is",
      output: responses.get("end-no-entity")
      .replace('<? context.c_address ?>', geo_code_address)
      .replace('<? context.c_ct_friendly ?>', intent_phrases.get('report-graffiti'))
      + responses.get("get-addtl-report")
  },
  {
    input: "no",
    output: responses.get("end-thanks")
  }
  ]
};
