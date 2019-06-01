/**
 * The Code in this class does not always need to be valid. Just using it to test how
 * ApexDoc2 parses comments and creates HTML. This 'class' has a bunch of potential
 * gotchas in it. We'll use the output to perform snapshot testing to make sure nothing
 * changes when we make changes to the code.
 * <br><br />
 * This should create a break in the HTML.
 *
 * @author P. Weinberg
 * @since 2019
 */
@SuupressWarnings
public class TEST_Gotchas {

  public Integer myNum;
  private Integer myNum2;
  protected Integer myNum3 { get; set; };

  private Integer myInt {
    get {
      return 4;
    }
    set {
      myInt = value;
    }
  }

  /**
   * This will be invisible to ApexDoc2
   * since it is a prop without an access modifier
   */
  Integer myInvisibleInt;

  /**
   * Some really cool enum.
   */
  @TestVisible(required=true) @InvocableProperty(required=true)
  public enum Numbers { ONE, TWO, THREE,    FOUR  }

  /**
   * @description Some other enum.
   */
  private enum Seasons
    {
      SPRING,
      WINTER, SUMMER,
      FALL,
      SUMMER_FALL,
      FALL_SUMMER
    }

  /**
   * @description Wonky, should still be parsed correctly
   */
  enum Randomness { STRING, INTEGER,
    DOUBLE, LIST,
    ENUM,
      CLASS, INTERFACE, SET, MAP, WAYNES_WORLD, EXCELLENT  }


  /** Static final variable (constant) - outer class level only */
  @TestVisible
  @InvocableProperty(required=true)
  private static final Integer MY_INT;

  /** Non-final static variable - use this to communicate state across triggers
  * within a single request) */
  @TestVisible public static String sharedState;

  /**
   * @see TEST_Test.getInt[1]
   * @see TEST_Test.getInt[2]
   * @see TEST_Test.getInt[3]
  */
  public static Integer getInt() { return MY_INT; }

  /** Static method overload 1 */
  public static Integer getInt(Integer int, Integer int2) {
    return MY_INT + int;
  }

  /** Static method overload 2 */
  public static Integer getInt(Integer int, Integer int2, Integer int3) {
    return MY_INT + int;
  }

  /** Static method overload 3 */
  public static Integer getInt(Integer int, Integer int2, Integer int3, Integer int4) {
    return MY_INT + int;
  }

  /** Should still be visible because line starts with a collection */
  List<String> returnsAList() {

  }

  /** Should still be visible because line starts with a keyword */
  void returnsNothing() {

  }

  /** will be invisible because it starts with a complex type */
  Messaging.singleEmailmessage returnsAnEmail() {

  }

  /** Static initialization (can be included where the variable is defined) */
  static{ MY_INT = 2; }

  /** Member variable for outer class */
  private final String m;

  // Instance initialization block - can be done where the variable is declared,
  // or in a constructor
  {
    m = 'a';
  }

  // Because no constructor is explicitly defined in this outer class, an implicit,
  // no-argument, public constructor exists

  /** @description Inner Interface */
  @AuraEnabled
  public virtual interface MyInterface {

    /** @description No access modifier is necessary for interface methods - these are always
     * public or global depending on the interface visibility */
    void myMethod();
  }

  /** @description Interface extension */
  interface MySecondInterface extends MyInterface {
    Integer method2(Integer i);
  }

  /**
  * @description Inner class - because it is virtual it can be extended.
  * This class implements an interface that, in turn, extends another interface.
  * Consequently the class must implement all methods. */
  public virtual class InnerClass implements MySecondInterface {

    /** Inner member variables */
    private final String s;
    /** Inner member variables */
    private final String s2;

    // Inner instance initialization block (this code could be located above)
    {
       this.s = 'x';
    }

    /** Inline initialization (happens after the block above executes) */
    private final Integer i = s.length();

    /** Explicit no argument constructor */
    InnerClass() {
       // This invokes another constructor that is defined later
       this('none');
    }

    /**
     * @description Works
     * over multiple lines.
     * @param s2 Works
     * over multiple lines.
     * @exception Works
     * over multiple lines (exception).
     * @deprecated Works
     * over multiple lines (deprecated).
     * @returns Works
     * over multiple lines (returns).
     * @author Works
     * over multiple lines (author).
     * @since Works
     * over multiple lines (since).
     * @example Works
     * over multiple lines.
     */
    public InnerClass(String s2) {
      this.s2 = s2;
    }

    /**
     * Instance method that implements a method from MyInterface.
     * Because it is declared virtual it can be overridden by a subclass.*/
    public virtual void myMethod() { /* does nothing */ }

    /**
     * @param i Some Param description
     * Implementation of the second interface method above.
     * This method references member variables (with and without the "this" prefix)
     */
    @Future @SuppressWarnings
    @testMethod public Integer method2(Integer i) { return this.i + s.length(); }
  }

  /**
   * Abstract class (that subclasses the class above). No constructor is needed since
   * parent class has a no-argument constructor
   */
  public abstract class AbstractChildClass extends InnerClass {

  /**
   * Lorem ipsum and stuff
   */
    public override void myMethod() { /* do something else */ }

  /**
   * Lorem ipsum and stuff
   */
    protected void method2() {}

  /**
   * Lorem ipsum and stuff
   */
    abstract Integer abstractMethod();
  }

  /**
   * Inner class
   */
  public class ConcreteChildClass extends AbstractChildClass {
    /** Our regex should detect and display this annotation in whole */
    @InvocableMethod(label='Get Account Names' description='Returns the list of account names corresponding to the specified account IDs.')
    override Integer abstractMethod() { return 5; }

    /**
     * A method
     */
    @AuraEnabled (cacheable=true)
    public static void doSomethingUIRelated() {

    }
  }

  /** A second sub-class of the original InnerClass */
  public class AnotherChildClass extends InnerClass {
    AnotherChildClass(String s) {
      // Explicitly invoke a different super constructor than one with no arguments
      super(s);
    }

    List<String> myCollectionMethod() {
      return new List<String>();
    }
  }

  /** Exception inner class */
  public virtual class MyException extends Exception {
    /** Exception class member variable */
    public Double d;

    /** Exception class constructor  */
    MyException(Double d) {
      this.d = d;
    }

    /**Exception class method, marked as protected  */
    protected void doIt() {}
  }

  /** Exception classes can be abstract and implement interfaces */
  public abstract class MySecondException extends Exception implements MyInterface {}
}
