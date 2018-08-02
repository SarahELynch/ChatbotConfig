
const responses = require('properties-reader')('./wcs_config/raw/strings/responses');
const intent_phrases = require('properties-reader')('./wcs_config/raw/strings/intent_phrases');
const entities = require('properties-reader')('./wcs_config/raw/strings/entity_phrases');

const geo_code_address = '27 W 36th St, New York, NY 10018, USA';

module.exports = {
  active: true,
  description: "Indecipherable input - issue is not classifiable",
  test: [
    {
      input: "jsdfadjsflkafa342134",
      output: responses.get("retry_unclassifiable")
    },
    {
      input: "noise from neighborhood kids yelling",
      output: responses.get("confirm-noise")
    },
    {
      input: "yes",
      output: responses.get("reference-agency-generic")
        +
        responses.get("get-address")
    },
    {
      input: "27 w 36th st",
      output: responses.get("confirm-address")
        .replace('<? context.address ?>', geo_code_address)
    },
    {
      input: "yes",
      output: responses.get("end-no-entity")
      .replace('<? context.c_address ?>', geo_code_address)
      .replace('<? context.c_ct_friendly ?>', intent_phrases.get('report-noise'))
      + responses.get("get-addtl-report")
    },
    {
    input: "no",
    output: responses.get("end-thanks")
    }
  ]
};
