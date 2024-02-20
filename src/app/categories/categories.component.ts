import { CategoryService } from './../../services/category.service';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/models/Category';
import { ConfirmDeleteDeialogComponent } from '../confirm-delete-deialog/confirm-delete-deialog.component';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/services/auth.service';
import { of } from 'rxjs';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})

export class CategoriesComponent  implements OnInit {
  displayedColumns: string[] = ['name', 'image', 'actions'];
  dataSource : Category[] | any;
  isLoadingResults: boolean = true;
  detailsTitle: string = 'Category details';
  updateTitle: string = 'Update category';
  deleteTitle: string = 'Delete category';
  pageNumber: number = 1;
  pageSize: number = 10;
  dataCount: any = 0;
  userRole: string | null= "";

  constructor(
    private categoryService: CategoryService,
    private authService: AuthService,
    private dialog: MatDialog){}

  ngOnInit(): void {
    this.categoryService.getAllCategories().subscribe(res => this.dataCount = res.length);
    this.categoryService.getCategories(this.pageNumber, this.pageSize)
    .subscribe(res => {
          this.dataSource = res;
          this.userRole = this.authService.getRoleFromLocalStorage();
        }, err => {
          console.log(err);
          this.isLoadingResults = false;
        });
  }

  pageChanged(event: PageEvent): void {
    this.categoryService.getCategories(event.pageIndex + 1, event.pageSize)
        .subscribe(res => {
          this.dataSource = res;
          this.isLoadingResults = false;
        }, err => {
          console.log(err);
          this.isLoadingResults = false;
        });
  }


  openConfirmationDialog(categoryId: string): void {
    const cleanedCategoryId = categoryId.replace(/[{}]/g, '');
    const dialogRef = this.dialog.open(ConfirmDeleteDeialogComponent, {
      width: '300px',
      data: { message: 'Confirm deletion??', categoryId: cleanedCategoryId }
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.deleteCategory(categoryId);
      }
    });
  }

  deleteCategory(id:string) {
    this.categoryService.deleteCategory(id).subscribe(res => {
      this.categoryService.getAllCategories().subscribe(res => this.dataCount = res.length);
      this.categoryService.getCategories(this.pageNumber, this.pageSize)
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


