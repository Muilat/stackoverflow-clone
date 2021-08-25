const express = require('express');
const docsRoute = require('./docs.route');
const authRoute = require('./auth.route');
const tagRoute = require('./tag.route');
const questionRoute = require('./question.route');
const config = require('../../config/config');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/tags',
    route: tagRoute,
  },
  {
    path: '/questions',
    route: questionRoute,
  },
];

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* routes to made available only in development */
if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
