package pack.model.interfaces.slae.async;

public interface ICounterAsync {
    String nextAsync(ICounterUpdate updater);
    void nextAndUpdate(ICounterUpdate updater);
}