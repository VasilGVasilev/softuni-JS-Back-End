const http = require('http');
const fs = require('fs/promises');
const { renderHome } = require('./render');
// const querystring = require('querystring');
const url = require('url');

// NB const cats = require('./cats.json') CommonJS automatically parses the json into an object stored in const cats

const server = http.createServer(async (req, res) => {
    // let [pathname, qs] = req.url.split('?')
    // let params = querystring.parse(qs);
    const urlParts = url.parse(req.url);
    const relevantQuery = urlParts.query;
    res.writeHead(200, {
        'Content-Type': 'text/html'
    });

    if (req.url == '/styles/site.css') {

        res.writeHead(200, {
            'Content-Type': 'text/css' //because in the intial parsing of home.html the browser comes across <link rel="stylesheet" href="/styles/site.css"> in <head>
        }); 

        let siteCss = await fs.readFile('./styles/site.css', 'utf-8');
        res.write(siteCss);
    } else if (req.url == '/cats/add-cat') {

        let addCatPage = await fs.readFile('./views/addCat.html', 'utf-8');
        res.write(addCatPage);
        
    }  else if (req.url == '/cats/add-breed') {

        let addBreedPage = await fs.readFile('./views/addBreed.html', 'utf-8');
        res.write(addBreedPage);
        
    } else {
        let param;
        if(relevantQuery != null){
            param = relevantQuery.split('=').pop();
        }
        let homePage = await renderHome(param);
        res.write(homePage);

    }
    res.end();

    
});

server.listen(5000, () => console.log('Server is listening on port 5000...'));