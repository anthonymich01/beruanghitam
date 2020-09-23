import { Pool } from "pg"

const pool = new Pool()

const query = (text, params) => pool.query(text, params)
const client = () => pool.connect()

export default { query, client }
