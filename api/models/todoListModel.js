var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var autoIncrement = require('mongoose-auto-increment');

var connection = mongoose.createConnection("mongodb://localhost/Tododb");
autoIncrement.initialize(connection);

var TaskSchema = new Schema({
    name: {
        type: String,
        required: 'Kindly enter the name of the task'
    },
    creation_date: {
        type: Date,
        default: Date.now
    },
    status: {
        type: [{
            type: String,
            enum: ['pending', 'ongoing', 'completed']
        }],
        default: ['pending']
    }
});

TaskSchema.plugin(autoIncrement.plugin, 'id');
var id = connection.model('id', TaskSchema);

module.exports = mongoose.model('Tasks', TaskSchema);