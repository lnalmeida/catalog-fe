import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Category } from 'src/models/Category';
import { CategoryService } from 'src/services/category.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {

  categoryForm : FormGroup;
  categoryName: String = "";
  categoryImageUrl: String = "";
  dataSource: any;
  isLoadingResults = false;


  constructor(private router: Router, private categoryService: CategoryService, private fb: FormBuilder){
    this.categoryForm = this.fb.group({
      categoryName: [null, Validators.required],
      categoryImageUrl: [null]
    });
  }

  ngOnInit(): void {

  }

  addCategory(){
    console.log("addCategory")
    this.isLoadingResults = true;
    const category: Category = {
      categoryId: "",
      categoryName: this.categoryForm.value.categoryName,
      categoryImageUrl: this.categoryForm.value.categoryImageUrl
    };


    this.categoryService.addCategory(category)
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

  cancelAddCategory() {
    this.router.navigate(["/categories"]);
  }



}
