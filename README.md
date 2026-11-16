# ⚔️ Dungeon Clicker · Technovas

A small browser game: click monsters, earn gold, buy weapons, climb the leaderboard.

The game page is ready. The backend is your homework. Each quest gives a **goal**, the **expected result** and a few **hints** — you write the code.

## What you will learn

| Step | Game part | Database topic |
|---|---|---|
| 0 | Health check | Connect NestJS to PostgreSQL |
| 1 | Shop | First migration, seed data, pagination |
| 2 | Create a hero | Entity, second migration, INSERT + SELECT |
| 3 | Fight | Update a row (the server decides the reward) |
| 4 | Bag and buy | Relations, foreign keys, JOIN |
| 5 | Leaderboard | N+1 problem |

Transactions, row locks and seasons are **not** part of this homework.

## What you need

- Node.js 20 or newer
- Docker (to run PostgreSQL)

## Start

```bash
npm install
npm run start:dev
```

Open **http://localhost:3000**.

Start PostgreSQL once:

```bash
docker run --name dungeon-db -e POSTGRES_USER=dungeon -e POSTGRES_PASSWORD=dungeon -e POSTGRES_DB=dungeon -p 5432:5432 -d postgres:16
```

Next time just run `docker start dungeon-db`.

## How to do the homework

1. Click the **📜 Quest Log** button in the bottom-right corner.
2. Read the goal and the expected result. Write the code yourself.
3. Save a file. `npm run start:dev` reloads the server.
4. Press **Run check**. Green = this step is finished.
5. The quest log shows `finished / total` and recommends the next step.

Your progress is saved in the browser. Press **Re-check all steps** to test everything again.

## Where to write code

```
src/
├─ main.ts                        Step 1 (validation)
├─ app.module.ts                  Step 0 (database connection)
├─ game.module.ts                  Steps 1, 2, 4
├─ game.controller.ts              Steps 0–5
├─ game.service.ts                 Steps 1–5
├─ common/dto/page-query.dto.ts    Step 1
├─ entities/
│  ├─ item.entity.ts               Step 1
│  ├─ player.entity.ts             Step 2
│  └─ inventory-item.entity.ts     Step 4
└─ database/
   ├─ db.config.ts                 ready (change only if needed)
   ├─ data-source.ts               Step 0
   └─ migrations/                  created by migration:generate
```

`public/index.html` is the game and the quest log — do not change it.

## Migration commands

```bash
npm run migration:generate -- src/database/migrations/CreateItem
npm run migration:run
npm run migration:revert
```
