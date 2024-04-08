
export interface QrRequest {
  companyId: string | undefined;
  companyMenuId: number | undefined;
  tableName: string | undefined;
}

export interface QrResponse {
  id : number | undefined;
  companyId: string | undefined;
  companyMenuId: number | undefined;
  tableName: string | undefined;
}
