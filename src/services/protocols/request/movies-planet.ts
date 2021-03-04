export interface MoviesPlanet {
  getMoviesPlanet(name: string): Promise<number | false>;
}
