import { getAllRoutes, getListOfRegions, getListOfSeasons } from '../../models/model.js';

export default async (req, res) => {
    const selectedRegion = req.query.region || 'all';
    const selectedSeason = req.query.season || 'all';
    
    const regions = await getListOfRegions();
    const seasons = await getListOfSeasons();

    let routes = await getAllRoutes();
    if (selectedSeason !== 'all') {
        routes = routes.filter(route => route.bestSeason === selectedSeason);
    }
    if (selectedRegion !== 'all') {
        // Try logging to see if this is even running
        routes = routes.filter(route => route.region === selectedRegion);
    }

    res.render('routes/list', { 
        title: 'Scenic Train Routes',
        regions,
        routes,
        seasons,
        selectedRegion,
        selectedSeason
    });
};