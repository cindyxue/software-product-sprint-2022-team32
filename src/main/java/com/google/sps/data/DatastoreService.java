package com.google.sps.data;

import com.google.cloud.datastore.Datastore;
import com.google.cloud.datastore.DatastoreOptions;
import com.google.cloud.datastore.StructuredQuery.PropertyFilter;
import com.google.gson.Gson;
import com.google.cloud.datastore.Entity;
import com.google.cloud.datastore.FullEntity;
import com.google.cloud.datastore.KeyFactory;
import com.google.cloud.datastore.Query;
import com.google.cloud.datastore.QueryResults;
import com.google.cloud.datastore.StringValue;

import java.util.ArrayList;
import java.util.List;

public class DatastoreService {

    public List<Day> JSONlist2ObjectList(List<StringValue> calendar){
        Gson g = new Gson();
        List<Day> cal = new ArrayList<Day>();
        for (StringValue temp : calendar) {
            String day = temp.get();
            Day d = g.fromJson(day, Day.class);
            cal.add(d);
        }
        return cal;
    }

    public List<String> ValueString2StringList(List<StringValue> journal){
        List<String> jou = new ArrayList<String>();
        for (StringValue temp : journal) {
            String entry = temp.get();
            jou.add(entry);
        }
        return jou;
    }

    // Retrieves properties from a datastore entity and creates an user object with that data.
    public User createUser(Entity entity){

        String username = entity.getString("username");
        String email = entity.getString("email");
        String passwordHash = entity.getString("passwordHash");

        String firstName = entity.getString("firstName");
        String middleName = entity.getString("middleName");
        String lastName = entity.getString("lastName");

        List<StringValue> tempCalendar = entity.getList("calendar");
        List<StringValue> tempJournal = entity.getList("journal");

        List<Day> calendar = JSONlist2ObjectList(tempCalendar);
        List<String> journal = ValueString2StringList(tempJournal);

        long panicButtonPressed = entity.getLong("panicButtonPressed");

        User user = new User(username, email, passwordHash, firstName, middleName, lastName, calendar, journal, panicButtonPressed);
        return user;
    }

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
            User user = createUser(entity);
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
    public boolean validateCredentials(String username, String password) {
        User user = getUser(username);
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
            return createUser(entity);
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
                User user = createUser(entity);
                return user;
            }
        }
        return null;
    }

    /*Constructs a datastore entity from an user object*/
    public FullEntity createEntity(User user){
        Datastore datastore = DatastoreOptions.getDefaultInstance().getService();
        KeyFactory keyFactory = datastore.newKeyFactory().setKind("User");
        FullEntity entity = Entity.newBuilder(keyFactory.newKey(user.getUsername()))
                .set("username", user.getUsername())
                .set("email", user.getEmail())
                .set("passwordHash", user.getPasswordHash())
                .set("firstName", user.getFirstName())
                .set("middleName", user.getMiddleName())
                .set("lastName", user.getLastName())
                .set("calendar", user.getCalendarAsStrings())
                .set("journal", user.getJournalAsStrings())
                .set("panicButtonPressed", user.getPanicButtonPressed())
                .build();
        return entity;
    }

    /* Saves new user to Datastore. Validates that the user does not already exist. */
    public void saveUser(User user) {
        Datastore datastore = DatastoreOptions.getDefaultInstance().getService();
        FullEntity entity = createEntity(user);
        datastore.put(entity); // A Datastore put (a.k.a upsert) operation: creates an entity if it does not exist, updates it otherwise.
    }

    /* Updates user in Datastore. Validates that the user exists. */
    public void updateUser(String prevUsername, User user) {
        Datastore datastore = DatastoreOptions.getDefaultInstance().getService();
        User prevUser = getUser(prevUsername);
        
        if ((prevUser.getUsername() != user.getUsername())){
            deleteUser(prevUsername, prevUser.getPasswordHash());
            saveUser(user);
            return;
        } 
        
        FullEntity entity = createEntity(user);
        datastore.put(entity);
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
