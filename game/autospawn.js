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
     return spawn.createCreep([WORK,CARRY,MOVE], undefined, {role: 'upgrader', spawnId: spawn.id});
}

module.exports.autoSpawn = function (spawn)
{
    var harvesters = getRoleCreeps('harvester');
    if(harvesters.length < 2) {
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
};
