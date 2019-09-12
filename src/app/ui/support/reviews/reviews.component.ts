import { Component, OnInit } from '@angular/core';
import { ReviewService } from 'src/app/services/support/review.service';
import { review } from 'src/app/interfaces/review';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.sass']
})
export class ReviewsComponent implements OnInit {
  public reviews;
  public selectReview:review;
  constructor(
    public auth : AuthService,
    private _reviewService:ReviewService,
  ){
    this.reviews = this._reviewService.getReviews();
  }
  ngOnInit(){

  }
  onReview(review){ this.selectReview = review;}
  onReviewDelete(reviewId){ this._reviewService.deleteReview(reviewId); }
}







