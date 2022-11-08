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

            <h2 class="class-title top-level-type" id="TEST_Properties">

              <a target="_blank" rel="noopener noreferrer" title="Go to source" class="source-link" href="https://somefakeurl.com/TEST_Properties.cls#L7">
                TEST_Properties
              </a>
            </h2>
            <div class="class-container">

              <div class="class-subtitle">
                Signature
              </div>

              <div class="class-signature">
                public class TEST_Properties
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
            <div class="subsection properties TEST_Properties">
              <h3 class="subsection-title properties">TEST_Properties Properties</h3>
              <table class="attributes-table properties">

                <tr>
                  <th>Name</th>
                  <th>Signature</th>


                </tr>
                <tr class="property protected">
                  <td class="attribute-name">
                    <a target="_blank" rel="noopener noreferrer" title="Go to source" class="source-link" href="https://somefakeurl.com/TEST_Properties.cls#L15">
                      outer_eight
                    </a></td>
                  <td>
                    <div class="attribute-signature">
                      protected static Map&lt;String,String&gt; outer_eight
                    </div>
                  </td>


                </tr>
                <tr class="property protected">
                  <td class="attribute-name">
                    <a target="_blank" rel="noopener noreferrer" title="Go to source" class="source-link" href="https://somefakeurl.com/TEST_Properties.cls#L18">
                      outer_eleven
                    </a></td>
                  <td>
                    <div class="attribute-signature">
                      protected Set&lt;String&gt; outer_eleven
                    </div>
                  </td>


                </tr>
                <tr class="property private">
                  <td class="attribute-name">
                    <a target="_blank" rel="noopener noreferrer" title="Go to source" class="source-link" href="https://somefakeurl.com/TEST_Properties.cls#L12">
                      outer_five
                    </a></td>
                  <td>
                    <div class="attribute-signature">
                      private String outer_five
                    </div>
                  </td>


                </tr>
                <tr class="property private">
                  <td class="attribute-name">
                    <a target="_blank" rel="noopener noreferrer" title="Go to source" class="source-link" href="https://somefakeurl.com/TEST_Properties.cls#L11">
                      outer_four
                    </a></td>
                  <td>
                    <div class="attribute-signature">
                      private String outer_four
                    </div>
                  </td>


                </tr>
                <tr class="property private">
                  <td class="attribute-name">
                    <a target="_blank" rel="noopener noreferrer" title="Go to source" class="source-link" href="https://somefakeurl.com/TEST_Properties.cls#L32">
                      outer_fourteen
                    </a></td>
                  <td>
                    <div class="attribute-signature">
                      private Integer outer_fourteen
                    </div>
                  </td>


                </tr>
                <tr class="property protected">
                  <td class="attribute-name">
                    <a target="_blank" rel="noopener noreferrer" title="Go to source" class="source-link" href="https://somefakeurl.com/TEST_Properties.cls#L16">
                      outer_nine
                    </a></td>
                  <td>
                    <div class="attribute-signature">
                      protected Map&lt;String,String&gt; outer_nine
                    </div>
                  </td>


                </tr>
                <tr class="property public">
                  <td class="attribute-name">
                    <a target="_blank" rel="noopener noreferrer" title="Go to source" class="source-link" href="https://somefakeurl.com/TEST_Properties.cls#L8">
                      outer_one
                    </a></td>
                  <td>
                    <div class="attribute-signature">
                      public String outer_one
                    </div>
                  </td>


                </tr>
                <tr class="property private">
                  <td class="attribute-name">
                    <a target="_blank" rel="noopener noreferrer" title="Go to source" class="source-link" href="https://somefakeurl.com/TEST_Properties.cls#L14">
                      outer_seven
                    </a></td>
                  <td>
                    <div class="attribute-signature">
                      private String outer_seven
                    </div>
                  </td>


                </tr>
                <tr class="property private">
                  <td class="attribute-name">
                    <a target="_blank" rel="noopener noreferrer" title="Go to source" class="source-link" href="https://somefakeurl.com/TEST_Properties.cls#L13">
                      outer_six
                    </a></td>
                  <td>
                    <div class="attribute-signature">
                      private String outer_six
                    </div>
                  </td>


                </tr>
                <tr class="property protected">
                  <td class="attribute-name">
                    <a target="_blank" rel="noopener noreferrer" title="Go to source" class="source-link" href="https://somefakeurl.com/TEST_Properties.cls#L17">
                      outer_ten
                    </a></td>
                  <td>
                    <div class="attribute-signature">
                      protected List&lt;Integer&gt; outer_ten
                    </div>
                  </td>


                </tr>
                <tr class="property private">
                  <td class="attribute-name">
                    <a target="_blank" rel="noopener noreferrer" title="Go to source" class="source-link" href="https://somefakeurl.com/TEST_Properties.cls#L26">
                      outer_thirteen
                    </a></td>
                  <td>
                    <div class="attribute-signature">
                      private String outer_thirteen
                    </div>
                  </td>


                </tr>
                <tr class="property public">
                  <td class="attribute-name">
                    <a target="_blank" rel="noopener noreferrer" title="Go to source" class="source-link" href="https://somefakeurl.com/TEST_Properties.cls#L10">
                      outer_three
                    </a></td>
                  <td>
                    <div class="attribute-signature">
                      public static String outer_three
                    </div>
                  </td>


                </tr>
                <tr class="property private">
                  <td class="attribute-name">
                    <a target="_blank" rel="noopener noreferrer" title="Go to source" class="source-link" href="https://somefakeurl.com/TEST_Properties.cls#L20">
                      outer_twelve
                    </a></td>
                  <td>
                    <div class="attribute-signature">
                      private String outer_twelve
                    </div>
                  </td>


                </tr>
                <tr class="property public">
                  <td class="attribute-name">
                    <a target="_blank" rel="noopener noreferrer" title="Go to source" class="source-link" href="https://somefakeurl.com/TEST_Properties.cls#L9">
                      outer_two
                    </a></td>
                  <td>
                    <div class="attribute-signature">
                      public static final String outer_two
                    </div>
                  </td>


                </tr>
              </table>
            </div>
          </div>

          <div class="section">

            <h2 class="class-title " id="TEST_Properties.InnerOne">

              <a target="_blank" rel="noopener noreferrer" title="Go to source" class="source-link" href="https://somefakeurl.com/TEST_Properties.cls#L44">
                TEST_Properties.InnerOne
              </a>
            </h2>
            <div class="class-container">

              <div class="class-subtitle">
                Signature
              </div>

              <div class="class-signature">
                public class InnerOne
              </div>
            </div>
            <div class="subsection properties TEST_Properties_InnerOne">
              <h3 class="subsection-title properties">TEST_Properties.InnerOne Properties</h3>
              <table class="attributes-table properties">

                <tr>
                  <th>Name</th>
                  <th>Signature</th>

                  <th>Description</th>
                </tr>
                <tr class="property private">
                  <td class="attribute-name">
                    <a target="_blank" rel="noopener noreferrer" title="Go to source" class="source-link" href="https://somefakeurl.com/TEST_Properties.cls#L49">
                      inner_four
                    </a></td>
                  <td>
                    <div class="attribute-signature">
                      private String inner_four
                    </div>
                  </td>


                  <td class="attribute-description">

                  </td>
                </tr>
                <tr class="property public">
                  <td class="attribute-name">
                    <a target="_blank" rel="noopener noreferrer" title="Go to source" class="source-link" href="https://somefakeurl.com/TEST_Properties.cls#L46">
                      inner_one
                    </a></td>
                  <td>
                    <div class="attribute-signature">
                      public String inner_one
                    </div>
                  </td>


                  <td class="attribute-description">
                    Description for inner_one
                  </td>
                </tr>
                <tr class="property public">
                  <td class="attribute-name">
                    <a target="_blank" rel="noopener noreferrer" title="Go to source" class="source-link" href="https://somefakeurl.com/TEST_Properties.cls#L48">
                      inner_three
                    </a></td>
                  <td>
                    <div class="attribute-signature">
                      public static String inner_three
                    </div>
                  </td>


                  <td class="attribute-description">

                  </td>
                </tr>
                <tr class="property public">
                  <td class="attribute-name">
                    <a target="_blank" rel="noopener noreferrer" title="Go to source" class="source-link" href="https://somefakeurl.com/TEST_Properties.cls#L47">
                      inner_two
                    </a></td>
                  <td>
                    <div class="attribute-signature">
                      public static final String inner_two
                    </div>
                  </td>


                  <td class="attribute-description">

                  </td>
                </tr>
              </table>
            </div>
          </div>

          <div class="section">

            <h2 class="class-title " id="TEST_Properties.InnerThree">

              <a target="_blank" rel="noopener noreferrer" title="Go to source" class="source-link" href="https://somefakeurl.com/TEST_Properties.cls#L60">
                TEST_Properties.InnerThree
              </a>
            </h2>
            <div class="class-container">

              <div class="class-subtitle">
                Signature
              </div>

              <div class="class-signature">
                public class InnerThree
              </div>
            </div>
            <div class="subsection properties TEST_Properties_InnerThree">
              <h3 class="subsection-title properties">TEST_Properties.InnerThree Properties</h3>
              <table class="attributes-table properties">

                <tr>
                  <th>Name</th>
                  <th>Signature</th>
                  <th>Annotations</th>
                  <th>Description</th>
                </tr>
                <tr class="property private">
                  <td class="attribute-name">
                    <a target="_blank" rel="noopener noreferrer" title="Go to source" class="source-link" href="https://somefakeurl.com/TEST_Properties.cls#L66">
                      inner_four
                    </a></td>
                  <td>
                    <div class="attribute-signature">
                      private String inner_four
                    </div>
                  </td>
                  <td></td>

                  <td class="attribute-description">

                  </td>
                </tr>
                <tr class="property public">
                  <td class="attribute-name">
                    <a target="_blank" rel="noopener noreferrer" title="Go to source" class="source-link" href="https://somefakeurl.com/TEST_Properties.cls#L62">
                      inner_one
                    </a></td>
                  <td>
                    <div class="attribute-signature">
                      public String inner_one
                    </div>
                  </td>
                  <td></td>

                  <td class="attribute-description">
                    Description for inner_one
                  </td>
                </tr>
                <tr class="property public">
                  <td class="attribute-name">
                    <a target="_blank" rel="noopener noreferrer" title="Go to source" class="source-link" href="https://somefakeurl.com/TEST_Properties.cls#L65">
                      inner_three
                    </a></td>
                  <td>
                    <div class="attribute-signature">
                      public static String inner_three
                    </div>
                  </td>
                  <td></td>

                  <td class="attribute-description">

                  </td>
                </tr>
                <tr class="property public">
                  <td class="attribute-name">
                    <a target="_blank" rel="noopener noreferrer" title="Go to source" class="source-link" href="https://somefakeurl.com/TEST_Properties.cls#L64">
                      inner_two
                    </a></td>
                  <td>
                    <div class="attribute-signature">
                      public static final String inner_two
                    </div>
                  </td>
                  <td>
                    <div class="prop-annotations">@TestVisible</div>
                  </td>

                  <td class="attribute-description">

                  </td>
                </tr>
              </table>
            </div>
          </div>

          <div class="section">

            <h2 class="class-title " id="TEST_Properties.InnerTwo">

              <a target="_blank" rel="noopener noreferrer" title="Go to source" class="source-link" href="https://somefakeurl.com/TEST_Properties.cls#L52">
                TEST_Properties.InnerTwo
              </a>
            </h2>
            <div class="class-container">

              <div class="class-subtitle">
                Signature
              </div>

              <div class="class-signature">
                public class InnerTwo
              </div>
            </div>
            <div class="subsection properties TEST_Properties_InnerTwo">
              <h3 class="subsection-title properties">TEST_Properties.InnerTwo Properties</h3>
              <table class="attributes-table properties">

                <tr>
                  <th>Name</th>
                  <th>Signature</th>
                  <th>Annotations</th>

                </tr>
                <tr class="property private">
                  <td class="attribute-name">
                    <a target="_blank" rel="noopener noreferrer" title="Go to source" class="source-link" href="https://somefakeurl.com/TEST_Properties.cls#L57">
                      inner_four
                    </a></td>
                  <td>
                    <div class="attribute-signature">
                      private String inner_four
                    </div>
                  </td>
                  <td></td>

                </tr>
                <tr class="property public">
                  <td class="attribute-name">
                    <a target="_blank" rel="noopener noreferrer" title="Go to source" class="source-link" href="https://somefakeurl.com/TEST_Properties.cls#L54">
                      inner_one
                    </a></td>
                  <td>
                    <div class="attribute-signature">
                      public String inner_one
                    </div>
                  </td>
                  <td>
                    <div class="prop-annotations">@TestVisible</div>
                  </td>

                </tr>
                <tr class="property public">
                  <td class="attribute-name">
                    <a target="_blank" rel="noopener noreferrer" title="Go to source" class="source-link" href="https://somefakeurl.com/TEST_Properties.cls#L56">
                      inner_three
                    </a></td>
                  <td>
                    <div class="attribute-signature">
                      public static String inner_three
                    </div>
                  </td>
                  <td></td>

                </tr>
                <tr class="property public">
                  <td class="attribute-name">
                    <a target="_blank" rel="noopener noreferrer" title="Go to source" class="source-link" href="https://somefakeurl.com/TEST_Properties.cls#L55">
                      inner_two
                    </a></td>
                  <td>
                    <div class="attribute-signature">
                      public static final String inner_two
                    </div>
                  </td>
                  <td></td>

                </tr>
              </table>
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