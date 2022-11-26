package rest.DataBase;

import java.sql.*;
import java.util.ArrayList;

public class DataBase implements IDataBase{

    private String url = "jdbc:mysql://localhost:3306/web?useSSL=false&useUnicode=yes&characterEncoding=utf8";
    private String login = "root";
    private String password = "3cUUa7T9P9si";
    private String Driver = "com.mysql.cj.jdbc.Driver";
    private int initConnectionCount = 10; 

    private FConnectionPool factoryConnectionPool;
    private IConnectionPool connectionPool;
    
    public DataBase(){
        try{
            factoryConnectionPool = new FConnectionPool();
            connectionPool = factoryConnectionPool.getConnectionPool(url, login, password, Driver, initConnectionCount);
        }catch(Exception ex){ex.printStackTrace();};     
    }

    private Connection getConnection(){
        try{
            return connectionPool.retrieveConnection();
        }
        catch(SQLException ex){
            ex.printStackTrace();
            return null;
        }
        catch(NullPointerException ex){
            return null;
        }
       
    }

    @Override
    public Boolean createUser(String login, String password, String email) {
        Connection conn = getConnection();    
        try {

            if(conn != null) {
                String sqlInsert = "INSERT INTO users(login, password, email) Values (?, ?, ?)";

                PreparedStatement preparedStatement = conn.prepareStatement(sqlInsert);

                preparedStatement.setString(1, login);
                preparedStatement.setString(2, password);
                preparedStatement.setString(3, email);

                int rows = preparedStatement.executeUpdate();

                preparedStatement.close();
                connectionPool.putback(conn);
                if(rows != 0){ return true;}
                else return false;

            } else {
                connectionPool.putback(conn);
                return null;
            }

        } catch(SQLException ex) {
            connectionPool.putback(conn);

            if(Integer.parseInt(ex.getSQLState()) == 23505 || Integer.parseInt(ex.getSQLState()) == 23000) return false;

            return null;
        }
        catch(NullPointerException ex) {
            connectionPool.putback(conn);
            return null;
        }
    }

    @Override
    public Integer addRow(String name, int price, String description) {    
        Connection conn = getConnection();
        try {
            if(conn != null) {
                String sqlInsert = "INSERT INTO products(ProductName, Price, Description) Values (?, ?, ?)";

                PreparedStatement preparedStatement = conn.prepareStatement(sqlInsert);

                preparedStatement.setString(1, name);
                preparedStatement.setInt(2, price);
                preparedStatement.setString(3, description);   

                int rows = preparedStatement.executeUpdate();
                preparedStatement.close();

                connectionPool.putback(conn);
                return rows;
            } else {
                connectionPool.putback(conn);
                return null;
            }
        } catch(SQLException ex) {
            connectionPool.putback(conn);
            ex.printStackTrace();
            return null;
        }
        catch(NullPointerException ex) {
            connectionPool.putback(conn);
            return null;
        }
    }

    @Override
    public Integer deleteRows(Integer toDelete) {
        Connection conn = getConnection();
        try {
            
            if(toDelete != null) {

                String sqlDelete = "DELETE FROM products WHERE id in (?)";

                int rows = 0;

                String toDeleteStr = "";

                if(conn != null){
                    PreparedStatement preparedStatement = conn.prepareStatement(sqlDelete);
                    preparedStatement.setString(1, String.valueOf(toDelete));
                    rows = preparedStatement.executeUpdate();
                    preparedStatement.close();
                }

                connectionPool.putback(conn);
                return rows;

            } else {
                connectionPool.putback(conn);
                return 0;
            }

        } catch(SQLException ex) {
            connectionPool.putback(conn);
            ex.printStackTrace();
            return null;
        }
        catch(NullPointerException ex) {
            connectionPool.putback(conn);
            return null;
        }
    }

    @Override
    public ArrayList<ArrayList<String>> selectProducts() {
        Connection conn = getConnection();
        try {

            if(conn != null){

                PreparedStatement statement = conn.prepareStatement("SELECT * FROM products");
                ResultSet resultSet = statement.executeQuery();
                
                ArrayList<ArrayList<String>> strResultSet = new ArrayList<>();
                
                while(resultSet.next()){
                    ArrayList<String> row = new ArrayList<>();
                
                    row.add(String.valueOf(resultSet.getInt("id")));
                    row.add(resultSet.getString("ProductName"));
                    row.add(String.valueOf(resultSet.getInt("Price")));
                    row.add(resultSet.getString("Description"));
                
                    strResultSet.add(row);
                }
            
                resultSet.close();
                statement.close();
                
                connectionPool.putback(conn);

                return strResultSet;
            } else {
                connectionPool.putback(conn);
                return null;
            }

        } catch(SQLException ex) {
            connectionPool.putback(conn);
            ex.printStackTrace();
            return null;
        }
        catch(NullPointerException ex) {
            connectionPool.putback(conn);
            return null;
        }
    }
}
