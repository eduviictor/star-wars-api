export interface PlanetResult {
  name: string;
  films: Array<string>;
}

export interface SwapiResponse {
  next: string | null;
  previous: string | null;
  results: Array<PlanetResult>;
}
