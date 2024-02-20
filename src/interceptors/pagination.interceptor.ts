import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { PaginationService } from 'src/services/pagination.service';

@Injectable()
export class PaginationInterceptor implements HttpInterceptor {

  constructor(private paginationService: PaginationService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>
    {
      return next.handle(request)
        .pipe(
          tap(event => {
            if(event instanceof HttpResponse) {
              const xPaginationHeader = event.headers.get("X-Pagination");
              if(xPaginationHeader) {
                const paginationData = JSON.parse(xPaginationHeader);
                this.paginationService.totalCount = paginationData.TotalCount;
                this.paginationService.pageSize = paginationData.PageSize;
                this.paginationService.currentPage = paginationData.CurrentPage;
                this.paginationService.totalPages = paginationData.TotalPages;
                this.paginationService.hasNext = paginationData.HasNext;
                this.paginationService.hasPrevious = paginationData.HasPrevious;
              }
            }
          })
        );
    }
}
