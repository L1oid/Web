package rest.Model.DataSource.User;

public interface IUserDataSource {
    Boolean checkUser(String login, String password) throws Exception;
    //Boolean addUser(String login, String password, String email);
}