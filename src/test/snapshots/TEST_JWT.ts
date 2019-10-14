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
          Powered by <a target="_blank" rel="noopener noreferrer" href="https://github.com/no-stack-dub-sack/apexdox-vscode">ApexDox</a>
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

            <h2 class="class-title top-level-type" id="TEST_JWT">

              <a target="_blank" rel="noopener noreferrer" title="Go to source" class="source-link" href="https://somefakeurl.com/TEST_JWT.cls#L9">
                TEST_JWT
              </a>
            </h2>
            <div class="class-container">

              <div class="class-description">
                An JSON Web Token utility class.
              </div>
              <div class="class-subtitle">
                Signature
              </div>

              <div class="class-signature">
                public class TEST_JWT
              </div>
              <div class="class-subtitle">
                See
              </div>
              <div class="class-subtitle-description">
                <a target="_blank" rel="noopener noreferrer" href="https://github.com/dreamhouseapp/dreamhouse-sfdx/blob/master/LICENSE">License</a>, <a target="_blank" rel="noopener noreferrer" href="https://github.com/dreamhouseapp/dreamhouse-sfdx">Github</a>
              </div><br />Salesforce.com<br />Jul 2017
            </div>
            <div class="subsection properties TEST_JWT">
              <h3 class="subsection-title properties">TEST_JWT Properties</h2>
                <table class="attributes-table properties">

                  <tr>
                    <th>Name</th>
                    <th>Signature</th>


                  </tr>
                  <tr class="property public">
                    <td class="attribute-name">
                      <a target="_blank" rel="noopener noreferrer" title="Go to source" class="source-link" href="https://somefakeurl.com/TEST_JWT.cls#L11">
                        alg
                      </a></td>
                    <td>
                      <div class="attribute-signature">
                        public String alg
                      </div>
                    </td>


                  </tr>
                  <tr class="property public">
                    <td class="attribute-name">
                      <a target="_blank" rel="noopener noreferrer" title="Go to source" class="source-link" href="https://somefakeurl.com/TEST_JWT.cls#L14">
                        aud
                      </a></td>
                    <td>
                      <div class="attribute-signature">
                        public String aud
                      </div>
                    </td>


                  </tr>
                  <tr class="property public">
                    <td class="attribute-name">
                      <a target="_blank" rel="noopener noreferrer" title="Go to source" class="source-link" href="https://somefakeurl.com/TEST_JWT.cls#L19">
                        cert
                      </a></td>
                    <td>
                      <div class="attribute-signature">
                        public String cert
                      </div>
                    </td>


                  </tr>
                  <tr class="property public">
                    <td class="attribute-name">
                      <a target="_blank" rel="noopener noreferrer" title="Go to source" class="source-link" href="https://somefakeurl.com/TEST_JWT.cls#L17">
                        claims
                      </a></td>
                    <td>
                      <div class="attribute-signature">
                        public Map&lt;String,String&gt; claims
                      </div>
                    </td>


                  </tr>
                  <tr class="property public">
                    <td class="attribute-name">
                      <a target="_blank" rel="noopener noreferrer" title="Go to source" class="source-link" href="https://somefakeurl.com/TEST_JWT.cls#L15">
                        exp
                      </a></td>
                    <td>
                      <div class="attribute-signature">
                        public String exp
                      </div>
                    </td>


                  </tr>
                  <tr class="property public">
                    <td class="attribute-name">
                      <a target="_blank" rel="noopener noreferrer" title="Go to source" class="source-link" href="https://somefakeurl.com/TEST_JWT.cls#L24">
                        HS256
                      </a></td>
                    <td>
                      <div class="attribute-signature">
                        public static final String HS256
                      </div>
                    </td>


                  </tr>
                  <tr class="property public">
                    <td class="attribute-name">
                      <a target="_blank" rel="noopener noreferrer" title="Go to source" class="source-link" href="https://somefakeurl.com/TEST_JWT.cls#L16">
                        iat
                      </a></td>
                    <td>
                      <div class="attribute-signature">
                        public String iat
                      </div>
                    </td>


                  </tr>
                  <tr class="property public">
                    <td class="attribute-name">
                      <a target="_blank" rel="noopener noreferrer" title="Go to source" class="source-link" href="https://somefakeurl.com/TEST_JWT.cls#L12">
                        iss
                      </a></td>
                    <td>
                      <div class="attribute-signature">
                        public String iss
                      </div>
                    </td>


                  </tr>
                  <tr class="property public">
                    <td class="attribute-name">
                      <a target="_blank" rel="noopener noreferrer" title="Go to source" class="source-link" href="https://somefakeurl.com/TEST_JWT.cls#L26">
                        NONE
                      </a></td>
                    <td>
                      <div class="attribute-signature">
                        public static final String NONE
                      </div>
                    </td>


                  </tr>
                  <tr class="property public">
                    <td class="attribute-name">
                      <a target="_blank" rel="noopener noreferrer" title="Go to source" class="source-link" href="https://somefakeurl.com/TEST_JWT.cls#L20">
                        pkcs8
                      </a></td>
                    <td>
                      <div class="attribute-signature">
                        public String pkcs8
                      </div>
                    </td>


                  </tr>
                  <tr class="property public">
                    <td class="attribute-name">
                      <a target="_blank" rel="noopener noreferrer" title="Go to source" class="source-link" href="https://somefakeurl.com/TEST_JWT.cls#L21">
                        privateKey
                      </a></td>
                    <td>
                      <div class="attribute-signature">
                        public String privateKey
                      </div>
                    </td>


                  </tr>
                  <tr class="property public">
                    <td class="attribute-name">
                      <a target="_blank" rel="noopener noreferrer" title="Go to source" class="source-link" href="https://somefakeurl.com/TEST_JWT.cls#L25">
                        RS256
                      </a></td>
                    <td>
                      <div class="attribute-signature">
                        public static final String RS256
                      </div>
                    </td>


                  </tr>
                  <tr class="property public">
                    <td class="attribute-name">
                      <a target="_blank" rel="noopener noreferrer" title="Go to source" class="source-link" href="https://somefakeurl.com/TEST_JWT.cls#L13">
                        sub
                      </a></td>
                    <td>
                      <div class="attribute-signature">
                        public String sub
                      </div>
                    </td>


                  </tr>
                  <tr class="property public">
                    <td class="attribute-name">
                      <a target="_blank" rel="noopener noreferrer" title="Go to source" class="source-link" href="https://somefakeurl.com/TEST_JWT.cls#L18">
                        validFor
                      </a></td>
                    <td>
                      <div class="attribute-signature">
                        public Integer validFor
                      </div>
                    </td>


                  </tr>
                </table>
            </div>
            <div class="subsection methods">
              <h3 class="subsection-title methods">TEST_JWT Methods</h3>
              <div class="methods-container">
                <ul class="methods-toc">
                  <li class="method public">
                    <a class="methods-toc__entry " href="#TEST_JWT.base64URLencode">
                      base64URLencode (input)
                    </a>

                    <div class="methods-toc__description">
                      Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse.
                    </div>
                  </li>
                  <li class="method public">
                    <a class="methods-toc__entry " href="#TEST_JWT.issue">
                      issue ()
                    </a>

                    <div class="methods-toc__description">
                      Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse.
                    </div>
                  </li>
                  <li class="method public">
                    <a class="methods-toc__entry " href="#TEST_JWT.JWT">
                      JWT (alg)
                    </a>

                  </li>
                </ul>
                <div class="method public">
                  <h4 class="method-title " id="TEST_JWT.base64URLencode">

                    <a target="_blank" rel="noopener noreferrer" title="Go to source" class="source-link" href="https://somefakeurl.com/TEST_JWT.cls#L92">
                      base64URLencode(input)
                    </a>
                  </h4>
                  <div class="method-description">
                    Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse.
                  </div>
                  <div class="method-subtitle">
                    Signature
                  </div>

                  <div class="method-signature">
                    public String base64URLencode(Blob input)
                  </div>
                  <div class="method-subtitle">Parameters</div>
                  <div class="param-name">input</div>
                  <div class="param-type">
                    Type: <code class="code-inline">Blob</code>
                  </div>
                  <div class="param-description">Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse.</div>
                  <div class="method-subtitle">
                    Returns
                  </div>
                  <div class="method-subtitle-description">
                    Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse.
                  </div>
                </div>
                <div class="method public">
                  <h4 class="method-title " id="TEST_JWT.issue">

                    <a target="_blank" rel="noopener noreferrer" title="Go to source" class="source-link" href="https://somefakeurl.com/TEST_JWT.cls#L38">
                      issue()
                    </a>
                  </h4>
                  <div class="method-description">
                    Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse.
                  </div>
                  <div class="method-subtitle">
                    Signature
                  </div>

                  <div class="method-signature">
                    public String issue()
                  </div>
                  <div class="method-subtitle">
                    Returns
                  </div>
                  <div class="method-subtitle-description">
                    JSON string
                  </div>
                </div>
                <div class="method public">
                  <h4 class="method-title " id="TEST_JWT.JWT">

                    <a target="_blank" rel="noopener noreferrer" title="Go to source" class="source-link" href="https://somefakeurl.com/TEST_JWT.cls#L29">
                      JWT(alg)
                    </a>
                  </h4>
                  <div class="method-subtitle">
                    Signature
                  </div>

                  <div class="method-signature">
                    public JWT(String alg)
                  </div>
                </div>
              </div>
            </div>
          </div>

        </td>
      </tr>
      <tr>
        <td class="footer">

          <a href="https://github.com/no-stack-dub-sack/apexdox-vscode" target="_blank" rel="noopener noreferrer">
            Powered By ApexDox VS Code
          </a>
        </td>
      </tr>
    </table>
  </body>

</html>`;