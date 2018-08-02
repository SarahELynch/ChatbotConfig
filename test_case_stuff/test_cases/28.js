
const responses = require('properties-reader')('./wcs_config/raw/strings/responses');
const intent_phrases = require('properties-reader')('./wcs_config/raw/strings/intent_phrases');
const entities = require('properties-reader')('./wcs_config/raw/strings/entity_phrases');


module.exports = {
  active: true,
  description: "C.T. Failure limit test - Implicit negation of complaint type",
  test: [
    {
      input: "big potholes in the pavement",
      output: responses.get("confirm-street-condition-entity")
        .replace('<? context.entity_friendly ?>', entities.get('pavement_quality'))
    },
    {
      input: "there is a broken tree near the sidewalk",
      output: responses.get("confirm-damaged-tree")
    },
    {
      input: "screaming going on from next door neighbor",
      output: responses.get("confirm-noise-entity")
        .replace('<? context.entity_friendly ?>', entities.get('neighbor'))
    },
    {
      input: "please remove this graffiti from this building",
      output: responses.get("confirm-graffiti-entity")
        .replace('<? context.entity_friendly ?>', entities.get('removal'))
    },
    {
      input: "lane lines on the road are very faded",
      output: responses.get("call-human")
      + responses.get("resource-generic")
    }
  ]
};
