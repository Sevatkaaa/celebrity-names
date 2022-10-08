import axios from "axios";
import {url} from "./url";

export const addNames = (gameId, names, playerId) => {
    let addNames = {
        names: names,
        playerId: playerId
    };
    return axios.post(`${url}/api/games/${gameId}/names`, addNames, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
};
