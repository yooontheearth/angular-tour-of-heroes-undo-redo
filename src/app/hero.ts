export interface Hero{
    id: number;
    name: string;
    type: HeroType;
}

export enum HeroType{
    Classical = 1,
    Tragic = 2,
    Anti = 3,
}