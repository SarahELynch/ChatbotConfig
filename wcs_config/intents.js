
const fs = require('fs');

const exportRaw = (path) => {
  return fs.readFileSync(path).toString().split("\n")
  .filter(d => {
    if (d.trim() != '') {
      return true;
    } else {
      return false;
    }
  })
  .map(d => {
    return { text: d };
  });
};

module.exports = {
  intents: [
    {
      intent: "affirmative",
      examples: exportRaw('./wcs_config/raw/intents/affirmative')
    },
    {
      intent: "negative",
      examples: exportRaw('./wcs_config/raw/intents/negative')
    },
    {
      intent: "report-damaged-tree",
      examples: exportRaw('./wcs_config/raw/intents/report_damaged_tree')
    },
    {
      intent: "report-graffiti",
      examples: exportRaw('./wcs_config/raw/intents/report_graffiti')
    },
    {
      intent: "report-noise",
      examples: exportRaw('./wcs_config/raw/intents/report_noise')
    },
    {
      intent: "report-street-condition",
      examples: exportRaw('./wcs_config/raw/intents/report_street_condition')
    },
    {
      intent: "what-function",
      examples: exportRaw('./wcs_config/raw/intents/what_function')
    }
  ]
};
