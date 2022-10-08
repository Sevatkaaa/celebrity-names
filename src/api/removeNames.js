import axios from "axios";
import {url} from "./url";

export const removeNames = (gameId, names, teamId) => {
    let removeNames = {
        nameIds: names
    };
    console.log(names);
    return axios.post(`${url}/api/games/${gameId}/teams/${teamId}/names`, removeNames, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
};
