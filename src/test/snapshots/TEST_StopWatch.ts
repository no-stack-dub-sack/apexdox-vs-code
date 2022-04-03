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

            <h2 class="class-title top-level-type" id="TEST_StopWatch">

              <a target="_blank" rel="noopener noreferrer" title="Go to source" class="source-link" href="https://somefakeurl.com/TEST_StopWatch.cls#L24">
                TEST_StopWatch
              </a>
            </h2>
            <div class="class-container">

              <div class="class-description">
                The apex-lang <code class="code-inline">StopWatch</code> utility class for Apex. The classes in this group have been randomly gathered from various resources simply to demonstrate ApexDox VS Code&#39;s multi-source directory feature aimed at Salesforce-DX projects which may have a <code class="code-inline">main</code> folder and multipke feature directories. <br><br> This code is part of the &#39;apex-lang&#39; open source project avaiable at: http://code.google.com/p/apex-lang/. This code is licensed under the Apache License, Version 2.0. You may obtain a copy of the License at: http://www.apache.org/licenses/LICENSE-2.0.
              </div>
              <div class="class-subtitle">
                Signature
              </div>

              <div class="class-signature">
                global class TEST_StopWatch
              </div>
              <div class="class-subtitle">
                See
              </div>
              <div class="class-subtitle-description">
                <a target="_blank" rel="noopener noreferrer" href="http://code.google.com/p/apex-lang/">Source</a>, <a target="_blank" rel="noopener noreferrer" href="http://www.apache.org/licenses/LICENSE-2.0">License</a>
              </div><br />Richard Vanhook<br />Dec 28, 2008
            </div>
            <div class="subsection properties TEST_StopWatch">
              <h3 class="subsection-title properties">TEST_StopWatch Properties</h3>
              <table class="attributes-table properties">

                <tr>
                  <th>Name</th>
                  <th>Signature</th>


                </tr>
                <tr class="property private">
                  <td class="attribute-name">
                    <a target="_blank" rel="noopener noreferrer" title="Go to source" class="source-link" href="https://somefakeurl.com/TEST_StopWatch.cls#L36">
                      runningState
                    </a></td>
                  <td>
                    <div class="attribute-signature">
                      private Integer runningState
                    </div>
                  </td>


                </tr>
                <tr class="property private">
                  <td class="attribute-name">
                    <a target="_blank" rel="noopener noreferrer" title="Go to source" class="source-link" href="https://somefakeurl.com/TEST_StopWatch.cls#L37">
                      splitState
                    </a></td>
                  <td>
                    <div class="attribute-signature">
                      private Integer splitState
                    </div>
                  </td>


                </tr>
                <tr class="property private">
                  <td class="attribute-name">
                    <a target="_blank" rel="noopener noreferrer" title="Go to source" class="source-link" href="https://somefakeurl.com/TEST_StopWatch.cls#L38">
                      startTime
                    </a></td>
                  <td>
                    <div class="attribute-signature">
                      private Long startTime
                    </div>
                  </td>


                </tr>
                <tr class="property private">
                  <td class="attribute-name">
                    <a target="_blank" rel="noopener noreferrer" title="Go to source" class="source-link" href="https://somefakeurl.com/TEST_StopWatch.cls#L28">
                      STATE_RUNNING
                    </a></td>
                  <td>
                    <div class="attribute-signature">
                      private static final Integer STATE_RUNNING
                    </div>
                  </td>


                </tr>
                <tr class="property private">
                  <td class="attribute-name">
                    <a target="_blank" rel="noopener noreferrer" title="Go to source" class="source-link" href="https://somefakeurl.com/TEST_StopWatch.cls#L34">
                      STATE_SPLIT
                    </a></td>
                  <td>
                    <div class="attribute-signature">
                      private static final Integer STATE_SPLIT
                    </div>
                  </td>


                </tr>
                <tr class="property private">
                  <td class="attribute-name">
                    <a target="_blank" rel="noopener noreferrer" title="Go to source" class="source-link" href="https://somefakeurl.com/TEST_StopWatch.cls#L29">
                      STATE_STOPPED
                    </a></td>
                  <td>
                    <div class="attribute-signature">
                      private static final Integer STATE_STOPPED
                    </div>
                  </td>


                </tr>
                <tr class="property private">
                  <td class="attribute-name">
                    <a target="_blank" rel="noopener noreferrer" title="Go to source" class="source-link" href="https://somefakeurl.com/TEST_StopWatch.cls#L30">
                      STATE_SUSPENDED
                    </a></td>
                  <td>
                    <div class="attribute-signature">
                      private static final Integer STATE_SUSPENDED
                    </div>
                  </td>


                </tr>
                <tr class="property private">
                  <td class="attribute-name">
                    <a target="_blank" rel="noopener noreferrer" title="Go to source" class="source-link" href="https://somefakeurl.com/TEST_StopWatch.cls#L33">
                      STATE_UNSPLIT
                    </a></td>
                  <td>
                    <div class="attribute-signature">
                      private static final Integer STATE_UNSPLIT
                    </div>
                  </td>


                </tr>
                <tr class="property private">
                  <td class="attribute-name">
                    <a target="_blank" rel="noopener noreferrer" title="Go to source" class="source-link" href="https://somefakeurl.com/TEST_StopWatch.cls#L27">
                      STATE_UNSTARTED
                    </a></td>
                  <td>
                    <div class="attribute-signature">
                      private static final Integer STATE_UNSTARTED
                    </div>
                  </td>


                </tr>
                <tr class="property private">
                  <td class="attribute-name">
                    <a target="_blank" rel="noopener noreferrer" title="Go to source" class="source-link" href="https://somefakeurl.com/TEST_StopWatch.cls#L39">
                      stopTime
                    </a></td>
                  <td>
                    <div class="attribute-signature">
                      private Long stopTime
                    </div>
                  </td>


                </tr>
              </table>
            </div>
            <div class="subsection methods">
              <h3 class="subsection-title methods">TEST_StopWatch Methods</h3>
              <div class="methods-container">
                <ul class="methods-toc">
                  <li class="method global">
                    <a class="methods-toc__entry " href="#TEST_StopWatch.getSplitTime">
                      getSplitTime ()
                    </a>

                    <div class="methods-toc__description">
                      Call this method to get split time.
                    </div>
                  </li>
                  <li class="method global">
                    <a class="methods-toc__entry " href="#TEST_StopWatch.getStartTime">
                      getStartTime ()
                    </a>

                    <div class="methods-toc__description">
                      Call this method to get the start time.
                    </div>
                  </li>
                  <li class="method global">
                    <a class="methods-toc__entry " href="#TEST_StopWatch.getTime">
                      getTime ()
                    </a>

                    <div class="methods-toc__description">
                      Call this method to get the current time.
                    </div>
                  </li>
                  <li class="method global">
                    <a class="methods-toc__entry " href="#TEST_StopWatch.reset">
                      reset ()
                    </a>

                    <div class="methods-toc__description">
                      Call this method to reset the stopwatch.
                    </div>
                  </li>
                  <li class="method global">
                    <a class="methods-toc__entry " href="#TEST_StopWatch.resume">
                      resume ()
                    </a>

                    <div class="methods-toc__description">
                      Call this method to resume the stopwatch.
                    </div>
                  </li>
                  <li class="method global">
                    <a class="methods-toc__entry " href="#TEST_StopWatch.split">
                      split ()
                    </a>

                    <div class="methods-toc__description">
                      Call this method to split the stopwatch.
                    </div>
                  </li>
                  <li class="method global">
                    <a class="methods-toc__entry " href="#TEST_StopWatch.start">
                      start ()
                    </a>

                    <div class="methods-toc__description">
                      Call this method to start the stopwatch.
                    </div>
                  </li>
                  <li class="method global">
                    <a class="methods-toc__entry " href="#TEST_StopWatch.stop">
                      stop ()
                    </a>

                    <div class="methods-toc__description">
                      Call this method to stop the stopwatch.
                    </div>
                  </li>
                  <li class="method global">
                    <a class="methods-toc__entry " href="#TEST_StopWatch.suspend">
                      suspend ()
                    </a>

                    <div class="methods-toc__description">
                      Call this method to suspend the stopwatch.
                    </div>
                  </li>
                  <li class="method global">
                    <a class="methods-toc__entry " href="#TEST_StopWatch.toSplitString">
                      toSplitString ()
                    </a>

                    <div class="methods-toc__description">
                      Call this method to get the split time as a string.
                    </div>
                  </li>
                  <li class="method global">
                    <a class="methods-toc__entry " href="#TEST_StopWatch.toStr">
                      toStr ()
                    </a>

                    <div class="methods-toc__description">
                      Call this method to get the time as a string.
                    </div>
                  </li>
                  <li class="method global">
                    <a class="methods-toc__entry " href="#TEST_StopWatch.unsplit">
                      unsplit ()
                    </a>

                    <div class="methods-toc__description">
                      Call this method to unsplit the stopwatch.
                    </div>
                  </li>
                </ul>
                <div class="method global">
                  <h4 class="method-title " id="TEST_StopWatch.getSplitTime">

                    <a target="_blank" rel="noopener noreferrer" title="Go to source" class="source-link" href="https://somefakeurl.com/TEST_StopWatch.cls#L146">
                      getSplitTime()
                    </a>
                  </h4>
                  <div class="method-description">
                    Call this method to get split time.
                  </div>
                  <div class="method-subtitle">
                    Signature
                  </div>

                  <div class="method-signature">
                    global Long getSplitTime()
                  </div>
                  <div class="method-subtitle">
                    Exceptions
                  </div>
                  <div class="method-subtitle-description">
                    Throws <code class="code-inline">IllegalStateException</code>
                  </div>
                </div>
                <div class="method global">
                  <h4 class="method-title " id="TEST_StopWatch.getStartTime">

                    <a target="_blank" rel="noopener noreferrer" title="Go to source" class="source-link" href="https://somefakeurl.com/TEST_StopWatch.cls#L157">
                      getStartTime()
                    </a>
                  </h4>
                  <div class="method-description">
                    Call this method to get the start time.
                  </div>
                  <div class="method-subtitle">
                    Signature
                  </div>

                  <div class="method-signature">
                    global Long getStartTime()
                  </div>
                  <div class="method-subtitle">
                    Exceptions
                  </div>
                  <div class="method-subtitle-description">
                    Throws <code class="code-inline">IllegalStateException</code>
                  </div>
                </div>
                <div class="method global">
                  <h4 class="method-title " id="TEST_StopWatch.getTime">

                    <a target="_blank" rel="noopener noreferrer" title="Go to source" class="source-link" href="https://somefakeurl.com/TEST_StopWatch.cls#L133">
                      getTime()
                    </a>
                  </h4>
                  <div class="method-description">
                    Call this method to get the current time.
                  </div>
                  <div class="method-subtitle">
                    Signature
                  </div>

                  <div class="method-signature">
                    global Long getTime()
                  </div>
                </div>
                <div class="method global">
                  <h4 class="method-title " id="TEST_StopWatch.reset">

                    <a target="_blank" rel="noopener noreferrer" title="Go to source" class="source-link" href="https://somefakeurl.com/TEST_StopWatch.cls#L74">
                      reset()
                    </a>
                  </h4>
                  <div class="method-description">
                    Call this method to reset the stopwatch.
                  </div>
                  <div class="method-subtitle">
                    Signature
                  </div>

                  <div class="method-signature">
                    global void reset()
                  </div>
                </div>
                <div class="method global">
                  <h4 class="method-title " id="TEST_StopWatch.resume">

                    <a target="_blank" rel="noopener noreferrer" title="Go to source" class="source-link" href="https://somefakeurl.com/TEST_StopWatch.cls#L121">
                      resume()
                    </a>
                  </h4>
                  <div class="method-description">
                    Call this method to resume the stopwatch.
                  </div>
                  <div class="method-subtitle">
                    Signature
                  </div>

                  <div class="method-signature">
                    global void resume()
                  </div>
                  <div class="method-subtitle">
                    Exceptions
                  </div>
                  <div class="method-subtitle-description">
                    Throws <code class="code-inline">IllegalStateException</code>
                  </div>
                </div>
                <div class="method global">
                  <h4 class="method-title " id="TEST_StopWatch.split">

                    <a target="_blank" rel="noopener noreferrer" title="Go to source" class="source-link" href="https://somefakeurl.com/TEST_StopWatch.cls#L85">
                      split()
                    </a>
                  </h4>
                  <div class="method-description">
                    Call this method to split the stopwatch.
                  </div>
                  <div class="method-subtitle">
                    Signature
                  </div>

                  <div class="method-signature">
                    global void split()
                  </div>
                  <div class="method-subtitle">
                    Exceptions
                  </div>
                  <div class="method-subtitle-description">
                    Throws <code class="code-inline">IllegalStateException</code>
                  </div>
                </div>
                <div class="method global">
                  <h4 class="method-title " id="TEST_StopWatch.start">

                    <a target="_blank" rel="noopener noreferrer" title="Go to source" class="source-link" href="https://somefakeurl.com/TEST_StopWatch.cls#L45">
                      start()
                    </a>
                  </h4>
                  <div class="method-description">
                    Call this method to start the stopwatch.
                  </div>
                  <div class="method-subtitle">
                    Signature
                  </div>

                  <div class="method-signature">
                    global void start()
                  </div>
                  <div class="method-subtitle">
                    Exceptions
                  </div>
                  <div class="method-subtitle-description">
                    Throws <code class="code-inline">IllegalStateException</code>
                  </div>
                </div>
                <div class="method global">
                  <h4 class="method-title " id="TEST_StopWatch.stop">

                    <a target="_blank" rel="noopener noreferrer" title="Go to source" class="source-link" href="https://somefakeurl.com/TEST_StopWatch.cls#L61">
                      stop()
                    </a>
                  </h4>
                  <div class="method-description">
                    Call this method to stop the stopwatch.
                  </div>
                  <div class="method-subtitle">
                    Signature
                  </div>

                  <div class="method-signature">
                    global void stop()
                  </div>
                  <div class="method-subtitle">
                    Exceptions
                  </div>
                  <div class="method-subtitle-description">
                    Throws <code class="code-inline">IllegalStateException</code>
                  </div>
                </div>
                <div class="method global">
                  <h4 class="method-title " id="TEST_StopWatch.suspend">

                    <a target="_blank" rel="noopener noreferrer" title="Go to source" class="source-link" href="https://somefakeurl.com/TEST_StopWatch.cls#L109">
                      suspend()
                    </a>
                  </h4>
                  <div class="method-description">
                    Call this method to suspend the stopwatch.
                  </div>
                  <div class="method-subtitle">
                    Signature
                  </div>

                  <div class="method-signature">
                    global void suspend()
                  </div>
                  <div class="method-subtitle">
                    Exceptions
                  </div>
                  <div class="method-subtitle-description">
                    Throws <code class="code-inline">IllegalStateException</code>
                  </div>
                </div>
                <div class="method global">
                  <h4 class="method-title " id="TEST_StopWatch.toSplitString">

                    <a target="_blank" rel="noopener noreferrer" title="Go to source" class="source-link" href="https://somefakeurl.com/TEST_StopWatch.cls#L174">
                      toSplitString()
                    </a>
                  </h4>
                  <div class="method-description">
                    Call this method to get the split time as a string.
                  </div>
                  <div class="method-subtitle">
                    Signature
                  </div>

                  <div class="method-signature">
                    global String toSplitString()
                  </div>
                </div>
                <div class="method global">
                  <h4 class="method-title " id="TEST_StopWatch.toStr">

                    <a target="_blank" rel="noopener noreferrer" title="Go to source" class="source-link" href="https://somefakeurl.com/TEST_StopWatch.cls#L167">
                      toStr()
                    </a>
                  </h4>
                  <div class="method-description">
                    Call this method to get the time as a string.
                  </div>
                  <div class="method-subtitle">
                    Signature
                  </div>

                  <div class="method-signature">
                    global String toStr()
                  </div>
                </div>
                <div class="method global">
                  <h4 class="method-title " id="TEST_StopWatch.unsplit">

                    <a target="_blank" rel="noopener noreferrer" title="Go to source" class="source-link" href="https://somefakeurl.com/TEST_StopWatch.cls#L97">
                      unsplit()
                    </a>
                  </h4>
                  <div class="method-description">
                    Call this method to unsplit the stopwatch.
                  </div>
                  <div class="method-subtitle">
                    Signature
                  </div>

                  <div class="method-signature">
                    global void unsplit()
                  </div>
                  <div class="method-subtitle">
                    Exceptions
                  </div>
                  <div class="method-subtitle-description">
                    Throws <code class="code-inline">IllegalStateException</code>
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