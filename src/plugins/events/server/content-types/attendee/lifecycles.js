const { v4: uuidv4 } = require('uuid');

module.exports = {
  beforeCreate(event){
    event.paarams.data.UID = uuidv4();
  }
}
