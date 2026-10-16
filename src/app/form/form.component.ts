import { Component, inject, input, output, signal } from '@angular/core';
import { BlogService } from '../services/blog.service';
import { FormsModule, NgForm } from '@angular/forms';
import { FormErrors } from '../interfaces/form-errors';
import Swal from 'sweetalert2';
import { IPost } from '../interfaces/post.interface';
import { CommonModule } from '@angular/common';

@Component({
  imports: [FormsModule, CommonModule],
  selector: 'app-form',
  styleUrl: './form.component.scss',
  templateUrl: './form.component.html',
})
export class FormComponent {
  blogService = inject(BlogService);
  type = input.required<string>();
  post = input<IPost>({
    id: 0,
    title: '',
    author_name: '',
    body: '',
    created_at: '',
    updated_at: '',
    deleted_at: null,
    total: 0,
  });
  title = signal<string>('');
  errors = signal<FormErrors>({});

  updatedPost = output<IPost>();

  ngOnChanges() {
    if (this.type() !== 'add' && this.type() !== 'edit') {
      Swal.fire({
        icon: 'error',
        title: 'Invalid type',
        text: 'An error occurred while loading the form. Please try again later.',
      });
    } else if (this.type() === 'edit') {
      if (!this.post) {
        Swal.fire({
          icon: 'error',
          title: 'Invalid post',
          text: 'An error occurred while loading the form. Please try again later.',
        });
      }
    }
    this.title.set(this.type() === 'add' ? 'Add Post' : 'Edit Post');
  }


  onSubmit(form: NgForm) {
    this.errors.set({});

    const request =
      this.type() === 'edit'
        ? this.blogService.updatePost(this.post()!.id, form.value)
        : this.blogService.addPost(form.value);

    request.subscribe({
      next: (response: any) => {
          form.resetForm();
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
          title: response.message || 'Post Updated Successfully',
        });
        document.getElementById('closeModal')?.click();
        this.updatedPost.emit(response);
      },
      error: (error: any) => {
        this.errors.set(error.error.errors);
      },
    });
  }
}
