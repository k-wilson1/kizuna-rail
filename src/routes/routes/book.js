import { createConfirmation, getScheduleById, getTicketOptionsForRoute } from '../../models/model.js';
import  { yenToUsd } from '../../includes/helpers.js';

const bookingPage = async (req, res) => {
    const { scheduleId } = req.params;

    const schedule = await getScheduleById(scheduleId);
    const ticketOptions = await getTicketOptionsForRoute(schedule.routeId, scheduleId);

    const priceUSD = yenToUsd(schedule.price);

    const ticketOptionsUSD = ticketOptions.map(option => ({
        ...option,
        priceUSD: yenToUsd(option.price).toFixed(2)
    }));

    res.render('routes/book', {
        title: 'Book Trip',
        schedule: {
            ...schedule,
            priceUSD: priceUSD.toFixed(2),
            originalPriceYen: schedule.price
        },
        ticketOptions: ticketOptionsUSD,
        route: schedule.route
    });
};

const processBookingRequest = async (req, res) => {
    const data = req.body;

    const confirmationNum = await createConfirmation(data);

    res.redirect(`/routes/confirmation/${confirmationNum}`);
};



export { bookingPage, processBookingRequest};