import parseInput from "../common/parseInput";

export async function runA() {
    const inputArray = await parseInput(__dirname + "/input");
    const parsedInput = inputArray.map(parseLine);
    const possibleGames = parsedInput.filter(isGamePossible);
    console.log(possibleGames.reduce((acc: number, game: Game) => acc + game.gameNumber, 0));
}

export async function runB() {
    const inputArray = await parseInput(__dirname + "/input");
    const setPower = inputArray.map(parseLine).map(getSetPower).reduce((acc, power) => acc + power, 0);
    console.log(setPower);
}

const nrOfRed = 12;
const nrOfGreen = 13;
const nrOfBlue = 14;

type Take = {
    red: number;
    blue: number;
    green: number;
};

type Game = {
    gameNumber: number;
    takes: Take[];
};

function parseLine(line: string): Game {
    const gameNumber = parseInt(line.split(': ')[0].replace(/[^\d]/g, ''), 10);
    const takes = line.split(': ')[1].split('; ').map(parseTake)
    return {gameNumber, takes};
}

function parseTake(stringTake: string): Take {
    const take = {
        red: 0,
        blue: 0,
        green: 0,
    };
    stringTake.split(', ').forEach((color) => {
        const [amount, colorName] = color.split(' ');
        take[colorName as keyof typeof take] = parseInt(amount, 10);
    })
    return take;
}

function isGamePossible(game: Game): boolean {
    return game.takes.every((take) => isTakePossible(take));
}

function isTakePossible(take: Take): boolean {
    return take.red <= nrOfRed && take.blue <= nrOfBlue && take.green <= nrOfGreen;
}

function getSetPower(game: Game): number {
    const maxRed = game.takes.reduce((acc, take: Take) => Math.max(acc, take.red), 0);
    const maxBlue = game.takes.reduce((acc, take: Take) => Math.max(acc, take.blue), 0);
    const maxGreen = game.takes.reduce((acc, take: Take) => Math.max(acc, take.green), 0);

    return maxRed * maxGreen * maxBlue;
}