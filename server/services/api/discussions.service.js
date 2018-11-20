const DiscussionsModel = require('./../../models/Discussion.model').model;
const ObjectId = require('mongodb').ObjectId;

module.exports.getDiscussionsByGroupId = async(discussions_group_id) => {
    try {
        if (!discussions_group_id){
            throw Error('discussions_group_id is not defined');
        }

        if (!ObjectId.isValid(discussions_group_id)){
            throw Error('discussions_group_id is not valid');
        }

        let discussions = await DiscussionsModel.aggregate([
            {
                "$match": {
                    "discussions_group": ObjectId(discussions_group_id)
                }
            },
            {
                "$lookup": {
                    from: "users",
                    localField: "user",
                    foreignField: "_id",
                    as: "user"
                  }
            },
            {
                $addFields: {
                    "user": {
                        $arrayElemAt: ["$user",0]
                    },
                }
            },
        ]);

        if (!discussions || !discussions.length){
            return false;
        }

        return discussions;
    }catch(e){
        throw Error(e.message);
    }
}