module.exports = function (orm, db) {
    var Employee = db.define('employee', {
        //company : { model : 'Company' },
        firstName: { type: 'text', required: true},
        lastName: { type: 'text', required: true},
        phone: { type: 'text'},
        cell: { type: 'text'},
        email: { type: 'text', required: true},
        isArchived: { type: 'boolean'},
        role: { type: 'text', required: true}
    },
    {
        hooks: {
          beforeValidation: function () {
          }
        }
    });

    Employee.hasOne("defaultShippingAddress", db.models.address);
    Employee.hasMany("addresses", db.models.address);
};

console.log("Employee model initialized");
