class Vector {

  constructor(x, y) {
    this.set(x, y);
  }

  set(x, y) {
    if (typeof(x) != "number") {
      throw TypeError("First parameter 'x' should be a number");
    }
    if (typeof(y) != "number") {
      throw TypeError("First parameter 'x' should be a number");
    }
    this.x = x || 0;
    this.y = y || 0;
  }

  static zero() {
    return new Vector(0, 0);
  }

  // common operations
  add(other) {
    return new Vector(this.x + other.x, this.y + other.y);
  }

  sub(other) {
    return new Vector(this.x - other.x, this.y - other.y);
  }

  mult(scalar) {
    return new Vector(this.x * scalar, this.y * scalar);
  }

  div(scalar) {
    return new Vector(this.x / scalar, this.y / scalar);
  }

  // "local" versions of common operations
  addLocal(other) {
    this.x += other.x;
    this.y += other.y;
  }


  subLocal(other) {
    this.x -= other.x;
    this.y -= other.y;
  }


  multLocal(scalar) {
    this.x *= scalar;
    this.y *= scalar;
  }

  divLocal(scalar) {
    this.x /= scalar;
    this.y /= scalar;
  }

  // magnitude
  get magnitude() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  set magnitude(mag) {
    var theta = this.angle; 
    this.x = Math.cos(theta) * mag;
    this.y = Math.sin(theta) * mag;
  }

  // angle (in radians)
  get angle() {
    return Math.atan2(this.y, this.x);
  }

  set angle(theta) {
    var magnitude = this.magnitude;
    this.x = Math.cos(theta) * magnitude;
    this.y = Math.sin(theta) * magnitude;
  }

  // comparison
  equals(other) {
    return (this.x == other.x) && (this.y == other.y);
  }

  // advanced operations
  normalize() {
    this.magnitude = 1;
  }

  dist(other) {
    return this.sub(other).magnitude;
  }

  dot(other) {
    return this.x * other.x + this.y * other.y;
  }

  // Utilities
  copy() {
    return new Vector(this.x, this.y);
  }

  toString() {
    return '[' + this.x + ', ' + this.y + ']';
  }
}