export interface MenuResponse {
  id: number;
  title: string;
  description: string;
  header: string;
  footer: string;
  companyDataId: number;
  active: boolean;
  createdAt: Date;
  modifiedAt: Date;
  deletedAt: Date;
}
