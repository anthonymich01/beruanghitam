// USER Query
export const getUserByEmail = `
SELECT id, password FROM users WHERE email = $1
`

export const insertNewUserByEmailPassword = `
INSERT INTO users (email, password) VALUES ($1, $2)
`
