
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
      entity: "ac_unit",
      values: exportRaw('./wcs_config/raw/entities/ac_unit')
    },
    {
      entity: "ventilation",
      values: exportRaw('./wcs_config/raw/entities/ventilation')
    },
    {
      entity: "animal",
      values: exportRaw('./wcs_config/raw/entities/animal')
    },
    {
      entity: "construction",
      values: exportRaw('./wcs_config/raw/entities/construction')
    },
    {
      entity: "establishment",
      values: exportRaw('./wcs_config/raw/entities/establishment')
    },
    {
      entity: "neighbor",
      values: exportRaw('./wcs_config/raw/entities/neighbor')
    },
    {
      entity: "alarm",
      values: exportRaw('./wcs_config/raw/entities/alarm')
    },
    {
      entity: "damaged_manhole",
      values: exportRaw('./wcs_config/raw/entities/damaged_manhole')
    },
    {
      entity: "pavement_quality",
      values: exportRaw('./wcs_config/raw/entities/pavement_quality')
    },
    {
      entity: "markings_quality",
      values: exportRaw('./wcs_config/raw/entities/markings_quality')
    },
    {
      entity: "removal",
      values: exportRaw('./wcs_config/raw/entities/removal')
    },
    {
      entity: "in_progress_graffiti",
      values: exportRaw('./wcs_config/raw/entities/in_progress_graffiti')
    },
    {
      entity: "dead_dying_tree",
      values: exportRaw('./wcs_config/raw/entities/dead_dying_tree')
    },
    {
      entity: "fallen_tree",
      values: exportRaw('./wcs_config/raw/entities/fallen_tree')
    },
    {
      entity: "leaning_tree",
      values: exportRaw('./wcs_config/raw/entities/leaning_tree')
    },
    {
      entity: "tree_branch_damage",
      values: exportRaw('./wcs_config/raw/entities/tree_branch_damage')
    },
    {
      entity: "uprooted_tree",
      values: exportRaw('./wcs_config/raw/entities/uprooted_tree')
    },
    {
      entity: "vandalism",
      values: exportRaw('./wcs_config/raw/entities/vandalism')
    },
    {
      entity: "affirmative",
      values: exportRaw('./wcs_config/raw/entities/affirmative')
    },
    {
      entity: "landmark",
      values: exportRaw('./wcs_config/raw/entities/landmark')
    }
  ]
};
