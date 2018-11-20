module.exports = {
    default: {
        url: '',
        methods: require('./paths/default.workshop.path')
    },
    index: {
        url: ':workshop_id',
        methods: require('./paths/index.workshop.path')
    },
    similar: {
        url: ':workshop_id/similar',
        methods: require('./paths/similar.workshop.path')
    }
}