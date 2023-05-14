package pack.application.auth.service.impl;

import pack.application.auth.service.api.Authorizable;
import pack.application.auth.service.api.Tokenable;
import pack.application.auth.service.api.UserRepositable;
import pack.application.auth.service.impl.dto.User;
import pack.application.auth.token.UserToken;
import pack.application.auth.token.Payload;
import pack.application.auth.token.dto.Token;

public class Auth implements Authorizable, Tokenable {

    UserRepositable repository;

    @Override
    public void injectRepository(UserRepositable repository) {
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

    @Override
    public Boolean verify(Token token) {
        return UserToken.verifyToken(token);
    }

    @Override
    public Payload generatePayload(String login, String email) {
        return UserToken.createPayload(login, email);
    }

    @Override
    public Token generateToken(Payload payload) {
        return UserToken.createToken(payload);
    }
}