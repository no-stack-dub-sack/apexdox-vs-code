/**
 * The `BotMessage` class. Lorem ipsum dolor sit amet, consectetur adipiscing elit,
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
public virtual class TEST_BotMessage {

    @AuraEnabled public String author { get;set; }
    @AuraEnabled public String messageText { get;set; }
    @AuraEnabled public List<BotRecord> records { get;set; }
    @AuraEnabled public List<BotItem> items { get;set; }
    @AuraEnabled public List<BotMessageButton> buttons { get;set; }
    @AuraEnabled public String imageURL { get;set; }

    /**
     * Default constructor
     */    
    public BotMessage() {
    }

    /**
     * Convenience constructor to create a simple bot message.
     * @param author Author param description
     * @param messageText Message text param description. If you're reading this in code,
     * the 'see' tag below, serves no other purpose than to demonstrate using overload
     * selectors, e.g. `SomeClass.SomeOverloadedMethod[3]` to link a specific method
     * overload in your documentation. The below example links to the 3rd overload of
     * the `BotResponse` constructor.
     * @see TEST_BotResponse.BotResponse[2]
     */    
    public BotMessage(String author, String messageText) {
        this.author = author;
        this.messageText = messageText;
    }

    /**
     * Convenience constructor to create a simple bot message.
     * @param author Author param description
     * @param messageText Message text param description
     * @param records A list of `BotRecord`s
     * @see TEST_BotRecord
     */    
    public BotMessage(String author, String messageText, List<BotRecord> records) {
        this.author = author;
        this.messageText = messageText;
        this.records = records;
    }

    /**
     * Convenience constructor to create a simple bot message.
     * @param author Author param description
     * @param messageText Message text param description
     * @param items A list of `BotItem`s
     * @see TEST_BotItem
     */    
    public BotMessage(String author, String messageText, List<BotItem> items) {
        this.author = author;
        this.messageText = messageText;
        this.items = items;
    }

    /**
     * Convenience constructor to create a simple bot message.
     * @param author Author param description
     * @param messageText Message text param description
     * @param items A list of `BotMessageButton`s
     * @see TEST_BotMessageButton
     */ 
    public BotMessage(String author, String messageText, List<BotMessageButton> buttons) {
        this.author = author;
        this.messageText = messageText;
        this.buttons = buttons;
    }

    /**
     * Convenience constructor to create a simple bot message.
     * @param author Author param description
     * @param messageText Message text param description
     * @param imageURL ImageURL param description
     */ 
    public BotMessage(String author, String messageText, String imageURL) {
        this.author = author;
        this.messageText = messageText;
        this.imageURL = imageURL;
    }
}