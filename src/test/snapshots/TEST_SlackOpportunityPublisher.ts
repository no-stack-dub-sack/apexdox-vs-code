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
                  <li id="item-IncludeTwo" class="navItem class public" onclick="goToLocation('IncludeTwo.html');">
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
              <h2 class="sectionTitle" id="TEST_SlackOpportunityPublisher">

                <a target="_blank" rel="noopener noreferrer" title="Go to source" class="hostedSourceLink" href="https://somefakeurl.com/TEST_SlackOpportunityPublisher.cls#L12">
                  TEST_SlackOpportunityPublisher
                </a><span><svg aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="externalLink"><path d="M576 24v127.984c0 21.461-25.96 31.98-40.971 16.971l-35.707-35.709-243.523 243.523c-9.373 9.373-24.568 9.373-33.941 0l-22.627-22.627c-9.373-9.373-9.373-24.569 0-33.941L442.756 76.676l-35.703-35.705C391.982 25.9 402.656 0 424.024 0H552c13.255 0 24 10.745 24 24zM407.029 270.794l-16 16A23.999 23.999 0 0 0 384 303.765V448H64V128h264a24.003 24.003 0 0 0 16.97-7.029l16-16C376.089 89.851 365.381 64 344 64H48C21.49 64 0 85.49 0 112v352c0 26.51 21.49 48 48 48h352c26.51 0 48-21.49 48-48V287.764c0-21.382-25.852-32.09-40.971-16.97z" class="externalLink"></path></svg></span>
              </h2>
            </summary>



            <div class="classSignature">

              <a target="_blank" rel="noopener noreferrer" title="Go to source" class="hostedSourceLink" href="https://somefakeurl.com/TEST_SlackOpportunityPublisher.cls#L12">
                public with sharing class TEST_SlackOpportunityPublisher
              </a>
            </div>
            <div class="classDetails">
              <div class="">The <code class="inlineCode">SlackOpportunityPublisher</code> class. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad veniam, quis nostrud exercitation ullamco laboris nis.</div>
              <div class="classSubtitle ">See</div>
              <div class="classSubDescription"><a target="_blank" rel="noopener noreferrer" href="https://github.com/dreamhouseapp/dreamhouse-sfdx/blob/master/LICENSE">License</a>, <a target="_blank" rel="noopener noreferrer" href="https://github.com/dreamhouseapp/dreamhouse-sfdx">Github</a></div><br />Salesforce.com<br />Jul 2017
            </div>
            <p />
            <details class="subSection properties TEST_SlackOpportunityPublisher" open>
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
                    <td class="attrName">slackURL</td>
                    <td class="attrSignature">
                      <a target="_blank" rel="noopener noreferrer" title="Go to source" class="hostedSourceLink" href="https://somefakeurl.com/TEST_SlackOpportunityPublisher.cls#L17">
                        private static final String <span class="hljs-title">slackURL<span>
                </a></td>
                
                <td class="attrDescription">The slack URL to use for publishing.</td>
            </tr>
                </table>
            </div>
            <p />
            </details>
            <details class="subSection enums" open>
                <summary><h2 class="subsectionTitle enums">Enums</h2></summary>
                
            <div class="subsectionContainer">
                <table class="attrTable properties">
                    
            <tr>
                <th>Name</th>
                <th>Signature</th>
                <th>Values</th>
                <th>Description</th>
            </tr>
            <tr class="enum public">
                <td class="attrName">Days</td>
                <td class="attrSignature">
                <a target="_blank" rel="noopener noreferrer" title="Go to source" class="hostedSourceLink" href="https://somefakeurl.com/TEST_SlackOpportunityPublisher.cls#L55">
                    public enum <span class="hljs-title">Days<span>
                </a></td>
                <td class="enumValues">MONDAY,&nbsp;TUESDAY,&nbsp;WEDNESDAY,&nbsp;THURSDAY,&nbsp;FRIDAY,&nbsp;SATURDAY,&nbsp;SUNDAY</td>
                <td class="attrDescription">An inner enum added to demonstrate how ApexDoc2-VSCode handles inner enums. They will be presented in a table and can only have description&#39;s, like properties.</td>
            </tr>
            <tr class="enum public">
                <td class="attrName">Months</td>
                <td class="attrSignature">
                <a target="_blank" rel="noopener noreferrer" title="Go to source" class="hostedSourceLink" href="https://somefakeurl.com/TEST_SlackOpportunityPublisher.cls#L40">
                    public enum <span class="hljs-title">Months<span>
                </a></td>
                <td class="enumValues">JANUARY,&nbsp;FEBRUARY,&nbsp;MARCH,&nbsp;APRIL,&nbsp;MAY,&nbsp;JUNE,&nbsp;JULY,&nbsp;AUGUST,&nbsp;SEPTEMBER,&nbsp;OCTOBER,&nbsp;NOVEMBER,&nbsp;DECEMBER</td>
                <td class="attrDescription">An inner enum added to demonstrate how ApexDoc2-VSCode handles inner enums. They can only have description&#39;s, like properties. ApexDoc2 Should be able to handle to wonky way this enum is written in code.</td>
            </tr>
            <tr class="enum public">
                <td class="attrName">Numbers</td>
                <td class="attrSignature">
                <a target="_blank" rel="noopener noreferrer" title="Go to source" class="hostedSourceLink" href="https://somefakeurl.com/TEST_SlackOpportunityPublisher.cls#L65">
                    public enum <span class="hljs-title">Numbers<span>
                </a></td>
                <td class="enumValues">ONE,&nbsp;TWO,&nbsp;THREE,&nbsp;FOUR,&nbsp;FIVE</td>
                <td class="attrDescription">An inner enum added to demonstrate how ApexDoc2-VSCode handles inner enums. They will be presented in a table and can only have description&#39;s, like properties.</td>
            </tr>
            <tr class="enum public">
                <td class="attrName">Rgb</td>
                <td class="attrSignature">
                <a target="_blank" rel="noopener noreferrer" title="Go to source" class="hostedSourceLink" href="https://somefakeurl.com/TEST_SlackOpportunityPublisher.cls#L78">
                    public enum <span class="hljs-title">Rgb<span>
                </a></td>
                <td class="enumValues">RED,&nbsp;GREEN,&nbsp;BLUE</td>
                <td class="attrDescription">An inner enum added to demonstrate how ApexDoc2-VSCode handles inner enums. They will be presented in a table and can only have description&#39;s, like properties.</td>
            </tr>
                </table>
            </div>
            <p/>
            </details>
            <details class="subSection methods" open>
                <summary><h2 class="subsectionTitle methods">Methods</h2></summary>
                <div class="methodsContainer">
                <ul class="methodTOC"><li class="method public">
                <a class="methodTOCEntry " href="#TEST_SlackOpportunityPublisher.postToSlack">
                    postToSlack
                </a><div class="methodTOCDescription">Incididunt ut labore et dolore magna aliqua, quis autem vel eum iure reprehenderit qui incididunt.</div></li></ul>
                <div class="method public"><h2 class="methodHeader " id="TEST_SlackOpportunityPublisher.postToSlack">postToSlack</h2><div class="methodAnnotations">@InvocableMethod(label='Post to Slack')</div>
            <div class="methodSignature">
                
                <a target="_blank" rel="noopener noreferrer" title="Go to source" class="hostedSourceLink" href="https://somefakeurl.com/TEST_SlackOpportunityPublisher.cls#L24">
                    public static void <span class="hljs-title">postToSlack</span>(List&lt;Id&gt; opportunityId)
                      </a>
              </div>
              <div class="methodDescription">Incididunt ut labore et dolore magna aliqua, quis autem vel eum iure reprehenderit qui incididunt.</div>
              <div class="methodSubTitle">Parameters</div>
              <div class="paramName">opportunityId</div>
              <div class="paramDescription">The Id of the opportunity to post.</div>
              </div>
              </div>
            </details>
          </details>
          <details class="section" open>
            <summary>
              <h2 class="sectionTitle" id="TEST_SlackOpportunityPublisher.QueueableSlackCall">

                <a target="_blank" rel="noopener noreferrer" title="Go to source" class="hostedSourceLink" href="https://somefakeurl.com/TEST_SlackOpportunityPublisher.cls#L92">
                  TEST_SlackOpportunityPublisher.QueueableSlackCall
                </a><span><svg aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="externalLink"><path d="M576 24v127.984c0 21.461-25.96 31.98-40.971 16.971l-35.707-35.709-243.523 243.523c-9.373 9.373-24.568 9.373-33.941 0l-22.627-22.627c-9.373-9.373-9.373-24.569 0-33.941L442.756 76.676l-35.703-35.705C391.982 25.9 402.656 0 424.024 0H552c13.255 0 24 10.745 24 24zM407.029 270.794l-16 16A23.999 23.999 0 0 0 384 303.765V448H64V128h264a24.003 24.003 0 0 0 16.97-7.029l16-16C376.089 89.851 365.381 64 344 64H48C21.49 64 0 85.49 0 112v352c0 26.51 21.49 48 48 48h352c26.51 0 48-21.49 48-48V287.764c0-21.382-25.852-32.09-40.971-16.97z" class="externalLink"></path></svg></span>
              </h2>
            </summary>



            <div class="classSignature">

              <a target="_blank" rel="noopener noreferrer" title="Go to source" class="hostedSourceLink" href="https://somefakeurl.com/TEST_SlackOpportunityPublisher.cls#L92">
                public class QueueableSlackCall implements System.Queueable, Database.AllowsCallouts
              </a>
            </div>
            <div class="classDetails">
              <div class="">A good example of how ApexDoc2-VSCode handles inner classes. Inner classes / interfaces support the same tags as their top-level counterparts (i.e. top level type in a .cls file), but tags like &#39;author&#39; and &#39;since&#39; are better left to the top-level class. Just for example&#39;s sake, including an example tag here as well.</div>
              <div class="classSubtitle ">Example</div>
              <pre class="codeExample"><code>String body = &#39;This is a message, equeued up to be posted on Slack!&#39;; 
