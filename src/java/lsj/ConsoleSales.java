/*
 *  AUTHOR: Sojin Lee
 *  FILE NAME: ConsoleSales.java
 *  CREATED: Dec 16 2017
 *  UPDATED: Dec 16 2017
 *  DESCRIPTION: This is a servlet file for the Assignment2 which handles HTTP request/response
 */
package java.lsj;

import java.lsj.db.ConsoleSalesDatabase;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

@WebServlet(name = "ConsoleSales", urlPatterns = {"/ConsoleSales"})
public class ConsoleSales extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        // get category parameter
        String category = request.getParameter("category");
        ConsoleSalesDatabase csdb = new ConsoleSalesDatabase();

        // get JSON string 
        String json = "";

        // send out JSON String 
        response.setContentType("application/json");
        PrintWriter out = response.getWriter();
        json = csdb.getConsoleSales(category);
        out.println(json);
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        doGet(request, response);
    }
}