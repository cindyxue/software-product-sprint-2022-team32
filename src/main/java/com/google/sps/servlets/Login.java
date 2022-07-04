package com.google.sps.servlets;

import com.google.gson.Gson;
import com.google.sps.data.DatastoreService;
import com.google.sps.data.User;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.PrintWriter;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/* Handles the login page. */
@WebServlet("/api/login")
public class Login extends HttpServlet {

    public void sendJSONResponse(HttpServletResponse response, String message) throws IOException{
        response.setContentType("application/json");
        PrintWriter out = response.getWriter();
        out.print(message);
        out.flush();
    }

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

