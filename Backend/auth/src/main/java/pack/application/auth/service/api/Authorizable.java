package pack.application.auth.service.api;

import pack.application.auth.service.impl.dto.User;
import pack.application.auth.service.api.UserRepositable;

public interface Authorizable {
    void injectRepository(UserRepositable repository);
    Boolean checkUser(User user) throws Exception;
    Boolean addUser(User user) throws Exception;
}