/*
 *  AUTHOR: Sojin Lee
 *  FILE NAME: ConsoleSalesDatabase.java
 *  CREATED: Dec 16 2017
 *  UPDATED: Dec 16 2017
 *  DESCRIPTION: This is a database java file for the Assignment2
 */
package java.lsj.db;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

public class ConsoleSalesDatabase {

    //constants
    private static final String DB_URL = "jdbc:mysql://localhost:3306/ejd";
    private static final String DB_USER = "ejd";
    private static final String DB_PASS = "PROG32758";

    //return JSON string corresponding to category
    public String getConsoleSales(String category) {
        String json = "";
        String sql = "";
        try {
            
            // connect DB
            Class.forName("com.mysql.jdbc.Driver");
            Connection con = DriverManager.getConnection(DB_URL, DB_USER, DB_PASS);

            // validate arg
            if (category == null || category.isEmpty()) {
                category = "hardwareSales"; // use default category

                // construct SQL statement
                sql = "SELECT consoleName, " + category + " FROM ConsoleSales";
            } else {
                sql = "SELECT consoleName, " + category + " FROM ConsoleSales";
            }
            Statement statement = con.createStatement();
            ResultSet rs = statement.executeQuery(sql);
            System.out.println(rs);
            
            // connect DB and execute query
            // start JSON array
            json += "[";

            // iterate all rows
            while (rs.next()) {
                // get 2 columns
                String consoleName = rs.getString(1); // 1st col
                Double consoleValue = rs.getDouble(2); // 2nd col

                // add json abj
                json += "{\"name\":\"" + consoleName + "\", \"value\": " + consoleValue + "},";

            }
            // remove the last comma from JSON string
            int index = json.lastIndexOf(",");
            if(index >= 0)
                json = json.substring(0, index);
            
            // close JSON array
            json += "]";

            System.out.println("[ERR1]Json String is: " + json);
            
            // close DB
            rs.close();
            statement.close();
            con.close();

        } catch (SQLException ex) {
            System.err.println(ex.getSQLState() + ": " + ex.getMessage());
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        
        // disconnect db
        return json;
    }
}