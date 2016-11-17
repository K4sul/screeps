/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.harvester');
 * mod.thing == 'a thing'; // true
 */

var harvestLib = require('harvestLib');

module.exports = {
    run: function(creep) {
        var spawn = Game.getObjectById(creep.memory.spawnId);

        if(creep.carry.energy < creep.carryCapacity) {
            harvestLib.harvest(creep);
        }
        else if(spawn.energy < spawn.energyCapacity) {
            if(creep.transfer(spawn, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(spawn);
            }
        }
    }
};
