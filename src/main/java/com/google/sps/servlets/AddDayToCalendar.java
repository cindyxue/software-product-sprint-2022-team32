package com.google.sps.servlets;

import com.google.gson.Gson;
import com.google.sps.data.DatastoreService;
import com.google.sps.data.Day;
import com.google.sps.data.User;
import java.io.IOException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;



/* Handles adding a day to the calendar of an user. */
@WebServlet("/api/add-day-to-user")
public class AddDayToCalendar extends HttpServlet {

    @Override
    // Using the html form, validate the user's credentials and returns the user data if they are valid.
    public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String username = request.getParameter("username");
        String password = request.getParameter("password");
        String day = request.getParameter("day");
        DatastoreService datastoreService = new DatastoreService();
        User user = datastoreService.getUser(username);
        if (user == null) {
            response.setContentType("application/json");
            response.getWriter().print("{\"error\":\"Invalid username.\"}");
            return;
        }
        if (!datastoreService.validateCredentials(user, password)){
            response.setContentType("application/json");
            response.getWriter().print("{\"error\":\"Invalid password.\"}");
            return;
        }

        /*Add day to user*/
        Gson g = new Gson();
        Day d = g.fromJson(day, Day.class);
        user.addDayToCalendar(d);
        datastoreService.updateUser(user);
        response.setContentType("application/json");
        response.getWriter().print("{\"success\":\"Day added to user.\"}");
        
    }
}

