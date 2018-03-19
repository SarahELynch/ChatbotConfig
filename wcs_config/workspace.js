
const _entities = require('./entities').entities;
const _intents = require('./intents').intents;
const _dialog = require('./dialog').dialog;

module.exports = {
  workspace: {
    name: "311bot_slots",
    description: `Constructed and Updated programmatically`,
    language: "en",
    metadata: {},
    dialog_nodes: _dialog,
    entities: _entities,
    intents: _intents
  }
};
