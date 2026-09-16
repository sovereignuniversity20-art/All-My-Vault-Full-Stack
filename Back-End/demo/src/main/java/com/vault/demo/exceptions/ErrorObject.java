package com.vault.demo.exceptions;

import java.util.Date;

public class ErrorObject {

    private int statusCode;
    private String message;
    private Date timestamp;
    private String errorCode;

    public ErrorObject(int statusCode, String message, Date timestamp, String errorCode) {
        this.statusCode = statusCode;
        this.message = message;
        this.timestamp = timestamp;
        this.errorCode = errorCode;
    }

    public ErrorObject(){}

    public int getStatusCode() {
        return statusCode;
    }

    public void setStatusCode(int statusCode) {
        this.statusCode = statusCode;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Date getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Date timestamp) {
        this.timestamp = timestamp;
    }

    public String getErrorCode() {
        return errorCode;
    }

    public void setErrorCode(String errorCode) {
        this.errorCode = errorCode;
    }
}
