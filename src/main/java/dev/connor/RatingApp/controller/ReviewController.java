package dev.connor.RatingApp.controller;

import dev.connor.RatingApp.model.Review;
import dev.connor.RatingApp.service.ReviewService;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.swing.text.html.Option;
import java.awt.*;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@RestController
@RequestMapping(path = "/review")
public class ReviewController {

    @Autowired
    private ReviewService reviewService;

    @GetMapping(path = "/all")
    public ResponseEntity<List<Review>> getAllReviews(){
        List<Review> reviews = reviewService.getAllReviews();
        return new ResponseEntity<>(reviews, HttpStatus.OK);
    }

    @GetMapping(path = "/{id}")
    public ResponseEntity<?> getSingleReview(@PathVariable String id){
        Optional<Review> optionalReview = reviewService.getSingleReview(id);
        if (optionalReview.isPresent()){
            return ResponseEntity.ok(optionalReview.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping(path = "/newReview")
    public ResponseEntity<Review> addReview(@RequestBody Review review){
        Review savedReview = reviewService.createReview(review);
        return new ResponseEntity<>(savedReview, HttpStatus.CREATED);
    }

    @DeleteMapping(path = "/delete/{id}")
    public ResponseEntity<Void> deleteReview(@PathVariable String id){
        reviewService.deleteReview(id);
        return ResponseEntity.accepted().build();
    }

    @PutMapping(path = "/update/{id}")
    public ResponseEntity<Review> updateReview(@PathVariable String id, @RequestBody Review review){
        try {
            Review updated = reviewService.updateReview(id, review);
            return new ResponseEntity<>(updated, HttpStatus.ACCEPTED);
        } catch (NoSuchElementException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

}
