export default `<!DOCTYPE html>
<html lang="en">

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
                  <li id="item-TEST_Status" class="navItem class public" onclick="goToLocation('TEST_Status.html');">
                    <a tabindex="1" href="javascript:void(0)">TEST_Status</a>
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
          <h2 class='sectionTitle'>Home</h2>
          <h2>Project Home</h2>
          <p>
            Use the <code class="inlineCode">apexdoc2.homePagePath</code> setting to point to an HTML file that contains details about your project.
            The body of the HTML will show up here instead of this default!
          </p>
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