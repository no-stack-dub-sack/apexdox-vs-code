/**
 * Testing that nested classes are properly documented.
 * 
 * @group Assertions
 * 
 * @author Bill C Riemers
 * @since 2022-10-05 Added changelog
 */
public class TEST_NestedClasses {

  /** Static final variable (constant) – outer class level only */
  private static final Integer MY_INT;

  /** Non-final static variable - use this
   * to communicate state across triggers
   * within a single request)
   */
  public static String sharedState;

  /** Static method - outer class level only */
  public static Integer getInt() { return MY_INT; }

  // Static initialization (can be included where the variable is defined)
  static {
    MY_INT = 2;
  }

  /** Member variable for outer class */
  private final String m;

  // Instance initialization block - can be done where the variable is declared,
  // or in a constructor
  {
    m = 'a';
  }

  // Because no constructor is explicitly defined in this outer class, an implicit,
  // no-argument, public constructor exists

  /**
   * Inner Interface
   */
  public virtual interface MyInterface {

    /** No access modifier is necessary for interface methods - these are always
     * public or global depending on the interface visibility */
    void myMethod();
  }

  /** Interface extension */
  interface MySecondInterface extends MyInterface {
    Integer method2(Integer i);
  }

  /**
  * @description Inner class - because it is virtual it can be extended.
  * This class implements an interface that, in turn, extends another interface.
  * Consequently the class must implement all methods. */
  public virtual class InnerClass implements MySecondInterface {

    // Inner member variables
    private final String s;
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

    /** Constructor that assigns a final variable value */
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
    public Integer method2(Integer i) { return this.i + s.length(); }
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

  /** Complete the abstract class by implementing its abstract method */
  public class ConcreteChildClass extends AbstractChildClass {
    /**
     * Here we expand the visibility of the parent method - note that visibility
     * cannot be restricted by a sub-class
     */
    public override Integer abstractMethod() { return 5; }

    public Integer overloadedMethod() { return 1; }
    public Integer overloadedMethod(Integer someInt) { return 1 + someInt; }
  }

  /** A second sub-class of the original InnerClass */
  public class AnotherChildClass extends InnerClass {
    AnotherChildClass(String s) {
      // Explicitly invoke a different super constructor than one with no arguments
      super(s);
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
