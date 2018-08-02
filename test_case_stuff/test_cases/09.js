
const responses = require('properties-reader')('./wcs_config/raw/strings/responses');
const entities = require('properties-reader')('./wcs_config/raw/strings/entity_phrases');
const intent_phrases = require('properties-reader')('./wcs_config/raw/strings/intent_phrases');

const geo_code_address = '2 Moore St, New York, NY 10004, USA';

module.exports = {
  active: true,
  description: "Intent & Entity Flow - Noise & animal('dog') - Indecipherable Location",
  test: [
    {
      input: "my neighbor's dog has been barking all day long",
      output: responses.get("confirm-noise-entity")
        .replace('<? context.entity_friendly ?>', entities.get('animal'))
    },
    {
      input: "yes definitely",
      output: responses.get("reference-dep")
        .replace('<? context.c_entity_friendly ?>', entities.get('animal'))
        +
        responses.get("get-address")
    },
    {
      input: "oiaefsjasjfldsfsdawge",
      output: responses.get("retry-unusable-address")
    },
    {
      input: "2 moore st",
      output: responses.get("confirm-address")
        .replace('<? context.address ?>', geo_code_address)
    },
    {
      input: "yes",
      output: responses.get("end-dep")
      .replace('<? context.c_address ?>', geo_code_address)
      .replace('<? context.c_entity_friendly ?>', entities.get('animal'))
      .replace('<? context.c_ct_friendly ?>', intent_phrases.get('report-noise'))
      + responses.get("get-addtl-report")
  },
  {
    input: "no",
    output: responses.get("end-thanks")
  }
  ]
};
