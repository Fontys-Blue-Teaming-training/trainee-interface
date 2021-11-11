import { apiConfig } from "../config/ApiConfig";

export class FlagHttpClient {
    public baseUrl: string = apiConfig.url;

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
                .then((res) => res.json())
                .then((data) => resolve(data))
                .catch(reject);
        });
    }
}