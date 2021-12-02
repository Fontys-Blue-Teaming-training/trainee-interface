import { apiConfig } from "../config/ApiConfig";

export class GuideHttpClient {
  public baseUrl: string = apiConfig.url;

  public getHints(scenarioId: any) {
    const path = 'hint/';

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

  public getFlagHint(teamId: any, flagId: any) {
    const path = 'hint/getflaghint/';

    const headers = {
        "Content-Type": "application/json",
    }

    return new Promise((resolve, reject) => {
        fetch(this.baseUrl + path + teamId + '/' + flagId + '/', {
            method: 'GET',
            headers: headers
        })
            .then((res) => res.json())
            .then((data) => resolve(data))
            .catch(reject);
    });
  }

  //public getCurrentScenarioId
  //public getMaxHintId
  //public addTimePenaltyToTeam
  //public addHintRecord
  //public getHintRecords
}