
const responses = require('properties-reader')('./wcs_config/raw/strings/responses');
const intent_phrases = require('properties-reader')('./wcs_config/raw/strings/intent_phrases');
const entities = require('properties-reader')('./wcs_config/raw/strings/entity_phrases');
const landmarks = require('properties-reader')('./wcs_config/raw/strings/landmark_phrases');

const landmark_address1 = 'City Hall Park, New York, NY 10007, USA';
const landmark_address2 = '350 5th Ave, New York, NY 10118, USA';

module.exports = {
  active: true,
  description: "Address Failure limit test - Rejected landmark address",
  test: [
    {
      input: "extremely loud construction noise at city hall",
      output: responses.get("confirm-noise-entity")
        .replace('<? context.entity_friendly ?>', entities.get('construction'))
    },
    {
      input: "yeah that's right",
      output: responses.get("reference-dep")
        .replace('<? context.c_entity_friendly ?>', entities.get('construction'))
        +
        responses.get("confirm-address-landmark")
          .replace('<? context.landmark_address ?>', landmark_address1)
          .replace('<? context.landmark_friendly ?>', landmarks.get('city_hall'))
    },
    {
      input: "no",
      output: responses.get("retry-rejected-address")
    },
    {
      input: "empire state building",
      output: responses.get("confirm-address-landmark")
          .replace('<? context.landmark_address ?>', landmark_address2)
          .replace('<? context.landmark_friendly ?>', landmarks.get('empire_state_building'))
    },
    {
      input: "no",
      output: responses.get("call-human")
      + responses.get("resource-noise")
    }
  ]
};
