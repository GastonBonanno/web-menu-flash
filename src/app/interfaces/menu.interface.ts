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

export interface MenuRequest{
  title: string;
  description: string;
  header: string;
  footer: string;
}

export interface CategoryRequest{
  name: string;
  menuId: number;
}
export interface ItemMenuRequest{
  categoryMenuId: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
}
