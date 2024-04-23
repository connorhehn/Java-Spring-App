package dev.connor.RatingApp.service;


import dev.connor.RatingApp.model.Review;
import dev.connor.RatingApp.repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.UUID;

@Service
public class ReviewService {
    @Autowired
    private ReviewRepository reviewRepository;

    public List<Review> getAllReviews(){
        return reviewRepository.findAll();
    }

    public Optional<Review> getSingleReview(String id){
        return reviewRepository.findById(id);
    }

    public boolean reviewExists(String id){
        return reviewRepository.existsById(id);
    }

    public Review createReview(Review review){
        String uniqueId = UUID.randomUUID().toString();
        review.setId(uniqueId);
        return reviewRepository.save(review);
    }

    public void deleteReview(String id){
        reviewRepository.deleteById(id);
    }

    public Review updateReview(String id, Review newReview) {
        Optional<Review> optionalReview = getSingleReview(id);
        if (optionalReview.isPresent()) {
            Review existingReview = optionalReview.get();
            existingReview.setTitle(newReview.getTitle());
            existingReview.setComment(newReview.getComment());
            existingReview.setRating(newReview.getRating());
            existingReview.setReviewType(newReview.getReviewType());
            return reviewRepository.save(existingReview);
        } else {
            throw new NoSuchElementException("Review not found");
        }
    }

}
