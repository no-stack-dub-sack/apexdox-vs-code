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
              <li title="TEST_ISObjectComparator" id="item-TEST_ISObjectComparator" class="nav-item class global" onclick="goToLocation('TEST_ISObjectComparator.html');">
                <a tabindex="1" href="javascript:void(0)">TEST_ISObjectComparator</a>
              </li>
              <li title="TEST_IllegalStateException" id="item-TEST_IllegalStateException" class="nav-item class global" onclick="goToLocation('TEST_IllegalStateException.html');">
                <a tabindex="1" href="javascript:void(0)">TEST_IllegalStateException</a>
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

            <h2 class="class-title top-level-type" id="TEST_NestedClasses">

              <a target="_blank" rel="noopener noreferrer" title="Go to source" class="source-link" href="https://somefakeurl.com/TEST_NestedClasses.cls#L9">
                TEST_NestedClasses
              </a>
            </h2>
            <div class="class-container">

              <div class="class-description">
                Testing that nested classes are properly documented.
              </div>
              <div class="class-subtitle">
                Signature
              </div>

              <div class="class-signature">
                public class TEST_NestedClasses
              </div><br />Bill C Riemers<br />2022-10-05 Added changelog
            </div>
            <div class="subsection properties TEST_NestedClasses">
              <h3 class="subsection-title properties">TEST_NestedClasses Properties</h3>
              <table class="attributes-table properties">

                <tr>
                  <th>Name</th>
                  <th>Signature</th>

                  <th>Description</th>
                </tr>
                <tr class="property private">
                  <td class="attribute-name">
                    <a target="_blank" rel="noopener noreferrer" title="Go to source" class="source-link" href="https://somefakeurl.com/TEST_NestedClasses.cls#L29">
                      m
                    </a></td>
                  <td>
                    <div class="attribute-signature">
                      private final String m
                    </div>
                  </td>


                  <td class="attribute-description">
                    Member variable for outer class
                  </td>
                </tr>
                <tr class="property private">
                  <td class="attribute-name">
                    <a target="_blank" rel="noopener noreferrer" title="Go to source" class="source-link" href="https://somefakeurl.com/TEST_NestedClasses.cls#L12">
                      MY_INT
                    </a></td>
                  <td>
                    <div class="attribute-signature">
                      private static final Integer MY_INT
                    </div>
                  </td>


                  <td class="attribute-description">
                    Static final variable (constant) – outer class level only
                  </td>
                </tr>
                <tr class="property public">
                  <td class="attribute-name">
                    <a target="_blank" rel="noopener noreferrer" title="Go to source" class="source-link" href="https://somefakeurl.com/TEST_NestedClasses.cls#L18">
                      sharedState
                    </a></td>
                  <td>
                    <div class="attribute-signature">
                      public static String sharedState
                    </div>
                  </td>


                  <td class="attribute-description">
                    Non-final static variable - use this to communicate state across triggers within a single request)
                  </td>
                </tr>
              </table>
            </div>
            <div class="subsection methods">
              <h3 class="subsection-title methods">TEST_NestedClasses Methods</h3>
              <div class="methods-container">
                <ul class="methods-toc">
                  <li class="method public">
                    <a class="methods-toc__entry " href="#TEST_NestedClasses.getInt">
                      getInt ()
                    </a>

                    <div class="methods-toc__description">
                      Static method - outer class level only
                    </div>
                  </li>
                </ul>
                <div class="method public">
                  <h4 class="method-title " id="TEST_NestedClasses.getInt">

                    <a target="_blank" rel="noopener noreferrer" title="Go to source" class="source-link" href="https://somefakeurl.com/TEST_NestedClasses.cls#L21">
                      getInt()
                    </a>
                  </h4>
                  <div class="method-description">
                    Static method - outer class level only
                  </div>
                  <div class="method-subtitle">
                    Signature
                  </div>

                  <div class="method-signature">
                    public static Integer getInt()
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="section">

            <h2 class="class-title " id="TEST_NestedClasses.AbstractChildClass">

              <a target="_blank" rel="noopener noreferrer" title="Go to source" class="source-link" href="https://somefakeurl.com/TEST_NestedClasses.cls#L101">
                TEST_NestedClasses.AbstractChildClass
              </a>
            </h2>
            <div class="class-container">

              <div class="class-description">
                Abstract class (that subclasses the class above). No constructor is needed since parent class has a no-argument constructor
              </div>
              <div class="class-subtitle">
                Signature
              </div>

              <div class="class-signature">
                public abstract class AbstractChildClass extends InnerClass
              </div>
            </div>
            <div class="subsection methods">
              <h3 class="subsection-title methods">TEST_NestedClasses.AbstractChildClass Methods</h3>
              <div class="methods-container">
                <ul class="methods-toc">
                  <li class="method private">
                    <a class="methods-toc__entry " href="#TEST_NestedClasses.AbstractChildClass.abstractMethod">
                      abstractMethod ()
                    </a>

                    <div class="methods-toc__description">
                      Lorem ipsum and stuff
                    </div>
                  </li>
                  <li class="method protected">
                    <a class="methods-toc__entry " href="#TEST_NestedClasses.AbstractChildClass.method2">
                      method2 ()
                    </a>

                    <div class="methods-toc__description">
                      Lorem ipsum and stuff
                    </div>
                  </li>
                  <li class="method public">
                    <a class="methods-toc__entry " href="#TEST_NestedClasses.AbstractChildClass.myMethod">
                      myMethod ()
                    </a>

                    <div class="methods-toc__description">
                      Lorem ipsum and stuff
                    </div>
                  </li>
                </ul>
                <div class="method private">
                  <h4 class="method-title " id="TEST_NestedClasses.AbstractChildClass.abstractMethod">

                    <a target="_blank" rel="noopener noreferrer" title="Go to source" class="source-link" href="https://somefakeurl.com/TEST_NestedClasses.cls#L116">
                      abstractMethod()
                    </a>
                  </h4>
                  <div class="method-description">
                    Lorem ipsum and stuff
                  </div>
                  <div class="method-subtitle">
                    Signature
                  </div>

                  <div class="method-signature">
                    abstract Integer abstractMethod()
                  </div>
                </div>
                <div class="method protected">
                  <h4 class="method-title " id="TEST_NestedClasses.AbstractChildClass.method2">

                    <a target="_blank" rel="noopener noreferrer" title="Go to source" class="source-link" href="https://somefakeurl.com/TEST_NestedClasses.cls#L111">
                      method2()
                    </a>
                  </h4>
                  <div class="method-description">
                    Lorem ipsum and stuff
                  </div>
                  <div class="method-subtitle">
                    Signature
                  </div>

                  <div class="method-signature">
                    protected void method2()
                  </div>
                </div>
                <div class="method public">
                  <h4 class="method-title " id="TEST_NestedClasses.AbstractChildClass.myMethod">

                    <a target="_blank" rel="noopener noreferrer" title="Go to source" class="source-link" href="https://somefakeurl.com/TEST_NestedClasses.cls#L106">
                      myMethod()
                    </a>
                  </h4>
                  <div class="method-description">
                    Lorem ipsum and stuff
                  </div>
                  <div class="method-subtitle">
                    Signature
                  </div>

                  <div class="method-signature">
                    public override void myMethod()
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="section">

            <h2 class="class-title " id="TEST_NestedClasses.AnotherChildClass">

              <a target="_blank" rel="noopener noreferrer" title="Go to source" class="source-link" href="https://somefakeurl.com/TEST_NestedClasses.cls#L132">
                TEST_NestedClasses.AnotherChildClass
              </a>
            </h2>
            <div class="class-container">

              <div class="class-description">
                A second sub-class of the original InnerClass
              </div>
              <div class="class-subtitle">
                Signature
              </div>

              <div class="class-signature">
                public class AnotherChildClass extends InnerClass
              </div>
            </div>
            <div class="subsection methods">
              <h3 class="subsection-title methods">TEST_NestedClasses.AnotherChildClass Constructors</h3>
              <div class="methods-container">
                <ul class="methods-toc">
                  <li class="method private">
                    <a class="methods-toc__entry " href="#TEST_NestedClasses.AnotherChildClass.AnotherChildClass">
                      AnotherChildClass (s)
                    </a>

                  </li>
                </ul>
                <div class="method private">
                  <h4 class="method-title " id="TEST_NestedClasses.AnotherChildClass.AnotherChildClass">

                    <a target="_blank" rel="noopener noreferrer" title="Go to source" class="source-link" href="https://somefakeurl.com/TEST_NestedClasses.cls#L133">
                      AnotherChildClass(s)
                    </a>
                  </h4>
                  <div class="method-subtitle">
                    Signature
                  </div>

                  <div class="method-signature">
                    AnotherChildClass(String s)
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="section">

            <h2 class="class-title " id="TEST_NestedClasses.ConcreteChildClass">

              <a target="_blank" rel="noopener noreferrer" title="Go to source" class="source-link" href="https://somefakeurl.com/TEST_NestedClasses.cls#L120">
                TEST_NestedClasses.ConcreteChildClass
              </a>
            </h2>
            <div class="class-container">

              <div class="class-description">
                Complete the abstract class by implementing its abstract method
              </div>
              <div class="class-subtitle">
                Signature
              </div>

              <div class="class-signature">
                public class ConcreteChildClass extends AbstractChildClass
              </div>
            </div>
            <div class="subsection methods">
              <h3 class="subsection-title methods">TEST_NestedClasses.ConcreteChildClass Methods</h3>
              <div class="methods-container">
                <ul class="methods-toc">
                  <li class="method public">
                    <a class="methods-toc__entry " href="#TEST_NestedClasses.ConcreteChildClass.abstractMethod">
                      abstractMethod ()
                    </a>

                    <div class="methods-toc__description">
                      Here we expand the visibility of the parent method - note that visibility cannot be restricted by a sub-class
                    </div>
                  </li>
                  <li class="method public">
                    <a class="methods-toc__entry " href="#TEST_NestedClasses.ConcreteChildClass.overloadedMethod">
                      overloadedMethod ()
                    </a>

                  </li>
                  <li class="method public">
                    <a class="methods-toc__entry " href="#TEST_NestedClasses.ConcreteChildClass.overloadedMethod_1">
                      overloadedMethod (someInt)
                    </a>

                  </li>
                </ul>
                <div class="method public">
                  <h4 class="method-title " id="TEST_NestedClasses.ConcreteChildClass.abstractMethod">

                    <a target="_blank" rel="noopener noreferrer" title="Go to source" class="source-link" href="https://somefakeurl.com/TEST_NestedClasses.cls#L125">
                      abstractMethod()
                    </a>
                  </h4>
                  <div class="method-description">
                    Here we expand the visibility of the parent method - note that visibility cannot be restricted by a sub-class
                  </div>
                  <div class="method-subtitle">
                    Signature
                  </div>

                  <div class="method-signature">
                    public override Integer abstractMethod()
                  </div>
                </div>
                <div class="method public">
                  <h4 class="method-title " id="TEST_NestedClasses.ConcreteChildClass.overloadedMethod">

                    <a target="_blank" rel="noopener noreferrer" title="Go to source" class="source-link" href="https://somefakeurl.com/TEST_NestedClasses.cls#L127">
                      overloadedMethod()
                    </a>
                  </h4>
                  <div class="method-subtitle">
                    Signature
                  </div>

                  <div class="method-signature">
                    public Integer overloadedMethod()
                  </div>
                </div>
                <div class="method public">
                  <h4 class="method-title " id="TEST_NestedClasses.ConcreteChildClass.overloadedMethod_1">

                    <a target="_blank" rel="noopener noreferrer" title="Go to source" class="source-link" href="https://somefakeurl.com/TEST_NestedClasses.cls#L128">
                      overloadedMethod(someInt)
                    </a>
                  </h4>
                  <div class="method-subtitle">
                    Signature
                  </div>

                  <div class="method-signature">
                    public Integer overloadedMethod(Integer someInt)
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="section">

            <h2 class="class-title " id="TEST_NestedClasses.InnerClass">

              <a target="_blank" rel="noopener noreferrer" title="Go to source" class="source-link" href="https://somefakeurl.com/TEST_NestedClasses.cls#L59">
                TEST_NestedClasses.InnerClass
              </a>
            </h2>
            <div class="class-container">

              <div class="class-description">
                Inner class - because it is virtual it can be extended. This class implements an interface that, in turn, extends another interface. Consequently the class must implement all methods.
              </div>
              <div class="class-subtitle">
                Signature
              </div>

              <div class="class-signature">
                public virtual class InnerClass implements MySecondInterface
              </div>
            </div>
            <div class="subsection properties TEST_NestedClasses_InnerClass">
              <h3 class="subsection-title properties">TEST_NestedClasses.InnerClass Properties</h3>
              <table class="attributes-table properties">

                <tr>
                  <th>Name</th>
                  <th>Signature</th>

                  <th>Description</th>
                </tr>
                <tr class="property private">
                  <td class="attribute-name">
                    <a target="_blank" rel="noopener noreferrer" title="Go to source" class="source-link" href="https://somefakeurl.com/TEST_NestedClasses.cls#L71">
                      i
                    </a></td>
                  <td>
                    <div class="attribute-signature">
                      private final Integer i
                    </div>
                  </td>


                  <td class="attribute-description">
                    Inline initialization (happens after the block above executes)
                  </td>
                </tr>
                <tr class="property private">
                  <td class="attribute-name">
                    <a target="_blank" rel="noopener noreferrer" title="Go to source" class="source-link" href="https://somefakeurl.com/TEST_NestedClasses.cls#L62">
                      s
                    </a></td>
                  <td>
                    <div class="attribute-signature">
                      private final String s
                    </div>
                  </td>


                  <td class="attribute-description">

                  </td>
                </tr>
                <tr class="property private">
                  <td class="attribute-name">
                    <a target="_blank" rel="noopener noreferrer" title="Go to source" class="source-link" href="https://somefakeurl.com/TEST_NestedClasses.cls#L63">
                      s2
                    </a></td>
                  <td>
                    <div class="attribute-signature">
                      private final String s2
                    </div>
                  </td>


                  <td class="attribute-description">

                  </td>
                </tr>
              </table>
            </div>
            <div class="subsection methods">
              <h3 class="subsection-title methods">TEST_NestedClasses.InnerClass Constructors</h3>
              <div class="methods-container">
                <ul class="methods-toc">
                  <li class="method private">
                    <a class="methods-toc__entry " href="#TEST_NestedClasses.InnerClass.InnerClass">
                      InnerClass ()
                    </a>

                    <div class="methods-toc__description">
                      Explicit no argument constructor
                    </div>
                  </li>
                  <li class="method public">
                    <a class="methods-toc__entry " href="#TEST_NestedClasses.InnerClass.InnerClass_1">
                      InnerClass (s2)
                    </a>

                    <div class="methods-toc__description">
                      Constructor that assigns a final variable value
                    </div>
                  </li>
                </ul>
                <div class="method private">
                  <h4 class="method-title " id="TEST_NestedClasses.InnerClass.InnerClass">

                    <a target="_blank" rel="noopener noreferrer" title="Go to source" class="source-link" href="https://somefakeurl.com/TEST_NestedClasses.cls#L74">
                      InnerClass()
                    </a>
                  </h4>
                  <div class="method-description">
                    Explicit no argument constructor
                  </div>
                  <div class="method-subtitle">
                    Signature
                  </div>

                  <div class="method-signature">
                    InnerClass()
                  </div>
                </div>
                <div class="method public">
                  <h4 class="method-title " id="TEST_NestedClasses.InnerClass.InnerClass_1">

                    <a target="_blank" rel="noopener noreferrer" title="Go to source" class="source-link" href="https://somefakeurl.com/TEST_NestedClasses.cls#L80">
                      InnerClass(s2)
                    </a>
                  </h4>
                  <div class="method-description">
                    Constructor that assigns a final variable value
                  </div>
                  <div class="method-subtitle">
                    Signature
                  </div>

                  <div class="method-signature">
                    public InnerClass(String s2)
                  </div>
                </div>
              </div>
            </div>
            <div class="subsection methods">
              <h3 class="subsection-title methods">TEST_NestedClasses.InnerClass Methods</h3>
              <div class="methods-container">
                <ul class="methods-toc">
                  <li class="method public">
                    <a class="methods-toc__entry " href="#TEST_NestedClasses.InnerClass.method2">
                      method2 (i)
                    </a>

                  </li>
                  <li class="method public">
                    <a class="methods-toc__entry " href="#TEST_NestedClasses.InnerClass.myMethod">
                      myMethod ()
                    </a>

                    <div class="methods-toc__description">
                      Instance method that implements a method from MyInterface. Because it is declared virtual it can be overridden by a subclass.
                    </div>
                  </li>
                </ul>
                <div class="method public">
                  <h4 class="method-title " id="TEST_NestedClasses.InnerClass.method2">

                    <a target="_blank" rel="noopener noreferrer" title="Go to source" class="source-link" href="https://somefakeurl.com/TEST_NestedClasses.cls#L94">
                      method2(i)
                    </a>
                  </h4>
                  <div class="method-subtitle">
                    Signature
                  </div>

                  <div class="method-signature">
                    public Integer method2(Integer i)
                  </div>
                  <div class="method-subtitle">Parameters</div>
                  <div class="param-name">i</div>
                  <div class="param-type">
                    Type: <code class="code-inline">Integer</code>
                  </div>
                  <div class="param-description">Some Param description Implementation of the second interface method above. This method references member variables (with and without the &quot;this&quot; prefix)</div>
                </div>
                <div class="method public">
                  <h4 class="method-title " id="TEST_NestedClasses.InnerClass.myMethod">

                    <a target="_blank" rel="noopener noreferrer" title="Go to source" class="source-link" href="https://somefakeurl.com/TEST_NestedClasses.cls#L87">
                      myMethod()
                    </a>
                  </h4>
                  <div class="method-description">
                    Instance method that implements a method from MyInterface. Because it is declared virtual it can be overridden by a subclass.
                  </div>
                  <div class="method-subtitle">
                    Signature
                  </div>

                  <div class="method-signature">
                    public virtual void myMethod()
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="section">

            <h2 class="class-title " id="TEST_NestedClasses.MyException">

              <a target="_blank" rel="noopener noreferrer" title="Go to source" class="source-link" href="https://somefakeurl.com/TEST_NestedClasses.cls#L140">
                TEST_NestedClasses.MyException
              </a>
            </h2>
            <div class="class-container">

              <div class="class-description">
                Exception inner class
              </div>
              <div class="class-subtitle">
                Signature
              </div>

              <div class="class-signature">
                public virtual class MyException extends Exception
              </div>
            </div>
            <div class="subsection properties TEST_NestedClasses_MyException">
              <h3 class="subsection-title properties">TEST_NestedClasses.MyException Properties</h3>
              <table class="attributes-table properties">

                <tr>
                  <th>Name</th>
                  <th>Signature</th>

                  <th>Description</th>
                </tr>
                <tr class="property public">
                  <td class="attribute-name">
                    <a target="_blank" rel="noopener noreferrer" title="Go to source" class="source-link" href="https://somefakeurl.com/TEST_NestedClasses.cls#L142">
                      d
                    </a></td>
                  <td>
                    <div class="attribute-signature">
                      public Double d
                    </div>
                  </td>


                  <td class="attribute-description">
                    Exception class member variable
                  </td>
                </tr>
              </table>
            </div>
            <div class="subsection methods">
              <h3 class="subsection-title methods">TEST_NestedClasses.MyException Constructors</h3>
              <div class="methods-container">
                <ul class="methods-toc">
                  <li class="method private">
                    <a class="methods-toc__entry " href="#TEST_NestedClasses.MyException.MyException">
                      MyException (d)
                    </a>

                    <div class="methods-toc__description">
                      Exception class constructor
                    </div>
                  </li>
                </ul>
                <div class="method private">
                  <h4 class="method-title " id="TEST_NestedClasses.MyException.MyException">

                    <a target="_blank" rel="noopener noreferrer" title="Go to source" class="source-link" href="https://somefakeurl.com/TEST_NestedClasses.cls#L145">
                      MyException(d)
                    </a>
                  </h4>
                  <div class="method-description">
                    Exception class constructor
                  </div>
                  <div class="method-subtitle">
                    Signature
                  </div>

                  <div class="method-signature">
                    MyException(Double d)
                  </div>
                </div>
              </div>
            </div>
            <div class="subsection methods">
              <h3 class="subsection-title methods">TEST_NestedClasses.MyException Methods</h3>
              <div class="methods-container">
                <ul class="methods-toc">
                  <li class="method protected">
                    <a class="methods-toc__entry " href="#TEST_NestedClasses.MyException.doIt">
                      doIt ()
                    </a>

                    <div class="methods-toc__description">
                      Exception class method, marked as protected
                    </div>
                  </li>
                </ul>
                <div class="method protected">
                  <h4 class="method-title " id="TEST_NestedClasses.MyException.doIt">

                    <a target="_blank" rel="noopener noreferrer" title="Go to source" class="source-link" href="https://somefakeurl.com/TEST_NestedClasses.cls#L150">
                      doIt()
                    </a>
                  </h4>
                  <div class="method-description">
                    Exception class method, marked as protected
                  </div>
                  <div class="method-subtitle">
                    Signature
                  </div>

                  <div class="method-signature">
                    protected void doIt()
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="section">

            <h2 class="class-title " id="TEST_NestedClasses.MyInterface">

              <a target="_blank" rel="noopener noreferrer" title="Go to source" class="source-link" href="https://somefakeurl.com/TEST_NestedClasses.cls#L43">
                TEST_NestedClasses.MyInterface
              </a>
            </h2>
            <div class="class-container">

              <div class="class-description">
                Inner Interface
              </div>
              <div class="class-subtitle">
                Signature
              </div>

              <div class="class-signature">
                public virtual interface MyInterface
              </div>
            </div>
            <div class="subsection methods">
              <h3 class="subsection-title methods">TEST_NestedClasses.MyInterface Methods</h3>
              <div class="methods-container">
                <ul class="methods-toc">
                  <li class="method public">
                    <a class="methods-toc__entry " href="#TEST_NestedClasses.MyInterface.myMethod">
                      myMethod ()
                    </a>

                    <div class="methods-toc__description">
                      No access modifier is necessary for interface methods - these are always public or global depending on the interface visibility
                    </div>
                  </li>
                </ul>
                <div class="method public">
                  <h4 class="method-title " id="TEST_NestedClasses.MyInterface.myMethod">

                    <a target="_blank" rel="noopener noreferrer" title="Go to source" class="source-link" href="https://somefakeurl.com/TEST_NestedClasses.cls#L47">
                      myMethod()
                    </a>
                  </h4>
                  <div class="method-description">
                    No access modifier is necessary for interface methods - these are always public or global depending on the interface visibility
                  </div>
                  <div class="method-subtitle">
                    Signature
                  </div>

                  <div class="method-signature">
                    void myMethod()
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="section">

            <h2 class="class-title " id="TEST_NestedClasses.MySecondException">

              <a target="_blank" rel="noopener noreferrer" title="Go to source" class="source-link" href="https://somefakeurl.com/TEST_NestedClasses.cls#L154">
                TEST_NestedClasses.MySecondException
              </a>
            </h2>
            <div class="class-container">

              <div class="class-description">
                Exception classes can be abstract and implement interfaces
              </div>
              <div class="class-subtitle">
                Signature
              </div>

              <div class="class-signature">
                public abstract class MySecondException extends Exception implements MyInterface
              </div>
            </div>
          </div>

          <div class="section">

            <h2 class="class-title " id="TEST_NestedClasses.MySecondInterface">

              <a target="_blank" rel="noopener noreferrer" title="Go to source" class="source-link" href="https://somefakeurl.com/TEST_NestedClasses.cls#L51">
                TEST_NestedClasses.MySecondInterface
              </a>
            </h2>
            <div class="class-container">

              <div class="class-description">
                Interface extension
              </div>
              <div class="class-subtitle">
                Signature
              </div>

              <div class="class-signature">
                interface MySecondInterface extends MyInterface
              </div>
            </div>
            <div class="subsection methods">
              <h3 class="subsection-title methods">TEST_NestedClasses.MySecondInterface Methods</h3>
              <div class="methods-container">
                <ul class="methods-toc">
                  <li class="method private">
                    <a class="methods-toc__entry " href="#TEST_NestedClasses.MySecondInterface.method2">
                      method2 (i)
                    </a>

                  </li>
                </ul>
                <div class="method private">
                  <h4 class="method-title " id="TEST_NestedClasses.MySecondInterface.method2">

                    <a target="_blank" rel="noopener noreferrer" title="Go to source" class="source-link" href="https://somefakeurl.com/TEST_NestedClasses.cls#L52">
                      method2(i)
                    </a>
                  </h4>
                  <div class="method-subtitle">
                    Signature
                  </div>

                  <div class="method-signature">
                    Integer method2(Integer i)
                  </div>
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