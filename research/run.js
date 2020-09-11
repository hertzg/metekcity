const async = require('async');
const noble = require('noble')
const assert = require('assert')

noble.on('stateChange', function(state) {
    console.log('!stateChange', state)
    if (state === 'poweredOn') {
        noble.startScanning();
    } else {
        noble.stopScanning();
    }
});

noble.on('discover', function(peripheral) {
    console.log('!discover')
    if(!peripheral.advertisement.serviceUuids.length) {
        return
    }

    console.log('peripheral discovered (' + peripheral.id +
        ' with address <' + peripheral.address +  ', ' + peripheral.addressType + '>,' +
        ' connectable ' + peripheral.connectable + ',' +
        ' RSSI ' + peripheral.rssi + ':');
    console.log('\thello my local name is:');
    console.log('\t\t' + peripheral.advertisement.localName);
    console.log('\tcan I interest you in any of the following advertised services:');
    console.log('\t\t' + JSON.stringify(peripheral.advertisement.serviceUuids));

    var serviceData = peripheral.advertisement.serviceData;
    if (serviceData && serviceData.length) {
        console.log('\there is my service data:');
        for (var i in serviceData) {
            console.log('\t\t' + JSON.stringify(serviceData[i].uuid) + ': ' + JSON.stringify(serviceData[i].data.toString('hex')));
        }
    }
    if (peripheral.advertisement.manufacturerData) {
        console.log('\there is my manufacturer data:');
        console.log('\t\t' + JSON.stringify(peripheral.advertisement.manufacturerData.toString('hex')));
    }
    if (peripheral.advertisement.txPowerLevel !== undefined) {
        console.log('\tmy TX power level is:');
        console.log('\t\t' + peripheral.advertisement.txPowerLevel);
    }

    console.log();

    explore(peripheral);
});

function explore(peripheral) {
    console.log('services and characteristics:');

    peripheral.on('disconnect', function() {
        process.exit(0);
    });

    peripheral.connect(function(error) {
        assert.ifError(error)
        peripheral.discoverServices([], function(error, services) {
            assert.ifError(error)

            var serviceIndex = 0;

            async.whilst(
                function () {
                    return (serviceIndex < services.length);
                },
                function(callback) {
                    var service = services[serviceIndex];
                    var serviceInfo = service.uuid;

                    if (service.name) {
                        serviceInfo += ' (' + service.name + ')';
                    }
                    console.log(serviceInfo);

                    service.discoverCharacteristics([], function(error, characteristics) {
                        assert.ifError(error)
                        var characteristicIndex = 0;

                        async.whilst(
                            function () {
                                return (characteristicIndex < characteristics.length);
                            },
                            function(callback) {
                                var characteristic = characteristics[characteristicIndex];
                                var characteristicInfo = '  ' + characteristic.uuid;

                                if (characteristic.name) {
                                    characteristicInfo += ' (' + characteristic.name + ')';
                                }

                                async.series([
                                    function(callback) {
                                        characteristic.discoverDescriptors(function(error, descriptors) {
                                            assert.ifError(error)
                                            async.detect(
                                                descriptors,
                                                function(descriptor, callback) {
                                                    if (descriptor.uuid === '2901') {
                                                        return callback(descriptor);
                                                    } else {
                                                        return callback();
                                                    }
                                                },
                                                function(userDescriptionDescriptor){
                                                    if (userDescriptionDescriptor) {
                                                        userDescriptionDescriptor.readValue(function(error, data) {
                                                            assert.ifError(error)
                                                            if (data) {
                                                                characteristicInfo += ' (' + data.toString() + ')';
                                                            }
                                                            callback();
                                                        });
                                                    } else {
                                                        callback();
                                                    }
                                                }
                                            );
                                        });
                                    },
                                    function(callback) {
                                        characteristicInfo += '\n    properties  ' + characteristic.properties.join(', ');

                                        if (characteristic.properties.indexOf('read') !== -1) {
                                            characteristic.read(function(error, data) {
                                                if (data) {
                                                    var string = data.toString('ascii');

                                                    characteristicInfo += '\n    value       ' + data.toString('hex') + ' | \'' + string + '\'';
                                                }
                                                callback();
                                            });
                                        } else {
                                            callback();
                                        }
                                    },
                                    function() {
                                        console.log(characteristicInfo);
                                        characteristicIndex++;
                                        callback();
                                    }
                                ]);
                            },
                            function(error) {
                                assert.ifError(error)
                                serviceIndex++;
                                callback();
                            }
                        );
                    });
                },
                function (err) {
                    assert.ifError(err)
                    peripheral.disconnect();
                }
            );
        });
    });
}