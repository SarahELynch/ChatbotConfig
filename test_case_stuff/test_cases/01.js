
const responses = require('properties-reader')('./wcs_config/raw/strings/responses');
const entities = require('properties-reader')('./wcs_config/raw/strings/entity_phrases');
const intent_phrases = require('properties-reader')('./wcs_config/raw/strings/intent_phrases');

const geo_code_address = '123 Dr Martin Luther King Jr Blvd, New York, NY 10027, USA';

module.exports = {
  active: true,
  description: "Intent & Entity Flow - Noise & air conditioning",
  test: [
    {
      input: "the air conditioning unit at the building next door is so loud I can’t hear myself think",
      output: responses.get("confirm-noise-entity")
        .replace('<? context.entity_friendly ?>', entities.get('ac_unit'))
    },
    {
      input: "that's right",
      output: responses.get("reference-dep")
      .replace('<? context.c_entity_friendly ?>', entities.get('ac_unit'))
      +
      responses.get("get-address")
    },
    {
      input: "123 mlk blvd",
      output: responses.get("confirm-address")
        .replace('<? context.address ?>', geo_code_address)
    },
    {
      input: "yes it is",
      output: responses.get("end-dep")
        .replace('<? context.c_address ?>', geo_code_address)
        .replace('<? context.c_ct_friendly ?>', intent_phrases.get('report-noise'))
        .replace('<? context.c_entity_friendly ?>', entities.get('ac_unit'))
        + responses.get("get-addtl-report")
    },
    {
      input: "no",
      output: responses.get("end-thanks")
    }
  ]
};
