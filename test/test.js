class Test {

  constructor(classTested) {
    this.classTested = classTested;
    this.errorCount = 0;
  }

  assert(expr, msg) {
    if (!expr) {
      this.logError(msg);
      this.errorCount++;
    }
  }

  assertRaises(f, exception, msg) {
    var thrown = false;
    try {
      f();
    } catch (exception) {
      thrown = true;
    }
    this.assert(thrown, msg);
  }

  log(msg) {
    console.log(msg);
  }

  logStart() {
    this.log("--- Testing class " + this.classTested + " ---\n\n");
  }

  logEnd() {
    this.log("\n" + this.errorCount + " errors found during the tests.\n\n");
  }

  logError(msg) {
    this.log("- Error found: " + msg);
  }

  logMethod(name) {
    this.log("Testing " + this.classTested + "." + name + "...");
  }
}


class VectorTest extends Test {

  constructor() {
    super("Vector");
  }

  log(msg) {
    super.log(msg);
    var p = document.createElement("P");
    p.appendChild(document.createTextNode(msg));
    document.body.appendChild(p);
  }

  run() {
    this.logStart();

    this.test_constructor();
    this.test_set();
    this.test_zero();
    this.test_equals();

    this.test_add();
    this.test_sub();
    this.test_mult();
    this.test_div();

    this.test_addLocal();
    this.test_subLocal();
    this.test_multLocal();
    this.test_divLocal();

    this.test_get_magnitude();
    this.test_set_magnitude();
    this.test_get_angle();
    this.test_set_angle();

    this.test_normalize();
    this.test_dist();
    this.test_dot();

    this.test_copy();
    this.test_toString();

    this.logEnd();
  }

  test_constructor() {
    this.logMethod("constructor");
    var v = new Vector(1, 2);
    this.assert(v instanceof Vector, "v is not a Vector");

    var args = ["foo", "", NaN, Object, Object(), []];
    for (var i in args) {
      var arg = args[i];
      this.assertRaises(function() { new Vector("foo", 2) }, TypeError, 
                        "passing " + JSON.stringify(arg) + " as parameter x does not raise TypeError");
      this.assertRaises(function() { new Vector(2, "foo") }, TypeError, 
                        "passing " + JSON.stringify(arg) + " as parameter y does not raise TypeError");
    }
  }

  test_set() {
    this.logMethod("set");
    var v = new Vector(1, 2);
    v.set(4, 5);
    this.assert(v.x == 4, "x not properly set");
    this.assert(v.y == 5, "y not properly set");
  }

  test_zero() {
    this.logMethod("zero");
    var zero = Vector.zero();
    this.assert(zero.x == 0 && zero.y == 0, "should return a [0;0] Vector")
  }

  test_equals() {
    this.logMethod("equals");
    var v = new Vector(1, 2);
    this.assert(v.equals(new Vector(1, 2)), "returned false for two identical Vectors");
    this.assert(!v.equals(new Vector(4, 2)), "returned true for two Vectors with different x");
    this.assert(!v.equals(new Vector(1, 3)), "returned true for two Vectors with different y");
    this.assert(!v.equals(new Vector(4, 3)), "returned true for two different Vectors");
  }

  test_add() {
    this.logMethod("add");
    var u = new Vector(1, 2), v = new Vector(3, 4);
    var w = u.add(v);
    this.assert(w.equals(new Vector(4, 6)), "incorrect result: " + w + " for [1, 2] + [3, 4]");
  }

  test_sub() {
    this.logMethod("sub");
    var u = new Vector(1, 2), v = new Vector(3, 4);
    var w = u.sub(v);
    this.assert(w.equals(new Vector(-2, -2)), "incorrect result: " + w + " for [1, 2] - [3, 4]");
  }

  test_mult() {
    this.logMethod("mult");
    var u = new Vector(1, 2);
    var w = u.mult(2);
    this.assert(w.equals(new Vector(2, 4)), "incorrect result: " + w + " for [1, 2] * 2");
  }

  test_div() {
    this.logMethod("div");
    var u = new Vector(1, 2);
    var w = u.div(2);
    this.assert(w.equals(new Vector(0.5, 1)), "incorrect result: " + w + " for [1, 2] / 2");
  }

  test_addLocal() {
    this.logMethod("addLocal");
    var u = new Vector(1, 2), v = new Vector(3, 4);
    u.addLocal(v);
    this.assert(u.equals(new Vector(4, 6)), "incorrect result: " + u + " for [1, 2] + [3, 4]");
  }

  test_subLocal() {
    this.logMethod("subLocal");
    var u = new Vector(1, 2), v = new Vector(3, 4);
    u.subLocal(v);
    this.assert(u.equals(new Vector(-2, -2)), "incorrect result: " + u + " for [1, 2] - [3, 4]");
  }

  test_multLocal() {
    this.logMethod("multLocal");
    var u = new Vector(1, 2);
    u.multLocal(2);
    this.assert(u.equals(new Vector(2, 4)), "incorrect result: " + u + " for [1, 2] * 2");
  }

  test_divLocal() {
    this.logMethod("divLocal");
    var u = new Vector(1, 2);
    u.divLocal(2);
    this.assert(u.equals(new Vector(0.5, 1)), "incorrect result: " + u + " for [1, 2] / 2");
  }

  test_get_magnitude() {
    this.logMethod("magnitude (get)");
    var u = new Vector(3, 4);
    var m = u.magnitude;
    this.assert(m == 5, "incorrect result: " + m + " for the magnitude of " + u);
  }

  test_set_magnitude() {
    this.logMethod("magnitude (set)");
    var u = new Vector(3, 4);
    u.magnitude = 10;
    this.assert(Math.round(u.x) == 6 && Math.round(u.y) == 8, "incorrect result: " + u + " after setting the magnitude of [3, 4] to 10");
  }

  test_get_angle() {
    this.logMethod("angle (get)");
    var u = new Vector(1, 1);
    var a = u.angle;
    this.assert(a == Math.PI/4, "incorrect result: " + a + " for the angle of " + u);
  }

  test_set_angle() {
    this.logMethod("angle (set)");
    var u = new Vector(0, 1);
    u.angle = Math.PI;
    this.assert(Math.round(u.x) == -1 && Math.round(u.y) == 0, "incorrect result: " + u + " after setting the angle of [1, 1] to PI");
  }

  test_normalize() {
    this.logMethod("normalize");
    var u = new Vector(0, 2);
    u.normalize();
    this.assert(u.magnitude == 1 && Math.round(u.x) == 0 && Math.round(u.y) == 1, "incorrect result: " + u + " after normalizing [0, 2]");
  }

  test_dist() {
    this.logMethod("dist");
    var u = new Vector(0, 2);
    var d = u.dist(Vector.zero());
    this.assert(d == 2, "incorrect result: " + d + " for the distance between [0, 0] and [0, 2]");
  }

  test_dot() {
    this.logMethod("dot");
    var u = new Vector(1, 2), v = new Vector (3, 4);
    var d = u.dot(v);
    this.assert(d == 11, "incorrect result: " + d + " for [1, 2] . [3, 4]");
  }

  test_copy() {
    this.logMethod("copy");
    var u = new Vector(2, 3);
    var v = u.copy();
    this.assert(u.equals(v), "incorrect result: " + v + " after copying [2, 3]");
  }

  test_toString() {
    this.logMethod("toString");
    var u = new Vector(2, 3);
    var s = u.toString();
    this.assert(typeof(s) == "string", "does not return a string");
  }
}