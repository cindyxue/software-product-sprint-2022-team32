package com.google.sps.data;

/** Represents a clinic at a specific lat lng point. */
public class clinicsNearby {
  private double lat;
  private double lng;
  private String location;
  private String name;

  public clinicsNearby(double lat, double lng, String name, String location) {
    this.lat = lat;
    this.lng = lng;
    this.name= name;
    this.location= location;
  }
}