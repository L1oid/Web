package pack.domain.counter.impl;

import pack.domain.counter.api.Sumable;

public class Calculator implements Sumable {
    @Override
    public double sum(double a, double b) {
        return a + b;
    } 
}