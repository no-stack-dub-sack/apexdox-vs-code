/**
 * The `BotField` class. Lorem ipsum dolor sit amet, consectetur adipiscing elit,
 * sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
 * veniam, quis nostrud exercitation ullamco laboris nis.
 *
 * @author Salesforce.com
 * @since 2017-07-01 Created
 * 
 * @author Bill C Riemers
 * @since 2022-10-05 Added changelog
 * 
 * @see [License](https://github.com/dreamhouseapp/dreamhouse-sfdx/blob/master/LICENSE)
 * @see [Github](https://github.com/dreamhouseapp/dreamhouse-sfdx)
 * @see TEST_BotController
 * @see TEST_BotRecord
 * @group Feature1
 * 
 * @example 
 * for (Dashboard d : dashboards) {
 *     List<BotField> fields = new List<BotField>();
 *     fields.add(new BotField('Name', d.Title, '/lightning/r/Dashboard/' + d.Id + '/view'));
 *     fields.add(new BotField('Folder', d.FolderName));
 *     records.add(new BotRecord(fields));
 * }
 */
public class TEST_BotField {

    @AuraEnabled public String name { get;set; }
    @AuraEnabled public String value { get;set; }
    @AuraEnabled public String linkURL { get;set; }
    
    public BotField(String name, String value) {
        this.name = name;
        this.value = value;
    }
    
    public BotField(String name, String value, string linkURL) {
        this.name = name;
        this.value = value;
        this.linkURL = linkURL;
    }

}