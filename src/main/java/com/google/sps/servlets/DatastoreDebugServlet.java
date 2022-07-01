package com.google.sps.servlets;

import com.google.sps.data.DatastoreService;
//import com.google.sps.data.Day;
import com.google.sps.data.User;
import java.io.IOException;
//import java.util.ArrayList;
import java.util.List;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/* Prints a table of Users stored in Datastore, used for debugging. */
@WebServlet("/api/datastore-debug")
public class DatastoreDebugServlet extends HttpServlet {

    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response)
        throws IOException {

      DatastoreService datastoreService = new DatastoreService();
      List<User> output = datastoreService.getAllUsers();

      response.setContentType("text/html;");
      response.getWriter().println("<table>");
      response.getWriter().println("<tr>");
      response.getWriter().println("<th>Username</th>");
      response.getWriter().println("<th>Email</th>");
      response.getWriter().println("<th>Password Hash</th>");
      response.getWriter().println("<th>First Name</th>");
      response.getWriter().println("<th>Middle Name</th>");
      response.getWriter().println("<th>Last Name</th>");
      response.getWriter().println("<th>Calendar</th>");
      response.getWriter().println("<th>Journal</th>");
      response.getWriter().println("<th>Panic Button Pressed</th>");
      response.getWriter().println("</tr>");
      
      for (User user : output) {
        response.getWriter().println("<tr>");

        response.getWriter().println("<td>" + user.getUsername() + "</td>");
        response.getWriter().println("<td>" + user.getEmail() + "</td>");
        response.getWriter().println("<td>" + user.getPasswordHash() + "</td>");

        response.getWriter().println("<td>" + user.getFirstName() + "</td>");
        response.getWriter().println("<td>" + user.getMiddleName() + "</td>");
        response.getWriter().println("<td>" + user.getLastName() + "</td>");

        response.getWriter().println("<td>" + user.getCalendarAsStrings() + "</td>");
        response.getWriter().println("<td>" + user.getJournalAsStrings() + "</td>");
        
        response.getWriter().println("<td>" + user.getPanicButtonPressed() + "</td>");
        response.getWriter().println("</tr>");
      }
      response.getWriter().println("</table>");

    }
}
