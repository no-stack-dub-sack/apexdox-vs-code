/**
 * The `SlackOpportunityPublisher` class. Lorem ipsum dolor sit amet, consectetur adipiscing elit,
 * sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
 * veniam, quis nostrud exercitation ullamco laboris nis.
 *
 * @author Salesforce.com
 * @since Jul 2017
 * @see [License](https://github.com/dreamhouseapp/dreamhouse-sfdx/blob/master/LICENSE)
 * @see [Github](https://github.com/dreamhouseapp/dreamhouse-sfdx)
 * @group Dreamhouse Slack Bot
 */
public with sharing class TEST_SlackOpportunityPublisher {
    
    /**
     * The slack URL to use for publishing.
     */    
    private static final String slackURL = Dreamhouse_Settings__c.getOrgDefaults().Slack_Opportunity_Webhook_URL__c;
    
    /**
     * Incididunt ut labore et dolore magna aliqua, quis autem vel eum iure reprehenderit qui incididunt.
     * @param opportunityId The Id of the opportunity to post.
     */    
    @InvocableMethod(label='Post to Slack')
    public static void postToSlack(List<Id> opportunityId) {
        Id oppId = opportunityId[0]; // If bulk, only post first to avoid overloading Slack channel
        Opportunity opportunity = [SELECT Name, StageName from Opportunity WHERE Id=:oppId];
		Map<String,Object> msg = new Map<String,Object>();
		msg.put('text', 'The following opportunity has changed:\n' + opportunity.Name + '\nNew Stage: *' 
                + opportunity.StageName + '*');
		msg.put('mrkdwn', true);
        String body = JSON.serialize(msg);    
        System.enqueueJob(new QueueableSlackCall(slackURL, 'POST', body));
    }

    /**
     * An inner enum added to demonstrate how ApexDoc2-VSCode handles inner
     * enums. They can only have description's, like properties. ApexDoc2
     * Should be able to handle to wonky way this enum is written in code.
     */
    public enum Months { JANUARY, FEBRUARY,
        MARCH,
        APRIL,
        MAY, JUNE, JULY,
        AUGUST, SEPTEMBER
        , OCTOBER
        , NOVEMBER
        , DECEMBER
    }

    /**
     * An inner enum added to demonstrate how ApexDoc2-VSCode handles inner
     * enums. They will be presented in a table and can only have
     * description's, like properties.
     */    
    public enum Days {
        MONDAY,
        TUESDAY,
        WEDNESDAY,
        THURSDAY,
        FRIDAY,
        SATURDAY,
        SUNDAY
    }

    /**
     * An inner enum added to demonstrate how ApexDoc2-VSCode handles inner
     * enums. They will be presented in a table and can only have
     * description's, like properties.
     */    
    public enum Numbers {
        ONE,
        TWO,
        THREE,
        FOUR,
        FIVE,
        SIX,
        SEVEN,
        EIGHT,
        NINE,
        TEN
    }

    /**
     * A good example of how ApexDoc2-VSCode handles inner classes.
     * Inner classes / interfaces support the same tags as their top-level
     * counterparts (i.e. top level type in a .cls file), but tags like 'author'
     * and 'since' are better left to the top-level class. Just for example's sake,
     * including an example tag here as well.
     * @group Group tags in inner classes or interfaces will be ignored
     * 
     * @example 
     * String body = 'This is a message, equeued up to be posted on Slack!';
     * System.enqueueJob(new QueueablePushCall('https://someurl.com', 'POST', body));
     */   
    public class QueueableSlackCall implements System.Queueable, Database.AllowsCallouts {
        
        private final String url;
        private final String method;
        private final String body;

        /**
         * @param url The Server Url to post the message to.
         * @param method The HTTP method to use
         * @param body The body of the message.
         */    
        public QueueableSlackCall(String url, String method, String body) {
            this.url = url;
            this.method = method;
            this.body = body;
        }

        /**
         * The execute method implements the `System.Queueable` interface. And
         * handle's the queueable's execution.
         * @param ctx The `System.QueueableContext` for the execute method.
         */         
        public void execute(System.QueueableContext ctx) {
            HttpRequest req = new HttpRequest();
            req.setMethod(method);
            req.setBody(body);
            Http http = new Http();
            HttpResponse res;
            if (!Test.isRunningTest()) {
	            req.setEndpoint(url);
            	res = http.send(req);
            }
        }
    }
}