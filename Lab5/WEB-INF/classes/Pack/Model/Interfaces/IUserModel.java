package Pack.Model.Interfaces;

import java.util.ArrayList;

import Pack.Model.DTO.User;

public interface IUserModel {
    void injectRepository(IUserRepository repository);
    Boolean checkUser(User user) throws Exception;
    Boolean addUser(User user) throws Exception;
}