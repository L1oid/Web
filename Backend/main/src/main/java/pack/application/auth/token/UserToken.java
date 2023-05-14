package pack.application.auth.token;

import pack.application.auth.token.dto.Token;

import jakarta.json.bind.Jsonb;
import jakarta.json.bind.JsonbBuilder;
import jakarta.json.bind.JsonbException;

public class UserToken {

    public static Payload createPayload(String login, String email) {
        Payload payload = new Payload();
        payload.setLogin(login);
        payload.setEmail(email);
        return payload;
    }

    public static Boolean verifyToken(Token token) {
        Token checkToken = createToken(token.getPayload());
        if(checkToken.getCrypto().equals(token.getCrypto())) {
            return true;
        } 
        return false;

    }

    public static Token createToken(Payload payload) {
        Token token = new Token();
        token.setPayload(payload);
        try {
            Jsonb jsonb = JsonbBuilder.create();
            token.setCrypto(jsonb.toJson(payload));
        } catch(JsonbException e) {}
        return token;
    }
}