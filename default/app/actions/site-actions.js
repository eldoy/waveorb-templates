/** Site routes */
module.exports = {
  loadSiteList: {
    filters: ['authenticate'],
    main: async function($) {
      return await $.app.db('site').find({ user_id: $.user._id }, { sort: { _id: -1 } })
    }
  },

  createSite: {
    filters: ['authenticate'],
    validate: {
      data: {
        name: {
          minlength: 3
        }
      }
    },
    main: async function($) {
      const result = await $.app.db('site').create({ name: $.params.data.name, user_id: $.user._id })
      return { ...result, name: $.params.data.name }
    }
  },

  getSite: {
    filters: ['authenticate'],
    validate: {
      data: {
        _id: {
          is: '$id'
        }
      }
    },
    main: async function($) {
      return await $.app.db('site').get({ _id: $.params.data._id, user_id: $.user._id })
    }
  },

  deleteSite: {
    filters: ['authenticate'],
    validate: {
      data: {
        _id: {
          is: '$id'
        }
      }
    },
    main: async function($) {
      return await $.app.db('site').delete({ _id: $.params.data._id, user_id: $.user._id })
    }
  },

  updateSite: {
    filters: ['authenticate'],
    validate: {
      data: {
        _id: {
          is: '$id'
        },
        name: {
          minlength: 3
        }
      }
    },
    main: async function($) {
      return await $.app.db('site').update({ _id: $.params.data._id, user_id: $.user._id }, { name: $.params.data.name })
    }
  }
}
