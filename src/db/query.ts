// USER Query
export const getUserByEmail: string = `
SELECT id, password FROM users WHERE email = $1 AND deleted_at IS NULL
`

export const getUserIdById: string = `
SELECT id, full_name, email, role FROM users WHERE id = $1 AND deleted_at IS NULL
`

export const insertNewUserByEmailPassword: string = `
INSERT INTO users (full_name, email, password) VALUES ($1, $2, $3) RETURNING id
`

// WATCHLIST Query
export const insertNewDefaultWatchlistByUserId: string = `
INSERT INTO watchlist (user_id) VALUES ($1)
`

export const getSymbolWatchlistByUserId: string = `
SELECT symbol FROM watchlist WHERE user_id = $1
`

export const getWatchlistDataByCode: string = `
SELECT code, description FROM stocks WHERE code ILIKE $1 or description ILIKE $1 LIMIT 20
`

export const updateWatchlistDataByUserId: string = `
UPDATE watchlist SET symbol = $1 WHERE user_id = $2 RETURNING symbol
`
