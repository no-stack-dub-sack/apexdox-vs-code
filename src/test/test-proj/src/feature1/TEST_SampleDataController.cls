/**
 * The `SampleDataController` class. Lorem ipsum dolor sit amet, consectetur adipiscing elit,
 * sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
 * veniam, quis nostrud exercitation ullamco laboris nis.
 *
 * @author Salesforce.com
 * @since Jul 2017
 * @see [License](https://github.com/dreamhouseapp/dreamhouse-sfdx/blob/master/LICENSE)
 * @see [Github](https://github.com/dreamhouseapp/dreamhouse-sfdx)
 * @group Feature1
 */
public with sharing class TEST_SampleDataController {

    /**
     * Method has incorrect params. Just needed a test file with one method to test param tags.
     * @param param1 param description 1
     * @param param2 param description 2
     * @param param3 param description 3
     */
    @AuraEnabled
    public static void importSampleData() {
        delete [SELECT Id from Bot_Command__c];
        delete [SELECT Id from Property_Favorite__c];
        delete [SELECT Id from Property__c];
        delete [SELECT Id from Broker__c];

        StaticResource botCommandsResource = [SELECT Id, Body from StaticResource WHERE Name = 'botCommands'];
        String botCommandsJSON = botCommandsResource.body.toString();
        List<Bot_Command__c> botCommands = (List<Bot_Command__c>) JSON.deserialize(botCommandsJSON, List<Bot_Command__c>.class);
        insert botCommands;

        StaticResource brokersResource = [SELECT Id, Body from StaticResource WHERE Name = 'brokers'];
        String brokersJSON = brokersResource.body.toString();
        List<Broker__c> brokers = (List<Broker__c>) JSON.deserialize(brokersJSON, List<Broker__c>.class);
        insert brokers;

        StaticResource propertiesResource = [SELECT Id, Body from StaticResource WHERE Name = 'properties'];
        String propertiesJSON = propertiesResource.body.toString();
        List<Property__c> properties = (List<Property__c>) JSON.deserialize(propertiesJSON, List<Property__c>.class);
        insert properties;        
    }
}