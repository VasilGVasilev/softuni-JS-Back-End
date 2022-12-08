const { IncomingForm } = require('formidable');
const { html, data } = require('../util');


function catalogPage(req, res) {
    res.write(html(`
    <h1>Catalog</h1>
    <p>List of items</p>
    <ul>
        ${data.map(i => `<li data-id=${i.id}>${i.name} - ${i.color}</li>`).join('\n')}
    </ul>`, 'Catalog')); //not optmised as lit-html and to avoid , due to iterating with .map() use join('\n')
    res.end();
}

function createPage(req, res) {
    res.write(html(`
    <h1>Create Item</h1>
    <form method="POST" action="/create">
        <label>Name: <input type="text" name="name"></label>
        <label>Color: <select name="color">
                <option value="red">Red</options>
                <option value="green">Green</options>
                <option value="blue">Blue</options>
            </select>
        </label>
        <input type="submit" value="Create">
    </form>`, 'Create New Item'));
    res.end(); // the default form action would be get and e.preventDefault() results in need for us to update it to <form method="POST" action="/create"></form>
}

function createItem(req, res) {
    // handle POST request
    console.log('create request');

    const form = new IncomingForm();
    form.parse(req, (err, fields) => {
        const item = {
            id: 'asdf' + ('0000' + (Math.random() * 9999 | 0)).slice(-4),
            name: fields.name,
            color: fields.color
        };

        data.push(item);

        res.writeHead(301, [
            'Location',
            '/catalog'
        ]);
        res.end();
    });
}

module.exports = {
    catalogPage,
    createPage,
    createItem
};