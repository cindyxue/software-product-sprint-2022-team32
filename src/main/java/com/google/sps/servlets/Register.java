package com.google.sps.servlets;

import com.google.sps.data.DatastoreService;
import com.google.sps.data.User;
import java.io.IOException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/* Handles the register page. */
@WebServlet("/api/register")
public class Register extends HttpServlet {

    @Override
    // Using the html form, register a new user if the username and email are not already taken.
    public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String username = request.getParameter("username");
        String email = request.getParameter("email");
        String password = request.getParameter("password");
        String firstName = request.getParameter("firstName");
        String middleName = request.getParameter("middleName");
        String lastName = request.getParameter("lastName");

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
            response.getWriter().println("{\"Success\":\"Account registered.\"}");
        } catch(Exception e){
            response.setContentType("application/json");
            response.getWriter().println("{\"error\":\"Error registering account.\"}");
        }
    }
}