package Pack.Model.Interfaces;

import java.util.ArrayList;

public interface IUserRepository {
    Boolean checkUser(String login, String password) throws Exception;
    Boolean addUser(String login, String password, String email) throws Exception;
}