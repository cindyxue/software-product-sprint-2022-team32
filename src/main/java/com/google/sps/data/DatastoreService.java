package com.google.sps.data;

import com.google.cloud.datastore.Datastore;
import com.google.cloud.datastore.DatastoreOptions;
import com.google.cloud.datastore.StructuredQuery.PropertyFilter;
import com.google.cloud.datastore.Entity;
import com.google.cloud.datastore.FullEntity;
import com.google.cloud.datastore.KeyFactory;
import com.google.cloud.datastore.Query;
import com.google.cloud.datastore.QueryResults;
//import com.google.cloud.datastore.StructuredQuery.OrderBy;
import java.util.ArrayList;
import java.util.List;

public class DatastoreService {

    /* Returns a List of all Users stored in Datastore.
        !!! Used for debugging.
    */
    public List<User> getAllUsers() {
        Datastore datastore = DatastoreOptions.getDefaultInstance().getService();
        Query<Entity> query = Query.newEntityQueryBuilder().setKind("User").build();
        QueryResults<Entity> results = datastore.run(query);
        List<User> users = new ArrayList<>();
        while (results.hasNext()) {
            Entity entity = results.next();

            String username = entity.getString("username");
            String email = entity.getString("email");
            String passwordHash = entity.getString("passwordHash");

            String firstName = entity.getString("firstName");
            String middleName = entity.getString("middleName");
            String lastName = entity.getString("lastName");
            
            var calendar = entity.getList("calendar");
            var journal = entity.getList("journal");
            
            long panicButtonPressed = entity.getLong("panicButtonPressed");

            User user = new User(username, email, passwordHash, firstName, middleName, lastName, calendar, journal, panicButtonPressed);
            users.add(user);
        }
        return users;
    }
    
    /* Validates user credentials. */
    public boolean validateCredentials(User user, String password) {
        if (user == null) {
            return false;
        }
        return user.getPasswordHash().equals(password);
    }

    /* Returns a User with the given username. */
    public User getUser(String username) {
        Datastore datastore = DatastoreOptions.getDefaultInstance().getService();
        Query<Entity> query = Query.newEntityQueryBuilder()
            .setKind("User")
            .setFilter(PropertyFilter.eq("username", username))
            .build();
        QueryResults<Entity> results = datastore.run(query);
        if (results.hasNext()) {
            Entity entity = results.next();

            String email = entity.getString("email");
            String passwordHash = entity.getString("passwordHash");

            String firstName = entity.getString("firstName");
            String middleName = entity.getString("middleName");
            String lastName = entity.getString("lastName");

            var calendar = entity.getList("calendar");
            var journal = entity.getList("journal");

            long panicButtonPressed = entity.getLong("panicButtonPressed");

            User user = new User(username, email, passwordHash, firstName, middleName, lastName, calendar, journal, panicButtonPressed);
            return user;
        }
        return null;
    }

    /* Returns a User with the given username and password. */
    public User getUser(String username, String password) {
        Datastore datastore = DatastoreOptions.getDefaultInstance().getService();
        Query<Entity> query = Query.newEntityQueryBuilder()
            .setKind("User")
            .setFilter(PropertyFilter.eq("username", username))
            .build();
        if (validateCredentials(getUser(username),password)){
            QueryResults<Entity> results = datastore.run(query);
            if (results.hasNext()) {
                Entity entity = results.next();

                String email = entity.getString("email");
                String passwordHash = entity.getString("passwordHash");

                String firstName = entity.getString("firstName");
                String middleName = entity.getString("middleName");
                String lastName = entity.getString("lastName");

                var calendar = entity.getList("calendar");
                var journal = entity.getList("journal");

                long panicButtonPressed = entity.getLong("panicButtonPressed");

                User user = new User(username, email, passwordHash, firstName, middleName, lastName, calendar, journal, panicButtonPressed);
                return user;
            }
        }
        return null;
    }

    /* Saves new user to Datastore. Validates that the user does not already exist. */
    public void saveUser(User user) {
        Datastore datastore = DatastoreOptions.getDefaultInstance().getService();
        KeyFactory keyFactory = datastore.newKeyFactory().setKind("User");
        FullEntity entity = Entity.newBuilder(keyFactory.newKey(user.getUsername()))
                .set("username", user.getUsername())
                .set("email", user.getEmail())
                .set("passwordHash", user.getPasswordHash())
                .set("firstName", user.getFirstName())
                .set("middleName", user.getMiddleName())
                .set("lastName", user.getLastName())
                .set("calendar", user.getCalendar())
                .set("journal", user.getJournal())
                .set("panicButtonPressed", user.getPanicButtonPressed())
                .build();
        // datastore.add(user); // Datastore add operation: inserts the provided entities.
        datastore.put(entity); // A Datastore put (a.k.a upsert) operation: creates an entity if it does not exist, updates it otherwise.
    }

    /* Updates user in Datastore. Validates that the user exists. */
    public void updateUser(String username, String password, User user) {
        Datastore datastore = DatastoreOptions.getDefaultInstance().getService();
        KeyFactory keyFactory = datastore.newKeyFactory().setKind("User");
        if (validateCredentials(getUser(username), password)) {
            FullEntity entity = Entity.newBuilder(keyFactory.newKey(username))
                .set("username", user.getUsername())
                .set("email", user.getEmail())
                .set("passwordHash", user.getPasswordHash())
                .set("firstName", user.getFirstName())
                .set("middleName", user.getMiddleName())
                .set("lastName", user.getLastName())
                .set("calendar", user.getCalendar())
                .set("journal", user.getJournal())
                .set("panicButtonPressed", user.getPanicButtonPressed())
                .build();
            datastore.put(entity);
        }
        else{
            throw new IllegalArgumentException("Invalid credentials");
        }
    }

    /* Deletes user from Datastore. Validates that the user exists. */
    public void deleteUser(String username, String password) {
        Datastore datastore = DatastoreOptions.getDefaultInstance().getService();
        KeyFactory keyFactory = datastore.newKeyFactory().setKind("User");
        if (validateCredentials(getUser(username), password)) {
            datastore.delete(keyFactory.newKey(username));
        }
        else{
            throw new IllegalArgumentException("Invalid credentials");
        }
    }

    /* Validate if username and email are unique. */
    public boolean validateUniqueUsername(String username){
        Datastore datastore = DatastoreOptions.getDefaultInstance().getService();
        Query<Entity> query = Query.newEntityQueryBuilder()
            .setKind("User")
            .setFilter(PropertyFilter.eq("username", username))
            .build();
        QueryResults<Entity> results = datastore.run(query);
        if (results.hasNext()) {
            return false;
        }
        return true;
    }
    public boolean validateUniqueEmail(String email){
        Datastore datastore = DatastoreOptions.getDefaultInstance().getService();
        Query<Entity> query = Query.newEntityQueryBuilder()
            .setKind("User")
            .setFilter(PropertyFilter.eq("email", email))
            .build();
        QueryResults<Entity> results = datastore.run(query);
        if (results.hasNext()) {
            return false;
        }
        return true;
    }

    /*Delete All */
    public void deleteAll(){
        Datastore datastore = DatastoreOptions.getDefaultInstance().getService();
        Query<Entity> query = Query.newEntityQueryBuilder()
            .setKind("User")
            .build();
        QueryResults<Entity> results = datastore.run(query);
        while (results.hasNext()) {
            Entity entity = results.next();
            datastore.delete(entity.getKey());
        }
    }

}
