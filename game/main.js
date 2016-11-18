var spawnLib = require('spawnLib');

var roleDict = {
    'harvester': require('role_harvester'),
    'upgrader': require('role_upgrader'),
    'builder': require('role_builder')
};

function cleanCreepMemory()
{
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }
}

module.exports.loop = function () {
    cleanCreepMemory();

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        var role = roleDict[creep.memory.role];
        role.run(creep);
    }
    spawnLib.autoSpawn(Game.spawns.s1);
}
