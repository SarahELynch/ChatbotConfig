
const responses = require('properties-reader')('./wcs_config/raw/strings/responses');
const entities = require('properties-reader')('./wcs_config/raw/strings/entity_phrases');
const intent_phrases = require('properties-reader')('./wcs_config/raw/strings/intent_phrases');


module.exports = {
  active: true,
  description: "failure to parse address (try twice before breaking out)",
  test: [
    {
      input: "hi, there's a fallen tree outside my door",
      output: responses.get("confirm-damaged-tree-entity")
        .replace('<? context.entity_friendly ?>', entities.get('fallen_tree'))
    },
    {
      input: "yes",
      output: responses.get("reference-dpr")
        .replace('<? context.c_entity_friendly ?>', entities.get('fallen_tree'))
        +
        responses.get("get-address")
    },
    {
      input: "it's at one tree hill",
      output: responses.get("retry-unusable-address")
    },
    {
      input: "one tree hill",
      output: responses.get("call-human")
      + responses.get("resource-damaged-tree")
    }
  ]
};
