import { graphRequest } from 'service';

export default {
    getViewer: async (jsonString: string, type: graphApiType = 'query'): Promise<{ data: any }> => {
        const res = await graphRequest(jsonString, type);
        return res.data;
    },
}; 