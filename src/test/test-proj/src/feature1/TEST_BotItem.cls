/**
 * The `BotItem` class. Lorem ipsum dolor sit amet, consectetur adipiscing elit,
 * sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
 * veniam, quis nostrud exercitation ullamco laboris nis.
 *
 * @author Salesforce.com
 * @since Jul 2017
 * @see [License](https://github.com/dreamhouseapp/dreamhouse-sfdx/blob/master/LICENSE)
 * @see [Github](https://github.com/dreamhouseapp/dreamhouse-sfdx)
 * @group Feature1
 */
public class TEST_BotItem {

    @AuraEnabled public String name { get;set; }
    @AuraEnabled public String linkURL { get;set; }
    
    /**
     * Convenience constructor to create a single item
     * @param name The `BotItem`s name
     */
    public BotItem(String name) {
        this.name = name;
    }
    
    /**
     * Convenience constructor to create a single item
     * @param name The `BotItem`s name
     * @param linkURL The `BotItem`s link
     */
    public BotItem(String name, string linkURL) {
        this.name = name;
        this.linkURL = linkURL;
    }
}