System.enqueueJob(new QueueablePushCall(&#39;https://someurl.com&#39;, &#39;POST&#39;, body));</code></pre>
            </div>
            <p />
            <details class="subSection properties TEST_SlackOpportunityPublisher_QueueableSlackCall" open>
              <summary>
                <h2 class="subsectionTitle properties">Properties</h2>
              </summary>

              <div class="subsectionContainer">
                <table class="attrTable properties">

                  <tr>
                    <th>Name</th>
                    <th>Signature</th>


                  </tr>
                  <tr class="property private">
                    <td class="attrName">body</td>
                    <td class="attrSignature">
                      <a target="_blank" rel="noopener noreferrer" title="Go to source" class="hostedSourceLink" href="https://somefakeurl.com/TEST_SlackOpportunityPublisher.cls#L96">
                        private final String <span class="hljs-title">body<span>
                </a></td>
                
                
            </tr>
            <tr class="property private">
                <td class="attrName">method</td>
                <td class="attrSignature">
                <a target="_blank" rel="noopener noreferrer" title="Go to source" class="hostedSourceLink" href="https://somefakeurl.com/TEST_SlackOpportunityPublisher.cls#L95">
                    private final String <span class="hljs-title">method<span>
                </a></td>
                
                
            </tr>
            <tr class="property private">
                <td class="attrName">url</td>
                <td class="attrSignature">
                <a target="_blank" rel="noopener noreferrer" title="Go to source" class="hostedSourceLink" href="https://somefakeurl.com/TEST_SlackOpportunityPublisher.cls#L94">
                    private final String <span class="hljs-title">url<span>
                </a></td>
                
                
            </tr>
                </table>
            </div>
            <p />
            </details>
            <details class="subSection methods" open>
                <summary><h2 class="subsectionTitle methods">Methods</h2></summary>
                <div class="methodsContainer">
                <ul class="methodTOC"><li class="method public">
                <a class="methodTOCEntry " href="#TEST_SlackOpportunityPublisher.QueueableSlackCall.execute">
                    execute
                </a><div class="methodTOCDescription">The execute method implements the <code class="inlineCode">System.Queueable</code> interface. And handle&#39;s the queueable&#39;s execution.</div></li><li class="method public">
                <a class="methodTOCEntry " href="#TEST_SlackOpportunityPublisher.QueueableSlackCall.QueueableSlackCall">
                    QueueableSlackCall.&lt;init&gt;
                </a></li></ul>
                <div class="method public"><h2 class="methodHeader " id="TEST_SlackOpportunityPublisher.QueueableSlackCall.execute">execute</h2>
            <div class="methodSignature">
                
                <a target="_blank" rel="noopener noreferrer" title="Go to source" class="hostedSourceLink" href="https://somefakeurl.com/TEST_SlackOpportunityPublisher.cls#L114">
                    public void <span class="hljs-title">execute</span>(System.QueueableContext ctx)
                      </a>
              </div>
              <div class="methodDescription">The execute method implements the <code class="inlineCode">System.Queueable</code> interface. And handle&#39;s the queueable&#39;s execution.</div>
              <div class="methodSubTitle">Parameters</div>
              <div class="paramName">ctx</div>
              <div class="paramDescription">The <code class="inlineCode">System.QueueableContext</code> for the execute method.</div>
              </div>
              <div class="method public">
                <h2 class="methodHeader " id="TEST_SlackOpportunityPublisher.QueueableSlackCall.QueueableSlackCall">QueueableSlackCall.&lt;init&gt;</h2>
                <div class="methodSignature">

                  <a target="_blank" rel="noopener noreferrer" title="Go to source" class="hostedSourceLink" href="https://somefakeurl.com/TEST_SlackOpportunityPublisher.cls#L103">
                    public <span class="hljs-title">QueueableSlackCall</span>(String url, String method, String body)
                  </a>
                </div>
                <div class="methodSubTitle">Parameters</div>
                <div class="paramName">url</div>
                <div class="paramDescription">The Server Url to post the message to.</div>
                <div class="paramName">method</div>
                <div class="paramDescription">The HTTP method to use</div>
                <div class="paramName">body</div>
                <div class="paramDescription">The body of the message.</div>
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