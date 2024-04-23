package dev.connor.RatingApp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@SpringBootApplication
@Controller
public class RatingAppApplication {

	@GetMapping
	public String showWelcomePage(){
		return "welcome";
	}

	public static void main(String[] args) {
		SpringApplication.run(RatingAppApplication.class, args);
	}

}
