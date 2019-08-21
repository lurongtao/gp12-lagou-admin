import positionView from '../views/position.art'

export default {
  render(req, res, next) {
    res.render(positionView(req))
  }
}