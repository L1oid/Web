package Pack.Model;

import java.util.ArrayList;

import Pack.Model.DTO.User;
import Pack.Model.Interfaces.IUserRepository;
import Pack.Model.Interfaces.IUserModel;

public class UserModel implements IUserModel {

    IUserRepository repository;

    @Override
    public void injectRepository(IUserRepository repository) {
        this.repository = repository;
    } 

    @Override
    public Boolean checkUser(User user) throws Exception {
        return repository.checkUser(user.getLogin(), user.getPassword());
    }

    @Override
    public Boolean addUser(User user) throws Exception {
        return repository.addUser(user.getLogin(), user.getPassword(), user.getEmail());
    }
}