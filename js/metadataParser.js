(function() {

var LevelYamlType = new jsyaml.Type("tag:crispbit.com,2017:iamsynth/levelmeta", {

    kind: "mapping",
    instanceOf: Level,

    resolve: function(data) {
        return "name" in data
            && "levelfile" in data
            && "spritesheet" in data
            && "background" in data
            && "events" in data;
    },

    construct: function(data) {
        var level = new Level();
        level.spritesheet = data.spritesheet;
        level.bg = data.background;
        level.levelfile = data.levelfile;
        return level;
    },

    represent: function(level) {
        return {
            name: level.name,
            levelfile: level.levelfile,
            spritesheet: level.spritesheet,
            background: level.bg,
            events: [] // TODO
        };
    }
});

var SpritesheetYamlType = new jsyaml.Type("tag:crispbit.com,2017:iamsynth/spritesheet", {

    kind: "mapping",
    instanceOf: Spritesheet,

    resolve: function(data) {
        return "image" in data
            && "spriteWidth" in data
            && "spriteHeight" in data
            && "rows" in data
            && "columns" in data;
    },

    construct: function(data) {
        return new Spritesheet(
            undefined,
            data.rows,
            data.columns,
            data.spriteWidth,
            data.spriteHeight);
    },

    represent: function(ss) {
        return {
            image: "UNSPECIFIED.png", // TODO
            spriteWidth: ss.spriteWidth,
            spriteHeight: ss.spriteHeight,
            rows: ss.rows,
            columns: ss.columns
        };
    }
});

var EventYamlType = new jsyaml.Type("tag:crispbit.com,2017:iamsynth/event", {

    kind: "mapping",
    instanceOf: Event,

    resolve: function(data) {
        return "type" in data
            && "atX" in data
            && "atY" in data
            && "text" in data;
    },

    construct: function(data) {
        return data; // TODO
    },

    represent: function(ss) {
        return ss; // TODO
    }
});

var TextYamlType = new jsyaml.Type("tag:crispbit.com,2017:iamsynth/text", {

    kind: "mapping",
    instanceOf: Text,

    resolve: function(data) {
        return "str" in data;
    },

    construct: function(data) {
        return data; // TODO
    },

    represent: function(text) {
        return text; // TODO
    }
});

var LEVEL_SCHEMA = jsyaml.Schema.create(
    [LevelYamlType, SpritesheetYamlType, EventYamlType, TextYamlType]);

window.parseMetadata = function(str) {
    return jsyaml.safeLoad(str, { schema: LEVEL_SCHEMA });
};


})();
