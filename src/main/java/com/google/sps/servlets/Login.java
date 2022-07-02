package com.google.sps.servlets;

import com.google.gson.Gson;
import com.google.sps.data.DatastoreService;
import com.google.sps.data.User;
import java.io.IOException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/* Handles the login page. */
@WebServlet("/api/login")
public class Login extends HttpServlet {

    @Override
    // Using the html form, validate the user's credentials and returns the user data if they are valid.
    public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String username = request.getParameter("username");
        String password = request.getParameter("password");
        DatastoreService datastoreService = new DatastoreService();
        User user = datastoreService.getUser(username);
        if (user == null) {
            response.setContentType("application/json");
            response.getWriter().println("{\"error\":\"Invalid username.\"}");
            return;
        }
        if (!datastoreService.validateCredentials(user, password)){
            response.setContentType("application/json");
            response.getWriter().println("{\"error\":\"Invalid password.\"}");
            return;
        }

        /*Return the user data if the credentials are valid.*/
        Gson gson = new Gson();
        String json = gson.toJson(user);
        response.setContentType("application/json");
        response.getWriter().println(json);
        
    }
}

