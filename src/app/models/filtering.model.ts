export interface FilteringButton {
  type: Filter,
  label: string,
  isActive: boolean
}


export enum Filter {
  All,
  Active,
  Completed
}
