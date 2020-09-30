// USER Query
export const getUserByEmail: string = `
SELECT id, password FROM users WHERE email = $1 AND deleted_at IS NULL
`

export const getUserIdById: string = `
SELECT id, full_name, email, role FROM users WHERE id = $1 AND deleted_at IS NULL
`

export const insertNewUserByEmailPassword: string = `
INSERT INTO users (full_name, email, password) VALUES ($1, $2, $3)
`
