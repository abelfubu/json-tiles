export interface SelectTileParams {
  id: string
  label: string
  field: string
  type: 'select'
  url: string
  labelKey: string
  valueKey: string
  value?: string | boolean | number
}
