
const responses = require('properties-reader')('./wcs_config/raw/strings/responses');
const entities = require('properties-reader')('./wcs_config/raw/strings/entity_phrases');
const intent_phrases = require('properties-reader')('./wcs_config/raw/strings/intent_phrases');

const geo_code_address = '450 W 42nd St, New York, NY 10036, USA';

module.exports = {
  active: false,
  description: "Intent Flow - Noise - Issue is not Classifiable (Indecipherable or 'Out-of-purview') - Also location with 'Sub Address'",
  test: [
    {
      input: "an abandoned car outside",
      output: responses.get("retry_unclassifiable")
    },
    {
      input: "noise from neighborhood kids sitting on a van",
      output: responses.get("confirm-noise")
    },
    {
      input: "yes they are such hooligans",
      output: responses.get("reference-agency-generic")
        +
        responses.get("get-address")
    },
    {
      input: "450 w 42nd",
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
