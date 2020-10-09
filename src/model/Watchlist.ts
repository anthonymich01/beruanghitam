import db from "../db"
import { getSymbolWatchlistByUserId, getWatchlistDataByCode, updateWatchlistDataByUserId } from "../db/query"

class Watchlist {
  getWatchlistByUserId = async (userId: number): Promise<any> => {
    try {
      const res = await db.query(getSymbolWatchlistByUserId, [userId])
      if (res.rows[0]) {
        const symbols = res.rows[0]["symbol"]
        return { symbols }
      }
    } catch (error) {
      console.log(error)
      return { symbols: {} }
    }
  }

  getWatchlistData = async (code: string): Promise<any> => {
    try {
      const res = await db.query(getWatchlistDataByCode, [code])
      return { list: res.rows }
    } catch (error) {
      console.log(error)
      return { list: [] }
    }
  }

  updateWatchlistData = async (watchlist: Array<string>, userId: number): Promise<any> => {
    try {
      const res = await db.query(updateWatchlistDataByUserId, [watchlist, userId])
      const symbols = res.rows[0]["symbol"]
      return { symbols }
    } catch (error) {
      console.log(error)
      return { symbols: {} }
    }
  }
}

export default Watchlist
