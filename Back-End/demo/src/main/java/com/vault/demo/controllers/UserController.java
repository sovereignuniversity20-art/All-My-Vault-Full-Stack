package com.vault.demo.controllers;

import com.vault.demo.dto.AuthRequestDTO;
import com.vault.demo.dto.AuthResponseDTO;
import com.vault.demo.dto.TokenValidationRequestDTO;
import com.vault.demo.dto.UserRequestDTO;
import com.vault.demo.services.CustomUserDetailsService;
import com.vault.demo.services.TokenBlacklistService;
import com.vault.demo.services.UserServiceImpl;
import com.vault.demo.utils.JwtTokenUtil;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class UserController {


    private final ModelMapper modelMapper;
    private final UserServiceImpl userService;
    private final AuthenticationManager authenticationManager;
    private final JwtTokenUtil jwtTokenUtil;
    private final CustomUserDetailsService customUserDetailsService;
    private final TokenBlacklistService tokenBlacklistService;

    private String extractJwtTokenFromRequest(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }

    public UserController(UserServiceImpl userService, AuthenticationManager authenticationManager, ModelMapper modelMapper, JwtTokenUtil jwtTokenUtil, CustomUserDetailsService customUserDetailsService, TokenBlacklistService tokenBlacklistService) {
        this.userService = userService;
        this. authenticationManager = authenticationManager;
        this. jwtTokenUtil = jwtTokenUtil;
        this.tokenBlacklistService = tokenBlacklistService;
        this.customUserDetailsService = customUserDetailsService;
        this.modelMapper = modelMapper;
    }
    @ResponseStatus
    @PostMapping("/register")
    public ResponseEntity<?> createUser(@Valid @RequestBody UserRequestDTO userRequestDTO) {
            return new ResponseEntity<>(userService.registerUser(userRequestDTO), HttpStatus.CREATED);
    }

    @PostMapping("/login")
        public ResponseEntity<?> authenticateUser(@RequestBody AuthRequestDTO authRequest) throws Exception {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authRequest.getEmail(), authRequest.getPassword())
        );
        UserDetails userDetails = customUserDetailsService.loadUserByUsername(authRequest.getEmail());
        String token = jwtTokenUtil.generateToken(userDetails);
        return new ResponseEntity<>(new AuthResponseDTO(token, authRequest.getEmail()), HttpStatus.OK);
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @PostMapping("/logout")
    public void logoutUser(HttpServletRequest request) {
            String jwtToken = extractJwtTokenFromRequest(request);
            if (jwtToken != null) {
                tokenBlacklistService.addTokenToBlacklist(jwtToken);
        }
    }

    @PostMapping("/validate-token")
    public ResponseEntity<String> checkTokenValid(@RequestBody TokenValidationRequestDTO tokenValidationRequestDTO) {
        UserDetails userDetails = customUserDetailsService.loadUserByUsername(tokenValidationRequestDTO.getEmail());
        if (jwtTokenUtil.validateToken(tokenValidationRequestDTO.getToken(), userDetails)) {
            return new  ResponseEntity<>("Token is Valid", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Token is invalid", HttpStatus.UNAUTHORIZED);

        }
    }



}
