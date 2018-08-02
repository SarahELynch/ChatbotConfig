const responses = require('properties-reader')('./wcs_config/raw/strings/responses');
const intent_phrases = require('properties-reader')('./wcs_config/raw/strings/intent_phrases');
const entities = require('properties-reader')('./wcs_config/raw/strings/entity_phrases');
const landmarks = require('properties-reader')('./wcs_config/raw/strings/landmark_phrases');

const landmark_address1 = 'City Hall Park, New York, NY 10007, USA';
const landmark_address2 = '350 5th Ave, New York, NY 10118, USA';

module.exports = {
  active: true,
  description: "Negative word AND (landmark) address given as response to landmark address confirmation question",
  test: [
    {
      input: "potholes at city hall",
      output: responses.get("confirm-street-condition-entity")
        .replace('<? context.entity_friendly ?>', entities.get('pavement_quality'))
    },
    {
      input: "yes",
      output: responses.get("reference-dot")
       .replace('<? context.c_entity_friendly ?>', entities.get('pavement_quality'))
      +
      responses.get("confirm-address-landmark")
        .replace('<? context.landmark_friendly ?>', landmarks.get('city_hall'))
        .replace('<? context.landmark_address ?>', landmark_address1)
    },
    {
      input: "no it's the empire state building",
      output: responses.get("confirm-address-landmark")
      .replace('<? context.landmark_friendly ?>', landmarks.get('empire_state_building'))
        .replace('<? context.landmark_address ?>', landmark_address2)
    },
    {
      input: "yes",
      output: responses.get("end-dot")
        .replace('<? context.c_entity_friendly ?>', entities.get('pavement_quality'))
        .replace('<? context.c_address ?>', landmark_address2)
        .replace('<? context.c_ct_friendly ?>', intent_phrases.get('report-street-condition'))
      + responses.get("get-addtl-report")
    },
    {
      input: "no",
      output: responses.get("end-thanks")
    }
  ]
}
