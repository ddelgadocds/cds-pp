
module.exports = function (orm, db) {
    var Address = db.define('address', {
        name: { type: 'text'},
        line1: { type: 'text'},
        line2: { type: 'text'},
        city: { type: 'text'},
        state: { type: 'text'},
        zip: { type: 'text'},
        country: { type: 'text'},
        isDefault : { type: 'boolean', defaultValue: false }
    },
    {
        hooks: {
          beforeValidation: function () {
          }
        }
    });
};

console.log("Address model initialized");
