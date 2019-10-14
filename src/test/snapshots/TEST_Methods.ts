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

            <h2 class="class-title top-level-type" id="TEST_Methods">

              <a target="_blank" rel="noopener noreferrer" title="Go to source" class="source-link" href="https://somefakeurl.com/TEST_Methods.cls#L5">
                TEST_Methods
              </a>
            </h2>
            <div class="class-container">

              <div class="class-description">
                Test for method parsing / visibility.
              </div>
              <div class="class-subtitle">
                Signature
              </div>

              <div class="class-signature">
                public class TEST_Methods
              </div>
            </div>
            <div class="subsection methods">
              <h3 class="subsection-title methods">TEST_Methods Methods</h3>
              <div class="methods-container">
                <ul class="methods-toc">
                  <li class="method public">
                    <a class="methods-toc__entry " href="#TEST_Methods.method1">
                      method1 ()
                    </a>

                  </li>
                  <li class="method public">
                    <a class="methods-toc__entry " href="#TEST_Methods.method10">
                      method10 (int, int2, int3, int4)
                    </a>

                  </li>
                  <li class="method private">
                    <a class="methods-toc__entry " href="#TEST_Methods.method11">
                      method11 (crazyType, int2, int3, int22)
                    </a>

                  </li>
                  <li class="method protected">
                    <a class="methods-toc__entry " href="#TEST_Methods.method12">
                      method12 (crazyType, int2, int3, int22)
                    </a>

                  </li>
                  <li class="method private">
                    <a class="methods-toc__entry " href="#TEST_Methods.method2">
                      method2 ()
                    </a>

                  </li>
                  <li class="method protected">
                    <a class="methods-toc__entry " href="#TEST_Methods.method3">
                      method3 ()
                    </a>

                  </li>
                  <li class="method global">
                    <a class="methods-toc__entry " href="#TEST_Methods.method4">
                      method4 ()
                    </a>

                  </li>
                  <li class="method private">
                    <a class="methods-toc__entry " href="#TEST_Methods.method5">
                      method5 ()
                    </a>

                    <div class="methods-toc__description">
                      visible because starts with known keyword, despite implicit privacy
                    </div>
                  </li>
                  <li class="method private">
                    <a class="methods-toc__entry " href="#TEST_Methods.method6">
                      method6 ()
                    </a>

                    <div class="methods-toc__description">
                      visible because starts with known keyword, despite implicit privacy
                    </div>
                  </li>
                  <li class="method private">
                    <a class="methods-toc__entry " href="#TEST_Methods.method7">
                      method7 ()
                    </a>

                    <div class="methods-toc__description">
                      visible because starts with known keyword, despite implicit privacy
                    </div>
                  </li>
                  <li class="method private">
                    <a class="methods-toc__entry " href="#TEST_Methods.method8">
                      method8 ()
                    </a>

                    <div class="methods-toc__description">
                      visible because starts with known keyword, despite implicit privacy
                    </div>
                  </li>
                  <li class="method private">
                    <a class="methods-toc__entry " href="#TEST_Methods.method9">
                      method9 ()
                    </a>

                    <div class="methods-toc__description">
                      visible because starts with known keyword, despite implicit privacy
                    </div>
                  </li>
                </ul>
                <div class="method public">
                  <h4 class="method-title " id="TEST_Methods.method1">

                    <a target="_blank" rel="noopener noreferrer" title="Go to source" class="source-link" href="https://somefakeurl.com/TEST_Methods.cls#L6">
                      method1()
                    </a>
                  </h4>
                  <div class="method-subtitle">
                    Signature
                  </div>

                  <div class="method-signature">
                    public static String method1()
                  </div>
                </div>
                <div class="method public">
                  <h4 class="method-title " id="TEST_Methods.method10">

                    <a target="_blank" rel="noopener noreferrer" title="Go to source" class="source-link" href="https://somefakeurl.com/TEST_Methods.cls#L53">
                      method10(int, int2, int3, int4)
                    </a>
                  </h4>
                  <div class="method-subtitle">
                    Signature
                  </div>

                  <div class="method-signature">
                    public static Integer method10(Integer int, String int2, Double int3, Set&lt;String&gt; int4)
                  </div>
                  <div class="method-subtitle">Parameters</div>
                  <div class="param-name">int</div>
                  <div class="param-type">
                    Type: <code class="code-inline">Integer</code>
                  </div>
                  <div class="param-description">a</div>
                  <div class="param-name">int2</div>
                  <div class="param-type">
                    Type: <code class="code-inline">String</code>
                  </div>
                  <div class="param-description">b</div>
                  <div class="param-name">int3</div>
                  <div class="param-type">
                    Type: <code class="code-inline">Double</code>
                  </div>
                  <div class="param-description">c</div>
                  <div class="param-name">int4</div>
                  <div class="param-type">
                    Type: <code class="code-inline">Set&lt;String&gt;</code>
                  </div>
                  <div class="param-description">d</div>
                </div>
                <div class="method private">
                  <h4 class="method-title " id="TEST_Methods.method11">

                    <a target="_blank" rel="noopener noreferrer" title="Go to source" class="source-link" href="https://somefakeurl.com/TEST_Methods.cls#L64">
                      method11(crazyType, int2, int3, int22)
                    </a>
                  </h4>
                  <div class="method-subtitle">
                    Signature
                  </div>

                  <div class="method-signature">
                    private Integer method11(Map&lt;String, Map&lt;SomeCustomClass.InnerClass, Map&lt;Int, List&lt;Map&lt;String, Integer&gt;&gt;&gt;&gt;&gt; crazyType, List&lt;String&gt; int2, OuterClass.InnerType int3, Integer int22)
                  </div>
                  <div class="method-subtitle">Parameters</div>
                  <div class="param-name">crazyType</div>
                  <div class="param-type">
                    Type: <code class="code-inline">Map&lt;String, Map&lt;SomeCustomClass.InnerClass, Map&lt;Int, List&lt;Map&lt;String, Integer&gt;&gt;&gt;&gt;&gt;</code>
                  </div>
                  <div class="param-description">a</div>
                  <div class="param-name">int2</div>
                  <div class="param-type">
                    Type: <code class="code-inline">List&lt;String&gt;</code>
                  </div>
                  <div class="param-description">b</div>
                  <div class="param-name">int3</div>
                  <div class="param-type">
                    Type: <code class="code-inline">OuterClass.InnerType</code>
                  </div>
                  <div class="param-description">c</div>
                  <div class="param-name">int22</div>
                  <div class="param-type">
                    Type: <code class="code-inline">Integer</code>
                  </div>
                  <div class="param-description">d</div>
                  <div class="method-subtitle">
                    Returns
                  </div>
                  <div class="method-subtitle-description">
                    <code class="code-inline">Integer</code>
                  </div>
                </div>
                <div class="method protected">
                  <h4 class="method-title " id="TEST_Methods.method12">

                    <a target="_blank" rel="noopener noreferrer" title="Go to source" class="source-link" href="https://somefakeurl.com/TEST_Methods.cls#L73">
                      method12(crazyType, int2, int3, int22)
                    </a>
                  </h4>
                  <div class="method-subtitle">
                    Signature
                  </div>

                  <div class="method-signature">
                    protected static Integer method12(Map&lt;String, Map&lt;SomeCustomClass.InnerClass, Map&lt;Int, List&lt;Map&lt;String, Integer&gt;&gt;&gt;&gt;&gt; crazyType, List&lt;String&gt; int2, OuterClass.InnerType int3, Integer int22)
                  </div>
                  <div class="method-subtitle">Parameters</div>
                  <div class="param-name">crazyType</div>
                  <div class="param-type">
                    Type: <code class="code-inline">Map&lt;String, Map&lt;SomeCustomClass.InnerClass, Map&lt;Int, List&lt;Map&lt;String, Integer&gt;&gt;&gt;&gt;&gt;</code>
                  </div>
                  <div class="param-description">a</div>
                  <div class="param-name">int22</div>
                  <div class="param-type">
                    Type: <code class="code-inline">Integer</code>
                  </div>
                  <div class="param-description">d</div>
                  <div class="method-subtitle">
                    Returns
                  </div>
                  <div class="method-subtitle-description">
                    <code class="code-inline">Integer</code>
                  </div>
                </div>
                <div class="method private">
                  <h4 class="method-title " id="TEST_Methods.method2">

                    <a target="_blank" rel="noopener noreferrer" title="Go to source" class="source-link" href="https://somefakeurl.com/TEST_Methods.cls#L10">
                      method2()
                    </a>
                  </h4>
                  <div class="method-subtitle">
                    Signature
                  </div>

                  <div class="method-signature">
                    String method2()
                  </div>
                </div>
                <div class="method protected">
                  <h4 class="method-title " id="TEST_Methods.method3">

                    <a target="_blank" rel="noopener noreferrer" title="Go to source" class="source-link" href="https://somefakeurl.com/TEST_Methods.cls#L14">
                      method3()
                    </a>
                  </h4>
                  <div class="method-subtitle">
                    Signature
                  </div>

                  <div class="method-signature">
                    protected static String method3()
                  </div>
                </div>
                <div class="method global">
                  <h4 class="method-title " id="TEST_Methods.method4">

                    <a target="_blank" rel="noopener noreferrer" title="Go to source" class="source-link" href="https://somefakeurl.com/TEST_Methods.cls#L18">
                      method4()
                    </a>
                  </h4>
                  <div class="method-subtitle">
                    Signature
                  </div>

                  <div class="method-signature">
                    global static String method4()
                  </div>
                </div>
                <div class="method private">
                  <h4 class="method-title " id="TEST_Methods.method5">

                    <a target="_blank" rel="noopener noreferrer" title="Go to source" class="source-link" href="https://somefakeurl.com/TEST_Methods.cls#L23">
                      method5()
                    </a>
                  </h4>
                  <div class="method-description">
                    visible because starts with known keyword, despite implicit privacy
                  </div>
                  <div class="method-subtitle">
                    Signature
                  </div>

                  <div class="method-signature">
                    String method5()
                  </div>
                </div>
                <div class="method private">
                  <h4 class="method-title " id="TEST_Methods.method6">

                    <a target="_blank" rel="noopener noreferrer" title="Go to source" class="source-link" href="https://somefakeurl.com/TEST_Methods.cls#L28">
                      method6()
                    </a>
                  </h4>
                  <div class="method-description">
                    visible because starts with known keyword, despite implicit privacy
                  </div>
                  <div class="method-subtitle">
                    Signature
                  </div>

                  <div class="method-signature">
                    Integer method6()
                  </div>
                </div>
                <div class="method private">
                  <h4 class="method-title " id="TEST_Methods.method7">

                    <a target="_blank" rel="noopener noreferrer" title="Go to source" class="source-link" href="https://somefakeurl.com/TEST_Methods.cls#L33">
                      method7()
                    </a>
                  </h4>
                  <div class="method-description">
                    visible because starts with known keyword, despite implicit privacy
                  </div>
                  <div class="method-subtitle">
                    Signature
                  </div>

                  <div class="method-signature">
                    Set&lt;String&gt; method7()
                  </div>
                </div>
                <div class="method private">
                  <h4 class="method-title " id="TEST_Methods.method8">

                    <a target="_blank" rel="noopener noreferrer" title="Go to source" class="source-link" href="https://somefakeurl.com/TEST_Methods.cls#L38">
                      method8()
                    </a>
                  </h4>
                  <div class="method-description">
                    visible because starts with known keyword, despite implicit privacy
                  </div>
                  <div class="method-subtitle">
                    Signature
                  </div>

                  <div class="method-signature">
                    List&lt;String&gt; method8()
                  </div>
                </div>
                <div class="method private">
                  <h4 class="method-title " id="TEST_Methods.method9">

                    <a target="_blank" rel="noopener noreferrer" title="Go to source" class="source-link" href="https://somefakeurl.com/TEST_Methods.cls#L43">
                      method9()
                    </a>
                  </h4>
                  <div class="method-description">
                    visible because starts with known keyword, despite implicit privacy
                  </div>
                  <div class="method-subtitle">
                    Signature
                  </div>

                  <div class="method-signature">
                    Map&lt;String, String&gt; method9()
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