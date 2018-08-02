
const responses = require('properties-reader')('./wcs_config/raw/strings/responses');
const entities = require('properties-reader')('./wcs_config/raw/strings/entity_phrases');
const intent_phrases = require('properties-reader')('./wcs_config/raw/strings/intent_phrases');

const geo_code_address = '358 Park Ave, New York, NY 10022, USA';

module.exports = {
  active: true,
  description: "non-confirmation of complaint type, address provided",
  test: [
    {
      input: "there is a broken tree near the sidewalk",
      output: responses.get("confirm-damaged-tree")
    },
    {
      input: "oh by the way I'm at 358 park...",
      output: responses.get("confirm-address")
        .replace('<? context.address ?>', geo_code_address)
    },
    {
      input: "yes",
      output: responses.get("end-no-entity")
      .replace('<? context.c_address ?>', geo_code_address)
      .replace('<? context.c_ct_friendly ?>', intent_phrases.get('report-damaged-tree'))
      + responses.get("get-addtl-report")
  },
  {
    input: "no",
    output: responses.get("end-thanks")
  }
  ]
};
