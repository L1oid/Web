package Pack.Model.Interfaces;

public interface IRepository {
    Boolean checkUser(String login, String password) throws Exception;
}