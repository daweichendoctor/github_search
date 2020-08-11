import { graphRequest } from 'service';
import { viewerUser, searchRepository } from './api';

export default {
    getViewer: async (): Promise<ViewerUser> => {
        const res = await graphRequest(viewerUser);
        return res.data?.viewer;
    },
    getSearchData: async (searchString: string): Promise<SearchData> => {
        const res = await graphRequest(searchRepository(searchString));
        return res.data?.search;
    }
};

export interface ViewerUser {
    login: string
}

export interface SearchData {
    repositoryCount: number;
    nodes: Array<GithubNode>
}

export interface GithubNode {
    url: string;
    name: string;
    nameWithOwner: string;
    description: string;
    databaseId: number;
    repositoryTopics: {
        nodes: Array<{
            topic: {
                name: string
            };
            url: string;
        }>
    };
    stargazers: {
        totalCount: number;
    };
    issues: {
        totalCount: number;
    };
}