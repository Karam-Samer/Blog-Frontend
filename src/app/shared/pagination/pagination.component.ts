import { Component, input, output } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-pagination',
  styleUrl: './pagination.component.scss',
  templateUrl: './pagination.component.html',
})
export class PaginationComponent {
  currentPage = input.required<number>();
  totalPages = input.required<number>();
  pageChange = output<number>();
  pages: number[] = [];

  ngOnInit() {
    this.updatePages();
  }

  updatePages() {
    this.pages = [];
    for (let i = 1; i <= this.totalPages(); i++) {
      this.pages.push(i);
    }
    return this.pages;
  }

  newPage(page: number) {
    if (page >= 1 && page <= this.totalPages()) {
      this.pageChange.emit(page);
    }
  }
}
