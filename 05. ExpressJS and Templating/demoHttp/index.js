const http = require('http');

// favicon debugging like event delegation with if statement
// there is  strict protocol for HTTP response
// response.writeHead() only once!
// then
// response.write()
// then to finish 
// response.end()

const homePage = `
<h1>Home Page</h1>
<p>Welcome to our site</p>
`
const aboutPage = `
<h1>About us</h1>
<p>Contact: +1-555-1973</p>
`

const defaultPage = `
<h1>404 Not Found</h1>
<p>The resource you requested cannot be found</p>
`
const catalogPage = `
<h1>Catalog</h1>
<p>List of items</p>
`


const routes = {
    '/': homePage,
    '/about': aboutPage,
    '/catalog': catalogPage
}

const server = http.createServer((request, response)=>{
    const url = new URL(request.url, `http://${request.headers.host}`)

    const page = routes[url.pathname];

    if (page != undefined){
        response.write(html(page));
        response.end();
    } else {
        response.statusCode = 404;
        response.write(html(defaultPage));
        response.end()
    }
})

server.listen(3000)

function html(body){
    return`
    <!DOCTYPE html>
    <html lang="en">
    <body>
        <nav>
            <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/catalog">Catalog</a></li>
                <li><a href="/about">About</a></li>
            </ul>
        </nav>
        ${body}
    </body>
    </html>
    `
}