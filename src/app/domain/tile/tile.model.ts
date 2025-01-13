import { TileParams } from './tile-params.model'

export interface Tile {
  id: string
  title: string
  url: string
  method: 'GET' | 'POST' | 'PUT' | 'DELETE'
  confirmation?: string
  params: TileParams[]
}
