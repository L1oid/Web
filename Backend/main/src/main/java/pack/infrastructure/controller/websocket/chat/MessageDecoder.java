package pack.infrastructure.controller.websocket.chat;

import jakarta.json.bind.Jsonb;
import jakarta.json.bind.JsonbBuilder;
import jakarta.websocket.DecodeException;
import jakarta.websocket.Decoder;

import pack.application.chat.impl.dto.Message;

public class MessageDecoder implements Decoder.Text<Message>{

    private static Jsonb jsonb = JsonbBuilder.create();

    @Override
    public Message decode(String json) throws DecodeException {
        Message message = jsonb.fromJson(json, Message.class);
        return message;
    }

    @Override
    public boolean willDecode(String json) {
        return (json != null);
    }
}