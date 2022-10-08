import axios from "axios";
import {url} from "./url";

export const addPlayer = (gameId, teamId, playerName) => {
    let addPlayer = {
        name: playerName
    };
    return axios.post(`${url}/api/games/${gameId}/teams/${teamId}/players`, addPlayer, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
};
