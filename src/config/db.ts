import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL as string);

await sql`DO $$
BEGIN
    IF to_regtype('theme') IS NULL THEN
        CREATE TYPE theme AS ENUM (
            'history',
            'geography',
            'physicsChemistry',
            'music',
            'entertainment',
            'literature',
            'mathematics',
            'biology'
        );
    END IF;
END$$;`;

await sql`CREATE TABLE IF NOT EXISTS app_user (
    id SERIAL PRIMARY KEY,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    username VARCHAR(255) UNIQUE NOT NULL,
    is_bot BOOLEAN DEFAULT FALSE NOT NULL,
    total_wins INTEGER DEFAULT 0 NOT NULL,
    total_score INTEGER DEFAULT 0 NOT NULL,
    total_played_games INTEGER DEFAULT 0 NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    preferred_theme THEME NOT NULL DEFAULT 'biology'
    );
`;

await sql`CREATE TABLE IF NOT EXISTS game (
    id SERIAL PRIMARY KEY,
    ended_at TIMESTAMP NULL,
    is_draw_game BOOLEAN DEFAULT FALSE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    player1_id INTEGER REFERENCES app_user(id) ON DELETE SET NULL,
    player2_id INTEGER REFERENCES app_user(id) ON DELETE SET NULL,
    game_winner_id INTEGER REFERENCES app_user(id) ON DELETE SET NULL,
    round_index INTEGER DEFAULT 0 NOT NULL CHECK (round_index >= 0 AND round_index <= 4),
    CONSTRAINT game_unique_players_created_at
    UNIQUE(player1_id, player2_id, created_at));`;

await sql`CREATE TABLE IF NOT EXISTS round (
    theme THEME NOT NULL,
    id SERIAL PRIMARY KEY,
    is_draw_round BOOLEAN DEFAULT FALSE NOT NULL, 
    game_id INTEGER REFERENCES game(id) ON DELETE CASCADE,
    round_winner_id INTEGER REFERENCES app_user(id) ON DELETE SET NULL,
    round_index INTEGER NOT NULL CHECK (round_index >= 0 AND round_index <= 4),
    player1_number_correct_answers INTEGER DEFAULT 0 NOT NULL CHECK (player1_number_correct_answers >= 0 AND player1_number_correct_answers <= 4),
    player2_number_correct_answers INTEGER DEFAULT 0 NOT NULL CHECK (player2_number_correct_answers >= 0 AND player2_number_correct_answers <= 4),
    CONSTRAINT round_unique_game_round_index UNIQUE(game_id, round_index));`;

await sql`CREATE TABLE IF NOT EXISTS accuracy (
    theme THEME NOT NULL,
    id SERIAL PRIMARY KEY,
    game_id INTEGER REFERENCES game(id) ON DELETE CASCADE,
    round_id INTEGER REFERENCES round(id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES app_user(id) ON DELETE CASCADE,
    accuracy_score DOUBLE PRECISION NOT NULL CHECK (accuracy_score >= 0 AND accuracy_score <= 1),
    CHECK (
        (user_id IS NOT NULL AND game_id IS NOT NULL AND round_id IS NULL)
        OR (user_id IS NOT NULL AND round_id IS NOT NULL AND game_id IS NULL)
        OR (user_id IS NOT NULL AND game_id IS NULL AND round_id IS NULL)
        )
    );`;

await sql`CREATE INDEX IF NOT EXISTS idx_round_game_id ON round(game_id);`;
await sql`CREATE INDEX IF NOT EXISTS idx_game_player1 ON game(player1_id);`;

await sql`CREATE UNIQUE INDEX IF NOT EXISTS idx_accuracy_global_unique 
    ON accuracy(user_id, theme) 
    WHERE game_id IS NULL AND round_id IS NULL;`;

await sql`CREATE UNIQUE INDEX IF NOT EXISTS idx_accuracy_game_unique 
    ON accuracy(user_id, game_id, theme) 
    WHERE round_id IS NULL;`;

await sql`CREATE UNIQUE INDEX IF NOT EXISTS idx_accuracy_round_unique 
    ON accuracy(user_id, round_id, theme) 
    WHERE game_id IS NULL;`;

export default sql;
