import { Component, inject, input, output, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BlogService } from '../../services/blog.service';
import { IPost } from '../../interfaces/post.interface';
import Swal from 'sweetalert2';

@Component({
  imports: [RouterLink],
  selector: 'app-post',
  styleUrl: './post.component.scss',
  templateUrl: './post.component.html',
})
export class PostComponent {
  buttons = input.required<boolean>();
  post = input.required<IPost>();
  blogService = inject(BlogService);
  deletedAt = signal<string | null>(null);
  isDeleted = signal<boolean>(false);
  updatePost = output<IPost>();

  ngOnInit() {
    this.deletedAt.set(this.post().deleted_at);
  }
  postDelete() {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.blogService.deletePost(this.post().id).subscribe({
          next: (response: any) => {
            this.deletedAt.set(new Date().toString());
            Swal.mixin({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
              },
            }).fire({
              icon: 'success',
              title: response.message,
            });
          },
          error: (error: any) => {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: error.message,
            });
          },
        });
      }
    });
  }

  postRestore() {
    Swal.fire({
      title: 'Restore Post?',
      text: 'Are you sure you want to restore this post?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, restore it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.blogService.restorePost(this.post().id).subscribe({
          next: (response: any) => {
            this.deletedAt.set(null);
            Swal.mixin({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
              },
            }).fire({
              icon: 'success',
              title: response.message,
            });
          },
          error: (error: any) => {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: error.message,
            });
          },
        });
      }
    });
  }

  postForceDelete() {
    Swal.fire({
      title: 'Are you sure?',
      text: "This will permanently delete the post! You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete permanently!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.blogService.forceDeletePost(this.post().id).subscribe({
          next: (response: any) => {
            this.isDeleted.set(true);
            Swal.mixin({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
              },
            }).fire({
              icon: 'success',
              title: response.message,
            });
          },
          error: (error: any) => {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: error.message,
            });
          },
        });
      }
    });
  }

  editPost(post: IPost) {
    this.updatePost.emit(post);
  }
}
