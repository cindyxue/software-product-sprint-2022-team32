package com.google.sps.servlets;

import com.google.gson.Gson;
import com.google.sps.data.DatastoreService;
import com.google.sps.data.User;
import java.io.IOException;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;



/* Handles adding a day to the calendar of an user. */
@WebServlet("/api/update-user")
public class UpdateUser extends ServletTemplate {
    /* Class to help retrieve payload*/
    public class HelperClass{
        
        private final User user;
        private final String prevUsername;
        private final String prevPasswordHash;
        private final String prevEmail;

        public HelperClass(User _user, String _prevPasswordHash, String _prevUsername, String _prevEmail){
            user = _user;
            prevUsername = _prevUsername;
            prevPasswordHash = _prevPasswordHash;
            prevEmail = _prevEmail;
        }

        public User getUser() {
            return this.user;
        }
        public String getPrevUsername(){
            return this.prevUsername;
        }
        public String getPrevPasswordHash(){
            return this.prevPasswordHash;
        }
        public String getPrevEmail(){
            return this.prevEmail;
        }
    }

    @Override
    // Using the html form, validate the user's credentials and returns the user data if they are valid.
    public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        try{
            String payloadRequest = getBody(request);

            Gson g = new Gson();

            HelperClass helper = g.fromJson(payloadRequest,HelperClass.class);
            User u = helper.getUser();
            String prevUsername = helper.getPrevUsername();
            String prevEmail = helper.getPrevEmail();
            String prevPasswordHash = helper.getPrevPasswordHash();

            DatastoreService datastoreService = new DatastoreService();
            User user = datastoreService.getUser(prevUsername);
            // Check Credentials
            if (user == null) {
                sendJSONResponse(response,"{\"error\":\"Invalid username.\"}");
                return;
            }
            if (!datastoreService.validateCredentials(prevUsername, prevPasswordHash)){
                sendJSONResponse(response,"{\"error\":\"Invalid password.\"}");
                return;
            }
            // Check New Data Availability
            if ((!prevUsername.equals(u.getUsername())) && (!datastoreService.validateUniqueUsername(u.getUsername()))){
                sendJSONResponse(response,"{\"error\":\"Username already taken.\"}");
                return;
            }
            if ((!prevEmail.equals(u.getEmail())) && (!datastoreService.validateUniqueEmail(u.getEmail()))){
                sendJSONResponse(response,"{\"error\":\"Email already taken.\"}");
                return;
            }

            datastoreService.updateUser(prevUsername,u);
            sendJSONResponse(response,"{\"success\":\"User Updated.\"}");
        } catch (Exception e){
            String message = "{\"error\":\"" + e + "\"}" ;
            sendJSONResponse(response,message);
        }   
    }
}

