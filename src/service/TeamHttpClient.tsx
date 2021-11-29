import { apiConfig } from "../config/ApiConfig";

export class TeamHttpClient {
    public baseUrl: string = apiConfig.apiUrl;

    public Login(body: any) {
        const path = 'team';

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
                .catch((err) => {
                    console.error(err);
                });
        });
    }
}