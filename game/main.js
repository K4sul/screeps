var spawnLib = require('spawnLib');

var roleDict = {
    'harvester': require('role_harvester'),
    'upgrader': require('role_upgrader'),
    'builder': require('role_builder')
};



module.exports.loop = function () {
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        var role = roleDict[creep.memory.role];
        role.run(creep);
    }
    spawnLib.autoSpawn(Game.spawns.s1);
}
