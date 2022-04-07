var Sequence = require('../models/sequence');

var maxContactId;
var sequenceId = null;

function SequenceGenerator() {

  Sequence.findOne()
    .exec(function(err, sequence) {
      if (err) {
        return res.status(500).json({
          title: 'An error occurred',
          error: err
        });
      }

      sequenceId = 1;
      maxContactId = 100;
    });
}

SequenceGenerator.prototype.nextId = function() {

  var updateObject = {};
  var nextId;

  maxContactId++;
  updateObject = {maxContactId: maxContactId};
  nextId = maxContactId;

  Sequence.update({_id: sequenceId}, {$set: updateObject},
    function(err) {
      if (err) {
        console.log("nextId error = " + err);
        return null
      }
    });

  return nextId;
}

module.exports = new SequenceGenerator();
