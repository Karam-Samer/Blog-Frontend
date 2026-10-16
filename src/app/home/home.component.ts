import { Component, inject, OnInit, signal } from '@angular/core';
import { BlogService } from '../services/blog.service';
import { PostComponent } from '../shared/post/post.component';
import { IPost } from '../interfaces/post.interface';
import { PaginationComponent } from '../shared/pagination/pagination.component';
import { FormComponent } from '../form/form.component';

@Component({
  imports: [PostComponent, PaginationComponent, FormComponent],
  selector: 'app-home',
  styleUrl: './home.component.scss',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  blogService = inject(BlogService);

  blogPosts = signal<IPost[]>([]);
  currentPage = signal<number>(1);
  totalPages = signal<number>(1);

  onPageChange(page: number) {
    this.currentPage.set(page);
    this.blogService.getPosts(page, false).subscribe((posts: any) => {
      this.blogPosts.set(posts.data);
      this.currentPage.set(posts.current_page);
      this.totalPages.set(posts.last_page);
    });
  }

  ngOnInit() {
    this.blogService.getPosts(1, false).subscribe((posts: any) => {
      console.log(posts);
      this.blogPosts.set(posts.data);
      this.currentPage.set(posts.current_page);
      this.totalPages.set(posts.last_page);
    });
  }
}
