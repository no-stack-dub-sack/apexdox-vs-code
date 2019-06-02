/**
 * Global status enum for updating the status of jobs and tasks
 * throughout the job's lifecycle.
 *
 * @author P. Weinberg
 * @since 2019
 * @group Global Utils
 */
public enum TEST_Status {
    QUEUED,
    PROCESSING,
    COMPLETE,
    COMPLETE_WITH_ERRORS,
    FAILED
}
