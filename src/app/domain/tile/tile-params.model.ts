interface BaseTileParams {
  id: string
  label: string
  field: string
  type: 'text' | 'checkbox' | 'number'
  value?: string | boolean | number
}

interface SelectTileParams {
  id: string
  label: string
  field: string
  type: 'select'
  url: string
  labelKey: string
  valueKey: string
  value?: string | boolean | number
}

export type TileParams = BaseTileParams | SelectTileParams
