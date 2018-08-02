const responses = require('properties-reader')('./wcs_config/raw/strings/responses');
const intent_phrases = require('properties-reader')('./wcs_config/raw/strings/intent_phrases');
const entities = require('properties-reader')('./wcs_config/raw/strings/entity_phrases');

const geo_code_address1 = '27 W 36th St, New York, NY 10018, USA';
const geo_code_address2 = '51 Astor Pl, New York, NY 10003, USA';

module.exports = {
  active: true,
  description: "Negative word AND (regular, street) address given as response to address confirmation question",
  test: [
    {
      input: "potholes at 27 w 36th st",
      output: responses.get("confirm-street-condition-entity")
        .replace('<? context.entity_friendly ?>', entities.get('pavement_quality'))
    },
    {
      input: "yes",
      output: responses.get("reference-dot")
       .replace('<? context.c_entity_friendly ?>', entities.get('pavement_quality'))
      +
      responses.get("confirm-address")
        .replace('<? context.address ?>', geo_code_address1)
    },
    {
      input: "no it's 51 astor pl",
      output: responses.get("confirm-address")
        .replace('<? context.address ?>', geo_code_address2)
    },
    {
      input: "yes",
      output: responses.get("end-dot")
        .replace('<? context.c_entity_friendly ?>', entities.get('pavement_quality'))
        .replace('<? context.c_address ?>', geo_code_address2)
        .replace('<? context.c_ct_friendly ?>', intent_phrases.get('report-street-condition'))
      + responses.get("get-addtl-report")
    },
    {
      input: "no",
      output: responses.get("end-thanks")
    }
  ]
}
