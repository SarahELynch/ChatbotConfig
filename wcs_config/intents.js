
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
      intent: "greeting",
      examples: exportRaw('./wcs_config/raw/intents/greeting')
    },
    {
      intent: "what-function",
      examples: exportRaw('./wcs_config/raw/intents/what_function')
    },
    {
      intent: "generic-report",
      examples: exportRaw('./wcs_config/raw/intents/generic_report')
    },
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
      intent: "report-street-condition",
      examples: exportRaw('./wcs_config/raw/intents/report_street_condition')
    },
    {
      intent: "report-graffiti",
      examples: exportRaw('./wcs_config/raw/intents/report_graffiti')
    },
    {
      intent: "report-noise",
      examples: exportRaw('./wcs_config/raw/intents/report_noise')
    }
  ]
};
