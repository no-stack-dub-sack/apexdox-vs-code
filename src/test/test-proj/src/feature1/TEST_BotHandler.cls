/**
 * The `BotHandler` class. Lorem ipsum dolor sit amet, consectetur adipiscing elit,
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
 * @group Feature1
 */
public interface TEST_BotHandler {
    
    /**
     * The handle method for this interface which handles some stuff.
     * @param utterance Utterance description goes here.
     * @param params The params for the utterance.
     * @param session Session description goes here. Occasionally descriptions
     * are really really long and they need to go onto a second or third line.
     * This is totally cool, no biggie.
     * @param fileName Filename description.
     * @param fileContent FileContent description.
     * @return Looks like it returns a `BotResponse` instance.
     * @see TEST_BotController.submit
     */    
    BotResponse handle(String utterance, String[] params, Map<String, String> session, String fileName, String fileContent);
    
}