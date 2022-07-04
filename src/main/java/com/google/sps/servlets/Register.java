package com.google.sps.servlets;

import com.google.gson.Gson;
import com.google.sps.data.DatastoreService;
import com.google.sps.data.User;

import java.io.IOException;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/* Handles the register page. */
@WebServlet("/api/register")
public class Register extends ServletTemplate  {

    @Override
    // Using the html form, register a new user if the username and email are not already taken.
    public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String payloadRequest = getBody(request);

        Gson g = new Gson();

        User u = g.fromJson(payloadRequest,User.class);

        String username = u.getUsername();
        String email = u.getEmail();
        String password = u.getPasswordHash();
        String firstName = u.getFirstName();
        String middleName = u.getMiddleName();
        String lastName = u.getLastName();

        DatastoreService datastoreService = new DatastoreService();

        try{

            if (!datastoreService.validateUniqueUsername(username)){
                sendJSONResponse(response,"{\"error\":\"Username already taken.\"}");
                return;
            }
            if (!datastoreService.validateUniqueEmail(email)){
                sendJSONResponse(response,"{\"error\":\"Email already taken.\"}");
                return;
            }
            User user = new User(username, email, password, firstName, middleName, lastName);
            datastoreService.saveUser(user);
            sendJSONResponse(response,"{\"success\":\"Account registered.\"}");
        } catch(Exception e){
            String message = "{\"error\":\"Error registering account: " + e + " \"}" ;
            sendJSONResponse(response,message);
        }
    }
}