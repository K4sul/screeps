/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.builder');
 * mod.thing == 'a thing'; // true
 */

function build(creep)
{
    var structs = creep.room.find(FIND_MY_CONSTRUCTION_SITES);
    if(creep.build(structs[0]) == ERR_NOT_IN_RANGE) {
        creep.moveTo(structs[0]);
    }
}

module.exports = {
    run: function(creep) {
        if(creep.memory.harvesting && creep.carry.energy == creep.carryCapacity) {
            creep.memory.harvesting = false;
        }
        else if (!creep.memory.harvesting && creep.carry.energy == 0) {
            creep.memory.harvesting = true;
        }


        if(creep.memory.harvesting) {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0]);
            }
        }
        else {
           build(creep);
        }
    }
};
