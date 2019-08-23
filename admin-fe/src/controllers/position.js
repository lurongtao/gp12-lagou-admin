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
    success(result) {
      if (result.ret) {
        res.go('/position?_=' + new Date().getTime())
      }
    }
  })
}

function loadData(pageNo, res) {
  let start = pageNo * COUNT
  $.ajax({
    url: '/api/position/list',
    data: {
      start,
      count: COUNT
    },
    success(result) {
      if (result.ret) {
        res.render(positionListView({
          ...result.data,
          pageNo,
          pageCount: _.range(Math.ceil(result.data.total / COUNT))
        }))
      } else {
        res.go('/')
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
      // console.log($(this).attr('data-index'))
      loadData($(this).attr('data-index'), res)
    })
  },

  add(req, res) {
    res.render(positionAddView({}))

    $('#posback').on('click', () => {
      res.back()
    })

    $('#possubmit').on('click', () => {
      let data = $('#possave').serialize()
      $.ajax({
        url: '/api/position/save',
        type: 'POST',
        data,
        success(result) {
          if (result.ret) {
            res.back()
          } else {
            alert(result.data.msg)
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
      success(result) {
        res.render(positionEditView(result.data))

        $('#posback').on('click', () => {
          res.back()
        })

        $('#possubmit').on('click', () => {
          let data = $('#posedit').serialize()
          $.ajax({
            url: '/api/position/put',
            type: 'PUT',
            data: data + '&id=' + req.body.id,
            success(result) {
              if (result.ret) {
                res.back()
              } else {
                alert(result.data.msg)
              }
            }
          })
        })
      }
    })
    
  }
}