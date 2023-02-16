import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(
    private http: HttpClient
  ) { }

  /**
   * to get all the posts
   * 
   * @returns 
   */
  getPosts() {
    return this.http.get<any>(`https://jsonplaceholder.typicode.com/posts`);
  }

  /**
   * to get all users
   * 
   * @returns 
   */
  getUsers() {
    return this.http.get<any>(`https://jsonplaceholder.typicode.com/users`);
  }


  /**
   * to get initial data
   * 
   * @param data 
   * @returns 
   */
  getInitialData(data: any[]) {
    let paginated_data = [];
    let to: number;
    let from: number;
    let last_page_number: number;

    if (data?.length > 10) {
      to = 10;
      paginated_data = data?.slice(0, 10);
    } else {
      paginated_data = data;
      to = data?.length;
    }
    from = data?.length == 0 ? 0 : 1;
    last_page_number = Math.ceil(data.length / 10);


    let return_data = {
      from: from,
      to: to,
      last_page_number: last_page_number,
      data: paginated_data
    };

    return return_data;
  }

  /**
   * to get next or previous page data
   * 
   * @param data 
   * @param page_number 
   * @param from 
   * @param to 
   * @param last_page_number 
   * @param movement 
   * @returns 
   */
  navigateToPage(
    data: any,
    page_number: number,
    from: number,
    to: number,
    last_page_number: number,
    movement: 'next' | 'previous'
  ) {
    if (movement == 'previous' && page_number == 1) {
      console.log('You are at first page');
      return;
    } else if (movement == 'next' && page_number == last_page_number) {
      console.log('You are at the last page');
      return;
    } else if (movement == 'previous') {
      let paginated_data = [];
      page_number--;
      paginated_data = data.slice(from - 10, from);
      to = from - 1;
      if (page_number == 1) {
        from = 1;
      } else {
        from = (to - 10) + 1;
      }


      let return_data = {
        from: from,
        to: to,
        last_page_number: last_page_number,
        data: paginated_data
      };

      return return_data;
    } else if (movement == 'next') {
      let paginated_data = [];
      page_number++;
      paginated_data = data.slice(to, to + 10);
      from = to + 1;
      if (paginated_data.length < 10) {
        to = data.length;
      } else {
        to = (from + 10) - 1;
      }


      let return_data = {
        from: from,
        to: to,
        last_page_number: last_page_number,
        data: paginated_data
      };

      return return_data;
    } else {
      console.log('Oops, wrong page number');
      return;
    }
  }
}
