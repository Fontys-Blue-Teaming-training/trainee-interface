import { apiConfig } from "../config/ApiConfig";

export class FlagHttpClient {
    public baseUrl: string = apiConfig.apiUrl;

    public getFlags(teamId: any) {
        const path = 'flag/team/';

        const headers = {
            "Content-Type": "application/json",
        }

        return new Promise((resolve, reject) => {
            fetch(this.baseUrl + path + teamId, {
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

    public submitFlag(body: any) {
        const path = 'flag';

        const headers = {
            "Content-Type": "application/json",
        }

        return new Promise((resolve, reject) => {
            fetch(this.baseUrl + path, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(body)
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