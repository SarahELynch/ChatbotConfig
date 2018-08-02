
const responses = require('properties-reader')('./wcs_config/raw/strings/responses');
const entities = require('properties-reader')('./wcs_config/raw/strings/entity_phrases');
const intent_phrases = require('properties-reader')('./wcs_config/raw/strings/intent_phrases');

const geo_code_address = '450 W 42nd St, New York, NY 10036, USA';

module.exports = {
  active: true,
  description: "Intent Flow - Noise - Address with Apartment Number (which we ignore)",
  test: [
    {
      input: "my neighbor is being very loud",
      output: responses.get("confirm-noise-entity")
      .replace('<? context.entity_friendly ?>', entities.get('neighbor'))
    },
    {
      input: "correct",
      output: responses.get("reference-nypd")
        .replace('<? context.c_entity_friendly ?>', entities.get('neighbor'))
      +
      responses.get("get-address")
    },
    {
      input: "450 W 42nd St #141",
      output: responses.get("confirm-address")
        .replace('<? context.address ?>', geo_code_address)
    },
    {
      input: "yep",
      output: responses.get("end-nypd")
      .replace('<? context.c_address ?>', geo_code_address)
      .replace('<? context.c_ct_friendly ?>', intent_phrases.get('report-noise'))
      .replace('<? context.c_entity_friendly ?>', entities.get('neighbor'))
      + responses.get("get-addtl-report")
  },
  {
    input: "no",
    output: responses.get("end-thanks")
  }
  ]
};
