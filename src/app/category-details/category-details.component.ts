import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from 'src/services/category.service';
import { MatCardModule } from '@angular/material/card'

@Component({
  selector: 'app-category-details',
  templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.scss']
})
export class CategoryDetailsComponent implements OnInit{

  datasource:  any;
  categoryId: string = "";
  categoryName: string = "";
  categoryImageUrl: string = ""

    constructor(private categoryService: CategoryService, private route: ActivatedRoute){}

    ngOnInit(): void {
      this.route.params.subscribe(params => {
        const categoryId = params['id'];
        this.categoryService.getCategory(categoryId)
          .subscribe( res => {
            this.datasource = res;
            console.log(this.datasource)
          });
        });
    }

}
