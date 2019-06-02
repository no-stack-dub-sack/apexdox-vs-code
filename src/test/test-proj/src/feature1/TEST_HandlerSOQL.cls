/**
 * Handle SOQL `BotHandler` implementation.
 * @see TEST_BotHandler
 * @author Salesforce.com
 * @since Jul 2017
 * @see [License](https://github.com/dreamhouseapp/dreamhouse-sfdx/blob/master/LICENSE)
 * @see [Github](https://github.com/dreamhouseapp/dreamhouse-sfdx)
 * @group Dreamhouse Bot Handlers
 */
public with sharing class TEST_HandlerSOQL implements BotHandler {
    
    public BotResponse handle(String utterance, String[] params, Map<String, String> session, String fileName, String fileContent) {
        
        SObject[] objects = Database.query(utterance);
        
        List<BotRecord> records = new List<BotRecord>();
        
        for (sObject o : objects) {
            List<BotField> fields = new List<BotField>();
            Map<String, Object> fieldMap = o.getPopulatedFieldsAsMap();
            for (String fieldName : fieldMap.keySet()) {
                String linkURL;
                String objectType;
                if (fieldName == 'Id') {
                    Pattern p = Pattern.compile('.* (?i)FROM ([A-Za-z0-9_]*) .*');
                    Matcher pm = p.matcher(utterance);
                    if (pm.matches()) {
                        objectType = pm.group(1);
                        System.debug(objectType);
                    }
                    linkURL = '/lightning/r/' + objectType + '/' + o.Id + '/view';
                }
                fields.add(new BotField(fieldName, '' + fieldMap.get(fieldName), linkURL));
            }
            records.add(new BotRecord(fields));
        }
        return new BotResponse(new BotMessage('Bot', 'Here is the result of your query:', records));
        
    }
    
}