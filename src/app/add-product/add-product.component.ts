import { CategoryService } from 'src/services/category.service';
import { ProductService } from './../../services/product.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from 'src/models/Product';
import { Category } from 'src/models/Category';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent {
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
    console.log('addProducts view');
    this.categoryService.getAllCategories().subscribe(res => {
      this.categoriesDS = res;
      console.log(this.categoriesDS)
      this.productForm.controls['productCategoryId'].setValue(this.categoriesDS[0].categoryId);
    })

  }

  addProduct(){
    console.log("addProduct")
    this.isLoadingResults = true;
    const product: Product = {
      productId: "",
      name: this.productForm.value.productName,
      description: this.productForm.value.productDescription,
      imageUrl: this.productForm.value.productImageUrl,
      price: this.productForm.value.productPrice,
      stock: this.productForm.value.productStock,
      created: new Date().toLocaleString(),
      categoryID: this.productForm.value.productCategoryId,
    };


    this.productService.addProduct(product)
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

  cancelAddProduct() {
    this.router.navigateByUrl("/products");
  }

  loadImage() {
    this.productImage = this.productForm.value.productImageUrl;
  }

}
