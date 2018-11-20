module.exports = {
    default: {
        url: '',
        methods: require('./paths/default.discussion.path')
    },
    index: {
        url: ':discussions_group_id',
        methods: require('./paths/index.discussion.path')
    }
}