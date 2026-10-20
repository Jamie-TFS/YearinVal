const fakeNames = ["Riot Tuxedo", "rickxddd", "Binah", "Malkuth", "geozukunft", "The Ruined King", "VerryRareUnicorn", "jadne", "mxxnchkin", "jian", "The Stig"]
const maps = ["ascent", "bind", "haven", "split", "icebox", "lotus", "fracture", "pearl", "breeze", "emerald"];
const agents = ["jett", "phoenix", "sage", "sova", "viper", "breach", "omen", "raze", "cypher", "brimstone", "killjoy", "skye", "yoru", "astra", "KAY/O", "chamber", "neon", "fade"];
const MY_PUUID = "_oEp3Hu1xJ76_ATFUC89FSWdKPzuL8b4Y2YdL_gABgBArlZccveoSdNViDAyKxUc4BEGvkbFfA1iTw";


function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pickRandom(array) {
    return array[randomInt(0, array.length - 1)];

}

function pickUnique(array, count) {
    const shuffled = [...array].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
}


function generatePlayer(teamId, isMainPlayer, roundCount, gameTime, name) {
    return {
        puuid: isMainPlayer ? MY_PUUID : `fakeplayer-${randomInt(1, 999999)}`,
        gameName: name,
        tagLine: isMainPlayer ? "TFS" : "RIOT",
        teamId: teamId,
        partyId: "Party-aaa",
        characterId: `agent-${pickRandom(agents)}-uuid`,
        stats: {
            score: randomInt(400, 8000),
            roundsPlayed: roundCount,
            kills: randomInt(0, roundCount * 5),
            deaths: randomInt(0, roundCount),
            assists: randomInt(0, roundCount * 5),
            playtimeMillis: gameTime,
            abilityCasts: {
                grenadeCasts: randomInt(5, roundCount),
                ability1Casts: randomInt(5, roundCount),
                ability2Casts: randomInt(5, roundCount),
                ultimateCasts: randomInt(1, 3),
            }

        },
        competitiveTier: 17,
        isObserver: false,
        playerCard: "",
        playerTitle: "",
        accountLevel: 69
    }


}

function generateFakeMatch() {
    const roundCount = randomInt(13, 24);
    const redWins = randomInt(0, roundCount);
    const blueWins = roundCount - redWins;
    const names = pickUnique(fakeNames, 9);
    const gameTime = randomInt(600000, 1800000);
    const players = [];

    let nameIndex = 0;
    for (let i = 0; i < 5; i++) {
        const isMain = i === 0;
        const name = isMain ? "Riot Monkey" : names[nameIndex++];
        players.push(generatePlayer("Red", isMain, roundCount, gameTime, name));
    }
    for (let i = 0; i < 5; i++) {

        const name = names[nameIndex++];
        players.push(generatePlayer("Blue", false, roundCount, gameTime, name));
    }

    const fakeMatch = {

        matchInfo: {
            matchId: `fake-${randomInt(1000000, 9999999)}`,
            mapId: pickRandom(maps),
            gameVersion: "release-09.00",
            gameLengthMillis: gameTime,
            region: "eu",
            gameStartMillis: randomInt(1680000000000, 1690000000000),
            provisioningFlowId: "Matchmaking",
            isCompleted: true,
            customGameName: "",
            queueId: "competitive",
            gameMode: "/Game/GameModes/Bomb/BombGameMode.BombGameMode_C",
            isRanked: true,
            seasonId: "fake-season-2026",
            premierMatchInfo: []

        },

        players: players,


        coaches: [],

        teams: [
            { teamId: "Red", won: redWins > blueWins, roundsPlayed: roundCount, roundsWon: redWins, numpoints: redWins },
            { teamId: "Blue," won: blueWins > redWins, roundsPlayed: roundCount, roundsWon: blueWins, numpoints: blueWins }
        ],

        roundResults: 


    }
    return fakeMatch;
}