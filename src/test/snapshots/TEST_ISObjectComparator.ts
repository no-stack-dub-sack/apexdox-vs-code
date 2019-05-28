export default `<html lang="en">

  <head>
    <title>My Test Docs</title>
    <meta charset="UTF-8">
    <script type="text/javascript" src="./assets/index.js"></script>
    <script charset="UTF-8" src="./assets/highlight.js"></script>
    <link rel="stylesheet" href="./assets/highlight.css" />
    <link rel="stylesheet" type="text/css" href="./assets/index.css" />
    <link rel="shortcut icon" type="image/png" href="./assets/favicon.png" />
  </head>

  <body>
    <div class="topsection">
      <table>
        <tr>
          <td>
            <img src="./assets/apexdoc2-logo.png" style="height: 90px; margin-left: 5px;" />
          </td>
          <td>
            <h2 style="margin: -15px 0 0 0;">ApexDoc2 | Apex Documentation</h2>Check out the GitHub project at:<br />
            <a href="https://github.com/no-stack-dub-sack/ApexDoc2-VSCode">
              https://github.com/no-stack-dub-sack/ApexDoc2-VSCode
            </a>
            <br />
          </td>
        </tr>
      </table>
    </div>
    <table width="100%">

      <tr>
        <td colspan="2" style="text-align: center;">
          Show: <input type="checkbox" checked="true" id="cbx-all" onclick="toggleAllScopes(this.checked);" />
          <label for="cbx-all">All</label>&nbsp;&nbsp;
          <input type="checkbox" checked="true" id="cbx-public" onclick="toggleScope('public', this.checked);" />
          <label for="cbx-public">public</label>&nbsp;&nbsp;<input type="checkbox" checked="true" id="cbx-private" onclick="toggleScope('private', this.checked);" />
          <label for="cbx-private">private</label>&nbsp;&nbsp;<input type="checkbox" checked="true" id="cbx-protected" onclick="toggleScope('protected', this.checked);" />
          <label for="cbx-protected">protected</label>&nbsp;&nbsp;<input type="checkbox" checked="true" id="cbx-global" onclick="toggleScope('global', this.checked);" />
          <label for="cbx-global">global</label>
        </td>
      </tr>
      <tr style="vertical-align:top;">
        <!-- 22% width accommodates 40 char class names -->
        <td width="22%" vertical-align="top">
          <div class="navbar">
            <nav role="navigation">
              <a class="navHeader" id="home" href="javascript:void(0)" onclick="goToLocation('index.html');">
                Home
              </a>
              <details id="Dreamhouse_Bot" class="groupName">
                <summary onclick="toggleActiveClass(this);" id="header-Dreamhouse_Bot" class="navHeader">
                  <span>Dreamhouse Bot</span>
                </summary>
                <ul>
                  <!-- menu items will be appended here -->
                  <li id="item-TEST_BotField" class="navItem class public" onclick="goToLocation('TEST_BotField.html');">
                    <a tabindex="1" href="javascript:void(0)">TEST_BotField</a>
                  </li>
                  <li id="item-TEST_BotHandler" class="navItem class public" onclick="goToLocation('TEST_BotHandler.html');">
                    <a tabindex="1" href="javascript:void(0)">TEST_BotHandler</a>
                  </li>
                  <li id="item-TEST_BotItem" class="navItem class public" onclick="goToLocation('TEST_BotItem.html');">
                    <a tabindex="1" href="javascript:void(0)">TEST_BotItem</a>
                  </li>
                  <li id="item-TEST_BotMessage" class="navItem class public" onclick="goToLocation('TEST_BotMessage.html');">
                    <a tabindex="1" href="javascript:void(0)">TEST_BotMessage</a>
                  </li>
                </ul>
              </details>
              <details id="Dreamhouse_Bot_Handlers" class="groupName">
                <summary onclick="toggleActiveClass(this);" id="header-Dreamhouse_Bot_Handlers" class="navHeader">
                  <span>Dreamhouse Bot Handlers</span>
                </summary>
                <ul>
                  <!-- menu items will be appended here -->
                  <li id="item-TEST_HandlerSOQL" class="navItem class public" onclick="goToLocation('TEST_HandlerSOQL.html');">
                    <a tabindex="1" href="javascript:void(0)">TEST_HandlerSOQL</a>
                  </li>
                </ul>
              </details>
              <details id="Dreamhouse_Slack_Bot" class="groupName">
                <summary onclick="toggleActiveClass(this);" id="header-Dreamhouse_Slack_Bot" class="navHeader">
                  <span>Dreamhouse Slack Bot</span>
                </summary>
                <ul>
                  <!-- menu items will be appended here -->
                  <li id="item-TEST_SlackOpportunityPublisher" class="navItem class public" onclick="goToLocation('TEST_SlackOpportunityPublisher.html');">
                    <a tabindex="1" href="javascript:void(0)">TEST_SlackOpportunityPublisher</a>
                  </li>
                </ul>
              </details>
              <details id="Dreamhouse_Utils" class="groupName">
                <summary onclick="toggleActiveClass(this);" id="header-Dreamhouse_Utils" class="navHeader">
                  <span>Dreamhouse Utils</span>
                </summary>
                <ul>
                  <!-- menu items will be appended here -->
                  <li id="item-TEST_JWT" class="navItem class public" onclick="goToLocation('TEST_JWT.html');">
                    <a tabindex="1" href="javascript:void(0)">TEST_JWT</a>
                  </li>
                  <li id="item-TEST_JWTBearerFlow" class="navItem class public" onclick="goToLocation('TEST_JWTBearerFlow.html');">
                    <a tabindex="1" href="javascript:void(0)">TEST_JWTBearerFlow</a>
                  </li>
                </ul>
              </details>
              <details id="Global_Utils" class="groupName">
                <summary onclick="toggleActiveClass(this);" id="header-Global_Utils" class="navHeader">
                  <span>Global Utils</span>
                </summary>
                <ul>
                  <!-- menu items will be appended here -->
                  <li id="item-TEST_ArrayUtils" class="navItem class global" onclick="goToLocation('TEST_ArrayUtils.html');">
                    <a tabindex="1" href="javascript:void(0)">TEST_ArrayUtils</a>
                  </li>
                  <li id="item-TEST_IllegalStateException" class="navItem class global" onclick="goToLocation('TEST_IllegalStateException.html');">
                    <a tabindex="1" href="javascript:void(0)">TEST_IllegalStateException</a>
                  </li>
                  <li id="item-TEST_IObjectComparator" class="navItem class global" onclick="goToLocation('TEST_IObjectComparator.html');">
                    <a tabindex="1" href="javascript:void(0)">TEST_IObjectComparator</a>
                  </li>
                  <li id="item-TEST_ISObjectComparator" class="navItem class global" onclick="goToLocation('TEST_ISObjectComparator.html');">
                    <a tabindex="1" href="javascript:void(0)">TEST_ISObjectComparator</a>
                  </li>
                  <li id="item-TEST_MyRestResource" class="navItem class global" onclick="goToLocation('TEST_MyRestResource.html');">
                    <a tabindex="1" href="javascript:void(0)">TEST_MyRestResource</a>
                  </li>
                  <li id="item-TEST_PrimitiveComparator" class="navItem class global" onclick="goToLocation('TEST_PrimitiveComparator.html');">
                    <a tabindex="1" href="javascript:void(0)">TEST_PrimitiveComparator</a>
                  </li>
                  <li id="item-TEST_StopWatch" class="navItem class global" onclick="goToLocation('TEST_StopWatch.html');">
                    <a tabindex="1" href="javascript:void(0)">TEST_StopWatch</a>
                  </li>
                </ul>
              </details>
              <details id="Miscellaneous" class="groupName">
                <summary onclick="toggleActiveClass(this);" id="header-Miscellaneous" class="navHeader">
                  <span>Miscellaneous</span>
                </summary>
                <ul>
                  <!-- menu items will be appended here -->
                  <li id="item-IncludeOne" class="navItem class public" onclick="goToLocation('IncludeOne.html');">
                    <a tabindex="1" href="javascript:void(0)">IncludeOne</a>
                  </li>
                  <li id="item-TEST_LIFXController" class="navItem class public" onclick="goToLocation('TEST_LIFXController.html');">
                    <a tabindex="1" href="javascript:void(0)">TEST_LIFXController</a>
                  </li>
                  <li id="item-TEST_SampleDataController" class="navItem class public" onclick="goToLocation('TEST_SampleDataController.html');">
                    <a tabindex="1" href="javascript:void(0)">TEST_SampleDataController</a>
                  </li>
                  <li id="item-IncludeTwo" class="navItem class public" onclick="goToLocation('IncludeTwo.html');">
                    <a tabindex="1" href="javascript:void(0)">IncludeTwo</a>
                  </li>
                  <li id="item-TEST_Gotchas" class="navItem class public" onclick="goToLocation('TEST_Gotchas.html');">
                    <a tabindex="1" href="javascript:void(0)">TEST_Gotchas</a>
                  </li>
                </ul>
              </details>
            </nav>
          </div>
        </td>
        <td class="contentTD">
          <details class="section" open>
            <summary>
              <h2 class="sectionTitle" id="TEST_ISObjectComparator">

                <a target="_blank" rel="noopener noreferrer" title="Go to source" class="hostedSourceLink" href="https://somefakeurl.com/TEST_ISObjectComparator.cls#L25">
                  TEST_ISObjectComparator
                </a><span><svg aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="externalLink"><path d="M576 24v127.984c0 21.461-25.96 31.98-40.971 16.971l-35.707-35.709-243.523 243.523c-9.373 9.373-24.568 9.373-33.941 0l-22.627-22.627c-9.373-9.373-9.373-24.569 0-33.941L442.756 76.676l-35.703-35.705C391.982 25.9 402.656 0 424.024 0H552c13.255 0 24 10.745 24 24zM407.029 270.794l-16 16A23.999 23.999 0 0 0 384 303.765V448H64V128h264a24.003 24.003 0 0 0 16.97-7.029l16-16C376.089 89.851 365.381 64 344 64H48C21.49 64 0 85.49 0 112v352c0 26.51 21.49 48 48 48h352c26.51 0 48-21.49 48-48V287.764c0-21.382-25.852-32.09-40.971-16.97z" class="externalLink"></path></svg></span>
              </h2>
            </summary>



            <div class="classSignature">

              <a target="_blank" rel="noopener noreferrer" title="Go to source" class="hostedSourceLink" href="https://somefakeurl.com/TEST_ISObjectComparator.cls#L25">
                global interface TEST_ISObjectComparator
              </a>
            </div>
            <div class="classDetails">
              <div class="">The apex-lang <code class="inlineCode">ISObjectComparator</code> interface. The classes in this group have been randomly gathered from various resources simply to demonstrate ApexDoc2-VSCode&#39;s multi-source directory feature aimed at Salesforce-DX projects which may have a <code class="inlineCode">main</code> folder and multipke feature directories. <br><br> This code is part of the &#39;apex-lang&#39; open source project avaiable at: http://code.google.com/p/apex-lang/. This code is licensed under the Apache License, Version 2.0. You may obtain a copy of the License at: http://www.apache.org/licenses/LICENSE-2.0.</div>
              <div class="classSubtitle ">See</div>
              <div class="classSubDescription"><a target="_blank" rel="noopener noreferrer" href="http://code.google.com/p/apex-lang/">Source</a>, <a target="_blank" rel="noopener noreferrer" href="http://www.apache.org/licenses/LICENSE-2.0">License</a>, <a href="javascript:void(0)" onclick="goToLocation('TEST_ArrayUtils.html#TEST_ArrayUtils.qsort_4')">TEST_ArrayUtils.qsort</a></div><br />Richard Vanhook<br />Dec 28, 2008
            </div>
            <p />
            <details class="subSection methods" open>
              <summary>
                <h2 class="subsectionTitle methods">Methods</h2>
              </summary>
              <div class="methodsContainer">
                <ul class="methodTOC">
                  <li class="method undefined">
                    <a class="methodTOCEntry " href="#TEST_ISObjectComparator.compare">
                      compare
                    </a></li>
                </ul>
                <div class="method undefined">
                  <h2 class="methodHeader " id="TEST_ISObjectComparator.compare">compare</h2>
                  <div class="methodSignature">

                    <a target="_blank" rel="noopener noreferrer" title="Go to source" class="hostedSourceLink" href="https://somefakeurl.com/TEST_ISObjectComparator.cls#L26">
                      Integer <span class="hljs-title">compare</span>(SObject record1, SObject record2)
                    </a>
                  </div>
                </div>
              </div>
            </details>
          </details>
          </div>
        </td>
      </tr>
    </table>
    <hr />
    <center class="footer">
      <a href="https://github.com/no-stack-dub-sack/ApexDoc2-VSCode" target="_blank" rel="noopener noreferrer">
        Powered By ApexDoc2
      </a>
    </center>
  </body>

</html>`;