import { TileParams } from './tile-params.model'

export interface Tile {
  id: string
  title: string
  url: string
  confirmation?: string
  params: TileParams[]
}
