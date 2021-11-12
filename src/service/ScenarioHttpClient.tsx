import { apiConfig } from "../config/ApiConfig";

export class ScenarioHttpClient {
    public baseUrl: string = apiConfig.url;

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
                .then((res) => res.json())
                .then((data) => resolve(data))
                .catch(reject);
        });
    }
}