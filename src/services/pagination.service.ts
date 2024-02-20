import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaginationService {

  constructor() { }

  totalCount: number = 0;
  pageSize: number = 0;
  currentPage: number = 0;
  totalPages: number = 0;
  hasNext: boolean = false;
  hasPrevious: boolean = false;

}
