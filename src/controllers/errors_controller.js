exports.get404 = (req, res, next) => {
  res.status(404).render('errors/page_not_found', { path: '/404', message: '' });
}