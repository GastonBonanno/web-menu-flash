
export interface QrRequest {
  tableName: string | undefined;
  companyMenuId: number | undefined;
}

export interface QrResponse {
  tableName: string | undefined;
  companyMenuId: number | undefined;
  active: boolean | undefined;
  createdAt: Date | undefined;
  modifiedAt: Date | undefined ;
  deletedAt: Date | undefined;
}
