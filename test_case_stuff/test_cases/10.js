
const responses = require('properties-reader')('./wcs_config/raw/strings/responses');
const entities = require('properties-reader')('./wcs_config/raw/strings/entity_phrases');
const intent_phrases = require('properties-reader')('./wcs_config/raw/strings/intent_phrases');

const geo_code_address = 'Columbus Ave & Duke Ellington Blvd, New York, NY 10025, USA';

module.exports = {
  active: false,
  description: "Intent & Entity Flow - Street Condition & pavement_quality - Location is outside of bounds",
  test: [
    {
      input: "the road is all crumbly and it's very rough on my car",
      output: responses.get("confirm-street-condition-entity")
        .replace('<? context.entity_friendly ?>', entities.get('pavement_quality'))
    },
    {
      input: "yes",
      output: responses.get("reference-dot")
        .replace('<? context.c_entity_friendly ?>', entities.get('pavement_quality'))
        +
        responses.get("get-address")
    },
    {
      input: "Bell Blvd and 173rd Avenue",
      output: responses.get("address-out-of-bounds")
      + 
      responses.get("get-address")
    },
    {
      input: "duke ellington and colombus ",
      output: responses.get("confirm-address")
        .replace('<? context.address ?>', geo_code_address)
    },
    {
      input: "si",
      output: responses.get("end-dot")
      .replace('<? context.c_address ?>', geo_code_address)
      .replace('<? context.c_entity_friendly ?>', entities.get('pavement_quality'))
      .replace('<? context.c_ct_friendly ?>', intent_phrases.get('report-street-condition'))
      + responses.get("get-addtl-report")
  },
  {
    input: "no",
    output: responses.get("end-thanks")
  }
  ]
};
