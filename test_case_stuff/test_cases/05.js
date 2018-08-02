
const responses = require('properties-reader')('./wcs_config/raw/strings/responses');
const entities = require('properties-reader')('./wcs_config/raw/strings/entity_phrases');
const intent_phrases = require('properties-reader')('./wcs_config/raw/strings/intent_phrases');

const geo_code_address = '358 Park Ave, New York, NY 10022, USA';

module.exports = {
  active: true,
  description: "Intent Flow - Graffiti - Full initial report (no location prompt)",
  test: [
    {
      input: "want to report some ugly graffiti at 358 park ave",
      output: responses.get("confirm-graffiti")
    },
    {
      input: "yes please",
      output: responses.get("graffiti-in-progress-follow-up")
    },
    {
      input: "no, it's been there for a while",
      output: responses.get("reference-agency-generic")
      +
      responses.get("confirm-address")
        .replace('<? context.address ?>', geo_code_address)
    },
    {
      input: "yes",
      output: responses.get("end-no-entity")
      .replace('<? context.c_address ?>', geo_code_address)
      .replace('<? context.c_ct_friendly ?>', intent_phrases.get('report-graffiti'))
      + responses.get("get-addtl-report")
  },
  {
    input: "no",
    output: responses.get("end-thanks")
  }
  ]
};
