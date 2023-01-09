const express = require('express');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// on bcrypt hashing
// When a person first creates a password, only the hashed version of it is stored 
// (along with something called a ‘salt’, but we’ll skip that for this discussion).

// The next time the person logs in, the password they supply will be hashed again and 
// compared with the original hash the site stored. If they match, access is granted.

// If you supply the hash as the password, the hash itself will be hashed again, and 
// that rehash will not match. Access will not be granted.

const app = express();
const hashedPassword = '$2b$10$V32sjm5vBHJt1Uq4ERXpieszKwdxOcIpWB.UDqRkzF6VFtYg9xcV6';
const saltRounds = 15;
const secret = 'Mysupersecretsecret';

app.use(cookieParser());

app.get('/hash/:password?', async (req, res) => {
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(req.params.password, salt);

    console.log('Salt:', salt);
    console.log('hash:', hash);
    res.send(hash);
});

// mysecretpassword is the right password
app.get('/login/:password', async (req, res) => {
    const isValidPassword = await bcrypt.compare(req.params.password, hashedPassword);

    if (isValidPassword) {
        const payload = {
            username: 'Pesho'
        };
        const options = { expiresIn: '2d' };
        const token = jwt.sign(payload, secret, options);

        res.send(token);
    } else {
        res.send('Invalid Password');
    }
});

//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlBlc2hvIiwiaWF0IjoxNjU0NTM2NzY1LCJleHAiOjE2NTQ3MDk1NjV9.IpwOKCkBcebrYctYY1aXJb8NwF4GIpWRcusruE_08ME
app.get('/verify/:token', (req, res) => {
    jwt.verify(req.params.token, secret, (err, decodedToken) => {
        if (err) {
            return res.status(401).send('You don\'t have permissions')
        }

        res.json(decodedToken);
    });
})

app.listen(5000, () => console.log('Server is listening on port 5000...'));
