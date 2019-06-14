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
              <a class="nav-header" id="home" href="javascript:void(0)" onclick="goToLocation('index.html');">
                Home
              </a>
              <details id="Assertions" class="groupName">
                <summary onclick="toggleActiveClass(this);" id="header-Assertions" class="nav-header">
                  <span>Assertions</span>
                </summary>
                <ul>
                  <!-- menu items will be appended here -->
                  <li id="item-TEST_Annotations" class="nav-item class public" onclick="goToLocation('TEST_Annotations.html');">
                    <a tabindex="1" href="javascript:void(0)">TEST_Annotations</a>
                  </li>
                  <li id="item-TEST_EnumClass" class="nav-item class public" onclick="goToLocation('TEST_EnumClass.html');">
                    <a tabindex="1" href="javascript:void(0)">TEST_EnumClass</a>
                  </li>
                  <li id="item-TEST_EnumInner" class="nav-item class public" onclick="goToLocation('TEST_EnumInner.html');">
                    <a tabindex="1" href="javascript:void(0)">TEST_EnumInner</a>
                  </li>
                  <li id="item-TEST_InterfaceClass" class="nav-item class global" onclick="goToLocation('TEST_InterfaceClass.html');">
                    <a tabindex="1" href="javascript:void(0)">TEST_InterfaceClass</a>
                  </li>
                  <li id="item-TEST_Links" class="nav-item class public" onclick="goToLocation('TEST_Links.html');">
                    <a tabindex="1" href="javascript:void(0)">TEST_Links</a>
                  </li>
                  <li id="item-TEST_Methods" class="nav-item class public" onclick="goToLocation('TEST_Methods.html');">
                    <a tabindex="1" href="javascript:void(0)">TEST_Methods</a>
                  </li>
                  <li id="item-TEST_MultiLineTagValues" class="nav-item class public" onclick="goToLocation('TEST_MultiLineTagValues.html');">
                    <a tabindex="1" href="javascript:void(0)">TEST_MultiLineTagValues</a>
                  </li>
                  <li id="item-TEST_NestedClasses" class="nav-item class public" onclick="goToLocation('TEST_NestedClasses.html');">
                    <a tabindex="1" href="javascript:void(0)">TEST_NestedClasses</a>
                  </li>
                  <li id="item-TEST_Properties" class="nav-item class public" onclick="goToLocation('TEST_Properties.html');">
                    <a tabindex="1" href="javascript:void(0)">TEST_Properties</a>
                  </li>
                </ul>
              </details>
              <details id="Feature1" class="groupName">
                <summary onclick="toggleActiveClass(this);" id="header-Feature1" class="nav-header">
                  <span>Feature1</span>
                </summary>
                <ul>
                  <!-- menu items will be appended here -->
                  <li id="item-TEST_ArrayUtils" class="nav-item class global" onclick="goToLocation('TEST_ArrayUtils.html');">
                    <a tabindex="1" href="javascript:void(0)">TEST_ArrayUtils</a>
                  </li>
                  <li id="item-TEST_BotField" class="nav-item class public" onclick="goToLocation('TEST_BotField.html');">
                    <a tabindex="1" href="javascript:void(0)">TEST_BotField</a>
                  </li>
                  <li id="item-TEST_BotHandler" class="nav-item class public" onclick="goToLocation('TEST_BotHandler.html');">
                    <a tabindex="1" href="javascript:void(0)">TEST_BotHandler</a>
                  </li>
                  <li id="item-TEST_BotItem" class="nav-item class public" onclick="goToLocation('TEST_BotItem.html');">
                    <a tabindex="1" href="javascript:void(0)">TEST_BotItem</a>
                  </li>
                  <li id="item-TEST_BotMessage" class="nav-item class public" onclick="goToLocation('TEST_BotMessage.html');">
                    <a tabindex="1" href="javascript:void(0)">TEST_BotMessage</a>
                  </li>
                  <li id="item-TEST_HandlerSOQL" class="nav-item class public" onclick="goToLocation('TEST_HandlerSOQL.html');">
                    <a tabindex="1" href="javascript:void(0)">TEST_HandlerSOQL</a>
                  </li>
                  <li id="item-TEST_IllegalStateException" class="nav-item class global" onclick="goToLocation('TEST_IllegalStateException.html');">
                    <a tabindex="1" href="javascript:void(0)">TEST_IllegalStateException</a>
                  </li>
                  <li id="item-TEST_ISObjectComparator" class="nav-item class global" onclick="goToLocation('TEST_ISObjectComparator.html');">
                    <a tabindex="1" href="javascript:void(0)">TEST_ISObjectComparator</a>
                  </li>
                  <li id="item-TEST_JWT" class="nav-item class public" onclick="goToLocation('TEST_JWT.html');">
                    <a tabindex="1" href="javascript:void(0)">TEST_JWT</a>
                  </li>
                  <li id="item-TEST_LIFXController" class="nav-item class public" onclick="goToLocation('TEST_LIFXController.html');">
                    <a tabindex="1" href="javascript:void(0)">TEST_LIFXController</a>
                  </li>
                  <li id="item-TEST_MyRestResource" class="nav-item class global" onclick="goToLocation('TEST_MyRestResource.html');">
                    <a tabindex="1" href="javascript:void(0)">TEST_MyRestResource</a>
                  </li>
                  <li id="item-TEST_PrimitiveComparator" class="nav-item class global" onclick="goToLocation('TEST_PrimitiveComparator.html');">
                    <a tabindex="1" href="javascript:void(0)">TEST_PrimitiveComparator</a>
                  </li>
                  <li id="item-TEST_SampleDataController" class="nav-item class public" onclick="goToLocation('TEST_SampleDataController.html');">
                    <a tabindex="1" href="javascript:void(0)">TEST_SampleDataController</a>
                  </li>
                  <li id="item-TEST_SlackOpportunityPublisher" class="nav-item class public" onclick="goToLocation('TEST_SlackOpportunityPublisher.html');">
                    <a tabindex="1" href="javascript:void(0)">TEST_SlackOpportunityPublisher</a>
                  </li>
                  <li id="item-TEST_StopWatch" class="nav-item class global" onclick="goToLocation('TEST_StopWatch.html');">
                    <a tabindex="1" href="javascript:void(0)">TEST_StopWatch</a>
                  </li>
                </ul>
              </details>
              <details id="Miscellaneous" class="groupName">
                <summary onclick="toggleActiveClass(this);" id="header-Miscellaneous" class="nav-header">
                  <span>Miscellaneous</span>
                </summary>
                <ul>
                  <!-- menu items will be appended here -->
                  <li id="item-IncludeOne" class="nav-item class public" onclick="goToLocation('IncludeOne.html');">
                    <a tabindex="1" href="javascript:void(0)">IncludeOne</a>
                  </li>
                  <li id="item-IncludeTwo" class="nav-item class private" onclick="goToLocation('IncludeTwo.html');">
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
              <h2 class="sectionTitle" id="TEST_NestedClasses">

                <a target="_blank" rel="noopener noreferrer" title="Go to source" class="source-link" href="https://somefakeurl.com/TEST_NestedClasses.cls#L5">
                  TEST_NestedClasses
                </a><span><svg aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="externalLink"><path d="M576 24v127.984c0 21.461-25.96 31.98-40.971 16.971l-35.707-35.709-243.523 243.523c-9.373 9.373-24.568 9.373-33.941 0l-22.627-22.627c-9.373-9.373-9.373-24.569 0-33.941L442.756 76.676l-35.703-35.705C391.982 25.9 402.656 0 424.024 0H552c13.255 0 24 10.745 24 24zM407.029 270.794l-16 16A23.999 23.999 0 0 0 384 303.765V448H64V128h264a24.003 24.003 0 0 0 16.97-7.029l16-16C376.089 89.851 365.381 64 344 64H48C21.49 64 0 85.49 0 112v352c0 26.51 21.49 48 48 48h352c26.51 0 48-21.49 48-48V287.764c0-21.382-25.852-32.09-40.971-16.97z" class="externalLink"></path></svg></span>
              </h2>
            </summary>



            <div class="class-signature">

              <a target="_blank" rel="noopener noreferrer" title="Go to source" class="source-link" href="https://somefakeurl.com/TEST_NestedClasses.cls#L5">
                public class TEST_NestedClasses
              </a>
            </div>
            <div class="class-details">
              <div class="">Testing that nested classes are properly documented.</div>
            </div>
            <p />
            <details class="subsection properties TEST_NestedClasses" open>
              <summary>
                <h2 class="subsectionTitle properties">Properties</h2>
              </summary>

              <div class="subsection-container">
                <table class="attributes-table properties">

                  <tr>
                    <th>Name</th>
                    <th>Signature</th>

                    <th>Description</th>
                  </tr>
                  <tr class="property private">
                    <td class="attribute-name">m</td>
                    <td class="attribute-signature">
                      <a target="_blank" rel="noopener noreferrer" title="Go to source" class="source-link" href="https://somefakeurl.com/TEST_NestedClasses.cls#L25">
                        private final String <span class="hljs-title">m<span>
                </a></td>
                
                <td class="attribute-description">Member variable for outer class</td>
            </tr>
            <tr class="property private">
                <td class="attribute-name">MY_INT</td>
                <td class="attribute-signature">
                <a target="_blank" rel="noopener noreferrer" title="Go to source" class="source-link" href="https://somefakeurl.com/TEST_NestedClasses.cls#L8">
                    private static final Integer <span class="hljs-title">MY_INT<span>
                </a></td>
                
                <td class="attribute-description">Static final variable (constant) – outer class level only</td>
            </tr>
            <tr class="property public">
                <td class="attribute-name">sharedState</td>
                <td class="attribute-signature">
                <a target="_blank" rel="noopener noreferrer" title="Go to source" class="source-link" href="https://somefakeurl.com/TEST_NestedClasses.cls#L14">
                    public static String <span class="hljs-title">sharedState<span>
                </a></td>
                
                <td class="attribute-description">Non-final static variable - use this to communicate state across triggers within a single request)</td>
            </tr>
                </table>
            </div>
            <p />
            </details>
            <details class="subsection methods" open>
                <summary><h2 class="subsectionTitle methods">Methods</h2></summary>
                <div class="methods-container">
                <ul class="methods-toc"><li class="method public">
                <a class="methods-toc__entry " href="#TEST_NestedClasses.getInt">
                    getInt
                </a><div class="methods-toc__description">Static method - outer class level only</div></li></ul>
                <div class="method public"><h2 class="method-title " id="TEST_NestedClasses.getInt">getInt</h2>
            <div class="method-signature">
                
                <a target="_blank" rel="noopener noreferrer" title="Go to source" class="source-link" href="https://somefakeurl.com/TEST_NestedClasses.cls#L17">
                    public static Integer <span class="hljs-title">getInt</span>()
                      </a>
              </div>
              <div class="method-description">Static method - outer class level only</div>
              </div>
              </div>
            </details>
          </details>
          <details class="section" open>
            <summary>
              <h2 class="sectionTitle" id="TEST_NestedClasses.AbstractChildClass">

                <a target="_blank" rel="noopener noreferrer" title="Go to source" class="source-link" href="https://somefakeurl.com/TEST_NestedClasses.cls#L97">
                  TEST_NestedClasses.AbstractChildClass
                </a><span><svg aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="externalLink"><path d="M576 24v127.984c0 21.461-25.96 31.98-40.971 16.971l-35.707-35.709-243.523 243.523c-9.373 9.373-24.568 9.373-33.941 0l-22.627-22.627c-9.373-9.373-9.373-24.569 0-33.941L442.756 76.676l-35.703-35.705C391.982 25.9 402.656 0 424.024 0H552c13.255 0 24 10.745 24 24zM407.029 270.794l-16 16A23.999 23.999 0 0 0 384 303.765V448H64V128h264a24.003 24.003 0 0 0 16.97-7.029l16-16C376.089 89.851 365.381 64 344 64H48C21.49 64 0 85.49 0 112v352c0 26.51 21.49 48 48 48h352c26.51 0 48-21.49 48-48V287.764c0-21.382-25.852-32.09-40.971-16.97z" class="externalLink"></path></svg></span>
              </h2>
            </summary>



            <div class="class-signature">

              <a target="_blank" rel="noopener noreferrer" title="Go to source" class="source-link" href="https://somefakeurl.com/TEST_NestedClasses.cls#L97">
                public abstract class AbstractChildClass extends InnerClass
              </a>
            </div>
            <div class="class-details">
              <div class="">Abstract class (that subclasses the class above). No constructor is needed since parent class has a no-argument constructor</div>
            </div>
            <p />
            <details class="subsection methods" open>
              <summary>
                <h2 class="subsectionTitle methods">Methods</h2>
              </summary>
              <div class="methods-container">
                <ul class="methods-toc">
                  <li class="method private">
                    <a class="methods-toc__entry " href="#TEST_NestedClasses.AbstractChildClass.abstractMethod">
                      abstractMethod
                    </a>
                    <div class="methods-toc__description">Lorem ipsum and stuff</div>
                  </li>
                  <li class="method protected">
                    <a class="methods-toc__entry " href="#TEST_NestedClasses.AbstractChildClass.method2">
                      method2
                    </a>
                    <div class="methods-toc__description">Lorem ipsum and stuff</div>
                  </li>
                  <li class="method public">
                    <a class="methods-toc__entry " href="#TEST_NestedClasses.AbstractChildClass.myMethod">
                      myMethod
                    </a>
                    <div class="methods-toc__description">Lorem ipsum and stuff</div>
                  </li>
                </ul>
                <div class="method private">
                  <h2 class="method-title " id="TEST_NestedClasses.AbstractChildClass.abstractMethod">abstractMethod</h2>
                  <div class="method-signature">

                    <a target="_blank" rel="noopener noreferrer" title="Go to source" class="source-link" href="https://somefakeurl.com/TEST_NestedClasses.cls#L112">
                      abstract Integer <span class="hljs-title">abstractMethod</span>()
                    </a>
                  </div>
                  <div class="method-description">Lorem ipsum and stuff</div>
                </div>
                <div class="method protected">
                  <h2 class="method-title " id="TEST_NestedClasses.AbstractChildClass.method2">method2</h2>
                  <div class="method-signature">

                    <a target="_blank" rel="noopener noreferrer" title="Go to source" class="source-link" href="https://somefakeurl.com/TEST_NestedClasses.cls#L107">
                      protected void <span class="hljs-title">method2</span>()
                    </a>
                  </div>
                  <div class="method-description">Lorem ipsum and stuff</div>
                </div>
                <div class="method public">
                  <h2 class="method-title " id="TEST_NestedClasses.AbstractChildClass.myMethod">myMethod</h2>
                  <div class="method-signature">

                    <a target="_blank" rel="noopener noreferrer" title="Go to source" class="source-link" href="https://somefakeurl.com/TEST_NestedClasses.cls#L102">
                      public override void <span class="hljs-title">myMethod</span>()
                    </a>
                  </div>
                  <div class="method-description">Lorem ipsum and stuff</div>
                </div>
              </div>
            </details>
          </details>
          <details class="section" open>
            <summary>
              <h2 class="sectionTitle" id="TEST_NestedClasses.AnotherChildClass">

                <a target="_blank" rel="noopener noreferrer" title="Go to source" class="source-link" href="https://somefakeurl.com/TEST_NestedClasses.cls#L128">
                  TEST_NestedClasses.AnotherChildClass
                </a><span><svg aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="externalLink"><path d="M576 24v127.984c0 21.461-25.96 31.98-40.971 16.971l-35.707-35.709-243.523 243.523c-9.373 9.373-24.568 9.373-33.941 0l-22.627-22.627c-9.373-9.373-9.373-24.569 0-33.941L442.756 76.676l-35.703-35.705C391.982 25.9 402.656 0 424.024 0H552c13.255 0 24 10.745 24 24zM407.029 270.794l-16 16A23.999 23.999 0 0 0 384 303.765V448H64V128h264a24.003 24.003 0 0 0 16.97-7.029l16-16C376.089 89.851 365.381 64 344 64H48C21.49 64 0 85.49 0 112v352c0 26.51 21.49 48 48 48h352c26.51 0 48-21.49 48-48V287.764c0-21.382-25.852-32.09-40.971-16.97z" class="externalLink"></path></svg></span>
              </h2>
            </summary>



            <div class="class-signature">

              <a target="_blank" rel="noopener noreferrer" title="Go to source" class="source-link" href="https://somefakeurl.com/TEST_NestedClasses.cls#L128">
                public class AnotherChildClass extends InnerClass
              </a>
            </div>
            <div class="class-details">
              <div class="">A second sub-class of the original InnerClass</div>
            </div>
            <p />
            <details class="subsection methods" open>
              <summary>
                <h2 class="subsectionTitle methods">Methods</h2>
              </summary>
              <div class="methods-container">
                <ul class="methods-toc">
                  <li class="method private">
                    <a class="methods-toc__entry " href="#TEST_NestedClasses.AnotherChildClass.AnotherChildClass">
                      AnotherChildClass.&lt;init&gt;
                    </a></li>
                </ul>
                <div class="method private">
                  <h2 class="method-title " id="TEST_NestedClasses.AnotherChildClass.AnotherChildClass">AnotherChildClass.&lt;init&gt;</h2>
                  <div class="method-signature">

                    <a target="_blank" rel="noopener noreferrer" title="Go to source" class="source-link" href="https://somefakeurl.com/TEST_NestedClasses.cls#L129">
                      <span class="hljs-title">AnotherChildClass</span>(String s)
                    </a>
                  </div>
                </div>
              </div>
            </details>
          </details>
          <details class="section" open>
            <summary>
              <h2 class="sectionTitle" id="TEST_NestedClasses.ConcreteChildClass">

                <a target="_blank" rel="noopener noreferrer" title="Go to source" class="source-link" href="https://somefakeurl.com/TEST_NestedClasses.cls#L116">
                  TEST_NestedClasses.ConcreteChildClass
                </a><span><svg aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="externalLink"><path d="M576 24v127.984c0 21.461-25.96 31.98-40.971 16.971l-35.707-35.709-243.523 243.523c-9.373 9.373-24.568 9.373-33.941 0l-22.627-22.627c-9.373-9.373-9.373-24.569 0-33.941L442.756 76.676l-35.703-35.705C391.982 25.9 402.656 0 424.024 0H552c13.255 0 24 10.745 24 24zM407.029 270.794l-16 16A23.999 23.999 0 0 0 384 303.765V448H64V128h264a24.003 24.003 0 0 0 16.97-7.029l16-16C376.089 89.851 365.381 64 344 64H48C21.49 64 0 85.49 0 112v352c0 26.51 21.49 48 48 48h352c26.51 0 48-21.49 48-48V287.764c0-21.382-25.852-32.09-40.971-16.97z" class="externalLink"></path></svg></span>
              </h2>
            </summary>



            <div class="class-signature">

              <a target="_blank" rel="noopener noreferrer" title="Go to source" class="source-link" href="https://somefakeurl.com/TEST_NestedClasses.cls#L116">
                public class ConcreteChildClass extends AbstractChildClass
              </a>
            </div>
            <div class="class-details">
              <div class="">Complete the abstract class by implementing its abstract method</div>
            </div>
            <p />
            <details class="subsection methods" open>
              <summary>
                <h2 class="subsectionTitle methods">Methods</h2>
              </summary>
              <div class="methods-container">
                <ul class="methods-toc">
                  <li class="method public">
                    <a class="methods-toc__entry " href="#TEST_NestedClasses.ConcreteChildClass.abstractMethod">
                      abstractMethod
                    </a>
                    <div class="methods-toc__description">Here we expand the visibility of the parent method - note that visibility cannot be restricted by a sub-class</div>
                  </li>
                  <li class="method public">
                    <a class="methods-toc__entry " href="#TEST_NestedClasses.ConcreteChildClass.overloadedMethod">
                      overloadedMethod
                    </a></li>
                  <li class="method public">
                    <a class="methods-toc__entry " href="#TEST_NestedClasses.ConcreteChildClass.overloadedMethod_1">
                      overloadedMethod
                    </a></li>
                </ul>
                <div class="method public">
                  <h2 class="method-title " id="TEST_NestedClasses.ConcreteChildClass.abstractMethod">abstractMethod</h2>
                  <div class="method-signature">

                    <a target="_blank" rel="noopener noreferrer" title="Go to source" class="source-link" href="https://somefakeurl.com/TEST_NestedClasses.cls#L121">
                      public override Integer <span class="hljs-title">abstractMethod</span>()
                    </a>
                  </div>
                  <div class="method-description">Here we expand the visibility of the parent method - note that visibility cannot be restricted by a sub-class</div>
                </div>
                <div class="method public">
                  <h2 class="method-title " id="TEST_NestedClasses.ConcreteChildClass.overloadedMethod">overloadedMethod</h2>
                  <div class="method-signature">

                    <a target="_blank" rel="noopener noreferrer" title="Go to source" class="source-link" href="https://somefakeurl.com/TEST_NestedClasses.cls#L123">
                      public Integer <span class="hljs-title">overloadedMethod</span>()
                    </a>
                  </div>
                </div>
                <div class="method public">
                  <h2 class="method-title " id="TEST_NestedClasses.ConcreteChildClass.overloadedMethod_1">overloadedMethod</h2>
                  <div class="method-signature">

                    <a target="_blank" rel="noopener noreferrer" title="Go to source" class="source-link" href="https://somefakeurl.com/TEST_NestedClasses.cls#L124">
                      public Integer <span class="hljs-title">overloadedMethod</span>(Integer someInt)
                    </a>
                  </div>
                </div>
              </div>
            </details>
          </details>
          <details class="section" open>
            <summary>
              <h2 class="sectionTitle" id="TEST_NestedClasses.InnerClass">

                <a target="_blank" rel="noopener noreferrer" title="Go to source" class="source-link" href="https://somefakeurl.com/TEST_NestedClasses.cls#L55">
                  TEST_NestedClasses.InnerClass
                </a><span><svg aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="externalLink"><path d="M576 24v127.984c0 21.461-25.96 31.98-40.971 16.971l-35.707-35.709-243.523 243.523c-9.373 9.373-24.568 9.373-33.941 0l-22.627-22.627c-9.373-9.373-9.373-24.569 0-33.941L442.756 76.676l-35.703-35.705C391.982 25.9 402.656 0 424.024 0H552c13.255 0 24 10.745 24 24zM407.029 270.794l-16 16A23.999 23.999 0 0 0 384 303.765V448H64V128h264a24.003 24.003 0 0 0 16.97-7.029l16-16C376.089 89.851 365.381 64 344 64H48C21.49 64 0 85.49 0 112v352c0 26.51 21.49 48 48 48h352c26.51 0 48-21.49 48-48V287.764c0-21.382-25.852-32.09-40.971-16.97z" class="externalLink"></path></svg></span>
              </h2>
            </summary>



            <div class="class-signature">

              <a target="_blank" rel="noopener noreferrer" title="Go to source" class="source-link" href="https://somefakeurl.com/TEST_NestedClasses.cls#L55">
                public virtual class InnerClass implements MySecondInterface
              </a>
            </div>
            <div class="class-details">
              <div class="">Inner class - because it is virtual it can be extended. This class implements an interface that, in turn, extends another interface. Consequently the class must implement all methods.</div>
            </div>
            <p />
            <details class="subsection properties TEST_NestedClasses_InnerClass" open>
              <summary>
                <h2 class="subsectionTitle properties">Properties</h2>
              </summary>

              <div class="subsection-container">
                <table class="attributes-table properties">

                  <tr>
                    <th>Name</th>
                    <th>Signature</th>

                    <th>Description</th>
                  </tr>
                  <tr class="property private">
                    <td class="attribute-name">i</td>
                    <td class="attribute-signature">
                      <a target="_blank" rel="noopener noreferrer" title="Go to source" class="source-link" href="https://somefakeurl.com/TEST_NestedClasses.cls#L67">
                        private final Integer <span class="hljs-title">i<span>
                </a></td>
                
                <td class="attribute-description">Inline initialization (happens after the block above executes)</td>
            </tr>
            <tr class="property private">
                <td class="attribute-name">s</td>
                <td class="attribute-signature">
                <a target="_blank" rel="noopener noreferrer" title="Go to source" class="source-link" href="https://somefakeurl.com/TEST_NestedClasses.cls#L58">
                    private final String <span class="hljs-title">s<span>
                </a></td>
                
                <td class="attribute-description"></td>
            </tr>
            <tr class="property private">
                <td class="attribute-name">s2</td>
                <td class="attribute-signature">
                <a target="_blank" rel="noopener noreferrer" title="Go to source" class="source-link" href="https://somefakeurl.com/TEST_NestedClasses.cls#L59">
                    private final String <span class="hljs-title">s2<span>
                </a></td>
                
                <td class="attribute-description"></td>
            </tr>
                </table>
            </div>
            <p />
            </details>
            <details class="subsection methods" open>
                <summary><h2 class="subsectionTitle methods">Methods</h2></summary>
                <div class="methods-container">
                <ul class="methods-toc"><li class="method private">
                <a class="methods-toc__entry " href="#TEST_NestedClasses.InnerClass.InnerClass">
                    InnerClass.&lt;init&gt;
                </a><div class="methods-toc__description">Explicit no argument constructor</div></li><li class="method public">
                <a class="methods-toc__entry " href="#TEST_NestedClasses.InnerClass.InnerClass_1">
                    InnerClass.&lt;init&gt;
                </a><div class="methods-toc__description">Constructor that assigns a final variable value</div></li><li class="method public">
                <a class="methods-toc__entry " href="#TEST_NestedClasses.InnerClass.method2">
                    method2
                </a></li><li class="method public">
                <a class="methods-toc__entry " href="#TEST_NestedClasses.InnerClass.myMethod">
                    myMethod
                </a><div class="methods-toc__description">Instance method that implements a method from MyInterface. Because it is declared virtual it can be overridden by a subclass.</div></li></ul>
                <div class="method private"><h2 class="method-title " id="TEST_NestedClasses.InnerClass.InnerClass">InnerClass.&lt;init&gt;</h2>
            <div class="method-signature">
                
                <a target="_blank" rel="noopener noreferrer" title="Go to source" class="source-link" href="https://somefakeurl.com/TEST_NestedClasses.cls#L70">
                    <span class="hljs-title">InnerClass</span>()
                      </a>
              </div>
              <div class="method-description">Explicit no argument constructor</div>
              </div>
              <div class="method public">
                <h2 class="method-title " id="TEST_NestedClasses.InnerClass.InnerClass_1">InnerClass.&lt;init&gt;</h2>
                <div class="method-signature">

                  <a target="_blank" rel="noopener noreferrer" title="Go to source" class="source-link" href="https://somefakeurl.com/TEST_NestedClasses.cls#L76">
                    public <span class="hljs-title">InnerClass</span>(String s2)
                  </a>
                </div>
                <div class="method-description">Constructor that assigns a final variable value</div>
              </div>
              <div class="method public">
                <h2 class="method-title " id="TEST_NestedClasses.InnerClass.method2">method2</h2>
                <div class="method-signature">

                  <a target="_blank" rel="noopener noreferrer" title="Go to source" class="source-link" href="https://somefakeurl.com/TEST_NestedClasses.cls#L90">
                    public Integer <span class="hljs-title">method2</span>(Integer i)
                  </a>
                </div>
                <div class="method-subtitle">Parameters</div>
                <div class="paramName">i</div>
                <div class="paramDescription">Some Param description Implementation of the second interface method above. This method references member variables (with and without the &quot;this&quot; prefix)</div>
              </div>
              <div class="method public">
                <h2 class="method-title " id="TEST_NestedClasses.InnerClass.myMethod">myMethod</h2>
                <div class="method-signature">

                  <a target="_blank" rel="noopener noreferrer" title="Go to source" class="source-link" href="https://somefakeurl.com/TEST_NestedClasses.cls#L83">
                    public virtual void <span class="hljs-title">myMethod</span>()
                  </a>
                </div>
                <div class="method-description">Instance method that implements a method from MyInterface. Because it is declared virtual it can be overridden by a subclass.</div>
              </div>
              </div>
            </details>
          </details>
          <details class="section" open>
            <summary>
              <h2 class="sectionTitle" id="TEST_NestedClasses.MyException">

                <a target="_blank" rel="noopener noreferrer" title="Go to source" class="source-link" href="https://somefakeurl.com/TEST_NestedClasses.cls#L136">
                  TEST_NestedClasses.MyException
                </a><span><svg aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="externalLink"><path d="M576 24v127.984c0 21.461-25.96 31.98-40.971 16.971l-35.707-35.709-243.523 243.523c-9.373 9.373-24.568 9.373-33.941 0l-22.627-22.627c-9.373-9.373-9.373-24.569 0-33.941L442.756 76.676l-35.703-35.705C391.982 25.9 402.656 0 424.024 0H552c13.255 0 24 10.745 24 24zM407.029 270.794l-16 16A23.999 23.999 0 0 0 384 303.765V448H64V128h264a24.003 24.003 0 0 0 16.97-7.029l16-16C376.089 89.851 365.381 64 344 64H48C21.49 64 0 85.49 0 112v352c0 26.51 21.49 48 48 48h352c26.51 0 48-21.49 48-48V287.764c0-21.382-25.852-32.09-40.971-16.97z" class="externalLink"></path></svg></span>
              </h2>
            </summary>



            <div class="class-signature">

              <a target="_blank" rel="noopener noreferrer" title="Go to source" class="source-link" href="https://somefakeurl.com/TEST_NestedClasses.cls#L136">
                public virtual class MyException extends Exception
              </a>
            </div>
            <div class="class-details">
              <div class="">Exception inner class</div>
            </div>
            <p />
            <details class="subsection properties TEST_NestedClasses_MyException" open>
              <summary>
                <h2 class="subsectionTitle properties">Properties</h2>
              </summary>

              <div class="subsection-container">
                <table class="attributes-table properties">

                  <tr>
                    <th>Name</th>
                    <th>Signature</th>

                    <th>Description</th>
                  </tr>
                  <tr class="property public">
                    <td class="attribute-name">d</td>
                    <td class="attribute-signature">
                      <a target="_blank" rel="noopener noreferrer" title="Go to source" class="source-link" href="https://somefakeurl.com/TEST_NestedClasses.cls#L138">
                        public Double <span class="hljs-title">d<span>
                </a></td>
                
                <td class="attribute-description">Exception class member variable</td>
            </tr>
                </table>
            </div>
            <p />
            </details>
            <details class="subsection methods" open>
                <summary><h2 class="subsectionTitle methods">Methods</h2></summary>
                <div class="methods-container">
                <ul class="methods-toc"><li class="method protected">
                <a class="methods-toc__entry " href="#TEST_NestedClasses.MyException.doIt">
                    doIt
                </a><div class="methods-toc__description">Exception class method, marked as protected</div></li><li class="method private">
                <a class="methods-toc__entry " href="#TEST_NestedClasses.MyException.MyException">
                    MyException.&lt;init&gt;
                </a><div class="methods-toc__description">Exception class constructor</div></li></ul>
                <div class="method protected"><h2 class="method-title " id="TEST_NestedClasses.MyException.doIt">doIt</h2>
            <div class="method-signature">
                
                <a target="_blank" rel="noopener noreferrer" title="Go to source" class="source-link" href="https://somefakeurl.com/TEST_NestedClasses.cls#L146">
                    protected void <span class="hljs-title">doIt</span>()
                      </a>
              </div>
              <div class="method-description">Exception class method, marked as protected</div>
              </div>
              <div class="method private">
                <h2 class="method-title " id="TEST_NestedClasses.MyException.MyException">MyException.&lt;init&gt;</h2>
                <div class="method-signature">

                  <a target="_blank" rel="noopener noreferrer" title="Go to source" class="source-link" href="https://somefakeurl.com/TEST_NestedClasses.cls#L141">
                    <span class="hljs-title">MyException</span>(Double d)
                  </a>
                </div>
                <div class="method-description">Exception class constructor</div>
              </div>
              </div>
            </details>
          </details>
          <details class="section" open>
            <summary>
              <h2 class="sectionTitle" id="TEST_NestedClasses.MyInterface">

                <a target="_blank" rel="noopener noreferrer" title="Go to source" class="source-link" href="https://somefakeurl.com/TEST_NestedClasses.cls#L39">
                  TEST_NestedClasses.MyInterface
                </a><span><svg aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="externalLink"><path d="M576 24v127.984c0 21.461-25.96 31.98-40.971 16.971l-35.707-35.709-243.523 243.523c-9.373 9.373-24.568 9.373-33.941 0l-22.627-22.627c-9.373-9.373-9.373-24.569 0-33.941L442.756 76.676l-35.703-35.705C391.982 25.9 402.656 0 424.024 0H552c13.255 0 24 10.745 24 24zM407.029 270.794l-16 16A23.999 23.999 0 0 0 384 303.765V448H64V128h264a24.003 24.003 0 0 0 16.97-7.029l16-16C376.089 89.851 365.381 64 344 64H48C21.49 64 0 85.49 0 112v352c0 26.51 21.49 48 48 48h352c26.51 0 48-21.49 48-48V287.764c0-21.382-25.852-32.09-40.971-16.97z" class="externalLink"></path></svg></span>
              </h2>
            </summary>



            <div class="class-signature">

              <a target="_blank" rel="noopener noreferrer" title="Go to source" class="source-link" href="https://somefakeurl.com/TEST_NestedClasses.cls#L39">
                public virtual interface MyInterface
              </a>
            </div>
            <div class="class-details">
              <div class="">Inner Interface</div>
            </div>
            <p />
            <details class="subsection methods" open>
              <summary>
                <h2 class="subsectionTitle methods">Methods</h2>
              </summary>
              <div class="methods-container">
                <ul class="methods-toc">
                  <li class="method public">
                    <a class="methods-toc__entry " href="#TEST_NestedClasses.MyInterface.myMethod">
                      myMethod
                    </a>
                    <div class="methods-toc__description">No access modifier is necessary for interface methods - these are always public or global depending on the interface visibility</div>
                  </li>
                </ul>
                <div class="method public">
                  <h2 class="method-title " id="TEST_NestedClasses.MyInterface.myMethod">myMethod</h2>
                  <div class="method-signature">

                    <a target="_blank" rel="noopener noreferrer" title="Go to source" class="source-link" href="https://somefakeurl.com/TEST_NestedClasses.cls#L43">
                      void <span class="hljs-title">myMethod</span>()
                    </a>
                  </div>
                  <div class="method-description">No access modifier is necessary for interface methods - these are always public or global depending on the interface visibility</div>
                </div>
              </div>
            </details>
          </details>
          <details class="section" open>
            <summary>
              <h2 class="sectionTitle" id="TEST_NestedClasses.MySecondException">

                <a target="_blank" rel="noopener noreferrer" title="Go to source" class="source-link" href="https://somefakeurl.com/TEST_NestedClasses.cls#L150">
                  TEST_NestedClasses.MySecondException
                </a><span><svg aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="externalLink"><path d="M576 24v127.984c0 21.461-25.96 31.98-40.971 16.971l-35.707-35.709-243.523 243.523c-9.373 9.373-24.568 9.373-33.941 0l-22.627-22.627c-9.373-9.373-9.373-24.569 0-33.941L442.756 76.676l-35.703-35.705C391.982 25.9 402.656 0 424.024 0H552c13.255 0 24 10.745 24 24zM407.029 270.794l-16 16A23.999 23.999 0 0 0 384 303.765V448H64V128h264a24.003 24.003 0 0 0 16.97-7.029l16-16C376.089 89.851 365.381 64 344 64H48C21.49 64 0 85.49 0 112v352c0 26.51 21.49 48 48 48h352c26.51 0 48-21.49 48-48V287.764c0-21.382-25.852-32.09-40.971-16.97z" class="externalLink"></path></svg></span>
              </h2>
            </summary>



            <div class="class-signature">

              <a target="_blank" rel="noopener noreferrer" title="Go to source" class="source-link" href="https://somefakeurl.com/TEST_NestedClasses.cls#L150">
                public abstract class MySecondException extends Exception implements MyInterface
              </a>
            </div>
            <div class="class-details">
              <div class="">Exception classes can be abstract and implement interfaces</div>
            </div>
            <p />
          </details>
          <details class="section" open>
            <summary>
              <h2 class="sectionTitle" id="TEST_NestedClasses.MySecondInterface">

                <a target="_blank" rel="noopener noreferrer" title="Go to source" class="source-link" href="https://somefakeurl.com/TEST_NestedClasses.cls#L47">
                  TEST_NestedClasses.MySecondInterface
                </a><span><svg aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="externalLink"><path d="M576 24v127.984c0 21.461-25.96 31.98-40.971 16.971l-35.707-35.709-243.523 243.523c-9.373 9.373-24.568 9.373-33.941 0l-22.627-22.627c-9.373-9.373-9.373-24.569 0-33.941L442.756 76.676l-35.703-35.705C391.982 25.9 402.656 0 424.024 0H552c13.255 0 24 10.745 24 24zM407.029 270.794l-16 16A23.999 23.999 0 0 0 384 303.765V448H64V128h264a24.003 24.003 0 0 0 16.97-7.029l16-16C376.089 89.851 365.381 64 344 64H48C21.49 64 0 85.49 0 112v352c0 26.51 21.49 48 48 48h352c26.51 0 48-21.49 48-48V287.764c0-21.382-25.852-32.09-40.971-16.97z" class="externalLink"></path></svg></span>
              </h2>
            </summary>



            <div class="class-signature">

              <a target="_blank" rel="noopener noreferrer" title="Go to source" class="source-link" href="https://somefakeurl.com/TEST_NestedClasses.cls#L47">
                interface MySecondInterface extends MyInterface
              </a>
            </div>
            <div class="class-details">
              <div class="">Interface extension</div>
            </div>
            <p />
            <details class="subsection methods" open>
              <summary>
                <h2 class="subsectionTitle methods">Methods</h2>
              </summary>
              <div class="methods-container">
                <ul class="methods-toc">
                  <li class="method private">
                    <a class="methods-toc__entry " href="#TEST_NestedClasses.MySecondInterface.method2">
                      method2
                    </a></li>
                </ul>
                <div class="method private">
                  <h2 class="method-title " id="TEST_NestedClasses.MySecondInterface.method2">method2</h2>
                  <div class="method-signature">

                    <a target="_blank" rel="noopener noreferrer" title="Go to source" class="source-link" href="https://somefakeurl.com/TEST_NestedClasses.cls#L48">
                      Integer <span class="hljs-title">method2</span>(Integer i)
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