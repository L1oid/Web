import java.sql.*;
import java.io.PrintWriter;

import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

import java.nio.file.*;
import java.io.*;
import java.util.*;

public class WebController extends HttpServlet
{

	protected void doPost(HttpServletRequest request, HttpServletResponse response)
	{    
		PrintWriter printWriter = null;
		try{printWriter = response.getWriter();} catch (Exception ex){}
		
		try
		{	
			String servletPath = (String)(request.getServletPath());

			HttpSession session = request.getSession(true);
			Object userTrueObject = session.getAttribute("logined");
			boolean userTrue = false;

			if(servletPath.equals("/UserCreate") && request.getParameter("new_login") != null && request.getParameter("new_password") != null){
				DataBase db = DataBase.getInstance();
				db.createUser((String)(request.getParameter("new_login")), (String)(request.getParameter("new_password")));
				userTrue = true;
				request.setAttribute("login", (String)(request.getParameter("new_login")));
				session.setAttribute("login", (String)(request.getParameter("new_login")));
			}else if(servletPath.equals("/UserCreate")){
				pageRegResponse(request, response, true);
			}

			if(servletPath.equals("/register") && userTrue != true){
				pageRegResponse(request, response, false);
			}


			if(userTrueObject != null){userTrue = (boolean)(userTrueObject);}

			if(servletPath.equals("/exit")){
				userTrue = false;
				request.setAttribute("logined", false);
				session.setAttribute("logined", false);
				request.setAttribute("login", null);
				session.setAttribute("login", null);
			}

			if(session.getAttribute("login") != null){
				request.setAttribute("login", (String)(session.getAttribute("login")));
				session.setAttribute("login", (String)(session.getAttribute("login")));
			}

			if(request.getParameter("login") != null && request.getParameter("password") != null  && userTrue != true){
				boolean userCheck = loginSuccsesfull((String)(request.getParameter("login")), (String)(request.getParameter("password")));
				if(userTrue != true && userCheck == true){
					session.setAttribute("logined", true);
					request.setAttribute("logined", true);
					request.setAttribute("login", (String)(request.getParameter("login")));
					session.setAttribute("login", (String)(request.getParameter("login")));
					userTrue = true;
				}

				if (userCheck == false){
					request.setAttribute("loginError", true);
					userTrue = false;
				}
			}

			if(userTrue != true){
				if(request.getAttribute("loginError") != null){
					pageLoginResponse(request, response, true);
				}else{
					pageLoginResponse(request, response, false);
				}
			}

			if(userTrue == true){session.setAttribute("logined", true);}

			if(servletPath.equals("/add") && userTrue == true){

				dbAddRow(request, response);
				pageTableResponse(request, response);

			}else if(servletPath.equals("/delete") && userTrue == true){

				dbDeleteRows(request, response);
				pageTableResponse(request, response);

			} else if(userTrue == true){
				pageTableResponse(request, response);
			};
			
		}    
		catch (Exception ex){printWriter.println("Error: "+ex.getMessage());}
	}
  
  	protected static void pageRegResponse(HttpServletRequest request, HttpServletResponse response, boolean regError) throws IOException{

		PrintWriter printWriter = null;

		try{printWriter = response.getWriter();}catch (Exception ex){}
		try{
			if(regError == true) {request.setAttribute("regError", true);}
			String view = "register";
			request.getRequestDispatcher("/WEB-INF/views/"+view+".jsp").forward(request,response);
		}
		catch (Exception ex)
		{       
			printWriter.println("Error: "+ex.getMessage());     
		}


  	}

  	protected static void pageLoginResponse(HttpServletRequest request, HttpServletResponse response, boolean loginError) throws IOException{

		PrintWriter printWriter = null;

		try{printWriter = response.getWriter();}catch (Exception ex){}
		try{

			if(loginError == true) {request.setAttribute("loginError", true);}
			String view = "login";
			request.getRequestDispatcher("/WEB-INF/views/"+view+".jsp").forward(request,response);
		}
		catch (Exception ex)
		{       
			printWriter.println("Error: "+ex.getMessage());     
		}


  	}

	protected static boolean loginSuccsesfull(String login, String password) throws IOException{
		try{
			DataBase db = DataBase.getInstance();
			return db.isUserCorrect(login, password);
		}catch (Exception ex){return false;}
	}

	protected static void pageTableResponse(HttpServletRequest request, HttpServletResponse response) throws IOException{

		PrintWriter printWriter = null;
		
    	try{printWriter = response.getWriter();}catch (Exception ex){}
		try{

			DataBase db = DataBase.getInstance();
			String[][] resultSet = db.selectProducts();
			int rows = db.selectProductRowsCount(); 
			int[] id = new int[rows];
			String[] name = new String[rows];
			int[] price = new int[rows];
			String[] description = new String[rows];

    	    int i = 0;


    	    for(String[] row: resultSet){
    	        id[i] = Integer.parseInt(row[0]);
    	        name[i] = row[1];
    	        price[i] = Integer.parseInt(row[2]);
    	        description[i] = row[3];  
    	        i++;
    	    }

			request.setAttribute("rows", Integer.valueOf(rows)); 
			request.setAttribute("id", id);   
			request.setAttribute("name", name);   
			request.setAttribute("price", price);   
			request.setAttribute("description", description);   
		    String view = "main";
		    request.getRequestDispatcher("/WEB-INF/views/"+view+".jsp").forward(request,response);
		}
		catch (Exception ex)
		{       
			printWriter.println("Error: "+ex.getMessage());     
		}


  	}

