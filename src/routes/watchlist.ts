import { Request } from "express"
import Watchlist from "../model/Watchlist"

const get = async (req: any, res: any) => {
  try {
    const { userId } = req
    const WatchlistModel: Watchlist = new Watchlist()
    const WatchlistDetail = await WatchlistModel.getWatchlistByUserId(userId)
    res.json({ ...WatchlistDetail })
  } catch (error) {
    console.log(error)
    res.status(401).json({ error })
  }
}

const update = async (req: any, res: any) => {
  try {
    const { userId } = req
    const { list } = req.body
    const WatchlistModel: Watchlist = new Watchlist()
    const updatedWatchlist = await WatchlistModel.updateWatchlistData(list, userId)
    res.json({ ...updatedWatchlist })
  } catch (error) {
    console.log(error)
    res.status(401).json({ error })
  }
}

const getStockList = async (req: Request, res: any) => {
  try {
    const { s } = req.query
    const wildQuery = `%${s}%`
    const WatchlistModel: Watchlist = new Watchlist()
    const stockList = await WatchlistModel.getWatchlistData(wildQuery)
    res.json({ ...stockList })
  } catch (error) {
    console.log(error)
    res.status(401).json({ error })
  }
}

export default { get, update, getStockList }
