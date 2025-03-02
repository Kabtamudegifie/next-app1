export interface Character {
  id: string;
  name: string;
  status: Status;
  species: string;
  type: string;
  gender: string;
  image: string;
  url: string;
  location: {
    name: string;
    url: string;
  };
  origin: {
    name: string;
    url: string;
  };
  episode: string;
  created: string;
}

export enum Status {
  DEAD = "Dead",
  ALIVE = "Alive",
  UNKNOWN = "Unknown",
}
