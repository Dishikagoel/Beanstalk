const express = require('express');

const app = express();

app.use(
    express.static(
        'static',
        {
            // maxAge: 3600000
        }
    )
);

app.get(
    '*',
    (
        req,
        res
    ) => {
        res.sendFile(__dirname + '/index.html');
        return;
    }
);

app.listen(8000);