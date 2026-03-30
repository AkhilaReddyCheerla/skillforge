package com.skillforge.controller;

import com.skillforge.dto.LoginRequest;
import com.skillforge.dto.JwtResponse;
import com.skillforge.dto.ErrorResponse;
import com.skillforge.dto.RegisterRequest;
import com.skillforge.dto.MessageResponse;
import com.skillforge.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public Object login(@RequestBody LoginRequest req) {
        String token = authService.login(req);
        if (token == null) {
            return new ErrorResponse("Invalid email or password");
        }
        return new JwtResponse(token);
    }

    @PostMapping("/register")
    public MessageResponse register(@RequestBody RegisterRequest req) {
        String msg = authService.register(req);
        return new MessageResponse(msg);
    }
}
