/**
 * An JSON Web Token utility class.
 * @author Salesforce.com
 * @since Jul 2017
 * @see [License](https://github.com/dreamhouseapp/dreamhouse-sfdx/blob/master/LICENSE)
 * @see [Github](https://github.com/dreamhouseapp/dreamhouse-sfdx)
 * @group Dreamhouse Utils
 */
public class TEST_JWTBearerFlow {

    /**
     * Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse.
     * @param tokenEndpoint The Token's endpoint
     * @param jwt An instance of the `JWT` class
     * @returns Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse.
     */    
    public static String getAccessToken(String tokenEndpoint, JWT jwt) {
    
        String access_token = null;
        String body = 'grant_type=urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Ajwt-bearer&assertion=' + jwt.issue();
        HttpRequest req = new HttpRequest();                            
        req.setMethod('POST');
        req.setEndpoint(tokenEndpoint);
        req.setHeader('Content-type', 'application/x-www-form-urlencoded');
        req.setBody(body);
        Http http = new Http();               
        HTTPResponse res = http.send(req);
        
        if ( res.getStatusCode() == 200 ) {
            System.JSONParser parser = System.JSON.createParser(res.getBody());
            while (parser.nextToken() != null) {
                if ((parser.getCurrentToken() == JSONToken.FIELD_NAME) && (parser.getText() == 'access_token')) {
                    parser.nextToken();
                    access_token = parser.getText();
                    break;
                }
            }
        }
        return access_token;
        
    }

}