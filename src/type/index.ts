  
export interface IItem {
  id: number;
  listValue: string;
  status: string;
  selected: boolean;
  unEdit: boolean;
}

export type TList = IItem[];

export interface IPressParams {
  value: string;
  id?: number;
  cacheValue?: string;
}