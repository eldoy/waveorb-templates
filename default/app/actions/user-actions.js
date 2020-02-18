const actions = {}

actions.createUser = {
  validate: {
    data: {
      email: {
        is: '$email'
      },
      password: {
        minlength: 8
      }
    }
  },
  main: async function($) {
    let { email, password } = $.params.data
    const count = await $.app.db('user').count({ email })
    if (count) {
      throw Error($.t('actions.login.create_user.user_already_exists'))
    }
    password = $.tools.hash(password)
    const user = await $.app.db('user').create({ email, password })
    const token = $.tools.uuid()
    await $.app.db('session').create({ user_id: user._id, token })
    $.app.mailer('signup-mail', {}, $, {})
    return { token }
  }
}

actions.fetchUser = {
  filters: ['authenticate'],
  main: async function($) {
    const { _id, email } = $.user
    return { _id, email }
  }
}

actions.updateUserEmail = {
  filters: ['authenticate'],
  validate: {
    data: {
      email: {
        is: '$email'
      }
    }
  },
  main: async function($) {
    let { email } = $.params.data
    if (email !== $.user.email) {
      const count = await $.app.db('user').count({ email })
      if (count) {
        throw Error($.t('actions.user.update_user_email.email_taken'))
      }
      return await $.app.db('user').update({ _id: $.user._id }, { email })
    }
  }
}

actions.updateUserPassword = {
  filters: ['authenticate'],
  validate: {
    data: {
      current: {
        minlength: 8
      },
      password: {
        minlength: 8
      }
    }
  },
  main: async function($) {
    let { current, password } = $.params.data
    if (!$.tools.compare(current, $.user.password)) {
      throw Error($.t('actions.user.update_user_password.password_not_valid'))
    }
    password = $.tools.hash(password)
    return await $.app.db('user').update({ _id: $.user._id }, { password })
  }
}

actions.deleteUser = {
  filters: ['authenticate'],
  main: async function($) {
    const sites = await $.app.db('site').find({ user_id: $.user._id })
    for (const s of sites) {
      await $.app.db('site').delete({ _id: s._id })
    }
    return await $.app.db('user').delete({ email: $.user.email })
  }
}

actions.createSession = {
  validate: {
    data: {
      email: {
        is: '$email'
      },
      password: {
        minlength: 8
      }
    }
  },
  main: async function($) {
    const { email = '', password = '' } = $.params.data
    const user = await $.app.db('user').get({ email })
    if (!user) {
      throw Error($.t('actions.login.create_session.user_not_found'))
    }
    if (!$.tools.compare(password, user.password)) {
      throw Error($.t('actions.login.create_session.password_not_valid'))
    }
    const token = $.tools.uuid()
    await $.app.db('session').create({ user_id: user._id, token })
    return { token }
  }
}

actions.deleteSession = {
  validate: {
    data: {
      token: {
        minlength: 36
      }
    }
  },
  main: async function($) {
    return await $.app.db('session').delete({ token: $.params.data.token })
  }
}

actions.forgotPassword = {
  validate: {
    data: {
      email: {
        is: '$email'
      }
    }
  },
  main: async function($) {
    const { email } = $.params.data
    const user = await $.app.db('user').get({ email })
    if (!user) {
      throw Error($.t('actions.login.forgot_password.user_not_found'))
    }
    const key = $.tools.uuid()
    const time = new Date().getTime() + 15 * 6e4
    await $.app.db('reset').create({ key, user_id: user._id, time })
    return await $.app.mailer('reset-mail', { to: email }, $, { key })
  }
}

actions.resetPassword = {
  validate: {
    data: {
      key: {
        length: 36
      }
    }
  },
  main: async function($) {
    const { key } = $.params.data
    const reset = await $.app.db('reset').get({ key })
    if (!reset) {
      throw Error($.t('actions.user.reset_password.invalid'))
    }
    if (new Date().getTime() > reset.time) {
      throw Error($.t('actions.user.reset_password.expired'))
    }
    const token = $.tools.uuid()
    const session = await $.app.db('session').create({ token, user_id: reset.user_id })
    return { token }
  }
}

actions.updatePassword = {
  filters: ['authenticate'],
  validate: {
    data: {
      key: {
        length: 36
      },
      password: {
        minlength: 8
      }
    }
  },
  main: async function($) {
    const { key, password } = $.params.data
    const reset = await $.app.db('reset').get({ key })
    if (!reset) {
      throw Error($.t('actions.user.update_password.invalid'))
    }
    if (new Date().getTime() > reset.time) {
      throw Error($.t('actions.user.update_password.expired'))
    }
    await $.app.db('reset').delete({ key })
    const newpass = $.tools.hash(password)
    return await $.app.db('user').update({ _id: reset.user_id }, { password: newpass })
  }
}

module.exports = actions
