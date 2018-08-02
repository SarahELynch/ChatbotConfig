
const responses = require('properties-reader')('./wcs_config/raw/strings/responses');
const entities = require('properties-reader')('./wcs_config/raw/strings/entity_phrases');
const intent_phrases = require('properties-reader')('./wcs_config/raw/strings/intent_phrases');
const landmarks = require('properties-reader')('./wcs_config/raw/strings/landmark_phrases');

const landmark_address = 'City Hall Park, New York, NY 10007, USA';

module.exports = {
  active: true,
  description: "Intent & Entity Flow - Damaged Tree & fallen_tree - Landmark: City Hall - Full Report",
  test: [
    {
      input: "there is a tree that fell down in front of city hall",
      output: responses.get("confirm-damaged-tree-entity")
        .replace('<? context.entity_friendly ?>', entities.get('fallen_tree'))
    },
    {
      input: "sure",
      output: responses.get("reference-dpr")
        .replace('<? context.c_entity_friendly ?>', entities.get('fallen_tree'))
        +
        responses.get("confirm-address-landmark")
          .replace('<? context.landmark_friendly ?>', landmarks.get('city_hall'))
          .replace('<? context.landmark_address ?>', landmark_address)
    },
    {
      input: "sounds right",
      output: responses.get("end-dpr")
            .replace('<? context.c_address ?>', landmark_address)
            .replace('<? context.c_entity_friendly ?>', entities.get('fallen_tree'))
            .replace('<? context.c_ct_friendly ?>', intent_phrases.get('report-damaged-tree'))
            + responses.get("get-addtl-report")
        },
        {
          input: "no",
          output: responses.get("end-thanks")
        }
  ]
};
