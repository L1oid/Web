package pack.model.interfaces.slae.async;

public interface ICounterAsync2 {
    void assignUpdater(ICounterUpdate2 updater);
    void nextAsync2(String clientID); 
}