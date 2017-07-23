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

  run() {
    this.logStart();

    let methods = Object.getOwnPropertyNames(eval(this.constructor.name).prototype);
    for (var i in methods) {
      let methodName = methods[i];
      if (methodName.startsWith("test_")) {
        this.logMethod(methodName.substr(5));
        this[methodName]();
      }
    }

    this.logEnd();
  }
}


class VectorTest extends Test {

  constructor() {
    super("Vector");
  }

  log(msg) {
    super.log(msg);
    let p = document.createElement("P");
    p.appendChild(document.createTextNode(msg));
    document.body.appendChild(p);
  }

  test_constructor() {
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
    var v = new Vector(1, 2);
    v.set(4, 5);
    this.assert(v.x == 4, "x not properly set");
    this.assert(v.y == 5, "y not properly set");
  }

  test_zero() {
    var zero = Vector.zero();
    this.assert(zero.x == 0 && zero.y == 0, "should return a [0;0] Vector")
  }

  test_equals() {
    var v = new Vector(1, 2);
    this.assert(v.equals(new Vector(1, 2)), "returned false for two identical Vectors");
    this.assert(!v.equals(new Vector(4, 2)), "returned true for two Vectors with different x");
    this.assert(!v.equals(new Vector(1, 3)), "returned true for two Vectors with different y");
    this.assert(!v.equals(new Vector(4, 3)), "returned true for two different Vectors");
  }

  test_add() {
    var u = new Vector(1, 2), v = new Vector(3, 4);
    var w = u.add(v);
    this.assert(w.equals(new Vector(4, 6)), "incorrect result: " + w + " for [1, 2] + [3, 4]");
  }

  test_sub() {
    var u = new Vector(1, 2), v = new Vector(3, 4);
    var w = u.sub(v);
    this.assert(w.equals(new Vector(-2, -2)), "incorrect result: " + w + " for [1, 2] - [3, 4]");
  }

  test_mult() {
    var u = new Vector(1, 2);
    var w = u.mult(2);
    this.assert(w.equals(new Vector(2, 4)), "incorrect result: " + w + " for [1, 2] * 2");
  }

  test_div() {
    var u = new Vector(1, 2);
    var w = u.div(2);
    this.assert(w.equals(new Vector(0.5, 1)), "incorrect result: " + w + " for [1, 2] / 2");
  }

  test_addLocal() {
    var u = new Vector(1, 2), v = new Vector(3, 4);
    u.addLocal(v);
    this.assert(u.equals(new Vector(4, 6)), "incorrect result: " + u + " for [1, 2] + [3, 4]");
  }

  test_subLocal() {
    var u = new Vector(1, 2), v = new Vector(3, 4);
    u.subLocal(v);
    this.assert(u.equals(new Vector(-2, -2)), "incorrect result: " + u + " for [1, 2] - [3, 4]");
  }

  test_multLocal() {
    var u = new Vector(1, 2);
    u.multLocal(2);
    this.assert(u.equals(new Vector(2, 4)), "incorrect result: " + u + " for [1, 2] * 2");
  }

  test_divLocal() {
    var u = new Vector(1, 2);
    u.divLocal(2);
    this.assert(u.equals(new Vector(0.5, 1)), "incorrect result: " + u + " for [1, 2] / 2");
  }

  test_get_magnitude() {
    var u = new Vector(3, 4);
    var m = u.magnitude;
    this.assert(m == 5, "incorrect result: " + m + " for the magnitude of " + u);
  }

  test_set_magnitude() {
    var u = new Vector(3, 4);
    u.magnitude = 10;
    this.assert(Math.round(u.x) == 6 && Math.round(u.y) == 8, "incorrect result: " + u + " after setting the magnitude of [3, 4] to 10");
  }

  test_get_angle() {
    var u = new Vector(1, 1);
    var a = u.angle;
    this.assert(a == Math.PI/4, "incorrect result: " + a + " for the angle of " + u);
  }

  test_set_angle() {
    var u = new Vector(0, 1);
    u.angle = Math.PI;
    this.assert(Math.round(u.x) == -1 && Math.round(u.y) == 0, "incorrect result: " + u + " after setting the angle of [1, 1] to PI");
  }

  test_normalize() {
    var u = new Vector(0, 2);
    u.normalize();
    this.assert(u.magnitude == 1 && Math.round(u.x) == 0 && Math.round(u.y) == 1, "incorrect result: " + u + " after normalizing [0, 2]");
  }

  test_dist() {
    var u = new Vector(0, 2);
    var d = u.dist(Vector.zero());
    this.assert(d == 2, "incorrect result: " + d + " for the distance between [0, 0] and [0, 2]");
  }

  test_dot() {
    var u = new Vector(1, 2), v = new Vector (3, 4);
    var d = u.dot(v);
    this.assert(d == 11, "incorrect result: " + d + " for [1, 2] . [3, 4]");
  }

  test_copy() {
    var u = new Vector(2, 3);
    var v = u.copy();
    this.assert(u.equals(v), "incorrect result: " + v + " after copying [2, 3]");
  }

  test_toString() {
    var u = new Vector(2, 3);
    var s = u.toString();
    this.assert(typeof(s) == "string", "does not return a string");
  }
}
