import axios from "axios";
import {url} from "./url";

export const createNewGame = (timeInterval, nameAmount, teams) => {
    let createNewGame = {
        timeInterval: timeInterval,
        nameAmount: nameAmount,
        teams: teams
    };
    return axios.post(`${url}/api/games`, createNewGame, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
};
