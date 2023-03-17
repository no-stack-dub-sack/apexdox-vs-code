/**
 * The `LIFXController` test class.
 * @group Feature1
 * 
 * @author Bill C Riemers
 * @since 2022-10-05 Added changelog
 */
@isTest
public class TEST_LIFXControllerTest {
    
    static testMethod void testGetLights() {
        Boolean success = true;
        try {
	        LIFXController.getLights();
        } catch (Exception e) {
            success = false;
        } finally {
	        System.assert(success);
        }
    }

    static testMethod void testSetPower() {
        Boolean success = true;
        try {
	        LIFXController.setPower('1', true);
        } catch (Exception e) {
            success = false;
        } finally {
	        System.assert(success);
        }
    }

    static testMethod void testSetBrightness() {
        Boolean success = true;
        try {
	        LIFXController.setBrightness('1', 1);
        } catch (Exception e) {
            success = false;
        } finally {
	        System.assert(success);
        }
    }
}