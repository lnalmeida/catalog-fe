import { AuthService } from 'src/services/auth.service';
import { Component } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ProductService } from 'src/services/product.service';
import { ConfirmDeleteDeialogComponent } from '../confirm-delete-deialog/confirm-delete-deialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent {

  datasource:  any;
  isLoadingResults: boolean = true;
  producId: string = "";
  name: string = "";
  description: string = "";
  price: number = 0;
  imageUrl: string = "";
  userRole: string | null= "";
  pageNumber: number = 1;
  pageSize: number = 10;
  dataCount: number = 0;


    constructor(
      private productService: ProductService,
      private route: ActivatedRoute,
      private router: Router,
      private authService: AuthService,
      private dialog: MatDialog){}

    ngOnInit(): void {
      this.userRole = this.authService.getRoleFromLocalStorage();
      this.route.params.subscribe(params => {
        const productId = params['id'];
        this.productService.getProduct(productId)
          .subscribe( res => {
            this.datasource = res;
            console.log(this.datasource)
          });
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
          this.isLoadingResults = false;
          this.router.navigate(['/products']);
        }, err => {
          console.log(err);
          this.isLoadingResults = false;
        });
    }

}
