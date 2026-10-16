import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  private url = 'http://127.0.0.1:8000/api/post/';
  public constructor(private http: HttpClient) {}

  public getPosts(page: number, withTrashed: boolean) {
    return this.http.post(this.url + 'get', { withTrashed: withTrashed, page: page });
  }

  public getPost(id: number) {
    return this.http.post(this.url + `${id}/get`, {});
  }

  public deletePost(id: number) {
    return this.http.post(this.url + `${id}/delete`, {});
  }

  public restorePost(id: number) {
    return this.http.post(this.url + `${id}/restore`, {});
  }

  public forceDeletePost(id: number) {
    return this.http.post(this.url + `${id}/force_delete`, {});
  }

  public addPost(formData: FormData) {
    return this.http.post(this.url + 'add', formData);
  }

  public updatePost(id: number, formData: FormData) {
    return this.http.post(this.url + `${id}/edit`, formData);
  }
}
