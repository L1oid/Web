package pack.application.auth.service.api;

import pack.application.auth.token.dto.Token;
import pack.application.auth.token.Payload;

public interface Tokenable {
    Boolean verify(Token token);
    Payload generatePayload(String login, String email);
    Token generateToken(Payload payload);
}