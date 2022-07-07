package com.google.sps.servlets;

import com.google.gson.Gson;
import com.google.sps.data.DatastoreService;
import com.google.sps.data.User;

import java.io.IOException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/* Deletes all Users stored in Datastore, used for debugging. */
@WebServlet("/api/delete-user")
public class DeleteUser extends ServletTemplate {

    @Override
    public void doPost(HttpServletRequest request, HttpServletResponse response)
        throws IOException {
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

                datastoreService.deleteUser(username,password);
                sendJSONResponse(response,"{\"success\":\"Account deleted.\"}");
                return;
            } catch(Exception e){
                String message = "{\"error\":\"" + e + "\"}" ;
                sendJSONResponse(response,message);
            }
            
    }
}