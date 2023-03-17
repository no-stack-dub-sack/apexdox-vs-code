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

            <h2 class="class-title top-level-type" id="TEST_BotMessage">

              <a target="_blank" rel="noopener noreferrer" title="Go to source" class="source-link" href="https://somefakeurl.com/TEST_BotMessage.cls#L16">
                TEST_BotMessage
              </a>
            </h2>
            <div class="class-container">

              <div class="class-description">
                The <code class="code-inline">BotMessage</code> class. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad veniam, quis nostrud exercitation ullamco laboris nis.
              </div>
              <div class="class-subtitle">
                Signature
              </div>

              <div class="class-signature">
                public virtual class TEST_BotMessage
              </div>
              <div class="class-subtitle">
                See
              </div>
              <div class="class-subtitle-description">
                <a target="_blank" rel="noopener noreferrer" href="https://github.com/dreamhouseapp/dreamhouse-sfdx/blob/master/LICENSE">License</a>, <a target="_blank" rel="noopener noreferrer" href="https://github.com/dreamhouseapp/dreamhouse-sfdx">Github</a>
              </div>
              <div class="class-subtitle">
                Author
              </div>
              <div class="class-subtitle-description">
                Salesforce.com
              </div>
              <div class="class-subtitle">
                Since
              </div>
              <div class="class-subtitle-description">
                <li>2017-07-01 Created</li>
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
            <div class="subsection properties TEST_BotMessage">
              <h3 class="subsection-title properties">TEST_BotMessage Properties</h3>
              <table class="attributes-table properties">

                <tr>
                  <th>Name</th>
                  <th>Signature</th>
                  <th>Annotations</th>

                </tr>
                <tr class="property public">
                  <td class="attribute-name">
                    <a target="_blank" rel="noopener noreferrer" title="Go to source" class="source-link" href="https://somefakeurl.com/TEST_BotMessage.cls#L18">
                      author
                    </a></td>
                  <td>
                    <div class="attribute-signature">
                      public String author
                    </div>
                  </td>
                  <td>
                    <div class="prop-annotations">@AuraEnabled</div>
                  </td>

                </tr>
                <tr class="property public">
                  <td class="attribute-name">
                    <a target="_blank" rel="noopener noreferrer" title="Go to source" class="source-link" href="https://somefakeurl.com/TEST_BotMessage.cls#L22">
                      buttons
                    </a></td>
                  <td>
                    <div class="attribute-signature">
                      public List&lt;BotMessageButton&gt; buttons
                    </div>
                  </td>
                  <td>
                    <div class="prop-annotations">@AuraEnabled</div>
                  </td>

                </tr>
                <tr class="property public">
                  <td class="attribute-name">
                    <a target="_blank" rel="noopener noreferrer" title="Go to source" class="source-link" href="https://somefakeurl.com/TEST_BotMessage.cls#L23">
                      imageURL
                    </a></td>
                  <td>
                    <div class="attribute-signature">
                      public String imageURL
                    </div>
                  </td>
                  <td>
                    <div class="prop-annotations">@AuraEnabled</div>
                  </td>

                </tr>
                <tr class="property public">
                  <td class="attribute-name">
                    <a target="_blank" rel="noopener noreferrer" title="Go to source" class="source-link" href="https://somefakeurl.com/TEST_BotMessage.cls#L21">
                      items
                    </a></td>
                  <td>
                    <div class="attribute-signature">
                      public List&lt;BotItem&gt; items
                    </div>
                  </td>
                  <td>
                    <div class="prop-annotations">@AuraEnabled</div>
                  </td>

                </tr>
                <tr class="property public">
                  <td class="attribute-name">
                    <a target="_blank" rel="noopener noreferrer" title="Go to source" class="source-link" href="https://somefakeurl.com/TEST_BotMessage.cls#L19">
                      messageText
                    </a></td>
                  <td>
                    <div class="attribute-signature">
                      public String messageText
                    </div>
                  </td>
                  <td>
                    <div class="prop-annotations">@AuraEnabled</div>
                  </td>

                </tr>
                <tr class="property public">
                  <td class="attribute-name">
                    <a target="_blank" rel="noopener noreferrer" title="Go to source" class="source-link" href="https://somefakeurl.com/TEST_BotMessage.cls#L20">
                      records
                    </a></td>
                  <td>
                    <div class="attribute-signature">
                      public List&lt;BotRecord&gt; records
                    </div>
                  </td>
                  <td>
                    <div class="prop-annotations">@AuraEnabled</div>
                  </td>

                </tr>
              </table>
            </div>
            <div class="subsection methods">
              <h3 class="subsection-title methods">TEST_BotMessage Methods</h3>
              <div class="methods-container">
                <ul class="methods-toc">
                  <li class="method public">
                    <a class="methods-toc__entry " href="#TEST_BotMessage.BotMessage">
                      BotMessage ()
                    </a>

                    <div class="methods-toc__description">
                      Default constructor
                    </div>
                  </li>
                  <li class="method public">
                    <a class="methods-toc__entry " href="#TEST_BotMessage.BotMessage_1">
                      BotMessage (author, messageText)
                    </a>

                    <div class="methods-toc__description">
                      Convenience constructor to create a simple bot message.
                    </div>
                  </li>
                  <li class="method public">
                    <a class="methods-toc__entry " href="#TEST_BotMessage.BotMessage_2">
                      BotMessage (author, messageText, records)
                    </a>

                    <div class="methods-toc__description">
                      Convenience constructor to create a simple bot message.
                    </div>
                  </li>
                  <li class="method public">
                    <a class="methods-toc__entry " href="#TEST_BotMessage.BotMessage_3">
                      BotMessage (author, messageText, items)
                    </a>

                    <div class="methods-toc__description">
                      Convenience constructor to create a simple bot message.
                    </div>
                  </li>
                  <li class="method public">
                    <a class="methods-toc__entry " href="#TEST_BotMessage.BotMessage_4">
                      BotMessage (author, messageText, buttons)
                    </a>

                    <div class="methods-toc__description">
                      Convenience constructor to create a simple bot message.
                    </div>
                  </li>
                  <li class="method public">
                    <a class="methods-toc__entry " href="#TEST_BotMessage.BotMessage_5">
                      BotMessage (author, messageText, imageURL)
                    </a>

                    <div class="methods-toc__description">
                      Convenience constructor to create a simple bot message.
                    </div>
                  </li>
                </ul>
                <div class="method public">
                  <h4 class="method-title " id="TEST_BotMessage.BotMessage">

                    <a target="_blank" rel="noopener noreferrer" title="Go to source" class="source-link" href="https://somefakeurl.com/TEST_BotMessage.cls#L28">
                      BotMessage()
                    </a>
                  </h4>
                  <div class="method-description">
                    Default constructor
                  </div>
                  <div class="method-subtitle">
                    Signature
                  </div>

                  <div class="method-signature">
                    public BotMessage()
                  </div>
                </div>
                <div class="method public">
                  <h4 class="method-title " id="TEST_BotMessage.BotMessage_1">

                    <a target="_blank" rel="noopener noreferrer" title="Go to source" class="source-link" href="https://somefakeurl.com/TEST_BotMessage.cls#L41">
                      BotMessage(author, messageText)
                    </a>
                  </h4>
                  <div class="method-description">
                    Convenience constructor to create a simple bot message.
                  </div>
                  <div class="method-subtitle">
                    Signature
                  </div>

                  <div class="method-signature">
                    public BotMessage(String author, String messageText)
                  </div>
                  <div class="method-subtitle">Parameters</div>
                  <div class="param-name">author</div>
                  <div class="param-type">
                    Type: <code class="code-inline">String</code>
                  </div>
                  <div class="param-description">Author param description</div>
                  <div class="param-name">messageText</div>
                  <div class="param-type">
                    Type: <code class="code-inline">String</code>
                  </div>
                  <div class="param-description">Message text param description. If you&#39;re reading this in code, the &#39;see&#39; tag below, serves no other purpose than to demonstrate using overload selectors, e.g. <code class="code-inline">SomeClass.SomeOverloadedMethod[3]</code> to link a specific method overload in your documentation. The below example links to the 3rd overload of the <code class="code-inline">BotResponse</code> constructor.</div>
                  <div class="method-subtitle">
                    See
                  </div>
                  <div class="method-subtitle-description">
                    <span title="A valid link could not be created with this identifier.">TEST_BotResponse.BotResponse</span>
                  </div>
                </div>
                <div class="method public">
                  <h4 class="method-title " id="TEST_BotMessage.BotMessage_2">

                    <a target="_blank" rel="noopener noreferrer" title="Go to source" class="source-link" href="https://somefakeurl.com/TEST_BotMessage.cls#L53">
                      BotMessage(author, messageText, records)
                    </a>
                  </h4>
                  <div class="method-description">
                    Convenience constructor to create a simple bot message.
                  </div>
                  <div class="method-subtitle">
                    Signature
                  </div>

                  <div class="method-signature">
                    public BotMessage(String author, String messageText, List&lt;BotRecord&gt; records)
                  </div>
                  <div class="method-subtitle">Parameters</div>
                  <div class="param-name">author</div>
                  <div class="param-type">
                    Type: <code class="code-inline">String</code>
                  </div>
                  <div class="param-description">Author param description</div>
                  <div class="param-name">messageText</div>
                  <div class="param-type">
                    Type: <code class="code-inline">String</code>
                  </div>
                  <div class="param-description">Message text param description</div>
                  <div class="param-name">records</div>
                  <div class="param-type">
                    Type: <code class="code-inline">List&lt;BotRecord&gt;</code>
                  </div>
                  <div class="param-description">A list of <code class="code-inline">BotRecord</code>s</div>
                  <div class="method-subtitle">
                    See
                  </div>
                  <div class="method-subtitle-description">
                    <span title="A valid link could not be created with this identifier.">TEST_BotRecord</span>
                  </div>
                </div>
                <div class="method public">
                  <h4 class="method-title " id="TEST_BotMessage.BotMessage_3">

                    <a target="_blank" rel="noopener noreferrer" title="Go to source" class="source-link" href="https://somefakeurl.com/TEST_BotMessage.cls#L66">
                      BotMessage(author, messageText, items)
                    </a>
                  </h4>
                  <div class="method-description">
                    Convenience constructor to create a simple bot message.
                  </div>
                  <div class="method-subtitle">
                    Signature
                  </div>

                  <div class="method-signature">
                    public BotMessage(String author, String messageText, List&lt;BotItem&gt; items)
                  </div>
                  <div class="method-subtitle">Parameters</div>
                  <div class="param-name">author</div>
                  <div class="param-type">
                    Type: <code class="code-inline">String</code>
                  </div>
                  <div class="param-description">Author param description</div>
                  <div class="param-name">messageText</div>
                  <div class="param-type">
                    Type: <code class="code-inline">String</code>
                  </div>
                  <div class="param-description">Message text param description</div>
                  <div class="param-name">items</div>
                  <div class="param-type">
                    Type: <code class="code-inline">List&lt;BotItem&gt;</code>
                  </div>
                  <div class="param-description">A list of <code class="code-inline">BotItem</code>s</div>
                  <div class="method-subtitle">
                    See
                  </div>
                  <div class="method-subtitle-description">
                    <a href="javascript:void(0)" onclick="goToLocation('TEST_BotItem.html')">TEST_BotItem</a>
                  </div>
                </div>
                <div class="method public">
                  <h4 class="method-title " id="TEST_BotMessage.BotMessage_4">

                    <a target="_blank" rel="noopener noreferrer" title="Go to source" class="source-link" href="https://somefakeurl.com/TEST_BotMessage.cls#L79">
                      BotMessage(author, messageText, buttons)
                    </a>
                  </h4>
                  <div class="method-description">
                    Convenience constructor to create a simple bot message.
                  </div>
                  <div class="method-subtitle">
                    Signature
                  </div>

                  <div class="method-signature">
                    public BotMessage(String author, String messageText, List&lt;BotMessageButton&gt; buttons)
                  </div>
                  <div class="method-subtitle">Parameters</div>
                  <div class="param-name">author</div>
                  <div class="param-type">
                    Type: <code class="code-inline">String</code>
                  </div>
                  <div class="param-description">Author param description</div>
                  <div class="param-name">messageText</div>
                  <div class="param-type">
                    Type: <code class="code-inline">String</code>
                  </div>
                  <div class="param-description">Message text param description</div>
                  <div class="param-name">items</div>
                  <div class="param-description">A list of <code class="code-inline">BotMessageButton</code>s</div>
                  <div class="method-subtitle">
                    See
                  </div>
                  <div class="method-subtitle-description">
                    <span title="A valid link could not be created with this identifier.">TEST_BotMessageButton</span>
                  </div>
                </div>
                <div class="method public">
                  <h4 class="method-title " id="TEST_BotMessage.BotMessage_5">

                    <a target="_blank" rel="noopener noreferrer" title="Go to source" class="source-link" href="https://somefakeurl.com/TEST_BotMessage.cls#L91">
                      BotMessage(author, messageText, imageURL)
                    </a>
                  </h4>
                  <div class="method-description">
                    Convenience constructor to create a simple bot message.
                  </div>
                  <div class="method-subtitle">
                    Signature
                  </div>

                  <div class="method-signature">
                    public BotMessage(String author, String messageText, String imageURL)
                  </div>
                  <div class="method-subtitle">Parameters</div>
                  <div class="param-name">author</div>
                  <div class="param-type">
                    Type: <code class="code-inline">String</code>
                  </div>
                  <div class="param-description">Author param description</div>
                  <div class="param-name">messageText</div>
                  <div class="param-type">
                    Type: <code class="code-inline">String</code>
                  </div>
                  <div class="param-description">Message text param description</div>
                  <div class="param-name">imageURL</div>
                  <div class="param-type">
                    Type: <code class="code-inline">String</code>
                  </div>
                  <div class="param-description">ImageURL param description</div>
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