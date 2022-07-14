package com.google.sps.data;

public class Entry {
    
    private final long date;
    private final String message;

    public Entry(long _date, String _message) {
        date = _date;
        message = _message;
    }

    public long getDate() {
        return this.date;
    }

    public String getMessage() {
        return this.message;
    }

    public String returnString(){
        return "Date: " + this.date + " Message: " + this.message;
    }
}
