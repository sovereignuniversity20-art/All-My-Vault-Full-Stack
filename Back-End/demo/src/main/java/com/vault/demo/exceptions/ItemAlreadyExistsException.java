package com.vault.demo.exceptions;

public class ItemAlreadyExistsException  extends RuntimeException{
    public ItemAlreadyExistsException(String message) {
        super(message);
    }
}
