CREATE TABLE review (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255),
    rating DOUBLE,
    comment VARCHAR(255),
    reviewType VARCHAR(255)
);
