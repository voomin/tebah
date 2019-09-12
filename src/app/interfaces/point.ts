export interface deployPoint {
  point:number;
}

export interface rootPointWallet {
  point:number;
}
export interface deployPointHistory{
  id?:string;
  change_point:number;
  after_total_point:number;
  timestamp:number;
}
export interface userPointWallet{
  uid: string;
  have_point: number;
}
export interface pointTransaction{
  pttran_id?: string;
  from_uid: string;
  from_displayName?: string;
  to_uid: string;
  to_displayName?: string;
  point: number;
  timestamp?: number;
}