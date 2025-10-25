import { getAllRoutes, getListOfRegions, getListOfSeasons } from '../../models/model.js';

export default async (req, res) => {
    const regions = await getListOfRegions();
    let routes = await getAllRoutes();
    const seasons = await getListOfSeasons();

    // Get query parameters for filtering
    const { region, season } = req.query;

    // Filter by region if provided
    if (region && region !== 'all') {
        routes = routes.filter(route => route.region === region);
    }

    // Filter by season if provided
    if (season && season !== 'all') {
        routes = routes.filter(route => route.bestSeason === season);
    }

    res.render('routes/list', { 
        title: 'Scenic Train Routes',
        regions,
        routes,
        seasons,
        query: { region, season }
    });
};