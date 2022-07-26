package com.google.sps.servlets;

import com.google.sps.data.DatastoreService;
import java.io.IOException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/* Deletes all Users stored in Datastore, used for debugging. */
@WebServlet("/api/delete-all")
public class DeleteAll extends ServletTemplate {

    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response)
        throws IOException {
            try{
                /*
                DatastoreService datastoreService = new DatastoreService();
                datastoreService.deleteAll();
                sendJSONResponse(response,"{\"success\":\"All accounts deleted.\"}");
                */
                return;
            } catch(Exception e){
                String message = "{\"error\":\"" + e + "\"}" ;
                sendJSONResponse(response,message);
            }
            
    }
}