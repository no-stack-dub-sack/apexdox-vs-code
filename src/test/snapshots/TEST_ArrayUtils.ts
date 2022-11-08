export default `<!DOCTYPE html>
<html lang="en">

  <head>
    <title>My Test Docs</title>
    <meta charset="UTF-8">
    <script type="module" src="./assets/index.js"></script>
    <script type="module" src="./assets/search-idx.js"></script>
    <script type="module" src="./assets/search.js"></script>
    <script charset="UTF-8" src="./assets/highlight.js"></script>
    <script charset="UTF-8" src="./assets/mark.js"></script>
    <script charset="UTF-8" src="./assets/lunr.js"></script>
    <link rel="stylesheet" href="./assets/highlight.css" />
    <link rel="stylesheet" type="text/css" href="./assets/index.css" />
    <link rel="shortcut icon" type="image/png" href="./assets/favicon.png" />
  </head>

  <body>
    <div id="side-bar">

      <div id="logo-container">
        <div class="title">
          My Test Docs
        </div>
        <img src="assets/logo.png" />
        <div class="subtitle">
          Powered by <a target="_blank" rel="noopener noreferrer" href="https://github.com/no-stack-dub-sack/apexdox-vs-code">ApexDox VS Code</a>
        </div>
      </div>
      <div id="search-wrapper">
        <div class="search-icon"></div>
        <input id="search-input" type="text" autocomplete="off" placeholder="Search...">
      </div>
      <ul id="search-results" class=""></ul>
      <div class="navbar">
        <nav role="navigation">
          <a class="nav-header" id="home" href="javascript:void(0)" onclick="goToLocation('index.html');">
            Home
          </a>
          <details id="Assertions" class="group-name">
            <summary id="header-Assertions" class="nav-header">
              <span>Assertions</span>
            </summary>
            <ul>
              <!-- menu items -->
              <li title="TEST_Annotations" id="item-TEST_Annotations" class="nav-item class public" onclick="goToLocation('TEST_Annotations.html');">
                <a tabindex="1" href="javascript:void(0)">TEST_Annotations</a>
              </li>
              <li title="TEST_EnumClass" id="item-TEST_EnumClass" class="nav-item class public" onclick="goToLocation('TEST_EnumClass.html');">
                <a tabindex="1" href="javascript:void(0)">TEST_EnumClass</a>
              </li>
              <li title="TEST_EnumInner" id="item-TEST_EnumInner" class="nav-item class public" onclick="goToLocation('TEST_EnumInner.html');">
                <a tabindex="1" href="javascript:void(0)">TEST_EnumInner</a>
              </li>
              <li title="TEST_InterfaceClass" id="item-TEST_InterfaceClass" class="nav-item class global" onclick="goToLocation('TEST_InterfaceClass.html');">
                <a tabindex="1" href="javascript:void(0)">TEST_InterfaceClass</a>
              </li>
              <li title="TEST_Links" id="item-TEST_Links" class="nav-item class public" onclick="goToLocation('TEST_Links.html');">
                <a tabindex="1" href="javascript:void(0)">TEST_Links</a>
              </li>
              <li title="TEST_Methods" id="item-TEST_Methods" class="nav-item class public" onclick="goToLocation('TEST_Methods.html');">
                <a tabindex="1" href="javascript:void(0)">TEST_Methods</a>
              </li>
              <li title="TEST_MultiLineTagValues" id="item-TEST_MultiLineTagValues" class="nav-item class public" onclick="goToLocation('TEST_MultiLineTagValues.html');">
                <a tabindex="1" href="javascript:void(0)">TEST_MultiLineTagValues</a>
              </li>
              <li title="TEST_NestedClasses" id="item-TEST_NestedClasses" class="nav-item class public" onclick="goToLocation('TEST_NestedClasses.html');">
                <a tabindex="1" href="javascript:void(0)">TEST_NestedClasses</a>
              </li>
              <li title="TEST_Properties" id="item-TEST_Properties" class="nav-item class public" onclick="goToLocation('TEST_Properties.html');">
                <a tabindex="1" href="javascript:void(0)">TEST_Properties</a>
              </li>
            </ul>
          </details>
          <details id="Feature1" class="group-name">
            <summary id="header-Feature1" class="nav-header">
              <span>Feature1</span>
            </summary>
            <ul>
              <!-- menu items -->
              <li title="TEST_ArrayUtils" id="item-TEST_ArrayUtils" class="nav-item class global" onclick="goToLocation('TEST_ArrayUtils.html');">
                <a tabindex="1" href="javascript:void(0)">TEST_ArrayUtils</a>
              </li>
              <li title="TEST_BotField" id="item-TEST_BotField" class="nav-item class public" onclick="goToLocation('TEST_BotField.html');">
                <a tabindex="1" href="javascript:void(0)">TEST_BotField</a>
              </li>
              <li title="TEST_BotHandler" id="item-TEST_BotHandler" class="nav-item class public" onclick="goToLocation('TEST_BotHandler.html');">
                <a tabindex="1" href="javascript:void(0)">TEST_BotHandler</a>
              </li>
              <li title="TEST_BotItem" id="item-TEST_BotItem" class="nav-item class public" onclick="goToLocation('TEST_BotItem.html');">
                <a tabindex="1" href="javascript:void(0)">TEST_BotItem</a>
              </li>
              <li title="TEST_BotMessage" id="item-TEST_BotMessage" class="nav-item class public" onclick="goToLocation('TEST_BotMessage.html');">
                <a tabindex="1" href="javascript:void(0)">TEST_BotMessage</a>
              </li>
              <li title="TEST_HandlerSOQL" id="item-TEST_HandlerSOQL" class="nav-item class public" onclick="goToLocation('TEST_HandlerSOQL.html');">
                <a tabindex="1" href="javascript:void(0)">TEST_HandlerSOQL</a>
              </li>
              <li title="TEST_IllegalStateException" id="item-TEST_IllegalStateException" class="nav-item class global" onclick="goToLocation('TEST_IllegalStateException.html');">
                <a tabindex="1" href="javascript:void(0)">TEST_IllegalStateException</a>
              </li>
              <li title="TEST_ISObjectComparator" id="item-TEST_ISObjectComparator" class="nav-item class global" onclick="goToLocation('TEST_ISObjectComparator.html');">
                <a tabindex="1" href="javascript:void(0)">TEST_ISObjectComparator</a>
              </li>
              <li title="TEST_JWT" id="item-TEST_JWT" class="nav-item class public" onclick="goToLocation('TEST_JWT.html');">
                <a tabindex="1" href="javascript:void(0)">TEST_JWT</a>
              </li>
              <li title="TEST_LIFXController" id="item-TEST_LIFXController" class="nav-item class public" onclick="goToLocation('TEST_LIFXController.html');">
                <a tabindex="1" href="javascript:void(0)">TEST_LIFXController</a>
              </li>
              <li title="TEST_MyRestResource" id="item-TEST_MyRestResource" class="nav-item class global" onclick="goToLocation('TEST_MyRestResource.html');">
                <a tabindex="1" href="javascript:void(0)">TEST_MyRestResource</a>
              </li>
              <li title="TEST_PrimitiveComparator" id="item-TEST_PrimitiveComparator" class="nav-item class global" onclick="goToLocation('TEST_PrimitiveComparator.html');">
                <a tabindex="1" href="javascript:void(0)">TEST_PrimitiveComparator</a>
              </li>
              <li title="TEST_SampleDataController" id="item-TEST_SampleDataController" class="nav-item class public" onclick="goToLocation('TEST_SampleDataController.html');">
                <a tabindex="1" href="javascript:void(0)">TEST_SampleDataController</a>
              </li>
              <li title="TEST_SlackOpportunityPublisher" id="item-TEST_SlackOpportunityPublisher" class="nav-item class public" onclick="goToLocation('TEST_SlackOpportunityPublisher.html');">
                <a tabindex="1" href="javascript:void(0)">TEST_SlackOpportunityPublisher</a>
              </li>
              <li title="TEST_StopWatch" id="item-TEST_StopWatch" class="nav-item class global" onclick="goToLocation('TEST_StopWatch.html');">
                <a tabindex="1" href="javascript:void(0)">TEST_StopWatch</a>
              </li>
            </ul>
          </details>
          <details id="Miscellaneous" class="group-name">
            <summary id="header-Miscellaneous" class="nav-header">
              <span>Miscellaneous</span>
            </summary>
            <ul>
              <!-- menu items -->
              <li title="IncludeOne" id="item-IncludeOne" class="nav-item class public" onclick="goToLocation('IncludeOne.html');">
                <a tabindex="1" href="javascript:void(0)">IncludeOne</a>
              </li>
              <li title="IncludeTwo" id="item-IncludeTwo" class="nav-item class private" onclick="goToLocation('IncludeTwo.html');">
                <a tabindex="1" href="javascript:void(0)">IncludeTwo</a>
              </li>
            </ul>
          </details>
        </nav>
      </div>
    </div>
    <table id="content">
      <tr>
        <td class="scoping-panel">
          Show: <input type="checkbox" checked="true" id="cbx-all" onclick="toggleAllScopes(this.checked);" />
          <label for="cbx-all">All</label>&nbsp;&nbsp;
          <input type="checkbox" checked="true" id="cbx-public" onclick="toggleScope('public', this.checked);" />
          <label for="cbx-public">
            public
          </label>&nbsp;&nbsp;<input type="checkbox" checked="true" id="cbx-private" onclick="toggleScope('private', this.checked);" />
          <label for="cbx-private">
            private
          </label>&nbsp;&nbsp;<input type="checkbox" checked="true" id="cbx-protected" onclick="toggleScope('protected', this.checked);" />
          <label for="cbx-protected">
            protected
          </label>&nbsp;&nbsp;<input type="checkbox" checked="true" id="cbx-global" onclick="toggleScope('global', this.checked);" />
          <label for="cbx-global">
            global
          </label>
        </td>
      </tr>
      <tr>
        <td class="doc-page">

          <div class="section">

            <h2 class="class-title top-level-type" id="TEST_ArrayUtils">

              <a target="_blank" rel="noopener noreferrer" title="Go to source" class="source-link" href="https://somefakeurl.com/TEST_ArrayUtils.cls#L28">
                TEST_ArrayUtils
              </a>
            </h2>
            <div class="class-container">

              <div class="class-description">
                The apex-lang <code class="code-inline">ArrayUtils</code> utility class for Apex. The classes in this group have been randomly gathered from various resources simply to demonstrate ApexDox VS Code&#39;s multi-source directory feature aimed at Salesforce-DX projects which may have a <code class="code-inline">main</code> folder and multipke feature directories. <br><br> This code is part of the &#39;apex-lang&#39; open source project avaiable at: http://code.google.com/p/apex-lang/. This code is licensed under the Apache License, Version 2.0. You may obtain a copy of the License at: http://www.apache.org/licenses/LICENSE-2.0.
              </div>
              <div class="class-subtitle">
                Signature
              </div>

              <div class="class-signature">
                global class TEST_ArrayUtils
              </div>
              <div class="class-subtitle">
                See
              </div>
              <div class="class-subtitle-description">
                <a target="_blank" rel="noopener noreferrer" href="http://code.google.com/p/apex-lang/">Source</a>, <a target="_blank" rel="noopener noreferrer" href="http://www.apache.org/licenses/LICENSE-2.0">License</a>
              </div>
              <div class="class-subtitle">
                Author
              </div>
              <div class="class-subtitle-description">
                Richard Vanhook
              </div>
              <div class="class-subtitle">
                Since
              </div>
              <div class="class-subtitle-description">
                <li>2008-12-28 Created</li>
              </div>
              <div class="class-subtitle">
                Author
              </div>
              <div class="class-subtitle-description">
                Bill C Riemers
              </div>
              <div class="class-subtitle">
                Since
              </div>
              <div class="class-subtitle-description">
                <li>2022-10-05 Added changelog</li>
              </div>
            </div>
            <div class="subsection properties TEST_ArrayUtils">
              <h3 class="subsection-title properties">TEST_ArrayUtils Properties</h3>
              <table class="attributes-table properties">

                <tr>
                  <th>Name</th>
                  <th>Signature</th>


                </tr>
                <tr class="property global">
                  <td class="attribute-name">
                    <a target="_blank" rel="noopener noreferrer" title="Go to source" class="source-link" href="https://somefakeurl.com/TEST_ArrayUtils.cls#L30">
                      EMPTY_STRING_ARRAY
                    </a></td>
                  <td>
                    <div class="attribute-signature">
                      global static String[] EMPTY_STRING_ARRAY
                    </div>
                  </td>


                </tr>
                <tr class="property global">
                  <td class="attribute-name">
                    <a target="_blank" rel="noopener noreferrer" title="Go to source" class="source-link" href="https://somefakeurl.com/TEST_ArrayUtils.cls#L31">
                      MAX_NUMBER_OF_ELEMENTS_IN_LIST
                    </a></td>
                  <td>
                    <div class="attribute-signature">
                      global static Integer MAX_NUMBER_OF_ELEMENTS_IN_LIST
                    </div>
                  </td>


                </tr>
              </table>
            </div>
            <div class="subsection methods">
              <h3 class="subsection-title methods">TEST_ArrayUtils Methods</h3>
              <div class="methods-container">
                <ul class="methods-toc">
                  <li class="method global">
                    <a class="methods-toc__entry " href="#TEST_ArrayUtils.assertArraysAreEqual">
                      assertArraysAreEqual (expected, actual)
                    </a>

                    <div class="methods-toc__description">
                      Assert that two arrays do not have equal elements
                    </div>
                  </li>
                  <li class="method global">
                    <a class="methods-toc__entry " href="#TEST_ArrayUtils.assertArraysAreEqual_1">
                      assertArraysAreEqual (expected, actual)
                    </a>

                    <div class="methods-toc__description">
                      Assert that two arrays do not have equal elements
                    </div>
                  </li>
                  <li class="method global">
                    <a class="methods-toc__entry " href="#TEST_ArrayUtils.isEmpty">
                      isEmpty (objectArray)
                    </a>

                    <div class="methods-toc__description">
                      Returns <code class="code-inline">true</code> if a given array is empty
                    </div>
                  </li>
                  <li class="method global">
                    <a class="methods-toc__entry " href="#TEST_ArrayUtils.isEmpty_1">
                      isEmpty (objectArray)
                    </a>

                    <div class="methods-toc__description">
                      Returns <code class="code-inline">true</code> if a given array is empty
                    </div>
                  </li>
                  <li class="method global">
                    <a class="methods-toc__entry " href="#TEST_ArrayUtils.isNotEmpty">
                      isNotEmpty (objectArray)
                    </a>

                    <div class="methods-toc__description">
                      Returns <code class="code-inline">true</code> if a given array is NOT empty
                    </div>
                  </li>
                  <li class="method global">
                    <a class="methods-toc__entry " href="#TEST_ArrayUtils.isNotEmpty_1">
                      isNotEmpty (objectArray)
                    </a>

                    <div class="methods-toc__description">
                      Returns <code class="code-inline">true</code> if a given array is NOT empty
                    </div>
                  </li>
                  <li class="method global">
                    <a class="methods-toc__entry " href="#TEST_ArrayUtils.lowerCase">
                      lowerCase (strs)
                    </a>

                    <div class="methods-toc__description">
                      Lowercase each item of a string array.
                    </div>
                  </li>
                  <li class="method global">
                    <a class="methods-toc__entry " href="#TEST_ArrayUtils.merg">
                      merg (list1, list2)
                    </a>

                    <div class="methods-toc__description">
                      Merge two lists
                    </div>
                  </li>
                  <li class="method global">
                    <a class="methods-toc__entry " href="#TEST_ArrayUtils.merg_1">
                      merg (list1, list2)
                    </a>

                    <div class="methods-toc__description">
                      Merge two lists
                    </div>
                  </li>
                  <li class="method global">
                    <a class="methods-toc__entry " href="#TEST_ArrayUtils.mergex">
                      mergex (array1, array2)
                    </a>

                    <div class="methods-toc__description">
                      Merge the elements of two arrays into a single array.
                    </div>
                  </li>
                  <li class="method global">
                    <a class="methods-toc__entry " href="#TEST_ArrayUtils.mergex_1">
                      mergex (array1, array2)
                    </a>

                    <div class="methods-toc__description">
                      An overload for <code class="code-inline">mergex</code> which handles SObjects.
                    </div>
                  </li>
                  <li class="method global">
                    <a class="methods-toc__entry " href="#TEST_ArrayUtils.objectToString">
                      objectToString (objects)
                    </a>

                    <div class="methods-toc__description">
                      Cast a list of objects as strings and return the list.
                    </div>
                  </li>
                  <li class="method global">
                    <a class="methods-toc__entry " href="#TEST_ArrayUtils.pluck">
                      pluck (objectArray, fieldName)
                    </a>

                    <div class="methods-toc__description">
                      Iterate over an SObject array, plucking out a given field, and returning each plucked element in an array.
                    </div>
                  </li>
                  <li class="method global">
                    <a class="methods-toc__entry " href="#TEST_ArrayUtils.qsort">
                      qsort (theList)
                    </a>

                    <div class="methods-toc__description">
                      Quicksort implementation for a list of primitive Objects.
                    </div>
                  </li>
                  <li class="method global">
                    <a class="methods-toc__entry " href="#TEST_ArrayUtils.qsort_1">
                      qsort (theList, sortAsc)
                    </a>

                    <div class="methods-toc__description">
                      Quicksort implementation for a list of primitive Objects.
                    </div>
                  </li>
                  <li class="method global">
                    <a class="methods-toc__entry " href="#TEST_ArrayUtils.qsort_2">
                      qsort (theList, comparator)
                    </a>

                    <div class="methods-toc__description">
                      Quicksort implementation for a list of Objects.
                    </div>
                  </li>
                  <li class="method global">
                    <a class="methods-toc__entry " href="#TEST_ArrayUtils.qsort_3">
                      qsort (theList, comparator, sortAsc)
                    </a>

                    <div class="methods-toc__description">
                      Quicksort implementation for a list of Objects.
                    </div>
                  </li>
                  <li class="method global">
                    <a class="methods-toc__entry " href="#TEST_ArrayUtils.qsort_4">
                      qsort (theList, comparator)
                    </a>

                    <div class="methods-toc__description">
                      Quicksort implementation for a list of SObjects.
                    </div>
                  </li>
                  <li class="method global">
                    <a class="methods-toc__entry " href="#TEST_ArrayUtils.qsort_5">
                      qsort (theList, comparator, sortAsc)
                    </a>

                    <div class="methods-toc__description">
                      Quicksort implementation for a list of SObjects.
                    </div>
                  </li>
                  <li class="method private">
                    <a class="methods-toc__entry " href="#TEST_ArrayUtils.qsort_6">
                      qsort (theList, lo0, hi0, comparator, sortAsc)
                    </a>

                    <div class="methods-toc__description">
                      Private helper method
                    </div>
                  </li>
                  <li class="method private">
                    <a class="methods-toc__entry " href="#TEST_ArrayUtils.qsort_7">
                      qsort (theList, lo0, hi0, comparator, sortAsc)
                    </a>

                    <div class="methods-toc__description">
                      Private helper method
                    </div>
                  </li>
                  <li class="method global">
                    <a class="methods-toc__entry " href="#TEST_ArrayUtils.reverse">
                      reverse (anArray)
                    </a>

                    <div class="methods-toc__description">
                      Reverse an array.
                    </div>
                  </li>
                  <li class="method global">
                    <a class="methods-toc__entry " href="#TEST_ArrayUtils.reverse_1">
                      reverse (anArray)
                    </a>

                    <div class="methods-toc__description">
                      Reverse an array of SObjects.
                    </div>
                  </li>
                  <li class="method global">
                    <a class="methods-toc__entry " href="#TEST_ArrayUtils.subset">
                      subset (aList, count)
                    </a>

                    <div class="methods-toc__description">
                      Return a subset of an array.
                    </div>
                  </li>
                  <li class="method global">
                    <a class="methods-toc__entry " href="#TEST_ArrayUtils.subset_1">
                      subset (list1, startIndex, count)
                    </a>

                    <div class="methods-toc__description">
                      Return a subset of an array.
                    </div>
                  </li>
                  <li class="method global">
                    <a class="methods-toc__entry " href="#TEST_ArrayUtils.subset_2">
                      subset (aList, count)
                    </a>

                    <div class="methods-toc__description">
                      Return a subset of an array.
                    </div>
                  </li>
                  <li class="method global">
                    <a class="methods-toc__entry " href="#TEST_ArrayUtils.subset_3">
                      subset (list1, startIndex, count)
                    </a>

                    <div class="methods-toc__description">
                      Return a subset of an array.
                    </div>
                  </li>
                  <li class="method global">
                    <a class="methods-toc__entry " href="#TEST_ArrayUtils.toString">
                      toString (objectArray)
                    </a>

                    <div class="methods-toc__description">
                      Stringify an array.
                    </div>
                  </li>
                  <li class="method global">
                    <a class="methods-toc__entry " href="#TEST_ArrayUtils.toString_1">
                      toString (objectArray)
                    </a>

                    <div class="methods-toc__description">
                      Stringify an array.
                    </div>
                  </li>
                  <li class="method global">
                    <a class="methods-toc__entry " href="#TEST_ArrayUtils.trim">
                      trim (strs)
                    </a>

                    <div class="methods-toc__description">
                      Trim each element of a string array.
                    </div>
                  </li>
                  <li class="method global">
                    <a class="methods-toc__entry " href="#TEST_ArrayUtils.upperCase">
                      upperCase (strs)
                    </a>

                    <div class="methods-toc__description">
                      Uppercase each item of a string array.
                    </div>
                  </li>
                </ul>
                <div class="method global">
                  <h4 class="method-title " id="TEST_ArrayUtils.assertArraysAreEqual">

                    <a target="_blank" rel="noopener noreferrer" title="Go to source" class="source-link" href="https://somefakeurl.com/TEST_ArrayUtils.cls#L265">
                      assertArraysAreEqual(expected, actual)
                    </a>
                  </h4>
                  <div class="method-description">
                    Assert that two arrays do not have equal elements
                  </div>
                  <div class="method-subtitle">
                    Signature
                  </div>

                  <div class="method-signature">
                    global static void assertArraysAreEqual(Object[] expected, Object[] actual)
                  </div>
                </div>
                <div class="method global">
                  <h4 class="method-title " id="TEST_ArrayUtils.assertArraysAreEqual_1">

                    <a target="_blank" rel="noopener noreferrer" title="Go to source" class="source-link" href="https://somefakeurl.com/TEST_ArrayUtils.cls#L281">
                      assertArraysAreEqual(expected, actual)
                    </a>
                  </h4>
                  <div class="method-description">
                    Assert that two arrays do not have equal elements
                  </div>
                  <div class="method-subtitle">
                    Signature
                  </div>

                  <div class="method-signature">
                    global static void assertArraysAreEqual(SObject[] expected, SObject[] actual)
                  </div>
                </div>
                <div class="method global">
                  <h4 class="method-title " id="TEST_ArrayUtils.isEmpty">

                    <a target="_blank" rel="noopener noreferrer" title="Go to source" class="source-link" href="https://somefakeurl.com/TEST_ArrayUtils.cls#L186">
                      isEmpty(objectArray)
                    </a>
                  </h4>
                  <div class="method-description">
                    Returns <code class="code-inline">true</code> if a given array is empty
                  </div>
                  <div class="method-subtitle">
                    Signature
                  </div>

                  <div class="method-signature">
                    global static Boolean isEmpty(Object[] objectArray)
                  </div>
                </div>
                <div class="method global">
                  <h4 class="method-title " id="TEST_ArrayUtils.isEmpty_1">

                    <a target="_blank" rel="noopener noreferrer" title="Go to source" class="source-link" href="https://somefakeurl.com/TEST_ArrayUtils.cls#L194">
                      isEmpty(objectArray)
                    </a>
                  </h4>
                  <div class="method-description">
                    Returns <code class="code-inline">true</code> if a given array is empty
                  </div>
                  <div class="method-subtitle">
                    Signature
                  </div>

                  <div class="method-signature">
                    global static Boolean isEmpty(SObject[] objectArray)
                  </div>
                </div>
                <div class="method global">
                  <h4 class="method-title " id="TEST_ArrayUtils.isNotEmpty">

                    <a target="_blank" rel="noopener noreferrer" title="Go to source" class="source-link" href="https://somefakeurl.com/TEST_ArrayUtils.cls#L202">
                      isNotEmpty(objectArray)
                    </a>
                  </h4>
                  <div class="method-description">
                    Returns <code class="code-inline">true</code> if a given array is NOT empty
                  </div>
                  <div class="method-subtitle">
                    Signature
                  </div>

                  <div class="method-signature">
                    global static Boolean isNotEmpty(Object[] objectArray)
                  </div>
                </div>
                <div class="method global">
                  <h4 class="method-title " id="TEST_ArrayUtils.isNotEmpty_1">

                    <a target="_blank" rel="noopener noreferrer" title="Go to source" class="source-link" href="https://somefakeurl.com/TEST_ArrayUtils.cls#L207">
                      isNotEmpty(objectArray)
                    </a>
                  </h4>
                  <div class="method-description">
                    Returns <code class="code-inline">true</code> if a given array is NOT empty
                  </div>
                  <div class="method-subtitle">
                    Signature
                  </div>

                  <div class="method-signature">
                    global static Boolean isNotEmpty(SObject[] objectArray)
                  </div>
                </div>
                <div class="method global">
                  <h4 class="method-title " id="TEST_ArrayUtils.lowerCase">

                    <a target="_blank" rel="noopener noreferrer" title="Go to source" class="source-link" href="https://somefakeurl.com/TEST_ArrayUtils.cls#L102">
                      lowerCase(strs)
                    </a>
                  </h4>
                  <div class="method-description">
                    Lowercase each item of a string array.
                  </div>
                  <div class="method-subtitle">
                    Signature
                  </div>

                  <div class="method-signature">
                    global static List&lt;String&gt; lowerCase(List&lt;String&gt; strs)
                  </div>
                  <div class="method-subtitle">Parameters</div>
                  <div class="param-name">strs</div>
                  <div class="param-type">
                    Type: <code class="code-inline">List&lt;String&gt;</code>
                  </div>
                  <div class="param-description">A list of strings to convert to lowercase</div>
                  <div class="method-subtitle">
                    Returns
                  </div>
                  <div class="method-subtitle-description">
                    The list of lowercased strings.
                  </div>
                </div>
                <div class="method global">
                  <h4 class="method-title " id="TEST_ArrayUtils.merg">

                    <a target="_blank" rel="noopener noreferrer" title="Go to source" class="source-link" href="https://somefakeurl.com/TEST_ArrayUtils.cls#L297">
                      merg(list1, list2)
                    </a>
                  </h4>
                  <div class="method-description">
                    Merge two lists
                  </div>
                  <div class="method-subtitle">
                    Signature
                  </div>

                  <div class="method-signature">
                    global static List&lt;Object&gt; merg(List&lt;Object&gt; list1, List&lt;Object&gt; list2)
                  </div>
                </div>
                <div class="method global">
                  <h4 class="method-title " id="TEST_ArrayUtils.merg_1">

                    <a target="_blank" rel="noopener noreferrer" title="Go to source" class="source-link" href="https://somefakeurl.com/TEST_ArrayUtils.cls#L316">
                      merg(list1, list2)
                    </a>
                  </h4>
                  <div class="method-description">
                    Merge two lists
                  </div>
                  <div class="method-subtitle">
                    Signature
                  </div>

                  <div class="method-signature">
                    global static List&lt;SObject&gt; merg(List&lt;SObject&gt; list1, List&lt;SObject&gt; list2)
                  </div>
                </div>
                <div class="method global">
                  <h4 class="method-title " id="TEST_ArrayUtils.mergex">

                    <a target="_blank" rel="noopener noreferrer" title="Go to source" class="source-link" href="https://somefakeurl.com/TEST_ArrayUtils.cls#L158">
                      mergex(array1, array2)
                    </a>
                  </h4>
                  <div class="method-description">
                    Merge the elements of two arrays into a single array.
                  </div>
                  <div class="method-subtitle">
                    Signature
                  </div>

                  <div class="method-signature">
                    global static Object[] mergex(Object[] array1, Object[] array2)
                  </div>
                  <div class="method-subtitle">Parameters</div>
                  <div class="param-name">array1</div>
                  <div class="param-description">The elements of this array will be first in the resulting array.</div>
                  <div class="param-name">array2</div>
                  <div class="param-description">The elements of this array will come after the elements of <code class="code-inline">array1</code> in the resulting array.</div>
                  <div class="method-subtitle">
                    Returns
                  </div>
                  <div class="method-subtitle-description">
                    The merged array.
                  </div>
                </div>
                <div class="method global">
                  <h4 class="method-title " id="TEST_ArrayUtils.mergex_1">

                    <a target="_blank" rel="noopener noreferrer" title="Go to source" class="source-link" href="https://somefakeurl.com/TEST_ArrayUtils.cls#L175">
                      mergex(array1, array2)
                    </a>
                  </h4>
                  <div class="method-description">
                    An overload for <code class="code-inline">mergex</code> which handles SObjects.
                  </div>
                  <div class="method-subtitle">
                    Signature
                  </div>

                  <div class="method-signature">
                    global static SObject[] mergex(SObject[] array1, SObject[] array2)
                  </div>
                  <div class="method-subtitle">
                    See
                  </div>
                  <div class="method-subtitle-description">
                    <a href="javascript:void(0)" onclick="goToLocation('TEST_ArrayUtils.html#TEST_ArrayUtils.mergex')">TEST_ArrayUtils.mergex</a>
                  </div>
                </div>
                <div class="method global">
                  <h4 class="method-title " id="TEST_ArrayUtils.objectToString">

                    <a target="_blank" rel="noopener noreferrer" title="Go to source" class="source-link" href="https://somefakeurl.com/TEST_ArrayUtils.cls#L38">
                      objectToString(objects)
                    </a>
                  </h4>
                  <div class="method-description">
                    Cast a list of objects as strings and return the list.
                  </div>
                  <div class="method-subtitle">
                    Signature
                  </div>

                  <div class="method-signature">
                    global static List&lt;String&gt; objectToString(List&lt;Object&gt; objects)
                  </div>
                  <div class="method-subtitle">Parameters</div>
                  <div class="param-name">objects</div>
                  <div class="param-type">
                    Type: <code class="code-inline">List&lt;Object&gt;</code>
                  </div>
                  <div class="param-description">A list of objects to cast</div>
                  <div class="method-subtitle">
                    Returns
                  </div>
                  <div class="method-subtitle-description">
                    Returns a <code class="code-inline">List&lt;String&gt;</code> of casted objects
                  </div>
                </div>
                <div class="method global">
                  <h4 class="method-title " id="TEST_ArrayUtils.pluck">

                    <a target="_blank" rel="noopener noreferrer" title="Go to source" class="source-link" href="https://somefakeurl.com/TEST_ArrayUtils.cls#L217">
                      pluck(objectArray, fieldName)
                    </a>
                  </h4>
                  <div class="method-description">
                    Iterate over an SObject array, plucking out a given field, and returning each plucked element in an array.
                  </div>
                  <div class="method-subtitle">
                    Signature
                  </div>

                  <div class="method-signature">
                    global static Object[] pluck(SObject[] objectArray, String fieldName)
                  </div>
                  <div class="method-subtitle">Parameters</div>
                  <div class="param-name">objectArray</div>
                  <div class="param-description">An array of SObjects</div>
                  <div class="param-name">fieldName</div>
                  <div class="param-type">
                    Type: <code class="code-inline">String</code>
                  </div>
                  <div class="param-description">The field name to pluck.</div>
                  <div class="method-subtitle">
                    Returns
                  </div>
                  <div class="method-subtitle-description">
                    An <code class="code-inline">object</code> array continaing the plucked elements.
                  </div>
                </div>
                <div class="method global">
                  <h4 class="method-title " id="TEST_ArrayUtils.qsort">

                    <a target="_blank" rel="noopener noreferrer" title="Go to source" class="source-link" href="https://somefakeurl.com/TEST_ArrayUtils.cls#L391">
                      qsort(theList)
                    </a>
                  </h4>
                  <div class="method-description">
                    Quicksort implementation for a list of primitive Objects.
                  </div>
                  <div class="method-subtitle">
                    Signature
                  </div>

                  <div class="method-signature">
                    global static List&lt;Object&gt; qsort(List&lt;Object&gt; theList)
                  </div>
                </div>
                <div class="method global">
                  <h4 class="method-title " id="TEST_ArrayUtils.qsort_1">

                    <a target="_blank" rel="noopener noreferrer" title="Go to source" class="source-link" href="https://somefakeurl.com/TEST_ArrayUtils.cls#L398">
                      qsort(theList, sortAsc)
                    </a>
                  </h4>
                  <div class="method-description">
                    Quicksort implementation for a list of primitive Objects.
                  </div>
                  <div class="method-subtitle">
                    Signature
                  </div>

                  <div class="method-signature">
                    global static List&lt;Object&gt; qsort(List&lt;Object&gt; theList, Boolean sortAsc)
                  </div>
                </div>
                <div class="method global">
                  <h4 class="method-title " id="TEST_ArrayUtils.qsort_2">

                    <a target="_blank" rel="noopener noreferrer" title="Go to source" class="source-link" href="https://somefakeurl.com/TEST_ArrayUtils.cls#L406">
                      qsort(theList, comparator)
                    </a>
                  </h4>
                  <div class="method-description">
                    Quicksort implementation for a list of Objects.
                  </div>
                  <div class="method-subtitle">
                    Signature
                  </div>

                  <div class="method-signature">
                    global static List&lt;Object&gt; qsort(List&lt;Object&gt; theList, IObjectComparatr comparator)
                  </div>
                </div>
                <div class="method global">
                  <h4 class="method-title " id="TEST_ArrayUtils.qsort_3">

                    <a target="_blank" rel="noopener noreferrer" title="Go to source" class="source-link" href="https://somefakeurl.com/TEST_ArrayUtils.cls#L413">
                      qsort(theList, comparator, sortAsc)
                    </a>
                  </h4>
                  <div class="method-description">
                    Quicksort implementation for a list of Objects.
                  </div>
                  <div class="method-subtitle">
                    Signature
                  </div>

                  <div class="method-signature">
                    global static List&lt;Object&gt; qsort(List&lt;Object&gt; theList, IObjectComparatr comparator, Boolean sortAsc)
                  </div>
                </div>
                <div class="method global">
                  <h4 class="method-title " id="TEST_ArrayUtils.qsort_4">

                    <a target="_blank" rel="noopener noreferrer" title="Go to source" class="source-link" href="https://somefakeurl.com/TEST_ArrayUtils.cls#L422">
                      qsort(theList, comparator)
                    </a>
                  </h4>
                  <div class="method-description">
                    Quicksort implementation for a list of SObjects.
                  </div>
                  <div class="method-subtitle">
                    Signature
                  </div>

                  <div class="method-signature">
                    global static List&lt;SObject&gt; qsort(List&lt;SObject&gt; theList, ISObjectComparator comparator)
                  </div>
                </div>
                <div class="method global">
                  <h4 class="method-title " id="TEST_ArrayUtils.qsort_5">

                    <a target="_blank" rel="noopener noreferrer" title="Go to source" class="source-link" href="https://somefakeurl.com/TEST_ArrayUtils.cls#L429">
                      qsort(theList, comparator, sortAsc)
                    </a>
                  </h4>
                  <div class="method-description">
                    Quicksort implementation for a list of SObjects.
                  </div>
                  <div class="method-subtitle">
                    Signature
                  </div>

                  <div class="method-signature">
                    global static List&lt;SObject&gt; qsort(List&lt;SObject&gt; theList, ISObjectComparator comparator,Boolean sortAsc )
                  </div>
                </div>
                <div class="method private">
                  <h4 class="method-title " id="TEST_ArrayUtils.qsort_6">

                    <a target="_blank" rel="noopener noreferrer" title="Go to source" class="source-link" href="https://somefakeurl.com/TEST_ArrayUtils.cls#L434">
                      qsort(theList, lo0, hi0, comparator, sortAsc)
                    </a>
                  </h4>
                  <div class="method-description">
                    Private helper method
                  </div>
                  <div class="method-subtitle">
                    Signature
                  </div>

                  <div class="method-signature">
                    private static List&lt;Object&gt; qsort(List&lt;Object&gt; theList, Integer lo0, Integer hi0, IObjectComparatr comparator, Boolean sortAsc)
                  </div>
                </div>
                <div class="method private">
                  <h4 class="method-title " id="TEST_ArrayUtils.qsort_7">

                    <a target="_blank" rel="noopener noreferrer" title="Go to source" class="source-link" href="https://somefakeurl.com/TEST_ArrayUtils.cls#L484">
                      qsort(theList, lo0, hi0, comparator, sortAsc)
                    </a>
                  </h4>
                  <div class="method-description">
                    Private helper method
                  </div>
                  <div class="method-subtitle">
                    Signature
                  </div>

                  <div class="method-signature">
                    private static List&lt;SObject&gt; qsort(List&lt;SObject&gt; theList, Integer lo0, Integer hi0, ISObjectComparator comparator, Boolean sortAsc)
                  </div>
                </div>
                <div class="method global">
                  <h4 class="method-title " id="TEST_ArrayUtils.reverse">

                    <a target="_blank" rel="noopener noreferrer" title="Go to source" class="source-link" href="https://somefakeurl.com/TEST_ArrayUtils.cls#L58">
                      reverse(anArray)
                    </a>
                  </h4>
                  <div class="method-description">
                    Reverse an array.
                  </div>
                  <div class="method-subtitle">
                    Signature
                  </div>

                  <div class="method-signature">
                    global static Object[] reverse(Object[] anArray)
                  </div>
                  <div class="method-subtitle">Parameters</div>
                  <div class="param-name">anArray</div>
                  <div class="param-description">The array to reverse</div>
                  <div class="method-subtitle">
                    Returns
                  </div>
                  <div class="method-subtitle-description">
                    The reversed array.
                  </div>
                </div>
                <div class="method global">
                  <h4 class="method-title " id="TEST_ArrayUtils.reverse_1">

                    <a target="_blank" rel="noopener noreferrer" title="Go to source" class="source-link" href="https://somefakeurl.com/TEST_ArrayUtils.cls#L80">
                      reverse(anArray)
                    </a>
                  </h4>
                  <div class="method-description">
                    Reverse an array of SObjects.
                  </div>
                  <div class="method-subtitle">
                    Signature
                  </div>

                  <div class="method-signature">
                    global static SObject[] reverse(SObject[] anArray)
                  </div>
                  <div class="method-subtitle">Parameters</div>
                  <div class="param-name">anArray</div>
                  <div class="param-description">The array to reverse</div>
                  <div class="method-subtitle">
                    Returns
                  </div>
                  <div class="method-subtitle-description">
                    The reversed array.
                  </div>
                </div>
                <div class="method global">
                  <h4 class="method-title " id="TEST_ArrayUtils.subset">

                    <a target="_blank" rel="noopener noreferrer" title="Go to source" class="source-link" href="https://somefakeurl.com/TEST_ArrayUtils.cls#L343">
                      subset(aList, count)
                    </a>
                  </h4>
                  <div class="method-description">
                    Return a subset of an array.
                  </div>
                  <div class="method-subtitle">
                    Signature
                  </div>

                  <div class="method-signature">
                    global static List&lt;Object&gt; subset(List&lt;Object&gt; aList, Integer count)
                  </div>
                  <div class="method-subtitle">
                    See
                  </div>
                  <div class="method-subtitle-description">
                    <a href="javascript:void(0)" onclick="goToLocation('TEST_ArrayUtils.html#TEST_ArrayUtils.subset_1')">TEST_ArrayUtils.subset</a>, <a href="javascript:void(0)" onclick="goToLocation('TEST_ArrayUtils.html#TEST_ArrayUtils.subset_2')">TEST_ArrayUtils.subset</a>, <a href="javascript:void(0)" onclick="goToLocation('TEST_ArrayUtils.html#TEST_ArrayUtils.subset_3')">TEST_ArrayUtils.subset</a>
                  </div>
                </div>
                <div class="method global">
                  <h4 class="method-title " id="TEST_ArrayUtils.subset_1">

                    <a target="_blank" rel="noopener noreferrer" title="Go to source" class="source-link" href="https://somefakeurl.com/TEST_ArrayUtils.cls#L350">
                      subset(list1, startIndex, count)
                    </a>
                  </h4>
                  <div class="method-description">
                    Return a subset of an array.
                  </div>
                  <div class="method-subtitle">
                    Signature
                  </div>

                  <div class="method-signature">
                    global static List&lt;Object&gt; subset(List&lt;Object&gt; list1, Integer startIndex, Integer count)
                  </div>
                </div>
                <div class="method global">
                  <h4 class="method-title " id="TEST_ArrayUtils.subset_2">

                    <a target="_blank" rel="noopener noreferrer" title="Go to source" class="source-link" href="https://somefakeurl.com/TEST_ArrayUtils.cls#L363">
                      subset(aList, count)
                    </a>
                  </h4>
                  <div class="method-description">
                    Return a subset of an array.
                  </div>
                  <div class="method-subtitle">
                    Signature
                  </div>

                  <div class="method-signature">
                    global static List&lt;SObject&gt; subset(List&lt;SObject&gt; aList, Integer count)
                  </div>
                </div>
                <div class="method global">
                  <h4 class="method-title " id="TEST_ArrayUtils.subset_3">

                    <a target="_blank" rel="noopener noreferrer" title="Go to source" class="source-link" href="https://somefakeurl.com/TEST_ArrayUtils.cls#L370">
                      subset(list1, startIndex, count)
                    </a>
                  </h4>
                  <div class="method-description">
                    Return a subset of an array.
                  </div>
                  <div class="method-subtitle">
                    Signature
                  </div>

                  <div class="method-signature">
                    global static List&lt;SObject&gt; subset(List&lt;SObject&gt; list1, Integer startIndex, Integer count)
                  </div>
                </div>
                <div class="method global">
                  <h4 class="method-title " id="TEST_ArrayUtils.toString">

                    <a target="_blank" rel="noopener noreferrer" title="Go to source" class="source-link" href="https://somefakeurl.com/TEST_ArrayUtils.cls#L233">
                      toString(objectArray)
                    </a>
                  </h4>
                  <div class="method-description">
                    Stringify an array.
                  </div>
                  <div class="method-subtitle">
                    Signature
                  </div>

                  <div class="method-signature">
                    global static String toString(Object[] objectArray)
                  </div>
                  <div class="method-subtitle">Parameters</div>
                  <div class="param-name">objectArray</div>
                  <div class="param-description">The array to stringigy.</div>
                  <div class="method-subtitle">
                    Returns
                  </div>
                  <div class="method-subtitle-description">
                    <code class="code-inline">String</code>
                  </div>
                </div>
                <div class="method global">
                  <h4 class="method-title " id="TEST_ArrayUtils.toString_1">

                    <a target="_blank" rel="noopener noreferrer" title="Go to source" class="source-link" href="https://somefakeurl.com/TEST_ArrayUtils.cls#L251">
                      toString(objectArray)
                    </a>
                  </h4>
                  <div class="method-description">
                    Stringify an array.
                  </div>
                  <div class="method-subtitle">
                    Signature
                  </div>

                  <div class="method-signature">
                    global static String toString(SObject[] objectArray)
                  </div>
                  <div class="method-subtitle">Parameters</div>
                  <div class="param-name">objectArray</div>
                  <div class="param-description">The array to stringigy.</div>
                  <div class="method-subtitle">
                    Returns
                  </div>
                  <div class="method-subtitle-description">
                    <code class="code-inline">String</code>
                  </div>
                </div>
                <div class="method global">
                  <h4 class="method-title " id="TEST_ArrayUtils.trim">

                    <a target="_blank" rel="noopener noreferrer" title="Go to source" class="source-link" href="https://somefakeurl.com/TEST_ArrayUtils.cls#L138">
                      trim(strs)
                    </a>
                  </h4>
                  <div class="method-description">
                    Trim each element of a string array.
                  </div>
                  <div class="method-subtitle">
                    Signature
                  </div>

                  <div class="method-signature">
                    global static List&lt;String&gt; trim(List&lt;String&gt; strs)
                  </div>
                  <div class="method-subtitle">Parameters</div>
                  <div class="param-name">strs</div>
                  <div class="param-type">
                    Type: <code class="code-inline">List&lt;String&gt;</code>
                  </div>
                  <div class="param-description">The list of strings to trim.</div>
                  <div class="method-subtitle">
                    Returns
                  </div>
                  <div class="method-subtitle-description">
                    The list of trimmed strings.
                  </div>
                </div>
                <div class="method global">
                  <h4 class="method-title " id="TEST_ArrayUtils.upperCase">

                    <a target="_blank" rel="noopener noreferrer" title="Go to source" class="source-link" href="https://somefakeurl.com/TEST_ArrayUtils.cls#L120">
                      upperCase(strs)
                    </a>
                  </h4>
                  <div class="method-description">
                    Uppercase each item of a string array.
                  </div>
                  <div class="method-subtitle">
                    Signature
                  </div>

                  <div class="method-signature">
                    global static List&lt;String&gt; upperCase(List&lt;String&gt; strs)
                  </div>
                  <div class="method-subtitle">Parameters</div>
                  <div class="param-name">strs</div>
                  <div class="param-type">
                    Type: <code class="code-inline">List&lt;String&gt;</code>
                  </div>
                  <div class="param-description">A list of strings to convert to uppercase</div>
                  <div class="method-subtitle">
                    Returns
                  </div>
                  <div class="method-subtitle-description">
                    The list of uppercased strings.
                  </div>
                </div>
              </div>
            </div>
          </div>

        </td>
      </tr>
      <tr>
        <td class="footer">

          <div>
            <a href="https://github.com/no-stack-dub-sack/apexdox-vs-code" target="_blank" rel="noopener noreferrer">
              Powered By ApexDox VS Code
            </a>
          </div>
        </td>
      </tr>
    </table>
  </body>

</html>`;