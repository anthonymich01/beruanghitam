import { Pool } from "pg"

const pool = new Pool()

export const query = (text, params) => pool.query(text, params)
export const client = () => pool.connect()
