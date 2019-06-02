/**
 * The apex-lang `ISObjectComparator` interface. The classes in this group have 
 * been randomly gathered from various resources simply to demonstrate ApexDoc2-VSCode's
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
 * @group Global Utils
 * @see [Source](http://code.google.com/p/apex-lang/)
 * @see [License](http://www.apache.org/licenses/LICENSE-2.0)
 * @see TEST_ArrayUtils.qsort[2]
 */
global interface TEST_IObjectComparator {
    Integer compare(Object object1, Object object2);
}