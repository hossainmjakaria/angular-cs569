export type OverallResult = { winCount: number, lossCount: number, tieCount: number, computerChoice: string }
export type GameHistory = { human: string, computer: string, result: string }
export enum Choices { Rock, Paper, Scissors }