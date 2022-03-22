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

            <h2 class="class-title top-level-type" id="TEST_SlackOpportunityPublisher">

              <a target="_blank" rel="noopener noreferrer" title="Go to source" class="source-link" href="https://somefakeurl.com/TEST_SlackOpportunityPublisher.cls#L12">
                TEST_SlackOpportunityPublisher
              </a>
            </h2>
            <div class="class-container">

              <div class="class-description">
                The <code class="code-inline">SlackOpportunityPublisher</code> class. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad veniam, quis nostrud exercitation ullamco laboris nis.
              </div>
              <div class="class-subtitle">
                Signature
              </div>

              <div class="class-signature">
                public with sharing class TEST_SlackOpportunityPublisher
              </div>
              <div class="class-subtitle">
                See
              </div>
              <div class="class-subtitle-description">
                <a target="_blank" rel="noopener noreferrer" href="https://github.com/dreamhouseapp/dreamhouse-sfdx/blob/master/LICENSE">License</a>, <a target="_blank" rel="noopener noreferrer" href="https://github.com/dreamhouseapp/dreamhouse-sfdx">Github</a>
              </div><br />Salesforce.com<br />Jul 2017
            </div>
            <div class="subsection properties TEST_SlackOpportunityPublisher">
              <h3 class="subsection-title properties">TEST_SlackOpportunityPublisher Properties</h3>
                <table class="attributes-table properties">

                  <tr>
                    <th>Name</th>
                    <th>Signature</th>

                    <th>Description</th>
                  </tr>
                  <tr class="property private">
                    <td class="attribute-name">
                      <a target="_blank" rel="noopener noreferrer" title="Go to source" class="source-link" href="https://somefakeurl.com/TEST_SlackOpportunityPublisher.cls#L17">
                        slackURL
                      </a></td>
                    <td>
                      <div class="attribute-signature">
                        private static final String slackURL
                      </div>
                    </td>


                    <td class="attribute-description">
                      The slack URL to use for publishing.
                    </td>
                  </tr>
                </table>
            </div>
            <div class="subsection enums">
              <h3 class="subsection-title enums">Enums</h3>
                <table class="attributes-table enums">

                  <tr>
                    <th>Name</th>
                    <th>Signature</th>
                    <th>Values</th>
                    <th>Description</th>
                  </tr>
                  <tr class="enum public">
                    <td class="attribute-name">
                      <a target="_blank" rel="noopener noreferrer" title="Go to source" class="source-link" href="https://somefakeurl.com/TEST_SlackOpportunityPublisher.cls#L55">
                        Days
                      </a></td>
                    <td>
                      <div class="attribute-signature">
                        public enum Days
                      </div>
                    </td>
                    <td class="enum-values">MONDAY,&nbsp;TUESDAY,&nbsp;WEDNESDAY,&nbsp;THURSDAY,&nbsp;FRIDAY,&nbsp;SATURDAY,&nbsp;SUNDAY</td>

                    <td class="attribute-description">
                      An inner enum added to demonstrate how ApexDox VS Code handles inner enums. They will be presented in a table and can only have description&#39;s, like properties.
                    </td>
                  </tr>
                  <tr class="enum public">
                    <td class="attribute-name">
                      <a target="_blank" rel="noopener noreferrer" title="Go to source" class="source-link" href="https://somefakeurl.com/TEST_SlackOpportunityPublisher.cls#L40">
                        Months
                      </a></td>
                    <td>
                      <div class="attribute-signature">
                        public enum Months
                      </div>
                    </td>
                    <td class="enum-values">JANUARY,&nbsp;FEBRUARY,&nbsp;MARCH,&nbsp;APRIL,&nbsp;MAY,&nbsp;JUNE,&nbsp;JULY,&nbsp;AUGUST,&nbsp;SEPTEMBER,&nbsp;OCTOBER,&nbsp;NOVEMBER,&nbsp;DECEMBER</td>

                    <td class="attribute-description">
                      An inner enum added to demonstrate how ApexDox VS Code handles inner enums. They can only have description&#39;s, like properties. ApexDoc2 Should be able to handle to wonky way this enum is written in code.
                    </td>
                  </tr>
                  <tr class="enum public">
                    <td class="attribute-name">
                      <a target="_blank" rel="noopener noreferrer" title="Go to source" class="source-link" href="https://somefakeurl.com/TEST_SlackOpportunityPublisher.cls#L65">
                        Numbers
                      </a></td>
                    <td>
                      <div class="attribute-signature">
                        public enum Numbers
                      </div>
                    </td>
                    <td class="enum-values">ONE,&nbsp;TWO,&nbsp;THREE,&nbsp;FOUR,&nbsp;FIVE</td>

                    <td class="attribute-description">
                      An inner enum added to demonstrate how ApexDox VS Code handles inner enums. They will be presented in a table and can only have description&#39;s, like properties.
                    </td>
                  </tr>
                  <tr class="enum public">
                    <td class="attribute-name">
                      <a target="_blank" rel="noopener noreferrer" title="Go to source" class="source-link" href="https://somefakeurl.com/TEST_SlackOpportunityPublisher.cls#L78">
                        Rgb
                      </a></td>
                    <td>
                      <div class="attribute-signature">
                        public enum Rgb
                      </div>
                    </td>
                    <td class="enum-values">RED,&nbsp;GREEN,&nbsp;BLUE</td>

                    <td class="attribute-description">
                      An inner enum added to demonstrate how ApexDox VS Code handles inner enums. They will be presented in a table and can only have description&#39;s, like properties.
                    </td>
                  </tr>
                </table>
            </div>
            <div class="subsection methods">
              <h3 class="subsection-title methods">TEST_SlackOpportunityPublisher Methods</h3>
              <div class="methods-container">
                <ul class="methods-toc">
                  <li class="method public">
                    <a class="methods-toc__entry " href="#TEST_SlackOpportunityPublisher.postToSlack">
                      postToSlack (opportunityId)
                    </a>

                    <div class="methods-toc__description">
                      Incididunt ut labore et dolore magna aliqua, quis autem vel eum iure reprehenderit qui incididunt.
                    </div>
                  </li>
                </ul>
                <div class="method public">
                  <h4 class="method-title " id="TEST_SlackOpportunityPublisher.postToSlack">

                    <a target="_blank" rel="noopener noreferrer" title="Go to source" class="source-link" href="https://somefakeurl.com/TEST_SlackOpportunityPublisher.cls#L24">
                      postToSlack(opportunityId)
                    </a>
                  </h4>
                  <div class="method-description">
                    Incididunt ut labore et dolore magna aliqua, quis autem vel eum iure reprehenderit qui incididunt.
                  </div>
                  <div class="method-subtitle">
                    Signature
                  </div>
                  <div class="method-annotations">@InvocableMethod(label='Post to Slack')</div>
                  <div class="method-signature">
                    public static void postToSlack(List&lt;Id&gt; opportunityId)
                  </div>
                  <div class="method-subtitle">Parameters</div>
                  <div class="param-name">opportunityId</div>
                  <div class="param-type">
                    Type: <code class="code-inline">List&lt;Id&gt;</code>
                  </div>
                  <div class="param-description">The Id of the opportunity to post.</div>
                </div>
              </div>
            </div>
          </div>

          <div class="section">

            <h2 class="class-title " id="TEST_SlackOpportunityPublisher.QueueableSlackCall">

              <a target="_blank" rel="noopener noreferrer" title="Go to source" class="source-link" href="https://somefakeurl.com/TEST_SlackOpportunityPublisher.cls#L92">
                TEST_SlackOpportunityPublisher.QueueableSlackCall
              </a>
            </h2>
            <div class="class-container">

              <div class="class-description">
                A good example of how ApexDox VS Code handles inner classes. Inner classes / interfaces support the same tags as their top-level counterparts (i.e. top level type in a .cls file), but tags like &#39;author&#39; and &#39;since&#39; are better left to the top-level class. Just for example&#39;s sake, including an example tag here as well.
              </div>
              <div class="class-subtitle">
                Signature
              </div>

              <div class="class-signature">
                public class QueueableSlackCall implements System.Queueable, Database.AllowsCallouts
              </div>
              <div class="class-subtitle">
                Example
              </div>
              <pre class="code-example"><code> String body = &#39;This is a message, equeued up to be posted on Slack!&#39;; 
 System.enqueueJob(new QueueablePushCall(&#39;https://someurl.com&#39;, &#39;POST&#39;, body));</code></pre>
            </div>
            <div class="subsection properties TEST_SlackOpportunityPublisher_QueueableSlackCall">
              <h3 class="subsection-title properties">TEST_SlackOpportunityPublisher.QueueableSlackCall Properties</h3>
                <table class="attributes-table properties">

                  <tr>
                    <th>Name</th>
                    <th>Signature</th>


                  </tr>
                  <tr class="property private">
                    <td class="attribute-name">
                      <a target="_blank" rel="noopener noreferrer" title="Go to source" class="source-link" href="https://somefakeurl.com/TEST_SlackOpportunityPublisher.cls#L96">
                        body
                      </a></td>
                    <td>
                      <div class="attribute-signature">
                        private final String body
                      </div>
                    </td>


                  </tr>
                  <tr class="property private">
                    <td class="attribute-name">
                      <a target="_blank" rel="noopener noreferrer" title="Go to source" class="source-link" href="https://somefakeurl.com/TEST_SlackOpportunityPublisher.cls#L95">
                        method
                      </a></td>
                    <td>
                      <div class="attribute-signature">
                        private final String method
                      </div>
                    </td>


                  </tr>
                  <tr class="property private">
                    <td class="attribute-name">
                      <a target="_blank" rel="noopener noreferrer" title="Go to source" class="source-link" href="https://somefakeurl.com/TEST_SlackOpportunityPublisher.cls#L94">
                        url
                      </a></td>
                    <td>
                      <div class="attribute-signature">
                        private final String url
                      </div>
                    </td>


                  </tr>
                </table>
            </div>
            <div class="subsection methods">
              <h3 class="subsection-title methods">TEST_SlackOpportunityPublisher.QueueableSlackCall Constructors</h3>
              <div class="methods-container">
                <ul class="methods-toc">
                  <li class="method public">
                    <a class="methods-toc__entry " href="#TEST_SlackOpportunityPublisher.QueueableSlackCall.QueueableSlackCall">
                      QueueableSlackCall (url, method, body)
                    </a>

                  </li>
                </ul>
                <div class="method public">
                  <h4 class="method-title " id="TEST_SlackOpportunityPublisher.QueueableSlackCall.QueueableSlackCall">

                    <a target="_blank" rel="noopener noreferrer" title="Go to source" class="source-link" href="https://somefakeurl.com/TEST_SlackOpportunityPublisher.cls#L103">
                      QueueableSlackCall(url, method, body)
                    </a>
                  </h4>
                  <div class="method-subtitle">
                    Signature
                  </div>

                  <div class="method-signature">
                    public QueueableSlackCall(String url, String method, String body)
                  </div>
                  <div class="method-subtitle">Parameters</div>
                  <div class="param-name">url</div>
                  <div class="param-type">
                    Type: <code class="code-inline">String</code>
                  </div>
                  <div class="param-description">The Server Url to post the message to.</div>
                  <div class="param-name">method</div>
                  <div class="param-type">
                    Type: <code class="code-inline">String</code>
                  </div>
                  <div class="param-description">The HTTP method to use</div>
                  <div class="param-name">body</div>
                  <div class="param-type">
                    Type: <code class="code-inline">String</code>
                  </div>
                  <div class="param-description">The body of the message.</div>
                </div>
              </div>
            </div>
            <div class="subsection methods">
              <h3 class="subsection-title methods">TEST_SlackOpportunityPublisher.QueueableSlackCall Methods</h3>
              <div class="methods-container">
                <ul class="methods-toc">
                  <li class="method public">
                    <a class="methods-toc__entry " href="#TEST_SlackOpportunityPublisher.QueueableSlackCall.execute">
                      execute (ctx)
                    </a>

                    <div class="methods-toc__description">
                      The execute method implements the <code class="code-inline">System.Queueable</code> interface. And handle&#39;s the queueable&#39;s execution.
                    </div>
                  </li>
                </ul>
                <div class="method public">
                  <h4 class="method-title " id="TEST_SlackOpportunityPublisher.QueueableSlackCall.execute">

                    <a target="_blank" rel="noopener noreferrer" title="Go to source" class="source-link" href="https://somefakeurl.com/TEST_SlackOpportunityPublisher.cls#L114">
                      execute(ctx)
                    </a>
                  </h4>
                  <div class="method-description">
                    The execute method implements the <code class="code-inline">System.Queueable</code> interface. And handle&#39;s the queueable&#39;s execution.
                  </div>
                  <div class="method-subtitle">
                    Signature
                  </div>

                  <div class="method-signature">
                    public void execute(System.QueueableContext ctx)
                  </div>
                  <div class="method-subtitle">Parameters</div>
                  <div class="param-name">ctx</div>
                  <div class="param-type">
                    Type: <code class="code-inline">System.QueueableContext</code>
                  </div>
                  <div class="param-description">The <code class="code-inline">System.QueueableContext</code> for the execute method.</div>
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