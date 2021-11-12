import { apiConfig } from "../config/ApiConfig";

export class ScenarioHttpClient {
    public baseUrl: string = apiConfig.url;

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
                .then((res) => res.json())
                .then((data) => resolve(data))
                .catch(reject);
        });
    }
}