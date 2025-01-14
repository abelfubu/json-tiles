export interface BaseTileParams {
  id: string
  label: string
  field: string
  type: 'text' | 'checkbox' | 'number'
  value?: string | boolean | number
}
