import userView from '../views/user.art'

let _url = ''
let _type = ''
export default {
  render() {
    // userView是loader返回的函数
    // 此函数既可以用于路由的模板渲染（在res.render(userView(req, res), data)）
    // 又可以用于直接返回字符串（userView(data)）
    let html = userView({
      isSignin: false
    })

    $('.user-menu').html(html)
    this.bindEventToBtn()
  },

  bindEventToBtn() {
    $('.hidden-xs').on('click', function() {
      _type = $(this).attr('id')
      _url = _type === 'btn-signin' ? '/api/users/signin' : '/api/users/signup'
      $('input').val('')
    })

    $('#btn-submit').on('click', () => {
      let data = $('#user-form').serialize()
      $.ajax({
        url: _url,
        type: 'POST',
        data,
        success(result) {
          if (_type === 'btn-signin') {
            if (result.ret) {
              let html = userView({
                isSignin: true,
                username: result.data.username
              })
          
              $('.user-menu').html(html)
            } else {
              alert(result.data.msg)
            }
          } else {
            if (result.ret) {
              alert('注册成功，可以登录了')
            } else {
              alert(result.data.msg)
            }
          }
        }
      })
    })
  }
}