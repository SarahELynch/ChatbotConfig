
const responses = require('properties-reader')('./wcs_config/raw/strings/responses');
const entities = require('properties-reader')('./wcs_config/raw/strings/entity_phrases');
const intent_phrases = require('properties-reader')('./wcs_config/raw/strings/intent_phrases');

const geo_code_address = '51 Astor Pl, New York, NY 10003, USA';

module.exports = {
  active: true,
  description: "combo intent confirmation and address description",
  test: [
    {
      input: "hey",
      output: responses.get("greeting")
    },
    {
      input: "there's a tree in my house",
      output: responses.get("confirm-damaged-tree")
    },
    {
      input: "yeah it's at 51 astor place",
      output: responses.get("reference-agency-generic")
        .replace('<? context.c_entity_friendly ?>', entities.get('pavement_quality'))
        +
        responses.get("confirm-address")
        .replace('<? context.address ?>', geo_code_address)
    },
    {
      input: "yes",
      output: responses.get("end-no-entity")
      .replace('<? context.c_address ?>', geo_code_address)
      .replace('<? context.c_entity_friendly ?>', entities.get('pavement_quality'))
      .replace('<? context.c_ct_friendly ?>', intent_phrases.get('report-damaged-tree'))
      + responses.get("get-addtl-report")
  },
  {
    input: "no",
    output: responses.get("end-thanks")
  }
  ]
};
