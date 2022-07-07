const mongoose = require('../database');

const RepositorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            require: true,
        },
        url: {
            type: String,
            require: true,
            unique: true,
        },
        userId: {
            type: String,
            require: true,
        },
    }, { timestamps: true });

const Repository = mongoose.model('Repository', RepositorySchema)

module.exports = Repository
