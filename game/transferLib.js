/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('transferLib');
 * mod.thing == 'a thing'; // true
 */

function validTarget(target)
{
    return target.energy < target.energyCapacity;
}

function findTarget(creep)
{
    var target = undefined;
    if(creep.memory.targetId) {
        target = Game.getObjectById(creep.memory.targetId);
        if(!validTarget(target)) {
            target = undefined;
            creep.memory.targetId = undefined;
        }
    }
    if(!target) {
        var targets = creep.room.find(FIND_MY_STRUCTURES);
        var i = 0;
        while(i < targets.length) {
            target = targets[i];
            if(validTarget(target))
            {
                creep.memory.targetId = target.id;
                return target;
            }
            i++;
        }
        return undefined;
    }
    else {
        return target;
    }
}

module.exports = {
    transfer: function(creep)
    {
        var target = findTarget(creep);
        if(target) {
            if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
            }
        }
        else {
            creep.say('no valid target');
        }
    }
};
