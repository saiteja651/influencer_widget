// posts.service.ts

import { Injectable } from '@angular/core';
import { Posts } from '../../models/post';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor() { }

  getPosts():Posts[] {
    return [
      {
        recognized_by: "saiteja",
        recognized: "john david",
      },
      {
        recognized_by: "saiteja",
        recognized: "john david",
      },
      {
        recognized_by: "saiteja",
        recognized: "john david",
      },
      {
        recognized_by: "saiteja",
        recognized: "john david",
      },
      {
        recognized_by: "saiteja",
        recognized: "john david",
      },
      {
        recognized_by: "saiteja",
        recognized: "john david",
      },
      {
        recognized_by: "saiteja",
        recognized: "john david",
      },
      {
        recognized_by: "saiteja",
        recognized: "john david",
      },
      
    ];
  }
}
