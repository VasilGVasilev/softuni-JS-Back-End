const http = require('http');
const fs = require('fs/promises');
const { renderHome } = require('./handlers/renderHome');
// const querystring = require('querystring');
const url = require('url');
const { renderAddBreed } = require('./handlers/renderAddBreed');
const { renderAddCat } = require('./handlers/renderAddCat');
const updateBreed = require('./dataManipulation/updateBreed');

// NB const cats = require('./cats.json') CommonJS automatically parses the json into an object stored in const cats

const server = http.createServer(async (req, res) => {
    // let [pathname, qs] = req.url.split('?')
    // let params = querystring.parse(qs);
    const relevantPathname = url.parse(req.url).pathname
    const relevantQuery = url.parse(req.url).query;


    let param;
    res.writeHead(200, {
        'Content-Type': 'text/html'
    });

    if (req.url == '/styles/site.css') {

        res.writeHead(200, {
            'Content-Type': 'text/css' //because in the intial parsing of home.html the browser comes across <link rel="stylesheet" href="/styles/site.css"> in <head>
        }); 

        let siteCss = await fs.readFile('./styles/site.css', 'utf-8');
        res.write(siteCss);
    } else if (relevantPathname == '/cats/add-cat') {

        let addCatPage = await renderAddCat();
        res.write(addCatPage);
        
    } else if (relevantPathname == '/cats/add-breed') {
        
        if(relevantQuery != null) {
            param = relevantQuery.split('=').pop();
            await updateBreed(param)

        } 
        let addBreedPage = await renderAddBreed();
        res.write(addBreedPage)
    }
    else {
        
        if(relevantQuery != null){
            param = relevantQuery.split('=').pop();
        }
        let homePage = await renderHome(param);
        res.write(homePage);

    }
    res.end();

    
});

server.listen(5000, () => console.log('Server is listening on port 5000...'));