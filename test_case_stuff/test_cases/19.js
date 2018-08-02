const responses = require('properties-reader')('./wcs_config/raw/strings/responses');
const intent_phrases = require('properties-reader')('./wcs_config/raw/strings/intent_phrases');
const entities = require('properties-reader')('./wcs_config/raw/strings/entity_phrases');

const geo_code_address = '358 Park Ave, New York, NY 10022, USA';

module.exports = {
  active: true,
  description: "Intent Flow Graffiti Full initial report, in-progress graffiti route to 911",
  test: [
    {
      input: "want to report some ugly graffiti at 358 park ave",
      output: responses.get("confirm-graffiti")
        .replace('<? context.ct_friendly ?>', intent_phrases.get('report-graffiti'))
    },
    {
      input: "yes please",
      output: responses.get("graffiti-in-progress-follow-up")
    },
    {
      input: "yes, it's a hoodlum teenager",
      output: responses.get("reference-911")
      //note: context.c_entity (have to immediately assign c_entity after user confirmation)
        .replace('<? context.c_entity_friendly ?>', entities.get('in_progress_graffiti'))
      +
      responses.get("confirm-address")
        .replace('<? context.address ?>', geo_code_address)
    },
    {
      input: "yes",
      output: responses.get("end-911")
      .replace('<? context.c_address ?>', geo_code_address)
      .replace('<? context.c_ct_friendly ?>', intent_phrases.get('report-graffiti'))
      .replace('<? context.c_entity_friendly ?>', entities.get('in_progress_graffiti'))
      + responses.get("get-addtl-report")
  },
  {
    input: "no",
    output: responses.get("end-thanks")
  }
  ]
};
