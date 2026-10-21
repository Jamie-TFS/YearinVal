const fakeNames = ["Riot Tuxedo", "rickxddd", "Binah", "Malkuth", "geozukunft", "The Ruined King", "VerryRareUnicorn", "jadne", "mxxnchkin", "jian", "The Stig"]
const maps = ["ascent", "bind", "haven", "split", "icebox", "lotus", "fracture", "pearl", "breeze", "emerald"];
const agents = ["jett", "phoenix", "sage", "sova", "viper", "breach", "omen", "raze", "cypher", "brimstone", "killjoy", "skye", "yoru", "astra", "KAY/O", "chamber", "neon", "fade"];
const WEAPON_PRICES = {
    Classic: 0,
    Shorty: 300,
    Frenzy: 450,
    Ghost: 500,
    Sheriff: 800,
    Stinger: 1100,
    Spectre: 1600,
    Bucky: 850,
    Judge: 1850,
    Bulldog: 2100,
    Guardian: 2250,
    Phantom: 2900,
    Vandal: 2900,
    Marshal: 950,
    Outlaw: 2400,
    Operator: 4700,
    Ares: 1600,
    Odin: 3200
};

const ARMOR_PRICES = {
    None: 0,
    Light: 400,
    Regen: 650,
    Heavy: 1000
}

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pickRandom(array) {
    return array[randomInt(0, array.length - 1)];

}

function randomChoice(options) {
    return options[Math.floor(Math.random() * options.length)];
}

function chooseBuyType() {
    return randomChoice(["pistol", "eco", "eco", "force", "force", "full", "full", "full"]);
}

function pickUnique(array, count) {
    const shuffled = [...array].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
}

function getRoundSides(roundNum, startingAttackerTeam) {
    const switchedSides = roundNum > 12;

    const attackerTeam = switchedSides
        ? (startingAttackerTeam === "Red" ? "Blue" : "Red")
        : startingAttackerTeam;

    const defenderTeam = attackerTeam === "Red" ? "Blue" : "Red";

    return { attackerTeam, defenderTeam };
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
                grenadeCasts: randomInt(0, roundCount),
                ability1Casts: randomInt(0, roundCount),
                ability2Casts: randomInt(0, roundCount),
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

function generateDamage(myKills) {
    const damage = [];

    for (const kill of myKills) {
        const headshots = randomInt(0, 1);
        const legshots = randomInt(0, 2);
        const bodyshots = randomInt(0, 3);

        const headDamage = headshots * 160;
        const bodyDamage = bodyshots * 40;
        const legDamage = legshots * 34;

        const totalDamage = headDamage + bodyDamage + legDamage;

        damage.push({
            receiver: kill.victim,
            damage: totalDamage,
            legshots: legshots,
            bodyshots: bodyshots,
            headshots: headshots
     });
    }

    return damage;

}

function generateRoundWinners(redWins, blueWins) {
    const winners = [
        ...Array(redWins).fill("Red"),
        ...Array(blueWins).fill("Blue")
    ];

    for (let i = winners.length - 1; i > 0; i--) {
        const j = randomInt(0, i);
        [winners[i], winners[j]] = [winners[j], winners[i]];
    }

    return winners;
}

function generateEconomy() {
    const buyType = chooseBuyType();

    let weapon;
    let armor;

    switch (buyType) {
        case "pistol":
            weapon = randomChoice(["Classic", "Ghost", "Frenzy", "Sheriff"]);
            armor = randomChoice(["None", "Light"]);
            break;

        case "eco":
            weapon = randomChoice(["Classic", "Shorty", "Frenzy"]);
            armor = randomChoice(["None", "Light"]);
            break;

        case "force":
            weapon = randomChoice(["Sheriff", "Stinger", "Spectre", "Bulldog", "Marshal", "Bucky"])
            armor = randomChoice(["Light", "Heavy", "Regen"])
            break;

        case "full":
            weapon = randomChoice(["Vandal", "Phantom", "Operator"])
            armor = randomChoice(["Light", "Regen", "Heavy"])
            break;
    }

    const spent = WEAPON_PRICES[weapon] + ARMOR_PRICES[armor];

    return {
        loadoutValue: spent,
        weapon: weapon,
        armor: armor,
        remaining: 0,
        spent: spent
    }
}


function generateRound(roundNum, winningTeam, players, startingAttackerTeam) {
    const { attackerTeam, defenderTeam } =
        getRoundSides(roundNum, startingAttackerTeam);

    const economy = generateEconomy();
    const killCount = randomInt(0, 5);
    const kills = [];

    const alivePlayers = [...players];


    for (let i = 0; i < killCount && alivePlayers.length > 1; i++) {
        const killer = pickRandom(alivePlayers);

        const possibleVictims = alivePlayers.filter(
            player => player.teamId !== killer.teamId
        );

        if (possibleVictims.length === 0) break;

        const victim = pickRandom(possibleVictims);

        kills.push({
            killer: killer.puuid,
            victim: victim.puuid
        });

        alivePlayers.splice(alivePlayers.indexOf(victim), 1);


    }
    const myKills = kills.filter(kill => kill.killer === MY_PUUID);
    const damage = generateDamage(myKills);
    return {
        roundNum: roundNum,
        winningTeam: winningTeam,
        attackerTeam: attackerTeam,
        defenderTeam: defenderTeam,
        playerStats: [
            {
                puuid: MY_PUUID,
                kills: myKills,
                economy: economy,
                score: 0,
                damage: damage,
                ability: {
                    grenadeEffects: "",
                    ability1Effects: "",
                    ability2Effects: "",
                    ultimateEffects: "",
                }
            }
        ]

    };
}

function generateScore() {
    let redWins = 0;
    let blueWins = 0;

    while (true) {
        const redWonRound = Math.random() < 0.5;

        if (redWonRound) {
            redWins++;
        } else {
            blueWins++;
        }

        const reachedThirteen = redWins >= 13 || blueWins >= 13;
        const hasTwoRoundLead = Math.abs(redWins - blueWins) >= 2;

        if (reachedThirteen && hasTwoRoundLead) {
            break;
        }
    }

    return {
        redWins,
        blueWins,
        roundCount: redWins + blueWins,
        winningTeam: redWins > blueWins ? "Red" : "Blue"
    };
}


function generateFakeMatch() {
    const score = generateScore();
    const startingAttackerTeam = pickRandom(["Red", "Blue"]);
    const players = [];

    const roundCount = score.roundCount;
    const redWins = score.redWins;
    const blueWins = score.blueWins;

    const roundWinners = generateRoundWinners(redWins, blueWins);

    const names = pickUnique(fakeNames, 9);
    const gameTime = randomInt(600000, 1800000);

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

    const roundResults = [];
    for (let i = 0; i < roundCount; i++) {
        roundResults.push(generateRound(i + 1, roundWinners[i], players, startingAttackerTeam));
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
            { teamId: "Red", won: redWins > blueWins, roundsPlayed: roundCount, roundsWon: redWins, numPoints: redWins },
            { teamId: "Blue", won: blueWins > redWins, roundsPlayed: roundCount, roundsWon: blueWins, numPoints: blueWins }
        ],

        roundResults: roundResults,


    }

    return fakeMatch;
}

function generateSeason(count) {
    const matches = [];
    for (let i = 0; i < count; i++) {
        matches.push(generateFakeMatch());
    }
    return matches;
}