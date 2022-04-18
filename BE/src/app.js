import bodyParser from 'body-parser';
import express from 'express';
import cors from 'cors';

const app = express();

const bookings = [];

export const initializeApp = () => {

    const app = express();
    // app.use(bodyParser.urlencoded({
    //     extended: true
    // }));

    app.use(cors())
    app.use(bodyParser.json());

    app.get('/', (req, res) => res.send(req.headers)

    );

    app.post('/bookings', (req, res) => addBooking(req, res));


    app.get('/bookings', (req, res) => res.send(bookings));


    app.get('/bookings/:id', (req, res) => getBooking(req, res));

    app.put('/bookings/:id', (req, res) => updateBooking(req, res));

    app.delete('/bookings/:id', (req, res) => deleteBooking(req, res));


    // app.use((req, res) => {
    //     res.status(StatusCodes.NOT_FOUND).send({
    //         message: ReasonPhrases.NOT_FOUND,
    //         statusCode: StatusCodes.NOT_FOUND,
    //     });
    // });
    // app.use(_logErrors);
    // app.use(_errorHandler);

    console.log('App successfully bootstrapped');

    return app;
}

function deleteBooking(req, res) {
    const id = req.params.id;

    const index = bookings.findIndex(booking => booking.id == id);

    const deleted = bookings.splice(index, 1);
    res.send(deleted);

}
function updateBooking(req, res) {
    const id = req.params.id;

    const bookingNou = req.body;

    const index = bookings.findIndex(booking => booking.id == id);

    bookings[index] = bookingNou;

    res.send(bookings[index]);

}
function getBooking(req, res) {
    const id = req.params.id;
    console.log(id)
    const booking = bookings.find(booking => booking.id == id)
    if (booking) {
        res.send(booking);

    } else {
        res.sendStatus(404)
    }
}

function addBooking(req, res) {

    const booking = req.body;
    const id = req.body.id;

    if (id) {
        bookings.push(booking);
        res.send(booking);
    } else {
        res.sendStatus(404);
    }

}