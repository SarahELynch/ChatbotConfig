const responses = require('properties-reader')('./wcs_config/raw/strings/responses');
const intent_phrases = require('properties-reader')('./wcs_config/raw/strings/intent_phrases');
const entities = require('properties-reader')('./wcs_config/raw/strings/entity_phrases');

const geo_code_address = '27 W 36th St, New York, NY 10018, USA';

module.exports = {
  active: true,
  description: "Unusable/unsupported input given as response to (regular, street) address confirmation question",
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
        .replace('<? context.address ?>', geo_code_address)
    },
    {
      input: "mary had a little lamb whose fleece was white as snow",
      output: responses.get("confirm-address")
        .replace('<? context.address ?>', geo_code_address)
    },
    {
      input: "yes",
      output: responses.get("end-dot")
        .replace('<? context.c_entity_friendly ?>', entities.get('pavement_quality'))
        .replace('<? context.c_address ?>', geo_code_address)
        .replace('<? context.c_ct_friendly ?>', intent_phrases.get('report-street-condition'))
      + responses.get("get-addtl-report")
    },
    {
      input: "no",
      output: responses.get("end-thanks")
    }
  ]
}
