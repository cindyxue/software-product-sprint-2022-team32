package com.google.sps.data;

import java.util.ArrayList;
import java.util.List;

import com.google.cloud.datastore.Value;



/*
User: {

	Username: string
    Email: string,
	Password Hash: string (hash252)

    First Name: string
	Middle Name: string
	Last Name: string

	Calendar: array[days] -> class day defined in other file
    Journal: array[string]

	Times Panic Button Pressed: int -> analyze how each user is doing / automatically load resources if pressed constantly 
}
 */

public final class User {

    private final String username;
    private final String email;
    private final String passwordHash;

    private final String firstName;
    private final String middleName;
    private final String lastName;

    private final List<Value<?>> calendar;
    private final List<Value<?>> journal;
    private final long panicButtonPressed;

    // Constructor for User

    public User(String _username, String _email, String _passwordHash, String _firstName, String _middleName, String _lastName, List<Value<?>> _calendar, List<Value<?>>_journal, long _panicButtonPressed) {

        username = _username;
        email = _email;
        passwordHash = _passwordHash;

        firstName = _firstName;
        middleName = _middleName;
        lastName = _lastName;

        calendar = _calendar;
        journal = _journal;

        panicButtonPressed = _panicButtonPressed;
    }

    public User(String _username, String _email, String _passwordHash, String _firstName, String _middleName, String _lastName) {

        username = _username;
        email = _email;
        passwordHash = _passwordHash;

        firstName = _firstName;
        middleName = _middleName;
        lastName = _lastName;
        
        calendar = new ArrayList<Value<?>>();
        journal = new ArrayList<Value<?>>();

        panicButtonPressed = 0;
    }


    // Getters

    public String getUsername() {
        return this.username;
    }

    public String getEmail() {
        return this.email;
    }

    public String getPasswordHash() {
        return this.passwordHash;
    }

    public String getFirstName() {
        return this.firstName;
    }

    public String getMiddleName() {
        return this.middleName;
    }

    public String getLastName() {
        return this.lastName;
    }

    public List<Value<?>> getCalendar() {
        return this.calendar;
    }

    public List<Value<?>> getJournal() {
        return this.journal;
    }

    public long getPanicButtonPressed() {
        return this.panicButtonPressed;
    }

    // Special getters for the calendar and journal

    public List<String> getCalendarAsStrings() {
        List<String> calendarAsStrings = new ArrayList<String>();
        for (Value<?> day : this.calendar) {
            calendarAsStrings.add(day.toString());
        }
        return calendarAsStrings;
    }

    public List<String> getJournalAsStrings() {
        List<String> journalAsStrings = new ArrayList<String>();
        for (Value<?> entry : this.journal) {
            journalAsStrings.add(entry.toString());
        }
        return journalAsStrings;
    }

}


