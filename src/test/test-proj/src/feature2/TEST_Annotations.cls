/**
 * The Code in this class does not always need to be valid. Testing purposes only.
 * Our annotation regex should be able to capture all of these annotations,
 * even if this scenario is unlikely or will never happen in real life. Testing
 * edge cases.
 *
 * @author P. Weinberg
 * @since 2019
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