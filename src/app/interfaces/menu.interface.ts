export interface MenuResponse {
  id: number;
  title: string;
  description: string;
  header: string;
  footer: string;
  companyDataId: number;
  active: boolean;
  createdAt: Date | null;
  modifiedAt: Date | null;
  deletedAt: Date | null;
  listCategory: CategoryResponse[];
}

export interface MenuRequest{
  title: string;
  description: string;
  header: string;
  footer: string;
}

export interface CategoryRequest{
  name: string;
  companyMenuId: number;
}

export interface CategoryResponse{
  id: number;
  name: string;
  active: boolean;
  menuItems: ItemMenuResponse[];
}

export interface ItemMenuRequest{
  categoryMenuId: number | undefined;
  name: string;
  description: string;
  price: number;
  quantity: number;
}

export interface ItemMenuResponse{
  id: number;
  categoryMenuId: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  createdAt: Date | undefined;
  modifiedAt: Date | undefined ;
  deletedAt: Date | undefined;
}
