

const requestBus = (req, res) => {
    const url = req.url;
    const method = req.method;
    if (url === '/') {
        res.setHeader('Content-Type', 'text/html');
        res.write(`<html>`);
        res.write(`<head><title>Enter Usernam</title></head>`);
        res.write(`<body>
                    <h1>Hello there!</h1>
                    <form action="/create-user" method="POST"><input type="text" name="username"><button type="submit">Submit</button></input></form>
                </body>`);
        res.write(`</html>`);
        return res.end();
    }
    if (url === '/users') {
        res.write(`<html>
                    <head><title>List of Users</title></head>
                    <body>
                        <ul>
                            <li>Joe</li>
                            <li>Havica</li>
                            <li>Supero</li>
                            <li>Awecool</li>
                        </ul>
                    </body>
                </html>`);
        return res.end();
    }
    if (url === '/create-user' && method === 'POST') {
        const body = [];
        req.on('data', (info) => {
            console.log(info);
            body.push(info);
        });
        req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const username = parsedBody.split('=') [1];
            console.log(username);
        });
        res.statusCode = 302;
        res.setHeader('Location', '/');
        res.end();
    }
}

exports.handler = requestBus;