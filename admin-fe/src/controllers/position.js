import positionListView from '../views/position-list.art'
import positionAddView from '../views/position-add.art'
import positionEditView from '../views/position-edit.art'
import _ from 'lodash'

const COUNT = 5

function remove(id, res) {
  $.ajax({
    url: '/api/position/delete',
    type: 'DELETE',
    data: {
      id
    },
    headers: {
      'x-access-token': localStorage.getItem('x-access-token')
    },
    success(result) {
      if (result.ret) {
        // res.go('/position?_=' + new Date().getTime())
        loadData(res.pageNo, res)
      }
    }
  })
}

function loadData(pageNo, res) {
  let start = pageNo * COUNT
  res.pageNo = pageNo
  $.ajax({
    url: '/api/position/list',
    data: {
      start,
      count: COUNT
    },
    headers: {
      'x-access-token': localStorage.getItem('x-access-token')
    },
    success(result) {
      if (result.ret) {
        // 当不是第一页 且 本页数据删除完毕时
        if (result.data.list.length === 0 && pageNo !== 0) {
          pageNo--
          loadData(pageNo, res)
        }

        res.render(positionListView({
          ...result.data,
          showPage: true,
          pageNo,
          pageCount: _.range(Math.ceil(result.data.total / COUNT))
        }))
      } else {
        res.go('/home')
      }
    }
  })
}

export default {
  render(req, res) {
    loadData(0, res)

    $('#router-view').on('click', '#addbtn' ,() => {
      res.go('/position_add')
    })

    $('#router-view').on('click', '.btn-update' ,function() {
      res.go('/position_edit', {
        id: $(this).attr('data-id')
      })
    })

    $('#router-view').on('click', '.btn-delete', function() {
      remove($(this).attr('data-id'), res)
    })

    $('#router-view').on('click', '#page li[data-index]', function() {
      loadData(~~$(this).attr('data-index'), res)
    })

    $('#router-view').on('click', '#prev', function() {
      let currIndex = $('#page li[class="active"]').attr('data-index')
      let index = ~~currIndex - 1
      if (index > -1) {
        loadData(index, res)
      }
    })

    $('#router-view').on('click', '#next', function() {
      let currIndex = $('#page li[class="active"]').attr('data-index')
      let index = ~~currIndex + 1
      if (index < ~~$(this).attr('data-pagecount')) {
        loadData(index, res)
      }
    })

    $('#router-view').on('click', '#possearch', function() {
      let keywords = $('#keywords').val()
      $.ajax({
        url: '/api/position/search',
        type: 'post',
        data: {
          keywords
        },
        success(result) {
          if (result.ret) {
            res.render(positionListView({
              ...result.data,
              showPage: false
            }))
          }
        }
      })
    })
  },

  add(req, res) {
    res.render(positionAddView({}))

    $('#posback').on('click', () => {
      res.back()
    })

    $('#possubmit').on('click', () => {
      $('#possave').ajaxSubmit({
        url: '/api/position/save',
        type: 'POST',
        headers: {
          'x-access-token': localStorage.getItem('x-access-token')
        },
        clearForm: true,
        success(result) {
          if (result.ret) {
            res.back()
          } else {
            // alert(result.data.msg)
          }
        }
      })
    })
  },

  edit(req, res) {
    $.ajax({
      url: '/api/position/findone',
      type: 'POST',
      data: {
        id: req.body.id,
      },
      headers: {
        'x-access-token': localStorage.getItem('x-access-token')
      },
      success(result) {
        res.render(positionEditView(result.data))

        $('#posback').on('click', () => {
          res.back()
        })

        $('#possubmit').on('click', () => {
          $('#posedit').ajaxSubmit({
            url: '/api/position/patch',
            type: 'PATCH',
            headers: {
              'x-access-token': localStorage.getItem('x-access-token')
            },
            success(result) {
              if (result.ret) {
                res.back()
              } else {
                // alert(result.data.msg)
              }
            }
          })
        })
      }
    })
    
  }
}