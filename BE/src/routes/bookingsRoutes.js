import express from 'express';
import authentication from '../middleware/authentication';
import {
    addBooking,
    viewBookings,
    viewBooking
} from '../controllers/bookingsController';


const router = express.Router();

router.get(`/bookings`, authentication('read'), viewBookings);
router.get(`/bookings/:id`, authentication('read') ,viewBooking);
router.post('/booking', authentication('write') ,addBooking);


export default router;