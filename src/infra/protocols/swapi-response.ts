export interface PlanetResult {
  name: string
  films: string[]
}

export interface SwapiResponse {
  next: string | null
  previous: string | null
  results: PlanetResult[]
}
