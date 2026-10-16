import { Component, inject, signal } from '@angular/core';
import { PostComponent } from '../shared/post/post.component';
import { BlogService } from '../services/blog.service';
import { IPost } from '../interfaces/post.interface';
import { PaginationComponent } from '../shared/pagination/pagination.component';
import Swal from 'sweetalert2';
import { FormComponent } from '../form/form.component';

@Component({
  imports: [PostComponent, PaginationComponent, FormComponent],
  selector: 'app-dashboard',
  styleUrl: './dashboard.component.scss',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
  blogService = inject(BlogService);

  blogPosts = signal<IPost[]>([]);
  currentPage = signal<number>(1);
  totalPages = signal<number>(1);
  type = signal<string>('add');
  postToEdit = signal<IPost>({
    id: 0,
    title: '',
    author_name: '',
    body: '',
    created_at: '',
    updated_at: '',
    deleted_at: null,
    total: 0,
  });
  onPageChange = (page: number) => {
    this.currentPage.set(page);
    this.blogService.getPosts(page, true).subscribe({
      next: (posts: any) => {
        this.blogPosts.set(posts.data);
        this.currentPage.set(posts.current_page);
        this.totalPages.set(posts.last_page);
      },
      error: (error: any) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.message || 'No posts found.',
        });
      },
    });
  };

  ngOnInit() {
    this.blogService.getPosts(1, true).subscribe((posts: any) => {
      console.log(posts);
      this.blogPosts.set(posts.data);
      this.currentPage.set(posts.current_page);
      this.totalPages.set(posts.last_page);
      console.log('currentPage:', this.currentPage());
      console.log('totalPages:', this.totalPages());
    });
  }

  EditPost(post: IPost) {
    this.type.set('edit');
    this.postToEdit.set(post);
    console.log('Post to edit:', post, 'Type:', this.type());
  }

  PostUpdate(updatedPost: IPost) {
    this.blogPosts.update((posts) => posts.map((p) => (p.id === updatedPost.id ? updatedPost : p)));
  }

  openAddModal() {
    this.type.set('add');
    this.postToEdit.set({
      id: 0,
      title: '',
      author_name: '',
      body: '',
      created_at: '',
      updated_at: '',
      deleted_at: null,
      total: 0,
    });
  }
}
