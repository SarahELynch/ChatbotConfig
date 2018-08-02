
const responses = require('properties-reader')('./wcs_config/raw/strings/responses');
const entities = require('properties-reader')('./wcs_config/raw/strings/entity_phrases');
const intent_phrases = require('properties-reader')('./wcs_config/raw/strings/intent_phrases');

const geo_code_address1 = '51 Astor Pl, New York, NY 10003, USA';
const geo_code_address2 = '27 W 36th St, New York, NY 10018, USA';

module.exports = {
  active: true,
  description: "combo input (aff + issue report) to addtl report question",
  test: [
    {
      input: "could this graffiti on my office building be removed?",
      output: responses.get("confirm-graffiti-entity")
          .replace('<? context.entity_friendly ?>', entities.get('removal'))
    },
    {
      input: "yes",
      output: responses.get("reference-dsny")
        .replace('<? context.c_entity_friendly ?>', entities.get('removal'))
      +
      responses.get("get-address")
    },
    {
      input: "51 astor pl",
      output: responses.get("confirm-address")
        .replace('<? context.address ?>', geo_code_address1)
    },
    {
      input: "that's right",
      output: responses.get("end-dsny")
      .replace('<? context.c_address ?>', geo_code_address1)
      .replace('<? context.c_ct_friendly ?>', intent_phrases.get('report-graffiti'))
      .replace('<? context.c_entity_friendly ?>', entities.get('removal'))
      + responses.get("get-addtl-report")
  },
  {
    input: "yeah there's a dead tree at 27 w 36th st",
    output: responses.get("confirm-damaged-tree-entity")
        .replace('<? context.entity_friendly ?>', entities.get('dead_dying_tree'))
  },
  {
    input: "yeah that's right",
    output: responses.get("reference-dpr")
      .replace('<? context.c_entity_friendly ?>', entities.get('dead_dying_tree'))
    +
    responses.get("confirm-address")
      .replace('<? context.address ?>', geo_code_address2)
  },
  {
    input: "indeed",
    output: responses.get("end-dpr")
      .replace('<? context.c_address ?>', geo_code_address2)
      .replace('<? context.c_ct_friendly ?>', intent_phrases.get('report-damaged-tree'))
      .replace('<? context.c_entity_friendly ?>', entities.get('dead_dying_tree'))
      + responses.get("get-addtl-report")
  },
  {
    input: "nope not right now",
    output: responses.get("end-thanks")
  }
  ]
};
