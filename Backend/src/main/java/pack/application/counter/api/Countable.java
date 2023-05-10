package pack.application.counter.api;

public interface Countable {
    void assignExecutor(Executable executor);
    void assignStore(Storable store);
    void assignUpdater(Updatable updater);
    void assignInterconnector(Interconnectable interconnector);

    boolean next(String clientID);
    boolean info(double value);
}