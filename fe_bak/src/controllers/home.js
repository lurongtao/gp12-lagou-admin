import homeView from '../views/home.art'

export default {
  render(req, res, next) {
    res.render(homeView(req))
  }
}