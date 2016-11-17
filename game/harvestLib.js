function findAccessibleSource(creep)
{
    var sources = creep.room.find(FIND_SOURCES);
    var found = false;
    var i = 0;
    while(!found) {
        var source = sources[i];
        var path = creep.room.findPath(creep.pos, source.pos);
        if(path.length > 0) {
            var pathSpec = Room.serializePath(path);
            creep.memory.sourceId = source.id;
            creep.memory.pathToSource = pathSpec;
            return 0;
        }
    }
    creep.memory.sourceId = undefined;
    creep.memory.pathToSource = undefined;
    return 1;
}

function harvestLib()
{
    this.harvest = function(creep)
    {
        var err = 0;
        if(!creep.memory.sourceId) {
            creep.say('finding');
            err = findAccessibleSource(creep);
        }
        if(!err) {
            var source = Game.getObjectById(creep.memory.sourceId);
            if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                var path = Room.deserializePath(creep.memory.pathToSource);
                var err = creep.moveByPath(path);
                if(err == ERR_NOT_FOUND) {
                    path = creep.room.findPath(creep.pos, source.pos);
                    creep.memory.pathToSource = Room.serializePath(path);
                    err = creep.moveByPath(path);
                }
                console.log('moving '+err);
            }
        }
        else {
            console.log('error finding source to harvest '+creep);
        }
    }
}

module.exports = harvestLib;
