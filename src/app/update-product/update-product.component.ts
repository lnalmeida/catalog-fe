import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/models/Product';
import { CategoryService } from 'src/services/category.service';
import { ProductService } from 'src/services/product.service';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.scss']
})
export class UpdateProductComponent {

  productForm : FormGroup;
  productName: String = "";
  productDescription: String = "";
  productImageUrl: String = "";
  productPrice: Number = 0;
  productStock: number = 0;
  productCategoryId: String = "";
  productImage: String = "";
  dataSource: any;
  categoriesDS: any;
  isLoadingResults = false;


  constructor(
    private router: Router,
    private productService: ProductService,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private fb: FormBuilder
    ){
    this.productForm = this.fb.group({
      productName: [null, [Validators.required, Validators.maxLength(100)]],
      productDescription: [null, [Validators.maxLength(350)]],
      productImageUrl: [null, [Validators.maxLength(150)]],
      productPrice: [null, [Validators.min(1), Validators.max(10000)]],
      productStock: [null],
      productCategoryId: [null, [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.categoryService.getAllCategories().subscribe(res => {
      this.categoriesDS = res;
      console.log(this.categoriesDS)
      this.productForm.controls['productCategoryId'].setValue(this.categoriesDS[0].categoryId);
    })
    this.route.params.subscribe(params => {
      const productId = params['id'];
      this.productService.getProduct(productId)
        .subscribe( res => {
          this.dataSource = res;
          console.log(this.dataSource);
          this.productForm.setValue({
            productName: this.dataSource.name,
            productDescription: this.dataSource.description,
            productImageUrl: this.dataSource.imageUrl,
            productPrice: this.dataSource.price,
            productStock: this.dataSource.stock !== undefined ? this.dataSource.stock : null,
            productCategoryId: this.dataSource.categoryId
          });
          this.productImage = this.dataSource.imageUrl;
        });
      });
      this.loadImage();

  }

  updateProduct(){
    this.isLoadingResults = true;
    const product: Product = {
      productId: this.dataSource.productId,
      name: this.productForm.value.productName,
      description: this.productForm.value.productDescription,
      imageUrl: this.productForm.value.productImageUrl,
      price: this.productForm.value.productPrice,
      stock: this.productForm.value.productStock,
      created: this.dataSource.created,
      categoryID: this.productForm.value.productCategoryId
    };
    console.log(product)


    this.productService.updateProduct(product.productId, product)
    .subscribe(res => {
      const id = res.productId;
      this.isLoadingResults = false;
      console.log(product);
      this.router.navigate(['/products']);
    }, err => {
      console.log(err);
      this.isLoadingResults = false;
    });
  }

  cancelUpdateProduct() {
    this.router.navigateByUrl("/products");
  }

  loadImage() {
    this.productImage = this.dataSource.productImageUrl;
  }

}
