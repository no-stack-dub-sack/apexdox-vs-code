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
              <details id="Assertions" class="groupName">
                <summary onclick="toggleActiveClass(this);" id="header-Assertions" class="navHeader">
                  <span>Assertions</span>
                </summary>
                <ul>
                  <!-- menu items will be appended here -->
                  <li id="item-TEST_Annotations" class="navItem class public" onclick="goToLocation('TEST_Annotations.html');">
                    <a tabindex="1" href="javascript:void(0)">TEST_Annotations</a>
                  </li>
                  <li id="item-TEST_EnumClass" class="navItem class public" onclick="goToLocation('TEST_EnumClass.html');">
                    <a tabindex="1" href="javascript:void(0)">TEST_EnumClass</a>
                  </li>
                  <li id="item-TEST_EnumInner" class="navItem class public" onclick="goToLocation('TEST_EnumInner.html');">
                    <a tabindex="1" href="javascript:void(0)">TEST_EnumInner</a>
                  </li>
                  <li id="item-TEST_InterfaceClass" class="navItem class global" onclick="goToLocation('TEST_InterfaceClass.html');">
                    <a tabindex="1" href="javascript:void(0)">TEST_InterfaceClass</a>
                  </li>
                  <li id="item-TEST_Links" class="navItem class public" onclick="goToLocation('TEST_Links.html');">
                    <a tabindex="1" href="javascript:void(0)">TEST_Links</a>
                  </li>
                  <li id="item-TEST_Methods" class="navItem class public" onclick="goToLocation('TEST_Methods.html');">
                    <a tabindex="1" href="javascript:void(0)">TEST_Methods</a>
                  </li>
                  <li id="item-TEST_MultiLineTagValues" class="navItem class public" onclick="goToLocation('TEST_MultiLineTagValues.html');">
                    <a tabindex="1" href="javascript:void(0)">TEST_MultiLineTagValues</a>
                  </li>
                  <li id="item-TEST_NestedClasses" class="navItem class public" onclick="goToLocation('TEST_NestedClasses.html');">
                    <a tabindex="1" href="javascript:void(0)">TEST_NestedClasses</a>
                  </li>
                  <li id="item-TEST_Properties" class="navItem class public" onclick="goToLocation('TEST_Properties.html');">
                    <a tabindex="1" href="javascript:void(0)">TEST_Properties</a>
                  </li>
                </ul>
              </details>
              <details id="Feature1" class="groupName">
                <summary onclick="toggleActiveClass(this);" id="header-Feature1" class="navHeader">
                  <span>Feature1</span>
                </summary>
                <ul>
                  <!-- menu items will be appended here -->
                  <li id="item-TEST_ArrayUtils" class="navItem class global" onclick="goToLocation('TEST_ArrayUtils.html');">
                    <a tabindex="1" href="javascript:void(0)">TEST_ArrayUtils</a>
                  </li>
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
                  <li id="item-TEST_HandlerSOQL" class="navItem class public" onclick="goToLocation('TEST_HandlerSOQL.html');">
                    <a tabindex="1" href="javascript:void(0)">TEST_HandlerSOQL</a>
                  </li>
                  <li id="item-TEST_IllegalStateException" class="navItem class global" onclick="goToLocation('TEST_IllegalStateException.html');">
                    <a tabindex="1" href="javascript:void(0)">TEST_IllegalStateException</a>
                  </li>
                  <li id="item-TEST_ISObjectComparator" class="navItem class global" onclick="goToLocation('TEST_ISObjectComparator.html');">
                    <a tabindex="1" href="javascript:void(0)">TEST_ISObjectComparator</a>
                  </li>
                  <li id="item-TEST_JWT" class="navItem class public" onclick="goToLocation('TEST_JWT.html');">
                    <a tabindex="1" href="javascript:void(0)">TEST_JWT</a>
                  </li>
                  <li id="item-TEST_LIFXController" class="navItem class public" onclick="goToLocation('TEST_LIFXController.html');">
                    <a tabindex="1" href="javascript:void(0)">TEST_LIFXController</a>
                  </li>
                  <li id="item-TEST_MyRestResource" class="navItem class global" onclick="goToLocation('TEST_MyRestResource.html');">
                    <a tabindex="1" href="javascript:void(0)">TEST_MyRestResource</a>
                  </li>
                  <li id="item-TEST_PrimitiveComparator" class="navItem class global" onclick="goToLocation('TEST_PrimitiveComparator.html');">
                    <a tabindex="1" href="javascript:void(0)">TEST_PrimitiveComparator</a>
                  </li>
                  <li id="item-TEST_SampleDataController" class="navItem class public" onclick="goToLocation('TEST_SampleDataController.html');">
                    <a tabindex="1" href="javascript:void(0)">TEST_SampleDataController</a>
                  </li>
                  <li id="item-TEST_SlackOpportunityPublisher" class="navItem class public" onclick="goToLocation('TEST_SlackOpportunityPublisher.html');">
                    <a tabindex="1" href="javascript:void(0)">TEST_SlackOpportunityPublisher</a>
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
                  <li id="item-IncludeTwo" class="navItem class private" onclick="goToLocation('IncludeTwo.html');">
                    <a tabindex="1" href="javascript:void(0)">IncludeTwo</a>
                  </li>
                </ul>
              </details>
            </nav>
          </div>
        </td>
        <td class="contentTD">
          <details class="section" open>
            <summary>
              <h2 class="sectionTitle" id="TEST_Properties">

                <a target="_blank" rel="noopener noreferrer" title="Go to source" class="hostedSourceLink" href="https://somefakeurl.com/TEST_Properties.cls#L4">
                  TEST_Properties
                </a><span><svg aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="externalLink"><path d="M576 24v127.984c0 21.461-25.96 31.98-40.971 16.971l-35.707-35.709-243.523 243.523c-9.373 9.373-24.568 9.373-33.941 0l-22.627-22.627c-9.373-9.373-9.373-24.569 0-33.941L442.756 76.676l-35.703-35.705C391.982 25.9 402.656 0 424.024 0H552c13.255 0 24 10.745 24 24zM407.029 270.794l-16 16A23.999 23.999 0 0 0 384 303.765V448H64V128h264a24.003 24.003 0 0 0 16.97-7.029l16-16C376.089 89.851 365.381 64 344 64H48C21.49 64 0 85.49 0 112v352c0 26.51 21.49 48 48 48h352c26.51 0 48-21.49 48-48V287.764c0-21.382-25.852-32.09-40.971-16.97z" class="externalLink"></path></svg></span>
              </h2>
            </summary>



            <div class="classSignature">

              <a target="_blank" rel="noopener noreferrer" title="Go to source" class="hostedSourceLink" href="https://somefakeurl.com/TEST_Properties.cls#L4">
                public class TEST_Properties
              </a>
            </div>
            <div class="classDetails"></div>
            <p />
            <details class="subSection properties TEST_Properties" open>
              <summary>
                <h2 class="subsectionTitle properties">Properties</h2>
              </summary>

              <div class="subsectionContainer">
                <table class="attrTable properties">

                  <tr>
                    <th>Name</th>
                    <th>Signature</th>


                  </tr>
                  <tr class="property protected">
                    <td class="attrName">outer_eight</td>
                    <td class="attrSignature">
                      <a target="_blank" rel="noopener noreferrer" title="Go to source" class="hostedSourceLink" href="https://somefakeurl.com/TEST_Properties.cls#L12">
                        protected static Map&lt;String,String&gt; <span class="hljs-title">outer_eight<span>
                </a></td>
                
                
            </tr>
            <tr class="property protected">
                <td class="attrName">outer_eleven</td>
                <td class="attrSignature">
                <a target="_blank" rel="noopener noreferrer" title="Go to source" class="hostedSourceLink" href="https://somefakeurl.com/TEST_Properties.cls#L15">
                    protected Set&lt;String&gt; <span class="hljs-title">outer_eleven<span>
                </a></td>
                
                
            </tr>
            <tr class="property private">
                <td class="attrName">outer_five</td>
                <td class="attrSignature">
                <a target="_blank" rel="noopener noreferrer" title="Go to source" class="hostedSourceLink" href="https://somefakeurl.com/TEST_Properties.cls#L9">
                    private String <span class="hljs-title">outer_five<span>
                </a></td>
                
                
            </tr>
            <tr class="property private">
                <td class="attrName">outer_four</td>
                <td class="attrSignature">
                <a target="_blank" rel="noopener noreferrer" title="Go to source" class="hostedSourceLink" href="https://somefakeurl.com/TEST_Properties.cls#L8">
                    private String <span class="hljs-title">outer_four<span>
                </a></td>
                
                
            </tr>
            <tr class="property private">
                <td class="attrName">outer_fourteen</td>
                <td class="attrSignature">
                <a target="_blank" rel="noopener noreferrer" title="Go to source" class="hostedSourceLink" href="https://somefakeurl.com/TEST_Properties.cls#L29">
                    private Integer <span class="hljs-title">outer_fourteen<span>
                </a></td>
                
                
            </tr>
            <tr class="property protected">
                <td class="attrName">outer_nine</td>
                <td class="attrSignature">
                <a target="_blank" rel="noopener noreferrer" title="Go to source" class="hostedSourceLink" href="https://somefakeurl.com/TEST_Properties.cls#L13">
                    protected Map&lt;String,String&gt; <span class="hljs-title">outer_nine<span>
                </a></td>
                
                
            </tr>
            <tr class="property public">
                <td class="attrName">outer_one</td>
                <td class="attrSignature">
                <a target="_blank" rel="noopener noreferrer" title="Go to source" class="hostedSourceLink" href="https://somefakeurl.com/TEST_Properties.cls#L5">
                    public String <span class="hljs-title">outer_one<span>
                </a></td>
                
                
            </tr>
            <tr class="property private">
                <td class="attrName">outer_seven</td>
                <td class="attrSignature">
                <a target="_blank" rel="noopener noreferrer" title="Go to source" class="hostedSourceLink" href="https://somefakeurl.com/TEST_Properties.cls#L11">
                    private String <span class="hljs-title">outer_seven<span>
                </a></td>
                
                
            </tr>
            <tr class="property private">
                <td class="attrName">outer_six</td>
                <td class="attrSignature">
                <a target="_blank" rel="noopener noreferrer" title="Go to source" class="hostedSourceLink" href="https://somefakeurl.com/TEST_Properties.cls#L10">
                    private String <span class="hljs-title">outer_six<span>
                </a></td>
                
                
            </tr>
            <tr class="property protected">
                <td class="attrName">outer_ten</td>
                <td class="attrSignature">
                <a target="_blank" rel="noopener noreferrer" title="Go to source" class="hostedSourceLink" href="https://somefakeurl.com/TEST_Properties.cls#L14">
                    protected List&lt;Integer&gt; <span class="hljs-title">outer_ten<span>
                </a></td>
                
                
            </tr>
            <tr class="property private">
                <td class="attrName">outer_thirteen</td>
                <td class="attrSignature">
                <a target="_blank" rel="noopener noreferrer" title="Go to source" class="hostedSourceLink" href="https://somefakeurl.com/TEST_Properties.cls#L23">
                    private String <span class="hljs-title">outer_thirteen<span>
                </a></td>
                
                
            </tr>
            <tr class="property public">
                <td class="attrName">outer_three</td>
                <td class="attrSignature">
                <a target="_blank" rel="noopener noreferrer" title="Go to source" class="hostedSourceLink" href="https://somefakeurl.com/TEST_Properties.cls#L7">
                    public static String <span class="hljs-title">outer_three<span>
                </a></td>
                
                
            </tr>
            <tr class="property private">
                <td class="attrName">outer_twelve</td>
                <td class="attrSignature">
                <a target="_blank" rel="noopener noreferrer" title="Go to source" class="hostedSourceLink" href="https://somefakeurl.com/TEST_Properties.cls#L17">
                    private String <span class="hljs-title">outer_twelve<span>
                </a></td>
                
                
            </tr>
            <tr class="property public">
                <td class="attrName">outer_two</td>
                <td class="attrSignature">
                <a target="_blank" rel="noopener noreferrer" title="Go to source" class="hostedSourceLink" href="https://somefakeurl.com/TEST_Properties.cls#L6">
                    public static final String <span class="hljs-title">outer_two<span>
                </a></td>
                
                
            </tr>
                </table>
            </div>
            <p />
            </details>
            </details>
            <details class="section" open>
                <summary>
            <h2 class="sectionTitle" id="TEST_Properties.InnerOne">
                
                <a target="_blank" rel="noopener noreferrer" title="Go to source" class="hostedSourceLink" href="https://somefakeurl.com/TEST_Properties.cls#L41">
                    TEST_Properties.InnerOne
                </a><span><svg aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="externalLink"><path d="M576 24v127.984c0 21.461-25.96 31.98-40.971 16.971l-35.707-35.709-243.523 243.523c-9.373 9.373-24.568 9.373-33.941 0l-22.627-22.627c-9.373-9.373-9.373-24.569 0-33.941L442.756 76.676l-35.703-35.705C391.982 25.9 402.656 0 424.024 0H552c13.255 0 24 10.745 24 24zM407.029 270.794l-16 16A23.999 23.999 0 0 0 384 303.765V448H64V128h264a24.003 24.003 0 0 0 16.97-7.029l16-16C376.089 89.851 365.381 64 344 64H48C21.49 64 0 85.49 0 112v352c0 26.51 21.49 48 48 48h352c26.51 0 48-21.49 48-48V287.764c0-21.382-25.852-32.09-40.971-16.97z" class="externalLink"></path></svg></span>
                        </h2>
                        </summary>



                        <div class="classSignature">

                          <a target="_blank" rel="noopener noreferrer" title="Go to source" class="hostedSourceLink" href="https://somefakeurl.com/TEST_Properties.cls#L41">
                            public class InnerOne
                          </a>
                        </div>
                        <div class="classDetails"></div>
                        <p />
                        <details class="subSection properties TEST_Properties_InnerOne" open>
                          <summary>
                            <h2 class="subsectionTitle properties">Properties</h2>
                          </summary>

                          <div class="subsectionContainer">
                            <table class="attrTable properties">

                              <tr>
                                <th>Name</th>
                                <th>Signature</th>

                                <th>Description</th>
                              </tr>
                              <tr class="property private">
                                <td class="attrName">inner_four</td>
                                <td class="attrSignature">
                                  <a target="_blank" rel="noopener noreferrer" title="Go to source" class="hostedSourceLink" href="https://somefakeurl.com/TEST_Properties.cls#L46">
                                    private String <span class="hljs-title">inner_four<span>
                </a></td>
                
                <td class="attrDescription"></td>
            </tr>
            <tr class="property public">
                <td class="attrName">inner_one</td>
                <td class="attrSignature">
                <a target="_blank" rel="noopener noreferrer" title="Go to source" class="hostedSourceLink" href="https://somefakeurl.com/TEST_Properties.cls#L43">
                    public String <span class="hljs-title">inner_one<span>
                </a></td>
                
                <td class="attrDescription">Description for inner_one</td>
            </tr>
            <tr class="property public">
                <td class="attrName">inner_three</td>
                <td class="attrSignature">
                <a target="_blank" rel="noopener noreferrer" title="Go to source" class="hostedSourceLink" href="https://somefakeurl.com/TEST_Properties.cls#L45">
                    public static String <span class="hljs-title">inner_three<span>
                </a></td>
                
                <td class="attrDescription"></td>
            </tr>
            <tr class="property public">
                <td class="attrName">inner_two</td>
                <td class="attrSignature">
                <a target="_blank" rel="noopener noreferrer" title="Go to source" class="hostedSourceLink" href="https://somefakeurl.com/TEST_Properties.cls#L44">
                    public static final String <span class="hljs-title">inner_two<span>
                </a></td>
                
                <td class="attrDescription"></td>
            </tr>
                </table>
            </div>
            <p />
            </details>
            </details>
            <details class="section" open>
                <summary>
            <h2 class="sectionTitle" id="TEST_Properties.InnerThree">
                
                <a target="_blank" rel="noopener noreferrer" title="Go to source" class="hostedSourceLink" href="https://somefakeurl.com/TEST_Properties.cls#L57">
                    TEST_Properties.InnerThree
                </a><span><svg aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="externalLink"><path d="M576 24v127.984c0 21.461-25.96 31.98-40.971 16.971l-35.707-35.709-243.523 243.523c-9.373 9.373-24.568 9.373-33.941 0l-22.627-22.627c-9.373-9.373-9.373-24.569 0-33.941L442.756 76.676l-35.703-35.705C391.982 25.9 402.656 0 424.024 0H552c13.255 0 24 10.745 24 24zM407.029 270.794l-16 16A23.999 23.999 0 0 0 384 303.765V448H64V128h264a24.003 24.003 0 0 0 16.97-7.029l16-16C376.089 89.851 365.381 64 344 64H48C21.49 64 0 85.49 0 112v352c0 26.51 21.49 48 48 48h352c26.51 0 48-21.49 48-48V287.764c0-21.382-25.852-32.09-40.971-16.97z" class="externalLink"></path></svg></span>
                                    </h2>
                                    </summary>



                                    <div class="classSignature">

                                      <a target="_blank" rel="noopener noreferrer" title="Go to source" class="hostedSourceLink" href="https://somefakeurl.com/TEST_Properties.cls#L57">
                                        public class InnerThree
                                      </a>
                                    </div>
                                    <div class="classDetails"></div>
                                    <p />
                                    <details class="subSection properties TEST_Properties_InnerThree" open>
                                      <summary>
                                        <h2 class="subsectionTitle properties">Properties</h2>
                                      </summary>

                                      <div class="subsectionContainer">
                                        <table class="attrTable properties">

                                          <tr>
                                            <th>Name</th>
                                            <th>Signature</th>
                                            <th>Annotations</th>
                                            <th>Description</th>
                                          </tr>
                                          <tr class="property private">
                                            <td class="attrName">inner_four</td>
                                            <td class="attrSignature">
                                              <a target="_blank" rel="noopener noreferrer" title="Go to source" class="hostedSourceLink" href="https://somefakeurl.com/TEST_Properties.cls#L63">
                                                private String <span class="hljs-title">inner_four<span>
                </a></td>
                <td></td>
                <td class="attrDescription"></td>
            </tr>
            <tr class="property public">
                <td class="attrName">inner_one</td>
                <td class="attrSignature">
                <a target="_blank" rel="noopener noreferrer" title="Go to source" class="hostedSourceLink" href="https://somefakeurl.com/TEST_Properties.cls#L59">
                    public String <span class="hljs-title">inner_one<span>
                </a></td>
                <td></td>
                <td class="attrDescription">Description for inner_one</td>
            </tr>
            <tr class="property public">
                <td class="attrName">inner_three</td>
                <td class="attrSignature">
                <a target="_blank" rel="noopener noreferrer" title="Go to source" class="hostedSourceLink" href="https://somefakeurl.com/TEST_Properties.cls#L62">
                    public static String <span class="hljs-title">inner_three<span>
                </a></td>
                <td></td>
                <td class="attrDescription"></td>
            </tr>
            <tr class="property public">
                <td class="attrName">inner_two</td>
                <td class="attrSignature">
                <a target="_blank" rel="noopener noreferrer" title="Go to source" class="hostedSourceLink" href="https://somefakeurl.com/TEST_Properties.cls#L61">
                    public static final String <span class="hljs-title">inner_two<span>
                </a></td>
                <td><div class="propAnnotations">@TestVisible</div></td>
                <td class="attrDescription"></td>
            </tr>
                </table>
            </div>
            <p />
            </details>
            </details>
            <details class="section" open>
                <summary>
            <h2 class="sectionTitle" id="TEST_Properties.InnerTwo">
                
                <a target="_blank" rel="noopener noreferrer" title="Go to source" class="hostedSourceLink" href="https://somefakeurl.com/TEST_Properties.cls#L49">
                    TEST_Properties.InnerTwo
                </a><span><svg aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="externalLink"><path d="M576 24v127.984c0 21.461-25.96 31.98-40.971 16.971l-35.707-35.709-243.523 243.523c-9.373 9.373-24.568 9.373-33.941 0l-22.627-22.627c-9.373-9.373-9.373-24.569 0-33.941L442.756 76.676l-35.703-35.705C391.982 25.9 402.656 0 424.024 0H552c13.255 0 24 10.745 24 24zM407.029 270.794l-16 16A23.999 23.999 0 0 0 384 303.765V448H64V128h264a24.003 24.003 0 0 0 16.97-7.029l16-16C376.089 89.851 365.381 64 344 64H48C21.49 64 0 85.49 0 112v352c0 26.51 21.49 48 48 48h352c26.51 0 48-21.49 48-48V287.764c0-21.382-25.852-32.09-40.971-16.97z" class="externalLink"></path></svg></span>
                                                </h2>
                                                </summary>



                                                <div class="classSignature">

                                                  <a target="_blank" rel="noopener noreferrer" title="Go to source" class="hostedSourceLink" href="https://somefakeurl.com/TEST_Properties.cls#L49">
                                                    public class InnerTwo
                                                  </a>
                                                </div>
                                                <div class="classDetails"></div>
                                                <p />
                                                <details class="subSection properties TEST_Properties_InnerTwo" open>
                                                  <summary>
                                                    <h2 class="subsectionTitle properties">Properties</h2>
                                                  </summary>

                                                  <div class="subsectionContainer">
                                                    <table class="attrTable properties">

                                                      <tr>
                                                        <th>Name</th>
                                                        <th>Signature</th>
                                                        <th>Annotations</th>

                                                      </tr>
                                                      <tr class="property private">
                                                        <td class="attrName">inner_four</td>
                                                        <td class="attrSignature">
                                                          <a target="_blank" rel="noopener noreferrer" title="Go to source" class="hostedSourceLink" href="https://somefakeurl.com/TEST_Properties.cls#L54">
                                                            private String <span class="hljs-title">inner_four<span>
                </a></td>
                <td></td>
                
            </tr>
            <tr class="property public">
                <td class="attrName">inner_one</td>
                <td class="attrSignature">
                <a target="_blank" rel="noopener noreferrer" title="Go to source" class="hostedSourceLink" href="https://somefakeurl.com/TEST_Properties.cls#L51">
                    public String <span class="hljs-title">inner_one<span>
                </a></td>
                <td><div class="propAnnotations">@TestVisible</div></td>
                
            </tr>
            <tr class="property public">
                <td class="attrName">inner_three</td>
                <td class="attrSignature">
                <a target="_blank" rel="noopener noreferrer" title="Go to source" class="hostedSourceLink" href="https://somefakeurl.com/TEST_Properties.cls#L53">
                    public static String <span class="hljs-title">inner_three<span>
                </a></td>
                <td></td>
                
            </tr>
            <tr class="property public">
                <td class="attrName">inner_two</td>
                <td class="attrSignature">
                <a target="_blank" rel="noopener noreferrer" title="Go to source" class="hostedSourceLink" href="https://somefakeurl.com/TEST_Properties.cls#L52">
                    public static final String <span class="hljs-title">inner_two<span>
                </a></td>
                <td></td>
                
            </tr>
                </table>
            </div>
            <p />
            </details>
            </details></div></td>
            </tr>
    </table>
    <hr/>
    <center class="footer">
        <a href="https://github.com/no-stack-dub-sack/ApexDoc2-VSCode" target="_blank" rel="noopener noreferrer">
            Powered By ApexDoc2
        </a>
    </center>
</body>
</html>`;