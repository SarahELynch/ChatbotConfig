
const responses = require('properties-reader')('./wcs_config/raw/strings/responses');
const entities = require('properties-reader')('./wcs_config/raw/strings/entity_phrases');
const intent_phrases = require('properties-reader')('./wcs_config/raw/strings/intent_phrases');

const geo_code_address = '27 W 24th St, New York, NY 10010, USA';

module.exports = {
  active: true,
  description: "Intent & Entity Flow - Street Condition & pavement_quality (entity surface form: 'potholes')",
  test: [
    {
      input: "W 24th has really bad potholes in front of Junoon",
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
      input: "27 W 24th St",
      output: responses.get("confirm-address")
        .replace('<? context.address ?>', geo_code_address)
    },
    {
      input: "sure is",
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