	protected static void dbAddRow(HttpServletRequest request, HttpServletResponse response) throws IOException{

		PrintWriter printWriter = null;
		
    	try{printWriter = response.getWriter();}catch (Exception ex){}
		try{
			String name = new String();
			int price=-1;
			String description = new String();

			if(request.getParameter("product_name") != null){
				name = (String)(request.getParameter("product_name"));
				String price_tmp = (String)(request.getParameter("price"));
				price = Integer.parseInt(price_tmp);
				description = (String)(request.getParameter("description"));
			}

			DataBase db = DataBase.getInstance();
			db.addRow(name,price,description);
		}
		catch (Exception ex)
		{       
			printWriter.println("Error: "+ex.getMessage());     
		}


  	}

	protected static void dbDeleteRows(HttpServletRequest request, HttpServletResponse response) throws IOException{

		PrintWriter printWriter = null;
		
    	try{printWriter = response.getWriter();}catch (Exception ex){}

		try{

			String[] to_delete = request.getParameterValues("to_delete");

			DataBase db = DataBase.getInstance();
			db.deleteRows(to_delete);

		}
		catch (Exception ex)
		{       
			printWriter.println("Error: "+ex.getMessage());     
		}


  	}

}

class DataBase {
    private static DataBase instance;
    private Connection conn = null;
    private DataBase(){
        try{Class.forName("org.postgresql.Driver");} catch(Exception ex){}
        try{this.conn = getConnection();}catch (Exception ex){};
	}

    public static DataBase getInstance(){
        if(instance == null){
            instance = new DataBase();
        }
        return instance;
    }

    private Connection getConnection(){
        String url = "jdbc:postgresql://localhost:5432/postgres";
    	String username = "postgres";
    	String password = "12345";

    	try{return DriverManager.getConnection(url, username, password);}
        catch(SQLException ex){return (Connection)(null);}
    };

    public boolean isUserCorrect(String login, String password) throws SQLException{
        Statement statement = this.conn.createStatement();
        ResultSet resultSet = statement.executeQuery("SELECT * FROM users");

        while(resultSet.next()){
            if(resultSet.getString("login").equals(login)){
                if(resultSet.getString("password").equals(password)){
                    statement.close();
                    resultSet.close();
                    return true;
                }
            } else{continue;}
        }

        statement.close();
        resultSet.close();
        return false;
    }

    public void createUser(String login, String password) throws SQLException{
        Statement statement = this.conn.createStatement();       
        String sqlInsert = "INSERT INTO users(login, password) Values (?, ?)";
        PreparedStatement preparedStatement = this.conn.prepareStatement(sqlInsert);
        preparedStatement.setString(1, login);
        preparedStatement.setString(2, password);        
        preparedStatement.executeUpdate();
        statement.close();
    }

    public void addRow(String name, int price, String description) throws SQLException{
        Statement statement = this.conn.createStatement();       
        String sqlInsert = "INSERT INTO products(ProductName, Price, Description) Values (?, ?, ?)";
        PreparedStatement preparedStatement = this.conn.prepareStatement(sqlInsert);
        preparedStatement.setString(1, name);
        preparedStatement.setInt(2, price);
        preparedStatement.setString(3, description);        
        preparedStatement.executeUpdate();
        statement.close();
    }

    public void deleteRows(String[] to_delete) throws SQLException{
        String sqlDelete = "DELETE FROM products WHERE id = (?)";
        if(to_delete != null){
            PreparedStatement preparedStatement = this.conn.prepareStatement(sqlDelete);
            for(String to_delete_row: to_delete){

                preparedStatement.setString(1, to_delete_row);

                preparedStatement.executeUpdate();

            }
            preparedStatement.close();
        }
    }

    public int selectProductRowsCount() throws SQLException{
        Statement statement = this.conn.createStatement();
		ResultSet resultSet = statement.executeQuery("SELECT COUNT(*) AS count_rows FROM products");
		resultSet.next();
		int rows = resultSet.getInt("count_rows");
        statement.close();
		resultSet.close();
        return rows;
    }

    public String[][] selectProducts() throws SQLException{

        Statement statement = this.conn.createStatement();
        ResultSet resultSet = statement.executeQuery("SELECT * FROM products");

        int rows = selectProductRowsCount();

        String[][] strResultSet = new String[rows][4];

        int i = 0;
        while(resultSet.next()){
            strResultSet[i][0] = String.valueOf(resultSet.getInt("id"));
            strResultSet[i][1] = resultSet.getString("ProductName");
            strResultSet[i][2] = String.valueOf(resultSet.getInt("Price"));
            strResultSet[i][3] = resultSet.getString("Description");  
            i++;
        }
        resultSet.close();
        statement.close();
        return strResultSet;
    }
}