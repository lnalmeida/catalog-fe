import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Category } from 'src/models/Category';
import { AuthService } from 'src/services/auth.service';
import { CategoryService } from 'src/services/category.service';
import { ConfirmDeleteDeialogComponent } from '../confirm-delete-deialog/confirm-delete-deialog.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotFoundError } from 'rxjs';

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.scss']
})


export class UpdateCategoryComponent {

  categoryForm : FormGroup;
  categoryId :string = "";
  categoryName: String = "";
  categoryImageUrl: String = "";
  dataSource: any;
  isLoadingResults = false;


  constructor(private router: Router, private categoryService: CategoryService, private fb: FormBuilder, private route: ActivatedRoute){
    this.categoryForm = this.fb.group({
      categoryName: [null, Validators.required],
      categoryImageUrl: [null]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const categoryId = params['id'];
      this.categoryService.getCategory(categoryId)
        .subscribe( res => {
          this.dataSource = res;
          this.categoryForm.setValue({
            categoryName: this.dataSource.categoryName,
            categoryImageUrl: this.dataSource.categoryImageUrl
          })
        });
      });
  }

  updateCategory(){
    console.log("updateCategory")
    this.isLoadingResults = true;
    const category: Category = {
      categoryId: this.dataSource.categoryId,
      categoryName: this.categoryForm.value.categoryName,
      categoryImageUrl: this.categoryForm.value.categoryImageUrl
    };


    this.categoryService.updateCategory(category.categoryId, category)
    .subscribe(res => {
      const id = res.categoryId;
      this.isLoadingResults = false;
      console.log(category);
      this.router.navigate(['/categories']);
    }, err => {
      console.log(err);
      this.isLoadingResults = false;
    });
  }

  cancelUpdateCategory() {
    this.router.navigate(["/categories"]);
  }
}

