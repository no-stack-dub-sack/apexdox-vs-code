/**
 * The apex-lang `ISObjectComparator` interface. The classes in this group have 
 * been randomly gathered from various resources simply to demonstrate ApexDox VS Code's
 * multi-source directory feature aimed at Salesforce-DX projects which may have a `main`
 * folder and multipke feature directories.
 * 
 * <br><br>
 * 
 * This code is part of the 'apex-lang' open source project avaiable at:
 * 
 * http://code.google.com/p/apex-lang/.
 * 
 * This code is licensed under the Apache License, Version 2.0. You may obtain a 
 * copy of the License at:
 * 
 * http://www.apache.org/licenses/LICENSE-2.0.
 * 
 * @author Richard Vanhook
 * @since Dec 28, 2008
 * @group Feature1
 * @see [Source](http://code.google.com/p/apex-lang/)
 * @see [License](http://www.apache.org/licenses/LICENSE-2.0)
 * @see TEST_ArrayUtils.qsort[4]
 */
global interface TEST_ISObjectComparator{
    Integer compare(SObject record1, SObject record2);
}