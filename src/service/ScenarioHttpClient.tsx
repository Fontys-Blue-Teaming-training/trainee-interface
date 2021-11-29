import { apiConfig } from "../config/ApiConfig";

export class ScenarioHttpClient {
    public baseUrl: string = apiConfig.apiUrl;

    public fetchLeaderBoard(id: number) {
        const path = 'scenario/leaderboard/' + id;
        const headers = {
            "Content-Type": "application/json",
        }
        return new Promise((resolve, reject) => {
            fetch(this.baseUrl + path, {
                method: 'GET',
                headers: headers
            })
                .then((res) => {
                    if (res) {
                        return res.json()
                    }
                    else {
                        reject()
                    }
                })
                .then((data) => resolve(data))
                .catch(reject);
        });
    }

    public getHighscores(scenarioId: any) {

        const path = 'scenario/highscore/';

        const headers = {
            "Content-Type": "application/json",
        }

        return new Promise((resolve, reject) => {
            fetch(this.baseUrl + path + scenarioId, {
                method: 'GET',
                headers: headers,
            })
                .then((res) => {
                    if (res) {
                        return res.json()
                    }
                    else {
                        reject()
                    }
                })
                .then((data) => resolve(data))
                .catch(reject);
        });



    }

    public getCurrent(teamId: number) {

        const path = 'scenario/current/' + teamId;
        const headers = {
            "Content-Type": "application/json",
        }
        return new Promise((resolve, reject) => {
            fetch(this.baseUrl + path, {
                method: 'GET',
                headers: headers
            })
                .then((res) => {
                    if (res) {
                        return res.json()
                    }
                    else {
                        reject()
                    }
                })
                .then((data) => resolve(data))
                .catch(reject);
        });


    }
}