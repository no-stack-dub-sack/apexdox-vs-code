/**
 * The Code in this class does not always need to be valid. Testing purposes only.
 * Our annotation regex should be able to capture all of these annotations,
 * even if this scenario is unlikely or will never happen in real life. Testing
 * edge cases.
 *
 * @since 2022-10-07 This is an example of a since not associated with an author followed by an author without a since
 * 
 * @author Unknown
 * 
 * @author P. Weinberg
 * @since 2019-01-01 Created
 * 
 * @author Bill C Riemers
 * @since 2022-10-05 Added changelog
 * @since 2022-10-07 This is validating that both changes pickup
 * 
 * @group Assertions
 */
@FirstAnnotation(param=true) @SecondAnnotation(paramWithValue='/value/*')
@ThirdAnnotation public class TEST_Annotations {

    /**
     * Several annotations over two lines.
     */
    @FirstAnnotation @SecondAnnotation
    @ThirdAnnotation public static Integer method1() {
        return 1;
    }

    /**
     * Our annotation regexp should match this annotation with params.
     * @return `Integer`
     */
    @InvocableMethod(label='Get Account Names' description='Returns the list of account names corresponding to the specified account IDs.')
    Integer method2() { return 5; }

    /**
     * Our annotation regexp should match this annotation
     */
    @AuraEnabled(cacheable=true)
    public static void method3() {

    }

    /**
     * Our annotation regexp should match this annotation
     */
    @AuraEnabled (cacheable=true)
    public static void method4() {

    }
}