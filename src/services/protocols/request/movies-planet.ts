export interface MoviesPlanet {
  get(name: string): Promise<number>;
}
