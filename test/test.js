var Storage = require('../core/lib/storage');

describe('Test', function() {

    it('transaction', function(done) {
        var db = Storage.getConnection();
        
        var AddressModel = Storage.getModel('address');
        var EmployeeModel = Storage.getModel('employee');

        db.transaction(function (err, transaction) {
            AddressModel.create([
                {
                    name: "TestStreet2",
                    line1: "Line3",
                    line2: "Line4",
                    city:  "Las Vegas2",
                    state: "Nevada3",
                    zip: "22131222",
                    country: "EEUU2"
                }
            ], function(err, items){
                if(err){
                    console.log("ERROR address: " + err);
                }
                console.log(items);
                var address   = items[0];
                var addresses = [];
                addresses[0]  = items[0];

                EmployeeModel.create([
                    {
                        firstName: "Rodrigo",
                        lastName: "Lopetegui",
                        phone: "01391320",
                        cell: "21232311",
                        email: "rlopetegui@codigodelsur.com",
                        isArchived: true,
                        role: "Supernova's employee"

                    }
                ], function(err, items){
                    if(err){
                         console.log("ERROR employee: " + err);
                         return transaction.rollback(function (err) {
                            if (!err) {
                                console.log("success!");
                            }
                            done();
                        });
                        
                    }
                    var employee = items[0];
                    
                    employee.setDefaultShippingAddress(address, function(err){
                        if(err){
                            console.log(err);
                            return transaction.rollback(function (err) {
                                if (!err) {
                                    console.log("success!");
                                }
                                done();
                            });
                            
                        }
                        employee.setAddresses(addresses, function(err){
                           if(err){
                                console.log(err);
                                return transaction.rollback(function (err) {
                                    if (!err) {
                                        console.log("success!");
                                    }
                                    done();
                                });
                                
                            }
                            employee.getAddresses(function(err, addresses){
                                if(err){
                                    console.log(err);
                                    return transaction.rollback(function (err) {
                                        if (!err) {
                                            console.log("success!");
                                        }
                                        done();
                                    });
                                }
                           
                                return transaction.commit(function (err) {
                                    if (!err) {
                                        console.log("success commit!");
                                    }
                                    done();
                                });
                                
                            });
                        });
                    });
                });
            });
        });
        
    });
});

