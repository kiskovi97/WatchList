import { fetchDataById } from './dynamoService';
import { getShowById } from './tvmaze.js';

export const fetchShowById = async (id) => {
        if (!id) return { show: undefined, watchData: undefined };

        var data = await getShowById(id);

        if (!data) return { show: data, watchData: undefined };


        var watchDataResult = await fetchDataById(data.id);

        if (watchDataResult.success && watchDataResult.data)
        {
            for(let season of data.seasons || [])
            {
                for(let episode of season.episodes || [])
                {
                    if (episode.airstamp) {
                        episode.originalAirDate = new Date(Date.parse(episode.airstamp)) // Convert offset to milliseconds;
                        episode.calculatedAirDate = new Date(Date.parse(episode.airstamp) + (watchDataResult.data.offset || 0) * 60 * 60 * 1000) // Convert offset to milliseconds;
                    }
                }
            }
            return { show: data, watchData: watchDataResult.data };
        }
        else
        {
            for(let season of data.seasons || [])
            {
                for(let episode of season.episodes || [])
                {
                    if (episode.airstamp) {
                        episode.originalAirDate = new Date(Date.parse(episode.airstamp)) // Convert offset to milliseconds;
                        episode.calculatedAirDate = new Date(Date.parse(episode.airstamp)) // Convert offset to milliseconds;
                    }
                }
            }
            return { show: data, watchData: undefined };
        }
    };