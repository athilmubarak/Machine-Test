import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

  //Variables
  posts: any;
  paginated_data: any;
  current_page: number = 1;
  is_loading: boolean = false;

  constructor(
    private common_service: CommonService
  ) { }

  ngOnInit(): void {
    this.posts = [];
    this.is_loading = true;
    this.common_service.getPosts().subscribe({
      next: res => {
        console.log(res);

        this.posts = res;
        if (res.length > 0) {
          this.paginated_data = this.common_service.getInitialData(res);
          this.current_page = 1;
        }
      },
      complete: () => this.is_loading = false,
      error: error => {
        console.error(error);
        this.is_loading = false;
      }
    });
  }

  navigateToPage(movement: 'previous' | 'next') {
    if (movement == 'previous' && this.current_page === 1) {
      console.log('You are at the first page');
    } else if (movement == 'next' && this.current_page == this.paginated_data.last_page_number) {
      console.log('You are at the last page');
    } else {
      this.paginated_data = this.common_service.navigateToPage(
        this.posts,
        this.current_page,
        this.paginated_data.from,
        this.paginated_data.to,
        this.paginated_data.last_page_number,
        movement
      );
      this.current_page = movement == 'next' ? this.current_page + 1 : this.current_page - 1;
    }
  }

}
