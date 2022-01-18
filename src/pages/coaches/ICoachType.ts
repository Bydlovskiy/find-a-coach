export type ICoachRequest = {
    firstName: string,
    lastName: string,
    areas: string[],
    description:string,
    hourlyRate: number
}

export type ICoachResponse = {
    id: string,
    firstName: string,
    lastName: string,
    areas: string[],
    description:string,
    hourlyRate: number
}

