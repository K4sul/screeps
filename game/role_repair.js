/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.harvester');
 * mod.thing == 'a thing'; // true
 */

var harvestLib = require('harvestLib');
var repairLib = require('repairLib');

module.exports = {
    run: function(creep) {
        var spawn = Game.getObjectById(creep.memory.spawnId);

        if(creep.carry.energy < creep.carryCapacity) {
            harvestLib.harvest(creep);
        }
        else {
            repairLib.repair(creep);
        }
    }
};
