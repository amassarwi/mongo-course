const express = require('express'),
    engines = require('consolidate'),
    mongoClient = require('mongodb').MongoClient,
    assert = require('assert');

const app = express();

app.engine('html', engines.nunjucks);
app.set('view engine', 'html');
app.set('views', `${__dirname}/views`);

mongoClient.connect('mongodb://localhost:27017',
    (err, database) => {


        assert.equal(null, err);
        console.log('Successfully connected to MongoDB');
        const db = database.db('video');

        app.get('/', (req, res) => {

            db.collection('movies').find(({}).toArray((err, docs) => {
                res.render('movies', { 'movies': docs } );
            }));
        });

        app.use((req, res) => {
            res.sendStatus(404);
        });

        const server = app.listen(3000, () => {
            const port = server.address().port;
            console.log('Express server listening on port %s.', port);
        });
    }
);
