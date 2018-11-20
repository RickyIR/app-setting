module.exports = {
    default: {
        url: '',
        methods: require('./paths/default.quiz.path')
    },
    groups: {
        url: 'groups',
        methods: require('./paths/groups.quiz.path')
    },
    index: {
        url: ':quiz_group_id',
        methods: require('./paths/index.quiz.path')
    }
}