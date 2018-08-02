
const responses = require('properties-reader')('./wcs_config/raw/strings/responses');
const intent_phrases = require('properties-reader')('./wcs_config/raw/strings/intent_phrases');
const entities = require('properties-reader')('./wcs_config/raw/strings/entity_phrases');

const geo_code_address = '100 Broadway, New York, NY 10005, USA';

module.exports = {
  active: true,
  description: "Customized path for follow-up question - Intent: Noise & Entity: Alarm, route to NYPD",
  test: [
    {
      input: "hi, there's an alarm going off on my street",
      output: responses.get("confirm-noise-entity")
        .replace('<? context.ct_friendly ?>', intent_phrases.get('report-noise'))
        .replace('<? context.entity_friendly ?>', entities.get('alarm'))
    },
    {
      input: "yes",
      output: responses.get("noise-alarm-follow-up")
    },
    {
      input: "yes",
      output: responses.get("reference-nypd-alarm-in-progress")
        +
        responses.get("get-address")
    },
    {
      input: "100 broadway avenue",
      output: responses.get("confirm-address")
        .replace('<? context.address ?>', geo_code_address)
    },
    {
      input: "yep",
      output: responses.get("end-nypd")
        .replace('<? context.c_address ?>', geo_code_address)
        .replace('<? context.c_ct_friendly ?>', intent_phrases.get('report-noise'))
        .replace('<? context.c_entity_friendly ?>', entities.get('alarm'))
        + responses.get("get-addtl-report")
    },
    {
      input: "no",
      output: responses.get("end-thanks")
    }
  ]
};
