import { getRouteById, getSchedulesByRoute } from '../../models/model.js';
import { monthNumberToAbbreviation } from '../../includes/helpers.js';

export default async (req, res) => {
    const { routeId } = req.params;
    const details = await getRouteById(routeId);
    details.schedules = await getSchedulesByRoute(routeId);

    // Convert month numbers to abbreviations
    if (details.operatingMonths) {
        details.operatingMonths = details.operatingMonths.map(month => monthNumberToAbbreviation(month));
    }

    // TODO: getCompleteRouteDetails instead

    res.render('routes/details', { 
        title: 'Route Details',
        details
    });
};