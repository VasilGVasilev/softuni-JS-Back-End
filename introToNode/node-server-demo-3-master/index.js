// initialize, no decision-making

const http = require('http');
const router = require('./router');
const { catalogPage, createPage, createItem } = require('./controllers/catalogController');
const { homePage, aboutPage, defaultPage } = require('./controllers/homeController');


router.get('/', homePage);
router.get('/catalog', catalogPage);
router.get('/create', createPage);
router.get('/about', aboutPage);
router.post('/create', createItem);
router.get('default', defaultPage); //does not follow blob pattern so it can be anything not * specifically

// all routes are registered in router object up to this point in execution

const server = http.createServer(router.match);

server.listen(3000);