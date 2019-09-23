package cl.desagen.chilquinta.quartz;

import org.quartz.DisallowConcurrentExecution;
import org.quartz.Job;
import org.quartz.JobExecutionContext;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.text.SimpleDateFormat;
import java.util.Date;

@DisallowConcurrentExecution
public class ChilquintaTask implements Job {

    private static final Logger log = LoggerFactory.getLogger(ChilquintaTask.class);

    @Override
    public void execute(JobExecutionContext jobExecutionContext) {
        SimpleDateFormat dateFormat = new SimpleDateFormat("HH:mm:ss");

        if (log.isInfoEnabled())
            log.info("Getting all orders - {}.", dateFormat.format(new Date()));

    }
}