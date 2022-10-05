/**
 * The `SlackOpportunityPublisher` test class.
 *
 * @author Salesforce.com
 * @since 2017-07-01
 * 
 * @author Bill C Riemers
 * @since 2022-10-05 Added changelog
 * 
 * @see [License](https://github.com/dreamhouseapp/dreamhouse-sfdx/blob/master/LICENSE)
 * @see [Github](https://github.com/dreamhouseapp/dreamhouse-sfdx)
 * @group Feature1
 */
@isTest
public class TEST_SlackOpportunityPublisherTest {
    
    static testMethod void testPost() {
        Boolean success = true;
        try {
            Opportunity opp = new Opportunity(Name='test opportunity', StageName='Close Won', CloseDate=date.today());
            insert opp;
	        SlackOpportunityPublisher.postToSlack(new List<Id> { opp.Id });
        } catch (Exception e) {
            success = false;
        } finally {
	        System.assert(success);
        }
    }

}