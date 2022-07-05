package com.google.sps.servlets;

import com.google.gson.Gson;
import com.google.sps.data.DatastoreService;
import com.google.sps.data.User;

import java.io.IOException;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/* Handles the login page. */
@WebServlet("/api/login")
public class Login extends ServletTemplate {

    @Override
    // Using the html form, validate the user's credentials and returns the user data if they are valid.
    public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        try{

            String payloadRequest = getBody(request);

            Gson g = new Gson();

            User u = g.fromJson(payloadRequest,User.class);

            String username = u.getUsername();
            String password = u.getPasswordHash();
            
            DatastoreService datastoreService = new DatastoreService();
            User user = datastoreService.getUser(username);
            if (user == null) {
                sendJSONResponse(response,"{\"error\":\"Invalid username.\"}");
                return;
            }
            if (!datastoreService.validateCredentials(user, password)){
                sendJSONResponse(response, "{\"error\":\"Invalid password.\"}");
                return;
            }

            /*Return the user data if the credentials are valid.*/
            Gson gson = new Gson();
            String json = gson.toJson(user);
            String message = "{\"success\":" + json + "}" ;
            sendJSONResponse(response,message);
        } catch (Exception e){
            String message = "{\"error\":\"Error: " + e + " \"}" ;
            sendJSONResponse(response,message);
        }
    }
}

