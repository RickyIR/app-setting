module.exports = {
    default: {
        url: '',
        methods: require('./paths/default.user.path')
    },
    author: {
        url: 'author',
        methods: require('./paths/author.user.path')
    }
}