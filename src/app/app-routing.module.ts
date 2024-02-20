//import { AuthGuardService } from './../service/auth-guard.service';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CategoriesComponent } from './categories/categories.component';
import { CategoryDetailsComponent } from './category-details/category-details.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import { UpdateCategoryComponent } from './update-category/update-category.component';
import { LoginComponent } from './login/login.component';
import { ProductsComponent } from './products/products.component';
import { AddProductComponent } from './add-product/add-product.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { UpdateProductComponent } from './update-product/update-product.component';


const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    data: { title: 'Login' }
  },
  {
    path: 'categories',
    component: CategoriesComponent,
    data: { title: 'Lista de Categorias' }
  },
  {
    path: 'categories/details/:id',
    component: CategoryDetailsComponent,
    data: { title: 'Category Details' }
  },
  {
    path: 'categories/add',
    component: AddCategoryComponent,
    data: { title: 'Add a Category' }
  },
  {
    path: 'categories/update/:id',
    component: UpdateCategoryComponent,
    data: { title: 'Update a Category' }
  },
  {
    path: 'products',
    component: ProductsComponent,
    data: { title: 'Products' }
  },
  {
    path: 'products/details/:id',
    component: ProductDetailsComponent,
    data: { title: 'Product Details' }
  },
  {
    path: 'products/add',
    component: AddProductComponent,
    data: { title: 'Add a Product' }
  },
  {
    path: 'products/update/:id',
    component: UpdateProductComponent,
    data: { title: 'Update a Product' }
  },
  { path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
