# YearIn.VAL (Prototype)

A work-in-progress **VALORANT season recap** — a "year in review" that surfaces the stats players don't normally see. Think less "here's your K/D" and more "you shot 3 people in the toes this year."

> **Status:** Early prototype. Runs on **simulated match data** while a Riot production API key is pending. The architecture is built so real Riot API data drops in with minimal changes.

## What it does

- A sign-in landing page → recap flow, mirroring how the finished app will work.
- Computes a set of recap stats from VALORANT match data (kills, damage, headshots, and more offbeat ones).
- Presented as a clean, responsive stat-card layout.

## How it's built

- **Vanilla HTML / CSS / JavaScript** — no frameworks, no build step.
- **Mock RSO (Riot Sign-On) flow** — a simulated OAuth-style sign-in with `state` parameter verification, structured so real Riot Sign-On replaces the mock step later. (Real RSO requires a backend + approved production key, which is the planned next milestone.)
- **Simulated match data** (`fake_match.json`) modelled on the real `VAL-MATCH-V1` response schema, so stat logic written against it works unchanged on live data.

## Pages

| File | Purpose |
|------|---------|
| `index.html` | Landing page, starts the sign-in flow |
| `login.html` | Mock Riot Sign-On (simulation only) |
| `profile.html` | Verifies the flow and displays the recap |
| `fake_match.json` | Simulated match data for development |

## Roadmap

- [ ] Real Riot Sign-On (RSO) + backend token exchange
- [ ] Live data via the Riot VALORANT API (pending production key)
- [ ] Public / private profile visibility toggle
- [ ] Expanded stat set

---

*Not affiliated with or endorsed by Riot Games. VALORANT is a trademark of Riot Games, Inc.*
