document.addEventListener('DOMContentLoaded', function () {
    // Function to add entry to table
    function addReviewToTable(review) {
        var newRow = $('<tr id="review-' + review.id + '" data-review-type="' + review.reviewType + '">' +
            '<td>' + review.title + '</td>' +
            '<td>' + review.reviewType + '</td>' +
            '<td>' + review.rating + '</td>' +
            '<td>' + review.comment + '</td>' +
            '<td><button class="btn btn-primary update-review" data-review-id="' + review.id + '">Update</button> ' +
            '<button class="btn btn-danger delete-review" data-review-id="' + review.id + '">Delete</button></td>' +
            '</tr>');
        $('#reviewTableBody').append(newRow);
    }


    // Function to populate table with reviews from the database
    function populateTableWithReviews() {
        fetch('/review/all')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                if (data.length === 0) {
                    return;
                } else {
                    data.forEach(review => {
                        addReviewToTable(review);
                    });
                }
            })
            .catch(error => {
                console.error('Error fetching reviews:', error);
                alert('Error populating reviews. Please try again.');
            });
    }

    // Call function to populate table with reviews when the page loads
    populateTableWithReviews();

    // Function to handle delete button click
    $('#reviewTableBody').on('click', '.delete-review', function () {
        var reviewId = $(this).data('review-id');
        fetch('/review/delete/' + reviewId, {
            method: 'DELETE'
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return;
        })
        .then(data => {
            $('#review-' + reviewId).remove(); // Remove the row from the table
        })
        .catch(error => {
            console.error('Error deleting review:', error);
            alert('Error deleting review. Please try again.');
        });
    });

    // Function to handle filter change
    $('#reviewTypeFilter').on('change', function () {
        var selectedType = $(this).val();
        $('#reviewTableBody tr').each(function () {
            if (selectedType === 'ALL' || $(this).data('review-type') === selectedType) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    });


    // Form submission handling
    $('#reviewForm').submit(function (event) {
        event.preventDefault();
        var formData = {
            title: $('#title').val(),
            rating: $('#rating').val(),
            comment: $('#comment').val(),
            reviewType: $('#reviewType').val()
        };
        var reviewId = $('#reviewForm button[type="submit"]').data('review-id');
        console.log(reviewId);
        var url = reviewId ? '/review/update/' + reviewId : '/review/newReview';
        var method = reviewId ? 'PUT' : 'POST';
        fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (reviewId) {
                // Update existing review in table
                $('#review-' + reviewId + ' td:nth-child(1)').text(data.title);
                $('#review-' + reviewId + ' td:nth-child(2)').text(data.reviewType);
                $('#review-' + reviewId + ' td:nth-child(3)').text(data.rating);
                $('#review-' + reviewId + ' td:nth-child(4)').text(data.comment);
            } else {
                // Add new review to table
                addReviewToTable(data);
            }
            clearFormFields(); // Clear the form fields
        })
        .catch(error => {
            console.error('Error submitting review:', error);
            alert('Error submitting review. Please try again.');
        });
    });

    // Function to clear form fields
    function clearFormFields() {
        $('#title').val('');
        $('#rating').val('');
        $('#comment').val('');
        $('#reviewType').val('');
    }

    // Function to populate form with review data for update
    function populateFormForUpdate(review) {
        $('#title').val(review.title);
        $('#rating').val(review.rating);
        $('#comment').val(review.comment);
        $('#reviewType').val(review.reviewType);
        $('#reviewForm button[type="submit"]').data('review-id', review.id);
    }

    // Handle update button click
    $('#reviewTableBody').on('click', '.update-review', function () {
        var reviewId = $(this).data('review-id');
        fetch('/review/' + reviewId)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                populateFormForUpdate(data);
            })
            .catch(error => {
                console.error('Error fetching review for update:', error);
                alert('Error fetching review for update. Please try again.');
            });
    });
});
