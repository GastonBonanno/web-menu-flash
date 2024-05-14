import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {IonicModule, NavController} from '@ionic/angular';
import {MenuService} from "../../services/menu.service";
import {Toast} from "../../utils/toast";
import {
  CategoryMenu,
  CategoryRequest,
  CategoryResponse,
  ItemMenuRequest,
  ItemMenuResponse, MenuRequest,
  MenuResponse
} from "../../interfaces/menu.interface";
import {ActivatedRoute} from "@angular/router";
import {CategoryService} from "../../services/category.service";
import {ItemService} from "../../services/item.service";
import {FieldValidation} from "../../interfaces/validations.interface";
import {Validations} from "../../utils/validations";

@Component({
  selector: 'app-menu-view',
  templateUrl: './menu-view.page.html',
  styleUrls: ['./menu-view.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class MenuViewPage implements OnInit {
  isModalOpen = false
  isModalOpen2 = false
  isEditMenuModalOpen = false
  isItemUpdateModalOpen = false
  isCategoryUpdateModalOpen = false
  modifiedItemCategoryId: number | undefined
  menuResponse: MenuResponse = {
    id: 0,
    branch: '',
    title: '',
    description: '',
    header: '',
    companyDataId: 0,
    active: true,
    createdAt: null,
    modifiedAt: null,
    deletedAt: null,
    listCategory: [],
  };
  listItem: ItemMenuRequest[] = [];
  itemMenu: ItemMenuRequest = {
    categoryMenuId: 0,
    name: '',
    position: undefined,
    description: '',
    price: 0,
  };
  itemMenuUpdate: ItemMenuResponse = {
    id: 0,
    categoryMenuId: 0,
    name: '',
    position: undefined,
    description: '',
    price: 0,
    active: true,
    createdAt: undefined,
    modifiedAt: undefined,
    deletedAt: undefined,
  };
  categoryMenuUpdate: CategoryMenu = {
    id: 0,
    name: '',
    position: undefined,
  };

  listCategory: CategoryRequest[] = [];
  category: CategoryRequest = {
    name: '',
    position: undefined,
    companyMenuId: 0
  };

  itemUpdateNameError: FieldValidation = {
    size: 60,
    error: null
  }

  itemUpdateDescriptionError: FieldValidation = {
    size: 60,
    error: null
  }

  itemNameError: FieldValidation = {
    size: 60,
    error: null
  }

  itemDescriptionError: FieldValidation = {
    size: 60,
    error: null
  }

  categoryUpdateNameError: FieldValidation = {
    size: 60,
    error: null
  }

  categoryNameError: FieldValidation = {
    size: 60,
    error: null
  }

  headerError: FieldValidation = {
    size: 60,
    error: null
  }

  titleError: FieldValidation = {
    size: 60,
    error: null
  }

  descriptionError: FieldValidation = {
    size: 60,
    error: null
  }

  validations: Validations

  constructor(private menuService: MenuService,
              private itemService : ItemService,
              private categoryService: CategoryService,
              private toast: Toast,
              private navCtrl: NavController,
              private validationService: Validations,
              private route: ActivatedRoute) {
    this.validations = validationService
  }

  setOpenCategory(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }
  setOpenEditMenu(isOpen: boolean) {
    this.isEditMenuModalOpen = isOpen
  }
  setOpenItem(isOpen: boolean, id: number | undefined) {
    this.isModalOpen2 = isOpen;
    if (isOpen)
      this.modifiedItemCategoryId = id;
  }

  setUpdateOpenItem(isOpen: boolean, item: ItemMenuResponse | undefined) {
    this.isItemUpdateModalOpen = isOpen;
    if (isOpen && item){
      this.itemMenuUpdate.id = item.id
      this.itemMenuUpdate.categoryMenuId = item.categoryMenuId
      this.itemMenuUpdate.description = item.description
      this.itemMenuUpdate.name = item.name
      this.itemMenuUpdate.position = item.position
      this.itemMenuUpdate.active = item.active
      this.itemMenuUpdate.createdAt = item.createdAt
      this.itemMenuUpdate.deletedAt = item.deletedAt
      this.itemMenuUpdate.modifiedAt = item.modifiedAt
      this.itemMenuUpdate.price = item.price
    }
  }
  setUpdateOpenCategory(isOpen: boolean, category: CategoryMenu | undefined) {
    this.isCategoryUpdateModalOpen = isOpen;
    console.log(category)
    if (isOpen && category){
      this.categoryMenuUpdate.id = category.id
      this.categoryMenuUpdate.name = category.name
      this.categoryMenuUpdate.position = category.position
    }
  }

   addCategory() {
    if(this.category.name != undefined && this.categoryNameError.error === null){
      let categoryClone: CategoryRequest = {
        name: this.category.name,
        companyMenuId: this.menuResponse.id,
        position: this.menuResponse.listCategory.length + this.listCategory.length + 1 ,
      }
      this.listCategory.push(categoryClone)
    }
  }

   saveCategory() {
     this.setOpenCategory(false)
     if(this.validateErrors()) {
       this.categoryService.saveCategory(this.listCategory).subscribe({
         next: (resp: CategoryResponse[]) => {
           this.toast.present('bottom', "Cargado con éxito").then()
           resp.forEach(category => this.menuResponse.listCategory.push(category))
           this.clearListCategory()
         },
         error: (err) => {
           console.log('error: ', err)
           this.clearListCategory()
         }
       })
     }
   }
   saveItems(){
    this.itemMenu.categoryMenuId = this.modifiedItemCategoryId;
    this.itemMenu.position = this.getCategoryItems(this.modifiedItemCategoryId).length + 1

     this.itemService.saveItem(this.itemMenu).subscribe({
       next: (resp: ItemMenuResponse) => {
         this.toast.present('bottom', "Cargado con éxito")
         this.listItem.push(resp)
         this.ngOnInit()
       },
       error: (err) => {
         console.log('error: ', err)
       }
     })
   }

  deleteCategory(id: number){
    this.categoryService.deleteCategory(id).subscribe({
      next: () => {
        this.ngOnInit()
      },
      error: (err) => {
        this.toast.present('bottom', "Error borrando el categoría").then()
        console.log('error: ', err)
      }
    })
  }

  editCategory(category: CategoryMenu){
    this.categoryService.editCategory(category).subscribe({
      next: () => {
        this.ngOnInit()
        this.toast.present("bottom", "Actualizado con éxito").then()
      },
      error: (err) => {
        this.toast.present('bottom', "Error editando la categoría").then()
        console.log('error: ', err)
      }
    })
  }

  editItem(item: ItemMenuResponse){
    if(this.validateUpdateErrors()){
      this.itemService.editItem(item).subscribe({
        next: () => {
          this.ngOnInit()
          this.toast.present("bottom", "Actualizado con éxito").then()
        },
        error: (err) => {
          this.toast.present('bottom', "Error editando el item").then()
          console.log('error: ', err)
        }
      })
    }
  }

   deleteItem(id: number){
      this.itemService.deleteItem(id).subscribe({
        next: () => {
          this.ngOnInit()
        },
        error: (err) => {
          this.toast.present('bottom', "Error borrando el item").then()
          console.log('error: ', err)
        }
      })
   }

  ngOnInit() {
    const menuId = this.route.snapshot.paramMap.get('menu-id');
    this.menuService.getMenuById(menuId).subscribe(
      {
        next: (resp: MenuResponse) => {
          console.log(resp)
          this.menuResponse = resp
          this.menuResponse.listCategory = resp.listCategory
        },
        error: (err) => {
          console.log('error: ', err)
        }
      }
    );
  }

  clearListCategory() {
    this.listCategory = []
    this.category = {
      name: '',
      position: undefined,
      companyMenuId: 0
    }
    this.clearErrors()
  }

  clearErrors() {
    this.categoryNameError.error = null
    this.itemDescriptionError.error = null
    this.itemNameError.error = null
    this.categoryUpdateNameError.error = null
    this.itemUpdateNameError.error = null
    this.itemUpdateDescriptionError.error = null
  }

  clearItem() {
    this.itemMenu = {
      categoryMenuId: 0,
      name: '',
      position: undefined,
      description: '',
      price: 0,
    }
    this.clearErrors()
  }

  getCategoryItems(categoryId: number | undefined): ItemMenuResponse[]  {
    let categoryFound = this.menuResponse.listCategory.find(ele => ele.id === categoryId)
    if(categoryFound)
      return categoryFound.menuItems
    else
      return []

  }

  validateUpdateErrors(){
    return this.itemUpdateNameError.error === null && this.itemUpdateDescriptionError.error === null
  }
  validateErrors(){
    return this.itemNameError.error === null && this.itemDescriptionError.error === null
  }
  validateUpdateCategoryErrors(){
    return this.categoryUpdateNameError.error === null
  }
  validateCategoryErrors(){
    return this.categoryNameError.error === null
  }

  updateMenu() {
    if(this.validateErrors()) {
      let menuRequest: MenuRequest = {
        branch: this.menuResponse.branch,
        title: this.menuResponse.title,
        description: this.menuResponse.description,
        header: this.menuResponse.header,
      }
      this.menuService.updateMenu(menuRequest, this.menuResponse.id).subscribe({
        next: () => {
          this.toast.present('bottom', "Menu editado correctamente").then()
        },
        error: (err) => {
          this.toast.present('bottom', "Error menu").then()
          console.log('error: ', err)
        }
      })
    }
  }


  protected readonly name = name;
}
