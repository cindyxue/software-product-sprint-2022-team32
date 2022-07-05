package com.google.sps.data;

/*
Day: {
	Date: datetime
	Mood: int -> happy face mood meter
}
 */

// Complementary class for the user class
public final class Day {

    private final long date;
    private final byte mood;

    public Day(long _date, byte _mood) {
        date = _date;
        mood = _mood;
    }

    public long getDate() {
        return this.date;
    }

    public int getMood() {
        return this.mood;
    }
}