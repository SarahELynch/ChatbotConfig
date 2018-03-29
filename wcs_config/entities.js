
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
		let d_array = d.split(",");
    for (let i in d_array) {
      d_array[i] = d_array[i].trim();
    }
    return { value: d_array.shift(), synonyms: d_array};
  });
};

module.exports = {
  entities: [
    {
      entity: "dep",
      values: exportRaw('./wcs_config/raw/entities/dep')
    },
    {
      entity: "dpr",
      values: exportRaw('./wcs_config/raw/entities/dpr')
    },
    {
      entity: "dsny",
      values: exportRaw('./wcs_config/raw/entities/dsny')
    },
    {
      entity: "landmark",
      values: exportRaw('./wcs_config/raw/entities/landmark')
    },
    {
      entity: "nypd",
      values: exportRaw('./wcs_config/raw/entities/nypd')
    },
    {
      entity: "street_name",
      values: exportRaw('./wcs_config/raw/entities/street_name')
    },
    {
      entity: "street_word",
      values: exportRaw('./wcs_config/raw/entities/street_word')
    },
    {
      entity: "sub_component",
      values: exportRaw('./wcs_config/raw/entities/sub_component')
    },
    {
      entity: "sys-number",
      values: []
    }
  ]
};
