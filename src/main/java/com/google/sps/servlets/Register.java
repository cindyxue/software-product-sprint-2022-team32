package com.google.sps.servlets;

import com.google.gson.Gson;
import com.google.sps.data.DatastoreService;
import com.google.sps.data.User;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/* Handles the register page. */
@WebServlet("/api/register")
public class Register extends HttpServlet {

    public static String getBody(HttpServletRequest request) throws IOException {

        String body = null;
        StringBuilder stringBuilder = new StringBuilder();
        BufferedReader bufferedReader = null;
    
        try {
            InputStream inputStream = request.getInputStream();
            if (inputStream != null) {
                bufferedReader = new BufferedReader(new InputStreamReader(inputStream));
                char[] charBuffer = new char[128];
                int bytesRead = -1;
                while ((bytesRead = bufferedReader.read(charBuffer)) > 0) {
                    stringBuilder.append(charBuffer, 0, bytesRead);
                }
            } else {
                stringBuilder.append("");
            }
        } catch (IOException ex) {
            throw ex;
        } finally {
            if (bufferedReader != null) {
                try {
                    bufferedReader.close();
                } catch (IOException ex) {
                    throw ex;
                }
            }
        }
    
        body = stringBuilder.toString();
        return body;
    }

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
                response.setContentType("application/json");
                response.getWriter().println("{\"error\":\"Username already taken.\"}");
                return;
            }
            if (!datastoreService.validateUniqueEmail(email)){
                response.setContentType("application/json");
                response.getWriter().println("{\"error\":\"Email already taken.\"}");
                return;
            }
            User user = new User(username, email, password, firstName, middleName, lastName);
            datastoreService.saveUser(user);
            response.setContentType("application/json");
            response.getWriter().println("{\"success\":\"Account registered.\"}");
        } catch(Exception e){
            response.setContentType("application/json");
            String message = "{\"error\":\"Error registering account: " + e + " \"}" ;
            response.getWriter().println(message);
        }
    }
}