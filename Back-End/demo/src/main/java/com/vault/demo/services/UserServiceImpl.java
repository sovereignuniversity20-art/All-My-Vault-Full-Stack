package com.vault.demo.services;

import com.vault.demo.dto.UserRequestDTO;
import com.vault.demo.dto.UserResponseDTO;
import com.vault.demo.exceptions.ItemAlreadyExistsException;
import com.vault.demo.models.User;
import com.vault.demo.repositories.UserRepository;
import org.modelmapper.ModelMapper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;



@Service
public class UserServiceImpl  {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final ModelMapper modelMapper;

    public UserServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder, ModelMapper modelMapper) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.modelMapper = modelMapper;
    }

    public UserResponseDTO registerUser(UserRequestDTO userRequestDTO) {
        if (userRepository.findByEmail(userRequestDTO.getEmail()).isPresent()) {
            throw new ItemAlreadyExistsException("User already exists with this email:" + userRequestDTO.getEmail());
        }
            User user = modelMapper.map(userRequestDTO, User.class);
            user.setPassword(passwordEncoder.encode(userRequestDTO.getPassword()));
            User savedUser = userRepository.save(user);
        return modelMapper.map(savedUser, UserResponseDTO.class);

    }
}

