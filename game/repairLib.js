function findAccessibleStructure(creep)
{
    var structures = creep.room.find(FIND_MY_STRUCTURES);
    var found = false;
    var i = 0;
    while(!found) {
        var structure = structures[i];
        var path = creep.room.findPath(creep.pos, structure.pos);
        if(path.length > 0) {
            var pathSpec = Room.serializePath(path);
            creep.memory.structId = structure.id;
            creep.memory.pathToStructure = pathSpec;
            return 0;
        }
    }
    creep.memory.structId = undefined;
    creep.memory.pathToStructure = undefined;
    return 1;
}

module.exports = {
    harvest: function(creep)
    {
        var err = 0;
        if(!creep.memory.structId) {
            creep.say('finding');
            err = findAccessibleStructure(creep);
        }
        if(!err) {
            var structure = Game.getObjectById(creep.memory.structId);
            if(creep.harvest(structure) == ERR_NOT_IN_RANGE) {
                var path = Room.deserializePath(creep.memory.pathToStructure);
                var err = creep.moveByPath(path);
                if(err == ERR_NOT_FOUND) {
                    path = creep.room.findPath(creep.pos, structure.pos);
                    creep.memory.pathToStructure = Room.serializePath(path);
                    err = creep.moveByPath(path);
                }
            }
        }
        else {
            creep.say('no source');
        }
    }
};
