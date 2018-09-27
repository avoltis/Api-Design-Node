const express = require('express');
const app = express();

var jsonDAta = { count: 12, message: "hey" };

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html", function (err) {
        if (err) {
            res.status(500).send(err);
        }
    })
});

app.get("/data", function (req, res) {
    res.json(jsonDAta);
});

app.listen(3000, () => {
    console.log('HTTP server listening on port 3000');
});
