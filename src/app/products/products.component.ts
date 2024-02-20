import { ProductService } from './../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
// import { ActivatedRoute, Router } from '@angular/router';
// import { Category } from 'src/models/Category';
import { ConfirmDeleteDeialogComponent } from '../confirm-delete-deialog/confirm-delete-deialog.component';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/services/auth.service';
import { Product } from 'src/models/Product';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})


export class ProductsComponent {
  dataSource : Product[] | any;
  isLoadingResults: boolean = true;
  pageNumber: number = 1;
  pageSize: number = 10;
  dataCount: any = 0;
  userRole: string | null= "";

  constructor(
    private productService: ProductService,
    private authService: AuthService,
    private dialog: MatDialog){}


  ngOnInit(): void {
    this.productService.getallProducts().subscribe(res => {
      this.dataCount = res.length
      console.log(res);
    });
    this.productService.getProducts(this.pageNumber, this.pageSize)
    .subscribe(res => {
          this.dataSource = res;
          this.userRole = this.authService.getRoleFromLocalStorage();
        }, err => {
          console.log(err);
          this.isLoadingResults = false;
        });
  }

  pageChanged(event: PageEvent): void {
    this.productService.getProducts(event.pageIndex + 1, event.pageSize)
        .subscribe(res => {
          this.dataSource = res;
          this.isLoadingResults = false;
        }, err => {
          console.log(err);
          this.isLoadingResults = false;
        });
  }


  openConfirmationDialog(productId: string): void {
    const cleanedProductId = productId.replace(/[{}]/g, '');
    const dialogRef = this.dialog.open(ConfirmDeleteDeialogComponent, {
      width: '300px',
      data: { message: 'Confirm deletion??', productId: cleanedProductId }
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.deleteProduct(productId);
      }
    });
  }

  deleteProduct(id:string) {
    this.productService.deleteProduct(id).subscribe(res => {
      this.productService.getallProducts().subscribe(res => this.dataCount = res.length);
      this.productService.getProducts(this.pageNumber, this.pageSize)
      .subscribe(res => {
        this.dataSource = res;
        this.isLoadingResults = false;
      }, err => {
        console.log(err);
        this.isLoadingResults = false;
      });
    });
  }
}


