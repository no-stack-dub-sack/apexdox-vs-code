/**
 * The `MyRestResource` class. The classes in this group have been randomly
 * gathered from various resources simply to demonstrate ApexDox VS Code's multi-source
 * directory feature aimed at Salesforce-DX projects which may have a `main` folder
 * and multipke feature directories.
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
@RestResource(urlMapping='/Account/*')
global with sharing class TEST_MyRestResource {

    @HttpDelete
    global static void doDelete() {
        RestRequest req = RestContext.request;
        RestResponse res = RestContext.response;
        String accountId = req.requestURI.substring(req.requestURI.lastIndexOf('/')+1);
        Account account = [SELECT Id FROM Account WHERE Id = :accountId];
        delete account;
    }

    @HttpGet
    global static Account doGet() {
        RestRequest req = RestContext.request;
        RestResponse res = RestContext.response;
        String accountId = req.requestURI.substring(req.requestURI.lastIndexOf('/')+1);
        Account result = [SELECT Id, Name, Phone, Website FROM Account WHERE Id = :accountId];
        return result;
    }

    @HttpPost
    global static String doPost(String name,
        String phone, String website) {
        Account account = new Account();
        account.Name = name;
        account.phone = phone;
        account.website = website;
        insert account;
        return account.Id;
    }
}
