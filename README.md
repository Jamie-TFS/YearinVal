# YearIn.VAL (Prototype)

A work-in-progress **VALORANT season recap** — a "year in review" that surfaces the stats players don't normally see. Think less "here's your K/D" and more "you shot 300 people in the toes this year."

> **Status:** Working prototype. Runs on a **custom match-data generator** while a Riot production API key is pending. The architecture is built so real Riot API data drops in with minimal changes.

## What it does

- A sign-in → recap flow, presented as a full-screen, Spotify-Wrapped-style scrolling experience.
- Aggregates stats across a **full season** of matches (kills, damage, headshots, "should've-saved" rounds, and more offbeat ones).
- Pulls live agent and spray art from the community VALORANT asset API.
- Private-by-default profiles with an opt-in share toggle.

## How it's built

- **Vanilla HTML / CSS / JavaScript** — no frameworks, no build step.
- **Match/season generator** — simulates entire seasons of VALORANT matches modelled on the real `VAL-MATCH-V1` schema, including valid scorelines, halftime side switches, a priced economy, and consistent kill/damage data. Stat logic written against it works unchanged on live API data (I assume).
- **Mock RSO (Riot Sign-On) flow** — a simulated OAuth-style sign-in with `state` parameter verification, structured so real Riot Sign-On replaces the mock step later. (Real RSO requires a backend + approved production key, the planned next milestone.)

## Pages

| File | Purpose |
|------|---------|
| `index.html` | Landing page, starts the sign-in flow |
| `login.html` | Mock Riot Sign-On (simulation only) |
| `profile.html` | Verifies the flow and displays the recap |
| `generator.js` | Season match-data generator (dev data source) |


## A note on the generator

The match/season generator is **not** a 1:1 reproduction of the official `VAL-MATCH-V1` schema. It generates data that's realistic in the dimensions the recap actually reads (kills, damage, economy, round outcomes) and leaves other fields approximate, incomplete, or omitted by design — building them out would add complexity with no effect on the prototype. When real Riot API data is available, it slots in through the same stat functions, so this scaffolding is only ever a development stand-in.


## Roadmap

- [ ] Real Riot Sign-On (RSO) + backend token exchange
- [ ] Live data via the Riot VALORANT API (pending production key)
- [ ] Expanded stat set + season-level stats (most-played agent, win rate, map stats)
- [ ] Final summary / shareable card

---

*Not affiliated with or endorsed by Riot Games. VALORANT is a trademark of Riot Games, Inc.*
