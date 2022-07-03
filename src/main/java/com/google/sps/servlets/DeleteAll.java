package com.google.sps.servlets;

import com.google.sps.data.DatastoreService;
import java.io.IOException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/* Deletes all Users stored in Datastore, used for debugging. */
@WebServlet("/api/delete-all")
public class DeleteAll extends HttpServlet {

    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response)
        throws IOException {
            try{
                DatastoreService datastoreService = new DatastoreService();
                datastoreService.deleteAll();
                response.setContentType("application/json");
                response.getWriter().println("{\"success\":\"All accounts deleted.\"}");
            } catch(Exception e){
                response.setContentType("application/json");
                response.getWriter().println("{\"error\":\"Something went wrong.\"}");
            }
            
    }
}