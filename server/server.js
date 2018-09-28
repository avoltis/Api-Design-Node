var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var _ = require('lodash');
var morgan = require('morgan');

var lions = [];
var id = 0;

var updateId = function (req, res, next) {
  if (!req.body.id) {
    id++;
    req.body.id = id + '';
  }
  next();
};

app.use(morgan('dev'))
// express.static will serve everything 
// with in client as a static resource
// also, it will serve the index.html on the
// root of that directory on a GET to '/'
app.use(express.static('client'));

// body parser makes it possibile to post JSON to the server
// we an access data we post on as req.body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.param('id', function (req, res, next, id) {
  var lion = _.find(lions, { id: id });

  if (lion) {
    req.lion = lion;
    next();
  } else {
    res.send();
  }
});

app.get('/lions', function (req, res) {
  res.json(lions);
});

app.get('/lions/:id', function (req, res) {
  var lion = req.lion;
  res.json(lion || {});
});

app.post('/lions', updateId, function (req, res) {
  var lion = req.body;

  lions.push(lion);

  res.json(lion);
});


app.put('/lions/:id', function (req, res) {
  var update = req.body;
  if (update.id) {
    delete update.id
  }

  var lion = _.findIndex(lions, { id: req.params.id });
  if (!lions[lion]) {
    res.send();
  } else {
    var updatedLion = _.assign(lions[lion], update);
    res.json(updatedLion);
  }
});

app.delete('/lions/:id', function (req, res) {
  var lion = _.findIndex(lions, { id: req.params.id });
  if (!lions[lion]) {
    re.send();
  } else {
    var deletedLion = lions[lion];
    lions.slice(lion, 1);
    res.json(deletedLion);
    res.json
  }
});

app.use(function (err, req, res, next) {
  if (err) {
    res.status(500).send(err);
  }
});

app.listen(3000);
console.log('on port 3000');