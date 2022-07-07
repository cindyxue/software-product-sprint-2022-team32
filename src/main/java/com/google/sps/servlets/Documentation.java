package com.google.sps.servlets;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import javax.servlet.annotation.WebServlet;

@WebServlet("/api/documentation")
public class Documentation extends ServletTemplate {
    private static final long serialVersionUID = 1L;

    @Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		performTask(request, response);
	}

    @Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException,
			IOException {
		performTask(request, response);
	}

	private void performTask(HttpServletRequest request, HttpServletResponse response) throws ServletException,
			IOException {
		try {
            response.sendRedirect(request.getContextPath() + "/api/documentation.pdf");
        }catch(Exception e){
            String message = "{\"error\":\"" + e + "\"}" ;
            sendJSONResponse(response,message);
        }
	}
}
