import axios from "axios";
import {url} from "./url";

export const getGame = (id) => {
    return axios.get(`${url}/api/games/${id}`, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}
