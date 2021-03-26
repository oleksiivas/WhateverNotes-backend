const Group = require('../models/group');

exports.getAllGroups = () => {}

exports.getGroup = (req, res, next) => {
    const groupId = req.params.groupId;

    Group.findById(groupId)
        .then(group => {
            if (!group) {
                res.status(404).send({
                    response: "Group wasn't found"
                });
            }
            res.status(200).send({
                response: group
            });
        })
        .catch(err => {
            res.status(500).send({
                response: "Sorry! We faced a server error while trying to get the group."
            });
        })
};

exports.postGroup = (req, res, next) => {

    // here we will have group parameters
    const notes = req.body.notes;
    const users = req.body.users;

    const group = new Group({
        notes: notes,
        users: users,
    });
    group.save()
        .then(result => {
            res.status(201).send({
                response: "Created a group",
                data: result
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({
                Error: err.errors
            });
        });
};

exports.putGroup = (req, res, next) => {
    const groupId = req.body.groupId;
    const updatedNotes = req.body.notes;
    const updatedUsers = req.body.users;

    Group.findById(groupId)
        .then(group => {
            if (!group) {
                res.status(404).send({
                    response: "Group was not found."
                });
            }
            group.notes = updatedNotes;
            group.users = updatedUsers;
            group.save()
                .then(result => {
                    res.status(200).send({
                        response: "Successfully updated the group",
                        data: result
                    });
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).send({
                        error: "Couldn't save the group to be updated"
                    });
                });
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({
                error: "There was a problem while finding a group to be updated"
            });
        });
};

exports.deleteGroup = (req, res, next) => {
    const groupId = req.body.groupId;

    Group.findByIdAndRemove(groupId)
        .then(() => {
            res.status(200).send({
                response: "Deleted the group"
            })
        })
        .catch(err => {
            res.status(500).send({
                response: "Couldn't delete the group"
            })
        })
};