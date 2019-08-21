import userView from '../views/user.art'

let _uri = ''
let _type = ''
export default {
  async render() {
    let result = await this.isSignin()

    let html = userView({
      isSignin: result.ret,
      username: result.data.username
    })

    $('#user-menu').html(html)

    this.bindEvent()
  },

  isSignin() {
    return $.ajax({
      url: '/api/users/isSignin',
      dataType: 'json',
      success(result) {
        return result
      }
    })
  },

  bindEvent() {
    $('#user-menu span').on('click', function() {
      _uri = $(this).attr('id') === 'btn-signup' ? '/api/users/signup' : '/api/users/signin'
      _type = $(this).attr('id')
      $('#user-form input').val('')
    })

    $('#btn-submit').on('click', () => {
      let data = $('#user-form').serialize()

      $.ajax({
        url: _uri,
        type: 'POST',
        data,
        success: this.bindEventSucc.bind(this),
        error: this.bindEventErr.bind(this)
      })
    })

    $('#btn-signout').on('click', () => {
      $.ajax({
        url: '/api/users/signout',
        success: this.bindEventSucc.bind(this),
        error: this.bindEventErr.bind(this)
      })
    })
  },

  bindEventErr() {
    
  },

  bindEventSucc(result) {
    if (_type === 'btn-signup') {
      alert(result.data.msg)
    } else if (_type === 'btn-signin') {
      if (result.ret) {
        let html = userView({
          isSignin: true,
          username: result.data.username
        })
    
        $('#user-menu').html(html)
      } else {
        alert(result.data.msg)
      }
    } else {
      location.reload() 
    }
  }
}