export class Hint {
  id: number;
  // should it be file or path
  picture: string;
  label: string;
  scenarioId: number;
  timePenalty: number;

  constructor(id: number, picture: string, label: string, scenarioId: number, timePenalty: number) {
      this.id = id;
      this.picture = picture;
      this.label = label;
      this.scenarioId = scenarioId;
      this.timePenalty = timePenalty;
  }
}