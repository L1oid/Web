package pack.domain.counter;

import pack.domain.counter.api.Sumable;
import pack.domain.counter.impl.Calculator;

public class Factory {
    public static Sumable createSummator() {
        return new Calculator();
    }
}