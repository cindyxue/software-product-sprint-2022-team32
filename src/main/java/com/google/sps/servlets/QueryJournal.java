package com.google.sps.servlets;

import com.google.gson.Gson;
import com.google.sps.data.DatastoreService;
import com.google.sps.data.User;
import com.google.sps.data.Entry;

import java.io.IOException;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import java.util.ArrayList;
import java.util.List;

/* Handles the query of journal entries. */
@WebServlet("/api/query-journal")
public class QueryJournal extends ServletTemplate{
    /* Class to help retrieve payload*/
    public class HelperClass{
        
        private final String username;
        private final String passwordHash;
        private final long  startingTimestamp;
        private final long endingTimestamp;

        public HelperClass(String _username, String _passwordHash,long _startingTimestamp, long _endingTimestamp){
            username = _username;
            passwordHash = _passwordHash;
            startingTimestamp = _startingTimestamp;
            endingTimestamp = _endingTimestamp;
        }

        public String getUsername() {
            return this.username;
        }
        public String getPassword(){
            return this.passwordHash;
        }
        public long getStartingTimestamp() {
            return this.startingTimestamp;
        }
        public long getEndingTimestamp() {
            return this.endingTimestamp;
        }
    }

    @Override
    // Given a user's ID, returns all of the user's journal entries. 
    // Then given a starting timestamp and a ending timestamp, returns all of the user's journal entries that fall between the two timestamps.
    public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        try{
            String payloadRequest = getBody(request);

            Gson g = new Gson();

            HelperClass helperClass = g.fromJson(payloadRequest, HelperClass.class);
            long startingTimestamp = helperClass.getStartingTimestamp();
            long endingTimestamp = helperClass.getEndingTimestamp();

            String username = helperClass.getUsername();
            String password = helperClass.getPassword();
            
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

            List<Entry> journal = user.getJournal();

            if (startingTimestamp == 0 && endingTimestamp == 0) {
                sendJSONResponse(response, g.toJson(journal));
            } else {
                List<Entry> filteredJournal = new ArrayList<>();
                for (Entry entry : journal) {
                    if (entry.getDate() >= startingTimestamp && entry.getDate() <= endingTimestamp) {
                        filteredJournal.add(entry);
                    }
                }
                Gson gson = new Gson();
                String json = gson.toJson(filteredJournal);
                String message = "{\"success\":" + json + "}" ;
                sendJSONResponse(response,message);
            }

        }catch (Exception e){
            String message = "{\"error\":\"Error: " + e + " \"}" ;
            sendJSONResponse(response,message);
        }
    }
}
