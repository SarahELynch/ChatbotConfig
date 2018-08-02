
const responses = require('properties-reader')('./wcs_config/raw/strings/responses');
const entities = require('properties-reader')('./wcs_config/raw/strings/entity_phrases');
const intent_phrases = require('properties-reader')('./wcs_config/raw/strings/intent_phrases');

const geo_code_address1 = '8 Laight St, New York, NY 10013, USA';
const geo_code_address2 = '8 Beach St, New York, NY 10013, USA';

module.exports = {
  active: true,
  description: "Intent Flow - Damaged Tree - incorrect location extracted",
  test: [
    {
      input: "this tree is damaged",
      output: responses.get("confirm-damaged-tree")
    },
    {
      input: "pretty much",
      output: responses.get("reference-agency-generic")
      +
      responses.get("get-address")
    },
    {
      input: "it's at 8 Laight street",
      output: responses.get("confirm-address")
        .replace('<? context.address ?>', geo_code_address1)
    },
    {
      input: "no, sorry",
      output: responses.get("retry-rejected-address")
    },
    {
      input: "8 beach street",
      output: responses.get("confirm-address")
        .replace('<? context.address ?>', geo_code_address2)
    },
    {
      input: "yup",
      output: responses.get("end-no-entity")
      .replace('<? context.c_address ?>', geo_code_address2)
      .replace('<? context.c_ct_friendly ?>', intent_phrases.get('report-damaged-tree'))
      + responses.get("get-addtl-report")
  },
  {
    input: "no",
    output: responses.get("end-thanks")
  }
  ]
};
