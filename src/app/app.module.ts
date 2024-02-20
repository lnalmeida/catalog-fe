import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CategoriesComponent } from './categories/categories.component';
import { CategoryDetailsComponent } from './category-details/category-details.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import { UpdateCategoryComponent } from './update-category/update-category.component';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenuComponent } from './menu/menu.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatCommonModule } from '@angular/material/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card'
import { MatSelectModule } from '@angular/material/select';
import { ProductsComponent } from './products/products.component';
import { ConfirmDeleteDeialogComponent } from './confirm-delete-deialog/confirm-delete-deialog.component';
import { AuthService } from 'src/services/auth.service';
import { CategoryService } from 'src/services/category.service';
import { PaginationService } from 'src/services/pagination.service';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { PaginationInterceptor } from 'src/interceptors/pagination.interceptor';
import { AddProductComponent } from './add-product/add-product.component';
import { ProductService } from 'src/services/product.service';
import { CurrencyMaskDirective } from './directives/currency-mask.directive';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { UpdateProductComponent } from './update-product/update-product.component';

@NgModule({
  declarations: [
    AppComponent,
    CategoriesComponent,
    CategoryDetailsComponent,
    AddCategoryComponent,
    UpdateCategoryComponent,
    LoginComponent,
    MenuComponent,
    ProductsComponent,
    ConfirmDeleteDeialogComponent,
    AddProductComponent,
    CurrencyMaskDirective,
    ProductDetailsComponent,
    UpdateProductComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatTableModule,
    MatFormFieldModule,
    MatCommonModule,
    MatPaginatorModule,
    MatDialogModule,
    MatCardModule,
    MatSelectModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    CategoryService,
    ProductService,
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: PaginationInterceptor,
      multi: true
    },
    PaginationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
