package pack.infrastructure.executor.counter;

import pack.application.counter.api.Executable;

import jakarta.annotation.Resource;
import jakarta.enterprise.concurrent.ManagedExecutorService;


public class Executor implements Executable {
    @Resource
    private ManagedExecutorService mes;

    @Override
    public void execute(Runnable thread) {            
        mes.execute(thread);
    }
}