
var roleDict = {
    'harvester': require('role.harvester'),
    'upgrader': require('role.upgrader'),
    'builder': require('role.builder')
};

function getRoleCreeps(roleName)
{
    var result = []
    for(var i in Game.creeps) {
        var creep = Game.creeps[i];
        if(creep.memory.role == roleName) {
            result.push(creep);
        }
    }
    return result;
}

function spawnHarvester(spawn)
{
    return spawn.createCreep([WORK,CARRY,MOVE], undefined, {role: 'harvester', spawnId: spawn.id});
}

function spawnBuilder(spawn)
{
    return spawn.createCreep([WORK,CARRY,MOVE], undefined, {role: 'builder'});
}

function spawnUpgrader(spawn)
{
     return spawn.createCreep([WORK,CARRY,MOVE], undefined, {role: 'upgrader'});
}

function autoSpawn(spawn)
{
    var harvesters = getRoleCreeps('harvester');
    if(harvesters.length < 5) {
        spawnHarvester(spawn);
    }
    var builders = getRoleCreeps('builder');
    if(builders.length < 2) {
        spawnBuilder(spawn);
    }
    var upgraders = getRoleCreeps('upgrader');
    if(upgraders.length < 2) {
        spawnUpgrader(spawn);
    }
}

module.exports.loop = function () {
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        var role = roleDict[creep.memory.role];
        role.run(creep);
    }
    autoSpawn(Game.spawns.s1);
}
