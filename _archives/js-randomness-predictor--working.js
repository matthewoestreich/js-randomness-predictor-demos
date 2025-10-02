(function(global2, factory) {
  typeof exports === "object" && typeof module !== "undefined" ? module.exports = factory() : typeof define === "function" && define.amd ? define(factory) : (global2 = typeof globalThis !== "undefined" ? globalThis : global2 || self, global2.JSRandomnessPredictor = factory());
})(this, (function() {
  "use strict";
  function _mergeNamespaces(n, m) {
    for (var i = 0; i < m.length; i++) {
      const e = m[i];
      if (typeof e !== "string" && !Array.isArray(e)) {
        for (const k in e) {
          if (k !== "default" && !(k in n)) {
            const d = Object.getOwnPropertyDescriptor(e, k);
            if (d) {
              Object.defineProperty(n, k, d.get ? d : {
                enumerable: true,
                get: () => e[k]
              });
            }
          }
        }
      }
    }
    return Object.freeze(Object.defineProperty(n, Symbol.toStringTag, { value: "Module" }));
  }
  var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
  function getDefaultExportFromCjs(x) {
    return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
  }
  function getAugmentedNamespace(n) {
    if (Object.prototype.hasOwnProperty.call(n, "__esModule")) return n;
    var f = n.default;
    if (typeof f == "function") {
      var a = function a2() {
        var isInstance = false;
        try {
          isInstance = this instanceof a2;
        } catch {
        }
        if (isInstance) {
          return Reflect.construct(f, arguments, this.constructor);
        }
        return f.apply(this, arguments);
      };
      a.prototype = f.prototype;
    } else a = {};
    Object.defineProperty(a, "__esModule", { value: true });
    Object.keys(n).forEach(function(k) {
      var d = Object.getOwnPropertyDescriptor(n, k);
      Object.defineProperty(a, k, d.get ? d : {
        enumerable: true,
        get: function() {
          return n[k];
        }
      });
    });
    return a;
  }
  var buffer = {};
  var base64Js = {};
  var hasRequiredBase64Js;
  function requireBase64Js() {
    if (hasRequiredBase64Js) return base64Js;
    hasRequiredBase64Js = 1;
    base64Js.byteLength = byteLength;
    base64Js.toByteArray = toByteArray;
    base64Js.fromByteArray = fromByteArray;
    var lookup = [];
    var revLookup = [];
    var Arr = typeof Uint8Array !== "undefined" ? Uint8Array : Array;
    var code = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    for (var i = 0, len = code.length; i < len; ++i) {
      lookup[i] = code[i];
      revLookup[code.charCodeAt(i)] = i;
    }
    revLookup["-".charCodeAt(0)] = 62;
    revLookup["_".charCodeAt(0)] = 63;
    function getLens(b64) {
      var len2 = b64.length;
      if (len2 % 4 > 0) {
        throw new Error("Invalid string. Length must be a multiple of 4");
      }
      var validLen = b64.indexOf("=");
      if (validLen === -1) validLen = len2;
      var placeHoldersLen = validLen === len2 ? 0 : 4 - validLen % 4;
      return [validLen, placeHoldersLen];
    }
    function byteLength(b64) {
      var lens = getLens(b64);
      var validLen = lens[0];
      var placeHoldersLen = lens[1];
      return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
    }
    function _byteLength(b64, validLen, placeHoldersLen) {
      return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
    }
    function toByteArray(b64) {
      var tmp;
      var lens = getLens(b64);
      var validLen = lens[0];
      var placeHoldersLen = lens[1];
      var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen));
      var curByte = 0;
      var len2 = placeHoldersLen > 0 ? validLen - 4 : validLen;
      var i2;
      for (i2 = 0; i2 < len2; i2 += 4) {
        tmp = revLookup[b64.charCodeAt(i2)] << 18 | revLookup[b64.charCodeAt(i2 + 1)] << 12 | revLookup[b64.charCodeAt(i2 + 2)] << 6 | revLookup[b64.charCodeAt(i2 + 3)];
        arr[curByte++] = tmp >> 16 & 255;
        arr[curByte++] = tmp >> 8 & 255;
        arr[curByte++] = tmp & 255;
      }
      if (placeHoldersLen === 2) {
        tmp = revLookup[b64.charCodeAt(i2)] << 2 | revLookup[b64.charCodeAt(i2 + 1)] >> 4;
        arr[curByte++] = tmp & 255;
      }
      if (placeHoldersLen === 1) {
        tmp = revLookup[b64.charCodeAt(i2)] << 10 | revLookup[b64.charCodeAt(i2 + 1)] << 4 | revLookup[b64.charCodeAt(i2 + 2)] >> 2;
        arr[curByte++] = tmp >> 8 & 255;
        arr[curByte++] = tmp & 255;
      }
      return arr;
    }
    function tripletToBase64(num) {
      return lookup[num >> 18 & 63] + lookup[num >> 12 & 63] + lookup[num >> 6 & 63] + lookup[num & 63];
    }
    function encodeChunk(uint8, start, end) {
      var tmp;
      var output = [];
      for (var i2 = start; i2 < end; i2 += 3) {
        tmp = (uint8[i2] << 16 & 16711680) + (uint8[i2 + 1] << 8 & 65280) + (uint8[i2 + 2] & 255);
        output.push(tripletToBase64(tmp));
      }
      return output.join("");
    }
    function fromByteArray(uint8) {
      var tmp;
      var len2 = uint8.length;
      var extraBytes = len2 % 3;
      var parts = [];
      var maxChunkLength = 16383;
      for (var i2 = 0, len22 = len2 - extraBytes; i2 < len22; i2 += maxChunkLength) {
        parts.push(encodeChunk(uint8, i2, i2 + maxChunkLength > len22 ? len22 : i2 + maxChunkLength));
      }
      if (extraBytes === 1) {
        tmp = uint8[len2 - 1];
        parts.push(
          lookup[tmp >> 2] + lookup[tmp << 4 & 63] + "=="
        );
      } else if (extraBytes === 2) {
        tmp = (uint8[len2 - 2] << 8) + uint8[len2 - 1];
        parts.push(
          lookup[tmp >> 10] + lookup[tmp >> 4 & 63] + lookup[tmp << 2 & 63] + "="
        );
      }
      return parts.join("");
    }
    return base64Js;
  }
  var ieee754 = {};
  /*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
  var hasRequiredIeee754;
  function requireIeee754() {
    if (hasRequiredIeee754) return ieee754;
    hasRequiredIeee754 = 1;
    ieee754.read = function(buffer2, offset, isLE, mLen, nBytes) {
      var e, m;
      var eLen = nBytes * 8 - mLen - 1;
      var eMax = (1 << eLen) - 1;
      var eBias = eMax >> 1;
      var nBits = -7;
      var i = isLE ? nBytes - 1 : 0;
      var d = isLE ? -1 : 1;
      var s = buffer2[offset + i];
      i += d;
      e = s & (1 << -nBits) - 1;
      s >>= -nBits;
      nBits += eLen;
      for (; nBits > 0; e = e * 256 + buffer2[offset + i], i += d, nBits -= 8) {
      }
      m = e & (1 << -nBits) - 1;
      e >>= -nBits;
      nBits += mLen;
      for (; nBits > 0; m = m * 256 + buffer2[offset + i], i += d, nBits -= 8) {
      }
      if (e === 0) {
        e = 1 - eBias;
      } else if (e === eMax) {
        return m ? NaN : (s ? -1 : 1) * Infinity;
      } else {
        m = m + Math.pow(2, mLen);
        e = e - eBias;
      }
      return (s ? -1 : 1) * m * Math.pow(2, e - mLen);
    };
    ieee754.write = function(buffer2, value, offset, isLE, mLen, nBytes) {
      var e, m, c;
      var eLen = nBytes * 8 - mLen - 1;
      var eMax = (1 << eLen) - 1;
      var eBias = eMax >> 1;
      var rt = mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0;
      var i = isLE ? 0 : nBytes - 1;
      var d = isLE ? 1 : -1;
      var s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
      value = Math.abs(value);
      if (isNaN(value) || value === Infinity) {
        m = isNaN(value) ? 1 : 0;
        e = eMax;
      } else {
        e = Math.floor(Math.log(value) / Math.LN2);
        if (value * (c = Math.pow(2, -e)) < 1) {
          e--;
          c *= 2;
        }
        if (e + eBias >= 1) {
          value += rt / c;
        } else {
          value += rt * Math.pow(2, 1 - eBias);
        }
        if (value * c >= 2) {
          e++;
          c /= 2;
        }
        if (e + eBias >= eMax) {
          m = 0;
          e = eMax;
        } else if (e + eBias >= 1) {
          m = (value * c - 1) * Math.pow(2, mLen);
          e = e + eBias;
        } else {
          m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
          e = 0;
        }
      }
      for (; mLen >= 8; buffer2[offset + i] = m & 255, i += d, m /= 256, mLen -= 8) {
      }
      e = e << mLen | m;
      eLen += mLen;
      for (; eLen > 0; buffer2[offset + i] = e & 255, i += d, e /= 256, eLen -= 8) {
      }
      buffer2[offset + i - d] |= s * 128;
    };
    return ieee754;
  }
  /*!
   * The buffer module from node.js, for the browser.
   *
   * @author   Feross Aboukhadijeh <https://feross.org>
   * @license  MIT
   */
  var hasRequiredBuffer;
  function requireBuffer() {
    if (hasRequiredBuffer) return buffer;
    hasRequiredBuffer = 1;
    (function(exports2) {
      const base64 = requireBase64Js();
      const ieee7542 = requireIeee754();
      const customInspectSymbol = typeof Symbol === "function" && typeof Symbol["for"] === "function" ? Symbol["for"]("nodejs.util.inspect.custom") : null;
      exports2.Buffer = Buffer;
      exports2.SlowBuffer = SlowBuffer;
      exports2.INSPECT_MAX_BYTES = 50;
      const K_MAX_LENGTH = 2147483647;
      exports2.kMaxLength = K_MAX_LENGTH;
      Buffer.TYPED_ARRAY_SUPPORT = typedArraySupport();
      if (!Buffer.TYPED_ARRAY_SUPPORT && typeof console !== "undefined" && typeof console.error === "function") {
        console.error(
          "This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."
        );
      }
      function typedArraySupport() {
        try {
          const arr = new Uint8Array(1);
          const proto = { foo: function() {
            return 42;
          } };
          Object.setPrototypeOf(proto, Uint8Array.prototype);
          Object.setPrototypeOf(arr, proto);
          return arr.foo() === 42;
        } catch (e) {
          return false;
        }
      }
      Object.defineProperty(Buffer.prototype, "parent", {
        enumerable: true,
        get: function() {
          if (!Buffer.isBuffer(this)) return void 0;
          return this.buffer;
        }
      });
      Object.defineProperty(Buffer.prototype, "offset", {
        enumerable: true,
        get: function() {
          if (!Buffer.isBuffer(this)) return void 0;
          return this.byteOffset;
        }
      });
      function createBuffer(length) {
        if (length > K_MAX_LENGTH) {
          throw new RangeError('The value "' + length + '" is invalid for option "size"');
        }
        const buf = new Uint8Array(length);
        Object.setPrototypeOf(buf, Buffer.prototype);
        return buf;
      }
      function Buffer(arg, encodingOrOffset, length) {
        if (typeof arg === "number") {
          if (typeof encodingOrOffset === "string") {
            throw new TypeError(
              'The "string" argument must be of type string. Received type number'
            );
          }
          return allocUnsafe(arg);
        }
        return from(arg, encodingOrOffset, length);
      }
      Buffer.poolSize = 8192;
      function from(value, encodingOrOffset, length) {
        if (typeof value === "string") {
          return fromString(value, encodingOrOffset);
        }
        if (ArrayBuffer.isView(value)) {
          return fromArrayView(value);
        }
        if (value == null) {
          throw new TypeError(
            "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof value
          );
        }
        if (isInstance(value, ArrayBuffer) || value && isInstance(value.buffer, ArrayBuffer)) {
          return fromArrayBuffer(value, encodingOrOffset, length);
        }
        if (typeof SharedArrayBuffer !== "undefined" && (isInstance(value, SharedArrayBuffer) || value && isInstance(value.buffer, SharedArrayBuffer))) {
          return fromArrayBuffer(value, encodingOrOffset, length);
        }
        if (typeof value === "number") {
          throw new TypeError(
            'The "value" argument must not be of type number. Received type number'
          );
        }
        const valueOf = value.valueOf && value.valueOf();
        if (valueOf != null && valueOf !== value) {
          return Buffer.from(valueOf, encodingOrOffset, length);
        }
        const b = fromObject(value);
        if (b) return b;
        if (typeof Symbol !== "undefined" && Symbol.toPrimitive != null && typeof value[Symbol.toPrimitive] === "function") {
          return Buffer.from(value[Symbol.toPrimitive]("string"), encodingOrOffset, length);
        }
        throw new TypeError(
          "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof value
        );
      }
      Buffer.from = function(value, encodingOrOffset, length) {
        return from(value, encodingOrOffset, length);
      };
      Object.setPrototypeOf(Buffer.prototype, Uint8Array.prototype);
      Object.setPrototypeOf(Buffer, Uint8Array);
      function assertSize(size) {
        if (typeof size !== "number") {
          throw new TypeError('"size" argument must be of type number');
        } else if (size < 0) {
          throw new RangeError('The value "' + size + '" is invalid for option "size"');
        }
      }
      function alloc(size, fill, encoding) {
        assertSize(size);
        if (size <= 0) {
          return createBuffer(size);
        }
        if (fill !== void 0) {
          return typeof encoding === "string" ? createBuffer(size).fill(fill, encoding) : createBuffer(size).fill(fill);
        }
        return createBuffer(size);
      }
      Buffer.alloc = function(size, fill, encoding) {
        return alloc(size, fill, encoding);
      };
      function allocUnsafe(size) {
        assertSize(size);
        return createBuffer(size < 0 ? 0 : checked(size) | 0);
      }
      Buffer.allocUnsafe = function(size) {
        return allocUnsafe(size);
      };
      Buffer.allocUnsafeSlow = function(size) {
        return allocUnsafe(size);
      };
      function fromString(string, encoding) {
        if (typeof encoding !== "string" || encoding === "") {
          encoding = "utf8";
        }
        if (!Buffer.isEncoding(encoding)) {
          throw new TypeError("Unknown encoding: " + encoding);
        }
        const length = byteLength(string, encoding) | 0;
        let buf = createBuffer(length);
        const actual = buf.write(string, encoding);
        if (actual !== length) {
          buf = buf.slice(0, actual);
        }
        return buf;
      }
      function fromArrayLike(array) {
        const length = array.length < 0 ? 0 : checked(array.length) | 0;
        const buf = createBuffer(length);
        for (let i = 0; i < length; i += 1) {
          buf[i] = array[i] & 255;
        }
        return buf;
      }
      function fromArrayView(arrayView) {
        if (isInstance(arrayView, Uint8Array)) {
          const copy = new Uint8Array(arrayView);
          return fromArrayBuffer(copy.buffer, copy.byteOffset, copy.byteLength);
        }
        return fromArrayLike(arrayView);
      }
      function fromArrayBuffer(array, byteOffset, length) {
        if (byteOffset < 0 || array.byteLength < byteOffset) {
          throw new RangeError('"offset" is outside of buffer bounds');
        }
        if (array.byteLength < byteOffset + (length || 0)) {
          throw new RangeError('"length" is outside of buffer bounds');
        }
        let buf;
        if (byteOffset === void 0 && length === void 0) {
          buf = new Uint8Array(array);
        } else if (length === void 0) {
          buf = new Uint8Array(array, byteOffset);
        } else {
          buf = new Uint8Array(array, byteOffset, length);
        }
        Object.setPrototypeOf(buf, Buffer.prototype);
        return buf;
      }
      function fromObject(obj) {
        if (Buffer.isBuffer(obj)) {
          const len = checked(obj.length) | 0;
          const buf = createBuffer(len);
          if (buf.length === 0) {
            return buf;
          }
          obj.copy(buf, 0, 0, len);
          return buf;
        }
        if (obj.length !== void 0) {
          if (typeof obj.length !== "number" || numberIsNaN(obj.length)) {
            return createBuffer(0);
          }
          return fromArrayLike(obj);
        }
        if (obj.type === "Buffer" && Array.isArray(obj.data)) {
          return fromArrayLike(obj.data);
        }
      }
      function checked(length) {
        if (length >= K_MAX_LENGTH) {
          throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + K_MAX_LENGTH.toString(16) + " bytes");
        }
        return length | 0;
      }
      function SlowBuffer(length) {
        if (+length != length) {
          length = 0;
        }
        return Buffer.alloc(+length);
      }
      Buffer.isBuffer = function isBuffer(b) {
        return b != null && b._isBuffer === true && b !== Buffer.prototype;
      };
      Buffer.compare = function compare(a, b) {
        if (isInstance(a, Uint8Array)) a = Buffer.from(a, a.offset, a.byteLength);
        if (isInstance(b, Uint8Array)) b = Buffer.from(b, b.offset, b.byteLength);
        if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
          throw new TypeError(
            'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
          );
        }
        if (a === b) return 0;
        let x = a.length;
        let y = b.length;
        for (let i = 0, len = Math.min(x, y); i < len; ++i) {
          if (a[i] !== b[i]) {
            x = a[i];
            y = b[i];
            break;
          }
        }
        if (x < y) return -1;
        if (y < x) return 1;
        return 0;
      };
      Buffer.isEncoding = function isEncoding(encoding) {
        switch (String(encoding).toLowerCase()) {
          case "hex":
          case "utf8":
          case "utf-8":
          case "ascii":
          case "latin1":
          case "binary":
          case "base64":
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return true;
          default:
            return false;
        }
      };
      Buffer.concat = function concat(list, length) {
        if (!Array.isArray(list)) {
          throw new TypeError('"list" argument must be an Array of Buffers');
        }
        if (list.length === 0) {
          return Buffer.alloc(0);
        }
        let i;
        if (length === void 0) {
          length = 0;
          for (i = 0; i < list.length; ++i) {
            length += list[i].length;
          }
        }
        const buffer2 = Buffer.allocUnsafe(length);
        let pos = 0;
        for (i = 0; i < list.length; ++i) {
          let buf = list[i];
          if (isInstance(buf, Uint8Array)) {
            if (pos + buf.length > buffer2.length) {
              if (!Buffer.isBuffer(buf)) buf = Buffer.from(buf);
              buf.copy(buffer2, pos);
            } else {
              Uint8Array.prototype.set.call(
                buffer2,
                buf,
                pos
              );
            }
          } else if (!Buffer.isBuffer(buf)) {
            throw new TypeError('"list" argument must be an Array of Buffers');
          } else {
            buf.copy(buffer2, pos);
          }
          pos += buf.length;
        }
        return buffer2;
      };
      function byteLength(string, encoding) {
        if (Buffer.isBuffer(string)) {
          return string.length;
        }
        if (ArrayBuffer.isView(string) || isInstance(string, ArrayBuffer)) {
          return string.byteLength;
        }
        if (typeof string !== "string") {
          throw new TypeError(
            'The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof string
          );
        }
        const len = string.length;
        const mustMatch = arguments.length > 2 && arguments[2] === true;
        if (!mustMatch && len === 0) return 0;
        let loweredCase = false;
        for (; ; ) {
          switch (encoding) {
            case "ascii":
            case "latin1":
            case "binary":
              return len;
            case "utf8":
            case "utf-8":
              return utf8ToBytes(string).length;
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              return len * 2;
            case "hex":
              return len >>> 1;
            case "base64":
              return base64ToBytes(string).length;
            default:
              if (loweredCase) {
                return mustMatch ? -1 : utf8ToBytes(string).length;
              }
              encoding = ("" + encoding).toLowerCase();
              loweredCase = true;
          }
        }
      }
      Buffer.byteLength = byteLength;
      function slowToString(encoding, start, end) {
        let loweredCase = false;
        if (start === void 0 || start < 0) {
          start = 0;
        }
        if (start > this.length) {
          return "";
        }
        if (end === void 0 || end > this.length) {
          end = this.length;
        }
        if (end <= 0) {
          return "";
        }
        end >>>= 0;
        start >>>= 0;
        if (end <= start) {
          return "";
        }
        if (!encoding) encoding = "utf8";
        while (true) {
          switch (encoding) {
            case "hex":
              return hexSlice(this, start, end);
            case "utf8":
            case "utf-8":
              return utf8Slice(this, start, end);
            case "ascii":
              return asciiSlice(this, start, end);
            case "latin1":
            case "binary":
              return latin1Slice(this, start, end);
            case "base64":
              return base64Slice(this, start, end);
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              return utf16leSlice(this, start, end);
            default:
              if (loweredCase) throw new TypeError("Unknown encoding: " + encoding);
              encoding = (encoding + "").toLowerCase();
              loweredCase = true;
          }
        }
      }
      Buffer.prototype._isBuffer = true;
      function swap(b, n, m) {
        const i = b[n];
        b[n] = b[m];
        b[m] = i;
      }
      Buffer.prototype.swap16 = function swap16() {
        const len = this.length;
        if (len % 2 !== 0) {
          throw new RangeError("Buffer size must be a multiple of 16-bits");
        }
        for (let i = 0; i < len; i += 2) {
          swap(this, i, i + 1);
        }
        return this;
      };
      Buffer.prototype.swap32 = function swap32() {
        const len = this.length;
        if (len % 4 !== 0) {
          throw new RangeError("Buffer size must be a multiple of 32-bits");
        }
        for (let i = 0; i < len; i += 4) {
          swap(this, i, i + 3);
          swap(this, i + 1, i + 2);
        }
        return this;
      };
      Buffer.prototype.swap64 = function swap64() {
        const len = this.length;
        if (len % 8 !== 0) {
          throw new RangeError("Buffer size must be a multiple of 64-bits");
        }
        for (let i = 0; i < len; i += 8) {
          swap(this, i, i + 7);
          swap(this, i + 1, i + 6);
          swap(this, i + 2, i + 5);
          swap(this, i + 3, i + 4);
        }
        return this;
      };
      Buffer.prototype.toString = function toString() {
        const length = this.length;
        if (length === 0) return "";
        if (arguments.length === 0) return utf8Slice(this, 0, length);
        return slowToString.apply(this, arguments);
      };
      Buffer.prototype.toLocaleString = Buffer.prototype.toString;
      Buffer.prototype.equals = function equals(b) {
        if (!Buffer.isBuffer(b)) throw new TypeError("Argument must be a Buffer");
        if (this === b) return true;
        return Buffer.compare(this, b) === 0;
      };
      Buffer.prototype.inspect = function inspect() {
        let str = "";
        const max = exports2.INSPECT_MAX_BYTES;
        str = this.toString("hex", 0, max).replace(/(.{2})/g, "$1 ").trim();
        if (this.length > max) str += " ... ";
        return "<Buffer " + str + ">";
      };
      if (customInspectSymbol) {
        Buffer.prototype[customInspectSymbol] = Buffer.prototype.inspect;
      }
      Buffer.prototype.compare = function compare(target, start, end, thisStart, thisEnd) {
        if (isInstance(target, Uint8Array)) {
          target = Buffer.from(target, target.offset, target.byteLength);
        }
        if (!Buffer.isBuffer(target)) {
          throw new TypeError(
            'The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof target
          );
        }
        if (start === void 0) {
          start = 0;
        }
        if (end === void 0) {
          end = target ? target.length : 0;
        }
        if (thisStart === void 0) {
          thisStart = 0;
        }
        if (thisEnd === void 0) {
          thisEnd = this.length;
        }
        if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
          throw new RangeError("out of range index");
        }
        if (thisStart >= thisEnd && start >= end) {
          return 0;
        }
        if (thisStart >= thisEnd) {
          return -1;
        }
        if (start >= end) {
          return 1;
        }
        start >>>= 0;
        end >>>= 0;
        thisStart >>>= 0;
        thisEnd >>>= 0;
        if (this === target) return 0;
        let x = thisEnd - thisStart;
        let y = end - start;
        const len = Math.min(x, y);
        const thisCopy = this.slice(thisStart, thisEnd);
        const targetCopy = target.slice(start, end);
        for (let i = 0; i < len; ++i) {
          if (thisCopy[i] !== targetCopy[i]) {
            x = thisCopy[i];
            y = targetCopy[i];
            break;
          }
        }
        if (x < y) return -1;
        if (y < x) return 1;
        return 0;
      };
      function bidirectionalIndexOf(buffer2, val, byteOffset, encoding, dir) {
        if (buffer2.length === 0) return -1;
        if (typeof byteOffset === "string") {
          encoding = byteOffset;
          byteOffset = 0;
        } else if (byteOffset > 2147483647) {
          byteOffset = 2147483647;
        } else if (byteOffset < -2147483648) {
          byteOffset = -2147483648;
        }
        byteOffset = +byteOffset;
        if (numberIsNaN(byteOffset)) {
          byteOffset = dir ? 0 : buffer2.length - 1;
        }
        if (byteOffset < 0) byteOffset = buffer2.length + byteOffset;
        if (byteOffset >= buffer2.length) {
          if (dir) return -1;
          else byteOffset = buffer2.length - 1;
        } else if (byteOffset < 0) {
          if (dir) byteOffset = 0;
          else return -1;
        }
        if (typeof val === "string") {
          val = Buffer.from(val, encoding);
        }
        if (Buffer.isBuffer(val)) {
          if (val.length === 0) {
            return -1;
          }
          return arrayIndexOf(buffer2, val, byteOffset, encoding, dir);
        } else if (typeof val === "number") {
          val = val & 255;
          if (typeof Uint8Array.prototype.indexOf === "function") {
            if (dir) {
              return Uint8Array.prototype.indexOf.call(buffer2, val, byteOffset);
            } else {
              return Uint8Array.prototype.lastIndexOf.call(buffer2, val, byteOffset);
            }
          }
          return arrayIndexOf(buffer2, [val], byteOffset, encoding, dir);
        }
        throw new TypeError("val must be string, number or Buffer");
      }
      function arrayIndexOf(arr, val, byteOffset, encoding, dir) {
        let indexSize = 1;
        let arrLength = arr.length;
        let valLength = val.length;
        if (encoding !== void 0) {
          encoding = String(encoding).toLowerCase();
          if (encoding === "ucs2" || encoding === "ucs-2" || encoding === "utf16le" || encoding === "utf-16le") {
            if (arr.length < 2 || val.length < 2) {
              return -1;
            }
            indexSize = 2;
            arrLength /= 2;
            valLength /= 2;
            byteOffset /= 2;
          }
        }
        function read(buf, i2) {
          if (indexSize === 1) {
            return buf[i2];
          } else {
            return buf.readUInt16BE(i2 * indexSize);
          }
        }
        let i;
        if (dir) {
          let foundIndex = -1;
          for (i = byteOffset; i < arrLength; i++) {
            if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
              if (foundIndex === -1) foundIndex = i;
              if (i - foundIndex + 1 === valLength) return foundIndex * indexSize;
            } else {
              if (foundIndex !== -1) i -= i - foundIndex;
              foundIndex = -1;
            }
          }
        } else {
          if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength;
          for (i = byteOffset; i >= 0; i--) {
            let found = true;
            for (let j = 0; j < valLength; j++) {
              if (read(arr, i + j) !== read(val, j)) {
                found = false;
                break;
              }
            }
            if (found) return i;
          }
        }
        return -1;
      }
      Buffer.prototype.includes = function includes(val, byteOffset, encoding) {
        return this.indexOf(val, byteOffset, encoding) !== -1;
      };
      Buffer.prototype.indexOf = function indexOf(val, byteOffset, encoding) {
        return bidirectionalIndexOf(this, val, byteOffset, encoding, true);
      };
      Buffer.prototype.lastIndexOf = function lastIndexOf(val, byteOffset, encoding) {
        return bidirectionalIndexOf(this, val, byteOffset, encoding, false);
      };
      function hexWrite(buf, string, offset, length) {
        offset = Number(offset) || 0;
        const remaining = buf.length - offset;
        if (!length) {
          length = remaining;
        } else {
          length = Number(length);
          if (length > remaining) {
            length = remaining;
          }
        }
        const strLen = string.length;
        if (length > strLen / 2) {
          length = strLen / 2;
        }
        let i;
        for (i = 0; i < length; ++i) {
          const parsed = parseInt(string.substr(i * 2, 2), 16);
          if (numberIsNaN(parsed)) return i;
          buf[offset + i] = parsed;
        }
        return i;
      }
      function utf8Write(buf, string, offset, length) {
        return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length);
      }
      function asciiWrite(buf, string, offset, length) {
        return blitBuffer(asciiToBytes(string), buf, offset, length);
      }
      function base64Write(buf, string, offset, length) {
        return blitBuffer(base64ToBytes(string), buf, offset, length);
      }
      function ucs2Write(buf, string, offset, length) {
        return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length);
      }
      Buffer.prototype.write = function write(string, offset, length, encoding) {
        if (offset === void 0) {
          encoding = "utf8";
          length = this.length;
          offset = 0;
        } else if (length === void 0 && typeof offset === "string") {
          encoding = offset;
          length = this.length;
          offset = 0;
        } else if (isFinite(offset)) {
          offset = offset >>> 0;
          if (isFinite(length)) {
            length = length >>> 0;
            if (encoding === void 0) encoding = "utf8";
          } else {
            encoding = length;
            length = void 0;
          }
        } else {
          throw new Error(
            "Buffer.write(string, encoding, offset[, length]) is no longer supported"
          );
        }
        const remaining = this.length - offset;
        if (length === void 0 || length > remaining) length = remaining;
        if (string.length > 0 && (length < 0 || offset < 0) || offset > this.length) {
          throw new RangeError("Attempt to write outside buffer bounds");
        }
        if (!encoding) encoding = "utf8";
        let loweredCase = false;
        for (; ; ) {
          switch (encoding) {
            case "hex":
              return hexWrite(this, string, offset, length);
            case "utf8":
            case "utf-8":
              return utf8Write(this, string, offset, length);
            case "ascii":
            case "latin1":
            case "binary":
              return asciiWrite(this, string, offset, length);
            case "base64":
              return base64Write(this, string, offset, length);
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              return ucs2Write(this, string, offset, length);
            default:
              if (loweredCase) throw new TypeError("Unknown encoding: " + encoding);
              encoding = ("" + encoding).toLowerCase();
              loweredCase = true;
          }
        }
      };
      Buffer.prototype.toJSON = function toJSON() {
        return {
          type: "Buffer",
          data: Array.prototype.slice.call(this._arr || this, 0)
        };
      };
      function base64Slice(buf, start, end) {
        if (start === 0 && end === buf.length) {
          return base64.fromByteArray(buf);
        } else {
          return base64.fromByteArray(buf.slice(start, end));
        }
      }
      function utf8Slice(buf, start, end) {
        end = Math.min(buf.length, end);
        const res = [];
        let i = start;
        while (i < end) {
          const firstByte = buf[i];
          let codePoint = null;
          let bytesPerSequence = firstByte > 239 ? 4 : firstByte > 223 ? 3 : firstByte > 191 ? 2 : 1;
          if (i + bytesPerSequence <= end) {
            let secondByte, thirdByte, fourthByte, tempCodePoint;
            switch (bytesPerSequence) {
              case 1:
                if (firstByte < 128) {
                  codePoint = firstByte;
                }
                break;
              case 2:
                secondByte = buf[i + 1];
                if ((secondByte & 192) === 128) {
                  tempCodePoint = (firstByte & 31) << 6 | secondByte & 63;
                  if (tempCodePoint > 127) {
                    codePoint = tempCodePoint;
                  }
                }
                break;
              case 3:
                secondByte = buf[i + 1];
                thirdByte = buf[i + 2];
                if ((secondByte & 192) === 128 && (thirdByte & 192) === 128) {
                  tempCodePoint = (firstByte & 15) << 12 | (secondByte & 63) << 6 | thirdByte & 63;
                  if (tempCodePoint > 2047 && (tempCodePoint < 55296 || tempCodePoint > 57343)) {
                    codePoint = tempCodePoint;
                  }
                }
                break;
              case 4:
                secondByte = buf[i + 1];
                thirdByte = buf[i + 2];
                fourthByte = buf[i + 3];
                if ((secondByte & 192) === 128 && (thirdByte & 192) === 128 && (fourthByte & 192) === 128) {
                  tempCodePoint = (firstByte & 15) << 18 | (secondByte & 63) << 12 | (thirdByte & 63) << 6 | fourthByte & 63;
                  if (tempCodePoint > 65535 && tempCodePoint < 1114112) {
                    codePoint = tempCodePoint;
                  }
                }
            }
          }
          if (codePoint === null) {
            codePoint = 65533;
            bytesPerSequence = 1;
          } else if (codePoint > 65535) {
            codePoint -= 65536;
            res.push(codePoint >>> 10 & 1023 | 55296);
            codePoint = 56320 | codePoint & 1023;
          }
          res.push(codePoint);
          i += bytesPerSequence;
        }
        return decodeCodePointsArray(res);
      }
      const MAX_ARGUMENTS_LENGTH = 4096;
      function decodeCodePointsArray(codePoints) {
        const len = codePoints.length;
        if (len <= MAX_ARGUMENTS_LENGTH) {
          return String.fromCharCode.apply(String, codePoints);
        }
        let res = "";
        let i = 0;
        while (i < len) {
          res += String.fromCharCode.apply(
            String,
            codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
          );
        }
        return res;
      }
      function asciiSlice(buf, start, end) {
        let ret = "";
        end = Math.min(buf.length, end);
        for (let i = start; i < end; ++i) {
          ret += String.fromCharCode(buf[i] & 127);
        }
        return ret;
      }
      function latin1Slice(buf, start, end) {
        let ret = "";
        end = Math.min(buf.length, end);
        for (let i = start; i < end; ++i) {
          ret += String.fromCharCode(buf[i]);
        }
        return ret;
      }
      function hexSlice(buf, start, end) {
        const len = buf.length;
        if (!start || start < 0) start = 0;
        if (!end || end < 0 || end > len) end = len;
        let out = "";
        for (let i = start; i < end; ++i) {
          out += hexSliceLookupTable[buf[i]];
        }
        return out;
      }
      function utf16leSlice(buf, start, end) {
        const bytes = buf.slice(start, end);
        let res = "";
        for (let i = 0; i < bytes.length - 1; i += 2) {
          res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256);
        }
        return res;
      }
      Buffer.prototype.slice = function slice(start, end) {
        const len = this.length;
        start = ~~start;
        end = end === void 0 ? len : ~~end;
        if (start < 0) {
          start += len;
          if (start < 0) start = 0;
        } else if (start > len) {
          start = len;
        }
        if (end < 0) {
          end += len;
          if (end < 0) end = 0;
        } else if (end > len) {
          end = len;
        }
        if (end < start) end = start;
        const newBuf = this.subarray(start, end);
        Object.setPrototypeOf(newBuf, Buffer.prototype);
        return newBuf;
      };
      function checkOffset(offset, ext, length) {
        if (offset % 1 !== 0 || offset < 0) throw new RangeError("offset is not uint");
        if (offset + ext > length) throw new RangeError("Trying to access beyond buffer length");
      }
      Buffer.prototype.readUintLE = Buffer.prototype.readUIntLE = function readUIntLE(offset, byteLength2, noAssert) {
        offset = offset >>> 0;
        byteLength2 = byteLength2 >>> 0;
        if (!noAssert) checkOffset(offset, byteLength2, this.length);
        let val = this[offset];
        let mul = 1;
        let i = 0;
        while (++i < byteLength2 && (mul *= 256)) {
          val += this[offset + i] * mul;
        }
        return val;
      };
      Buffer.prototype.readUintBE = Buffer.prototype.readUIntBE = function readUIntBE(offset, byteLength2, noAssert) {
        offset = offset >>> 0;
        byteLength2 = byteLength2 >>> 0;
        if (!noAssert) {
          checkOffset(offset, byteLength2, this.length);
        }
        let val = this[offset + --byteLength2];
        let mul = 1;
        while (byteLength2 > 0 && (mul *= 256)) {
          val += this[offset + --byteLength2] * mul;
        }
        return val;
      };
      Buffer.prototype.readUint8 = Buffer.prototype.readUInt8 = function readUInt8(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 1, this.length);
        return this[offset];
      };
      Buffer.prototype.readUint16LE = Buffer.prototype.readUInt16LE = function readUInt16LE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 2, this.length);
        return this[offset] | this[offset + 1] << 8;
      };
      Buffer.prototype.readUint16BE = Buffer.prototype.readUInt16BE = function readUInt16BE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 2, this.length);
        return this[offset] << 8 | this[offset + 1];
      };
      Buffer.prototype.readUint32LE = Buffer.prototype.readUInt32LE = function readUInt32LE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 4, this.length);
        return (this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16) + this[offset + 3] * 16777216;
      };
      Buffer.prototype.readUint32BE = Buffer.prototype.readUInt32BE = function readUInt32BE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 4, this.length);
        return this[offset] * 16777216 + (this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3]);
      };
      Buffer.prototype.readBigUInt64LE = defineBigIntMethod(function readBigUInt64LE(offset) {
        offset = offset >>> 0;
        validateNumber(offset, "offset");
        const first = this[offset];
        const last = this[offset + 7];
        if (first === void 0 || last === void 0) {
          boundsError(offset, this.length - 8);
        }
        const lo = first + this[++offset] * 2 ** 8 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 24;
        const hi = this[++offset] + this[++offset] * 2 ** 8 + this[++offset] * 2 ** 16 + last * 2 ** 24;
        return BigInt(lo) + (BigInt(hi) << BigInt(32));
      });
      Buffer.prototype.readBigUInt64BE = defineBigIntMethod(function readBigUInt64BE(offset) {
        offset = offset >>> 0;
        validateNumber(offset, "offset");
        const first = this[offset];
        const last = this[offset + 7];
        if (first === void 0 || last === void 0) {
          boundsError(offset, this.length - 8);
        }
        const hi = first * 2 ** 24 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + this[++offset];
        const lo = this[++offset] * 2 ** 24 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + last;
        return (BigInt(hi) << BigInt(32)) + BigInt(lo);
      });
      Buffer.prototype.readIntLE = function readIntLE(offset, byteLength2, noAssert) {
        offset = offset >>> 0;
        byteLength2 = byteLength2 >>> 0;
        if (!noAssert) checkOffset(offset, byteLength2, this.length);
        let val = this[offset];
        let mul = 1;
        let i = 0;
        while (++i < byteLength2 && (mul *= 256)) {
          val += this[offset + i] * mul;
        }
        mul *= 128;
        if (val >= mul) val -= Math.pow(2, 8 * byteLength2);
        return val;
      };
      Buffer.prototype.readIntBE = function readIntBE(offset, byteLength2, noAssert) {
        offset = offset >>> 0;
        byteLength2 = byteLength2 >>> 0;
        if (!noAssert) checkOffset(offset, byteLength2, this.length);
        let i = byteLength2;
        let mul = 1;
        let val = this[offset + --i];
        while (i > 0 && (mul *= 256)) {
          val += this[offset + --i] * mul;
        }
        mul *= 128;
        if (val >= mul) val -= Math.pow(2, 8 * byteLength2);
        return val;
      };
      Buffer.prototype.readInt8 = function readInt8(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 1, this.length);
        if (!(this[offset] & 128)) return this[offset];
        return (255 - this[offset] + 1) * -1;
      };
      Buffer.prototype.readInt16LE = function readInt16LE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 2, this.length);
        const val = this[offset] | this[offset + 1] << 8;
        return val & 32768 ? val | 4294901760 : val;
      };
      Buffer.prototype.readInt16BE = function readInt16BE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 2, this.length);
        const val = this[offset + 1] | this[offset] << 8;
        return val & 32768 ? val | 4294901760 : val;
      };
      Buffer.prototype.readInt32LE = function readInt32LE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 4, this.length);
        return this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16 | this[offset + 3] << 24;
      };
      Buffer.prototype.readInt32BE = function readInt32BE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 4, this.length);
        return this[offset] << 24 | this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3];
      };
      Buffer.prototype.readBigInt64LE = defineBigIntMethod(function readBigInt64LE(offset) {
        offset = offset >>> 0;
        validateNumber(offset, "offset");
        const first = this[offset];
        const last = this[offset + 7];
        if (first === void 0 || last === void 0) {
          boundsError(offset, this.length - 8);
        }
        const val = this[offset + 4] + this[offset + 5] * 2 ** 8 + this[offset + 6] * 2 ** 16 + (last << 24);
        return (BigInt(val) << BigInt(32)) + BigInt(first + this[++offset] * 2 ** 8 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 24);
      });
      Buffer.prototype.readBigInt64BE = defineBigIntMethod(function readBigInt64BE(offset) {
        offset = offset >>> 0;
        validateNumber(offset, "offset");
        const first = this[offset];
        const last = this[offset + 7];
        if (first === void 0 || last === void 0) {
          boundsError(offset, this.length - 8);
        }
        const val = (first << 24) + // Overflow
        this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + this[++offset];
        return (BigInt(val) << BigInt(32)) + BigInt(this[++offset] * 2 ** 24 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + last);
      });
      Buffer.prototype.readFloatLE = function readFloatLE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 4, this.length);
        return ieee7542.read(this, offset, true, 23, 4);
      };
      Buffer.prototype.readFloatBE = function readFloatBE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 4, this.length);
        return ieee7542.read(this, offset, false, 23, 4);
      };
      Buffer.prototype.readDoubleLE = function readDoubleLE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 8, this.length);
        return ieee7542.read(this, offset, true, 52, 8);
      };
      Buffer.prototype.readDoubleBE = function readDoubleBE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 8, this.length);
        return ieee7542.read(this, offset, false, 52, 8);
      };
      function checkInt(buf, value, offset, ext, max, min) {
        if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance');
        if (value > max || value < min) throw new RangeError('"value" argument is out of bounds');
        if (offset + ext > buf.length) throw new RangeError("Index out of range");
      }
      Buffer.prototype.writeUintLE = Buffer.prototype.writeUIntLE = function writeUIntLE(value, offset, byteLength2, noAssert) {
        value = +value;
        offset = offset >>> 0;
        byteLength2 = byteLength2 >>> 0;
        if (!noAssert) {
          const maxBytes = Math.pow(2, 8 * byteLength2) - 1;
          checkInt(this, value, offset, byteLength2, maxBytes, 0);
        }
        let mul = 1;
        let i = 0;
        this[offset] = value & 255;
        while (++i < byteLength2 && (mul *= 256)) {
          this[offset + i] = value / mul & 255;
        }
        return offset + byteLength2;
      };
      Buffer.prototype.writeUintBE = Buffer.prototype.writeUIntBE = function writeUIntBE(value, offset, byteLength2, noAssert) {
        value = +value;
        offset = offset >>> 0;
        byteLength2 = byteLength2 >>> 0;
        if (!noAssert) {
          const maxBytes = Math.pow(2, 8 * byteLength2) - 1;
          checkInt(this, value, offset, byteLength2, maxBytes, 0);
        }
        let i = byteLength2 - 1;
        let mul = 1;
        this[offset + i] = value & 255;
        while (--i >= 0 && (mul *= 256)) {
          this[offset + i] = value / mul & 255;
        }
        return offset + byteLength2;
      };
      Buffer.prototype.writeUint8 = Buffer.prototype.writeUInt8 = function writeUInt8(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) checkInt(this, value, offset, 1, 255, 0);
        this[offset] = value & 255;
        return offset + 1;
      };
      Buffer.prototype.writeUint16LE = Buffer.prototype.writeUInt16LE = function writeUInt16LE(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) checkInt(this, value, offset, 2, 65535, 0);
        this[offset] = value & 255;
        this[offset + 1] = value >>> 8;
        return offset + 2;
      };
      Buffer.prototype.writeUint16BE = Buffer.prototype.writeUInt16BE = function writeUInt16BE(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) checkInt(this, value, offset, 2, 65535, 0);
        this[offset] = value >>> 8;
        this[offset + 1] = value & 255;
        return offset + 2;
      };
      Buffer.prototype.writeUint32LE = Buffer.prototype.writeUInt32LE = function writeUInt32LE(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) checkInt(this, value, offset, 4, 4294967295, 0);
        this[offset + 3] = value >>> 24;
        this[offset + 2] = value >>> 16;
        this[offset + 1] = value >>> 8;
        this[offset] = value & 255;
        return offset + 4;
      };
      Buffer.prototype.writeUint32BE = Buffer.prototype.writeUInt32BE = function writeUInt32BE(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) checkInt(this, value, offset, 4, 4294967295, 0);
        this[offset] = value >>> 24;
        this[offset + 1] = value >>> 16;
        this[offset + 2] = value >>> 8;
        this[offset + 3] = value & 255;
        return offset + 4;
      };
      function wrtBigUInt64LE(buf, value, offset, min, max) {
        checkIntBI(value, min, max, buf, offset, 7);
        let lo = Number(value & BigInt(4294967295));
        buf[offset++] = lo;
        lo = lo >> 8;
        buf[offset++] = lo;
        lo = lo >> 8;
        buf[offset++] = lo;
        lo = lo >> 8;
        buf[offset++] = lo;
        let hi = Number(value >> BigInt(32) & BigInt(4294967295));
        buf[offset++] = hi;
        hi = hi >> 8;
        buf[offset++] = hi;
        hi = hi >> 8;
        buf[offset++] = hi;
        hi = hi >> 8;
        buf[offset++] = hi;
        return offset;
      }
      function wrtBigUInt64BE(buf, value, offset, min, max) {
        checkIntBI(value, min, max, buf, offset, 7);
        let lo = Number(value & BigInt(4294967295));
        buf[offset + 7] = lo;
        lo = lo >> 8;
        buf[offset + 6] = lo;
        lo = lo >> 8;
        buf[offset + 5] = lo;
        lo = lo >> 8;
        buf[offset + 4] = lo;
        let hi = Number(value >> BigInt(32) & BigInt(4294967295));
        buf[offset + 3] = hi;
        hi = hi >> 8;
        buf[offset + 2] = hi;
        hi = hi >> 8;
        buf[offset + 1] = hi;
        hi = hi >> 8;
        buf[offset] = hi;
        return offset + 8;
      }
      Buffer.prototype.writeBigUInt64LE = defineBigIntMethod(function writeBigUInt64LE(value, offset = 0) {
        return wrtBigUInt64LE(this, value, offset, BigInt(0), BigInt("0xffffffffffffffff"));
      });
      Buffer.prototype.writeBigUInt64BE = defineBigIntMethod(function writeBigUInt64BE(value, offset = 0) {
        return wrtBigUInt64BE(this, value, offset, BigInt(0), BigInt("0xffffffffffffffff"));
      });
      Buffer.prototype.writeIntLE = function writeIntLE(value, offset, byteLength2, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) {
          const limit = Math.pow(2, 8 * byteLength2 - 1);
          checkInt(this, value, offset, byteLength2, limit - 1, -limit);
        }
        let i = 0;
        let mul = 1;
        let sub = 0;
        this[offset] = value & 255;
        while (++i < byteLength2 && (mul *= 256)) {
          if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
            sub = 1;
          }
          this[offset + i] = (value / mul >> 0) - sub & 255;
        }
        return offset + byteLength2;
      };
      Buffer.prototype.writeIntBE = function writeIntBE(value, offset, byteLength2, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) {
          const limit = Math.pow(2, 8 * byteLength2 - 1);
          checkInt(this, value, offset, byteLength2, limit - 1, -limit);
        }
        let i = byteLength2 - 1;
        let mul = 1;
        let sub = 0;
        this[offset + i] = value & 255;
        while (--i >= 0 && (mul *= 256)) {
          if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
            sub = 1;
          }
          this[offset + i] = (value / mul >> 0) - sub & 255;
        }
        return offset + byteLength2;
      };
      Buffer.prototype.writeInt8 = function writeInt8(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) checkInt(this, value, offset, 1, 127, -128);
        if (value < 0) value = 255 + value + 1;
        this[offset] = value & 255;
        return offset + 1;
      };
      Buffer.prototype.writeInt16LE = function writeInt16LE(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) checkInt(this, value, offset, 2, 32767, -32768);
        this[offset] = value & 255;
        this[offset + 1] = value >>> 8;
        return offset + 2;
      };
      Buffer.prototype.writeInt16BE = function writeInt16BE(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) checkInt(this, value, offset, 2, 32767, -32768);
        this[offset] = value >>> 8;
        this[offset + 1] = value & 255;
        return offset + 2;
      };
      Buffer.prototype.writeInt32LE = function writeInt32LE(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) checkInt(this, value, offset, 4, 2147483647, -2147483648);
        this[offset] = value & 255;
        this[offset + 1] = value >>> 8;
        this[offset + 2] = value >>> 16;
        this[offset + 3] = value >>> 24;
        return offset + 4;
      };
      Buffer.prototype.writeInt32BE = function writeInt32BE(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) checkInt(this, value, offset, 4, 2147483647, -2147483648);
        if (value < 0) value = 4294967295 + value + 1;
        this[offset] = value >>> 24;
        this[offset + 1] = value >>> 16;
        this[offset + 2] = value >>> 8;
        this[offset + 3] = value & 255;
        return offset + 4;
      };
      Buffer.prototype.writeBigInt64LE = defineBigIntMethod(function writeBigInt64LE(value, offset = 0) {
        return wrtBigUInt64LE(this, value, offset, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
      });
      Buffer.prototype.writeBigInt64BE = defineBigIntMethod(function writeBigInt64BE(value, offset = 0) {
        return wrtBigUInt64BE(this, value, offset, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
      });
      function checkIEEE754(buf, value, offset, ext, max, min) {
        if (offset + ext > buf.length) throw new RangeError("Index out of range");
        if (offset < 0) throw new RangeError("Index out of range");
      }
      function writeFloat(buf, value, offset, littleEndian, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) {
          checkIEEE754(buf, value, offset, 4);
        }
        ieee7542.write(buf, value, offset, littleEndian, 23, 4);
        return offset + 4;
      }
      Buffer.prototype.writeFloatLE = function writeFloatLE(value, offset, noAssert) {
        return writeFloat(this, value, offset, true, noAssert);
      };
      Buffer.prototype.writeFloatBE = function writeFloatBE(value, offset, noAssert) {
        return writeFloat(this, value, offset, false, noAssert);
      };
      function writeDouble(buf, value, offset, littleEndian, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) {
          checkIEEE754(buf, value, offset, 8);
        }
        ieee7542.write(buf, value, offset, littleEndian, 52, 8);
        return offset + 8;
      }
      Buffer.prototype.writeDoubleLE = function writeDoubleLE(value, offset, noAssert) {
        return writeDouble(this, value, offset, true, noAssert);
      };
      Buffer.prototype.writeDoubleBE = function writeDoubleBE(value, offset, noAssert) {
        return writeDouble(this, value, offset, false, noAssert);
      };
      Buffer.prototype.copy = function copy(target, targetStart, start, end) {
        if (!Buffer.isBuffer(target)) throw new TypeError("argument should be a Buffer");
        if (!start) start = 0;
        if (!end && end !== 0) end = this.length;
        if (targetStart >= target.length) targetStart = target.length;
        if (!targetStart) targetStart = 0;
        if (end > 0 && end < start) end = start;
        if (end === start) return 0;
        if (target.length === 0 || this.length === 0) return 0;
        if (targetStart < 0) {
          throw new RangeError("targetStart out of bounds");
        }
        if (start < 0 || start >= this.length) throw new RangeError("Index out of range");
        if (end < 0) throw new RangeError("sourceEnd out of bounds");
        if (end > this.length) end = this.length;
        if (target.length - targetStart < end - start) {
          end = target.length - targetStart + start;
        }
        const len = end - start;
        if (this === target && typeof Uint8Array.prototype.copyWithin === "function") {
          this.copyWithin(targetStart, start, end);
        } else {
          Uint8Array.prototype.set.call(
            target,
            this.subarray(start, end),
            targetStart
          );
        }
        return len;
      };
      Buffer.prototype.fill = function fill(val, start, end, encoding) {
        if (typeof val === "string") {
          if (typeof start === "string") {
            encoding = start;
            start = 0;
            end = this.length;
          } else if (typeof end === "string") {
            encoding = end;
            end = this.length;
          }
          if (encoding !== void 0 && typeof encoding !== "string") {
            throw new TypeError("encoding must be a string");
          }
          if (typeof encoding === "string" && !Buffer.isEncoding(encoding)) {
            throw new TypeError("Unknown encoding: " + encoding);
          }
          if (val.length === 1) {
            const code = val.charCodeAt(0);
            if (encoding === "utf8" && code < 128 || encoding === "latin1") {
              val = code;
            }
          }
        } else if (typeof val === "number") {
          val = val & 255;
        } else if (typeof val === "boolean") {
          val = Number(val);
        }
        if (start < 0 || this.length < start || this.length < end) {
          throw new RangeError("Out of range index");
        }
        if (end <= start) {
          return this;
        }
        start = start >>> 0;
        end = end === void 0 ? this.length : end >>> 0;
        if (!val) val = 0;
        let i;
        if (typeof val === "number") {
          for (i = start; i < end; ++i) {
            this[i] = val;
          }
        } else {
          const bytes = Buffer.isBuffer(val) ? val : Buffer.from(val, encoding);
          const len = bytes.length;
          if (len === 0) {
            throw new TypeError('The value "' + val + '" is invalid for argument "value"');
          }
          for (i = 0; i < end - start; ++i) {
            this[i + start] = bytes[i % len];
          }
        }
        return this;
      };
      const errors2 = {};
      function E(sym, getMessage, Base) {
        errors2[sym] = class NodeError extends Base {
          constructor() {
            super();
            Object.defineProperty(this, "message", {
              value: getMessage.apply(this, arguments),
              writable: true,
              configurable: true
            });
            this.name = `${this.name} [${sym}]`;
            this.stack;
            delete this.name;
          }
          get code() {
            return sym;
          }
          set code(value) {
            Object.defineProperty(this, "code", {
              configurable: true,
              enumerable: true,
              value,
              writable: true
            });
          }
          toString() {
            return `${this.name} [${sym}]: ${this.message}`;
          }
        };
      }
      E(
        "ERR_BUFFER_OUT_OF_BOUNDS",
        function(name) {
          if (name) {
            return `${name} is outside of buffer bounds`;
          }
          return "Attempt to access memory outside buffer bounds";
        },
        RangeError
      );
      E(
        "ERR_INVALID_ARG_TYPE",
        function(name, actual) {
          return `The "${name}" argument must be of type number. Received type ${typeof actual}`;
        },
        TypeError
      );
      E(
        "ERR_OUT_OF_RANGE",
        function(str, range, input) {
          let msg = `The value of "${str}" is out of range.`;
          let received = input;
          if (Number.isInteger(input) && Math.abs(input) > 2 ** 32) {
            received = addNumericalSeparator(String(input));
          } else if (typeof input === "bigint") {
            received = String(input);
            if (input > BigInt(2) ** BigInt(32) || input < -(BigInt(2) ** BigInt(32))) {
              received = addNumericalSeparator(received);
            }
            received += "n";
          }
          msg += ` It must be ${range}. Received ${received}`;
          return msg;
        },
        RangeError
      );
      function addNumericalSeparator(val) {
        let res = "";
        let i = val.length;
        const start = val[0] === "-" ? 1 : 0;
        for (; i >= start + 4; i -= 3) {
          res = `_${val.slice(i - 3, i)}${res}`;
        }
        return `${val.slice(0, i)}${res}`;
      }
      function checkBounds(buf, offset, byteLength2) {
        validateNumber(offset, "offset");
        if (buf[offset] === void 0 || buf[offset + byteLength2] === void 0) {
          boundsError(offset, buf.length - (byteLength2 + 1));
        }
      }
      function checkIntBI(value, min, max, buf, offset, byteLength2) {
        if (value > max || value < min) {
          const n = typeof min === "bigint" ? "n" : "";
          let range;
          {
            if (min === 0 || min === BigInt(0)) {
              range = `>= 0${n} and < 2${n} ** ${(byteLength2 + 1) * 8}${n}`;
            } else {
              range = `>= -(2${n} ** ${(byteLength2 + 1) * 8 - 1}${n}) and < 2 ** ${(byteLength2 + 1) * 8 - 1}${n}`;
            }
          }
          throw new errors2.ERR_OUT_OF_RANGE("value", range, value);
        }
        checkBounds(buf, offset, byteLength2);
      }
      function validateNumber(value, name) {
        if (typeof value !== "number") {
          throw new errors2.ERR_INVALID_ARG_TYPE(name, "number", value);
        }
      }
      function boundsError(value, length, type) {
        if (Math.floor(value) !== value) {
          validateNumber(value, type);
          throw new errors2.ERR_OUT_OF_RANGE("offset", "an integer", value);
        }
        if (length < 0) {
          throw new errors2.ERR_BUFFER_OUT_OF_BOUNDS();
        }
        throw new errors2.ERR_OUT_OF_RANGE(
          "offset",
          `>= ${0} and <= ${length}`,
          value
        );
      }
      const INVALID_BASE64_RE = /[^+/0-9A-Za-z-_]/g;
      function base64clean(str) {
        str = str.split("=")[0];
        str = str.trim().replace(INVALID_BASE64_RE, "");
        if (str.length < 2) return "";
        while (str.length % 4 !== 0) {
          str = str + "=";
        }
        return str;
      }
      function utf8ToBytes(string, units) {
        units = units || Infinity;
        let codePoint;
        const length = string.length;
        let leadSurrogate = null;
        const bytes = [];
        for (let i = 0; i < length; ++i) {
          codePoint = string.charCodeAt(i);
          if (codePoint > 55295 && codePoint < 57344) {
            if (!leadSurrogate) {
              if (codePoint > 56319) {
                if ((units -= 3) > -1) bytes.push(239, 191, 189);
                continue;
              } else if (i + 1 === length) {
                if ((units -= 3) > -1) bytes.push(239, 191, 189);
                continue;
              }
              leadSurrogate = codePoint;
              continue;
            }
            if (codePoint < 56320) {
              if ((units -= 3) > -1) bytes.push(239, 191, 189);
              leadSurrogate = codePoint;
              continue;
            }
            codePoint = (leadSurrogate - 55296 << 10 | codePoint - 56320) + 65536;
          } else if (leadSurrogate) {
            if ((units -= 3) > -1) bytes.push(239, 191, 189);
          }
          leadSurrogate = null;
          if (codePoint < 128) {
            if ((units -= 1) < 0) break;
            bytes.push(codePoint);
          } else if (codePoint < 2048) {
            if ((units -= 2) < 0) break;
            bytes.push(
              codePoint >> 6 | 192,
              codePoint & 63 | 128
            );
          } else if (codePoint < 65536) {
            if ((units -= 3) < 0) break;
            bytes.push(
              codePoint >> 12 | 224,
              codePoint >> 6 & 63 | 128,
              codePoint & 63 | 128
            );
          } else if (codePoint < 1114112) {
            if ((units -= 4) < 0) break;
            bytes.push(
              codePoint >> 18 | 240,
              codePoint >> 12 & 63 | 128,
              codePoint >> 6 & 63 | 128,
              codePoint & 63 | 128
            );
          } else {
            throw new Error("Invalid code point");
          }
        }
        return bytes;
      }
      function asciiToBytes(str) {
        const byteArray = [];
        for (let i = 0; i < str.length; ++i) {
          byteArray.push(str.charCodeAt(i) & 255);
        }
        return byteArray;
      }
      function utf16leToBytes(str, units) {
        let c, hi, lo;
        const byteArray = [];
        for (let i = 0; i < str.length; ++i) {
          if ((units -= 2) < 0) break;
          c = str.charCodeAt(i);
          hi = c >> 8;
          lo = c % 256;
          byteArray.push(lo);
          byteArray.push(hi);
        }
        return byteArray;
      }
      function base64ToBytes(str) {
        return base64.toByteArray(base64clean(str));
      }
      function blitBuffer(src, dst, offset, length) {
        let i;
        for (i = 0; i < length; ++i) {
          if (i + offset >= dst.length || i >= src.length) break;
          dst[i + offset] = src[i];
        }
        return i;
      }
      function isInstance(obj, type) {
        return obj instanceof type || obj != null && obj.constructor != null && obj.constructor.name != null && obj.constructor.name === type.name;
      }
      function numberIsNaN(obj) {
        return obj !== obj;
      }
      const hexSliceLookupTable = (function() {
        const alphabet = "0123456789abcdef";
        const table = new Array(256);
        for (let i = 0; i < 16; ++i) {
          const i16 = i * 16;
          for (let j = 0; j < 16; ++j) {
            table[i16 + j] = alphabet[i] + alphabet[j];
          }
        }
        return table;
      })();
      function defineBigIntMethod(fn) {
        return typeof BigInt === "undefined" ? BufferBigIntNotDefined : fn;
      }
      function BufferBigIntNotDefined() {
        throw new Error("BigInt not supported");
      }
    })(buffer);
    return buffer;
  }
  var bufferExports = requireBuffer();
  var browser$1 = {};
  var highLevel$1 = {};
  var highLevel = {};
  var lib = {};
  var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
      d2.__proto__ = b2;
    } || function(d2, b2) {
      for (var p in b2) if (Object.prototype.hasOwnProperty.call(b2, p)) d2[p] = b2[p];
    };
    return extendStatics(d, b);
  };
  function __extends(d, b) {
    if (typeof b !== "function" && b !== null)
      throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  }
  var __assign = function() {
    __assign = Object.assign || function __assign2(t) {
      for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
      return t;
    };
    return __assign.apply(this, arguments);
  };
  function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
      t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
          t[p[i]] = s[p[i]];
      }
    return t;
  }
  function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  }
  function __param(paramIndex, decorator) {
    return function(target, key) {
      decorator(target, key, paramIndex);
    };
  }
  function __esDecorate(ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) {
      if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected");
      return f;
    }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
      var context = {};
      for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
      for (var p in contextIn.access) context.access[p] = contextIn.access[p];
      context.addInitializer = function(f) {
        if (done) throw new TypeError("Cannot add initializers after decoration has completed");
        extraInitializers.push(accept(f || null));
      };
      var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
      if (kind === "accessor") {
        if (result === void 0) continue;
        if (result === null || typeof result !== "object") throw new TypeError("Object expected");
        if (_ = accept(result.get)) descriptor.get = _;
        if (_ = accept(result.set)) descriptor.set = _;
        if (_ = accept(result.init)) initializers.unshift(_);
      } else if (_ = accept(result)) {
        if (kind === "field") initializers.unshift(_);
        else descriptor[key] = _;
      }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
  }
  function __runInitializers(thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
      value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
  }
  function __propKey(x) {
    return typeof x === "symbol" ? x : "".concat(x);
  }
  function __setFunctionName(f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
  }
  function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
  }
  function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P ? value : new P(function(resolve) {
        resolve(value);
      });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  }
  function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() {
      if (t[0] & 1) throw t[1];
      return t[1];
    }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() {
      return this;
    }), g;
    function verb(n) {
      return function(v) {
        return step([n, v]);
      };
    }
    function step(op) {
      if (f) throw new TypeError("Generator is already executing.");
      while (g && (g = 0, op[0] && (_ = 0)), _) try {
        if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
        if (y = 0, t) op = [op[0] & 2, t.value];
        switch (op[0]) {
          case 0:
          case 1:
            t = op;
            break;
          case 4:
            _.label++;
            return { value: op[1], done: false };
          case 5:
            _.label++;
            y = op[1];
            op = [0];
            continue;
          case 7:
            op = _.ops.pop();
            _.trys.pop();
            continue;
          default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
              _ = 0;
              continue;
            }
            if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }
            if (op[0] === 6 && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }
            if (t && _.label < t[2]) {
              _.label = t[2];
              _.ops.push(op);
              break;
            }
            if (t[2]) _.ops.pop();
            _.trys.pop();
            continue;
        }
        op = body.call(thisArg, _);
      } catch (e) {
        op = [6, e];
        y = 0;
      } finally {
        f = t = 0;
      }
      if (op[0] & 5) throw op[1];
      return { value: op[0] ? op[1] : void 0, done: true };
    }
  }
  var __createBinding = Object.create ? (function(o, m, k, k2) {
    if (k2 === void 0) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() {
        return m[k];
      } };
    }
    Object.defineProperty(o, k2, desc);
  }) : (function(o, m, k, k2) {
    if (k2 === void 0) k2 = k;
    o[k2] = m[k];
  });
  function __exportStar(m, o) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p)) __createBinding(o, m, p);
  }
  function __values(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
      next: function() {
        if (o && i >= o.length) o = void 0;
        return { value: o && o[i++], done: !o };
      }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
  }
  function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
      while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    } catch (error) {
      e = { error };
    } finally {
      try {
        if (r && !r.done && (m = i["return"])) m.call(i);
      } finally {
        if (e) throw e.error;
      }
    }
    return ar;
  }
  function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
      ar = ar.concat(__read(arguments[i]));
    return ar;
  }
  function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
      for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
        r[k] = a[j];
    return r;
  }
  function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
      if (ar || !(i in from)) {
        if (!ar) ar = Array.prototype.slice.call(from, 0, i);
        ar[i] = from[i];
      }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
  }
  function __await(v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
  }
  function __asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = Object.create((typeof AsyncIterator === "function" ? AsyncIterator : Object).prototype), verb("next"), verb("throw"), verb("return", awaitReturn), i[Symbol.asyncIterator] = function() {
      return this;
    }, i;
    function awaitReturn(f) {
      return function(v) {
        return Promise.resolve(v).then(f, reject);
      };
    }
    function verb(n, f) {
      if (g[n]) {
        i[n] = function(v) {
          return new Promise(function(a, b) {
            q.push([n, v, a, b]) > 1 || resume(n, v);
          });
        };
        if (f) i[n] = f(i[n]);
      }
    }
    function resume(n, v) {
      try {
        step(g[n](v));
      } catch (e) {
        settle(q[0][3], e);
      }
    }
    function step(r) {
      r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);
    }
    function fulfill(value) {
      resume("next", value);
    }
    function reject(value) {
      resume("throw", value);
    }
    function settle(f, v) {
      if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]);
    }
  }
  function __asyncDelegator(o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function(e) {
      throw e;
    }), verb("return"), i[Symbol.iterator] = function() {
      return this;
    }, i;
    function verb(n, f) {
      i[n] = o[n] ? function(v) {
        return (p = !p) ? { value: __await(o[n](v)), done: false } : f ? f(v) : v;
      } : f;
    }
  }
  function __asyncValues(o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
      return this;
    }, i);
    function verb(n) {
      i[n] = o[n] && function(v) {
        return new Promise(function(resolve, reject) {
          v = o[n](v), settle(resolve, reject, v.done, v.value);
        });
      };
    }
    function settle(resolve, reject, d, v) {
      Promise.resolve(v).then(function(v2) {
        resolve({ value: v2, done: d });
      }, reject);
    }
  }
  function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) {
      Object.defineProperty(cooked, "raw", { value: raw });
    } else {
      cooked.raw = raw;
    }
    return cooked;
  }
  var __setModuleDefault = Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
  }) : function(o, v) {
    o["default"] = v;
  };
  var ownKeys = function(o) {
    ownKeys = Object.getOwnPropertyNames || function(o2) {
      var ar = [];
      for (var k in o2) if (Object.prototype.hasOwnProperty.call(o2, k)) ar[ar.length] = k;
      return ar;
    };
    return ownKeys(o);
  };
  function __importStar(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) {
      for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
    }
    __setModuleDefault(result, mod);
    return result;
  }
  function __importDefault(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  }
  function __classPrivateFieldGet(receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
  }
  function __classPrivateFieldSet(receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
  }
  function __classPrivateFieldIn(state, receiver) {
    if (receiver === null || typeof receiver !== "object" && typeof receiver !== "function") throw new TypeError("Cannot use 'in' operator on non-object");
    return typeof state === "function" ? receiver === state : state.has(receiver);
  }
  function __addDisposableResource(env, value, async) {
    if (value !== null && value !== void 0) {
      if (typeof value !== "object" && typeof value !== "function") throw new TypeError("Object expected.");
      var dispose, inner;
      if (async) {
        if (!Symbol.asyncDispose) throw new TypeError("Symbol.asyncDispose is not defined.");
        dispose = value[Symbol.asyncDispose];
      }
      if (dispose === void 0) {
        if (!Symbol.dispose) throw new TypeError("Symbol.dispose is not defined.");
        dispose = value[Symbol.dispose];
        if (async) inner = dispose;
      }
      if (typeof dispose !== "function") throw new TypeError("Object not disposable.");
      if (inner) dispose = function() {
        try {
          inner.call(this);
        } catch (e) {
          return Promise.reject(e);
        }
      };
      env.stack.push({ value, dispose, async });
    } else if (async) {
      env.stack.push({ async: true });
    }
    return value;
  }
  var _SuppressedError = typeof SuppressedError === "function" ? SuppressedError : function(error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
  };
  function __disposeResources(env) {
    function fail(e) {
      env.error = env.hasError ? new _SuppressedError(e, env.error, "An error was suppressed during disposal.") : e;
      env.hasError = true;
    }
    var r, s = 0;
    function next() {
      while (r = env.stack.pop()) {
        try {
          if (!r.async && s === 1) return s = 0, env.stack.push(r), Promise.resolve().then(next);
          if (r.dispose) {
            var result = r.dispose.call(r.value);
            if (r.async) return s |= 2, Promise.resolve(result).then(next, function(e) {
              fail(e);
              return next();
            });
          } else s |= 1;
        } catch (e) {
          fail(e);
        }
      }
      if (s === 1) return env.hasError ? Promise.reject(env.error) : Promise.resolve();
      if (env.hasError) throw env.error;
    }
    return next();
  }
  function __rewriteRelativeImportExtension(path, preserveJsx) {
    if (typeof path === "string" && /^\.\.?\//.test(path)) {
      return path.replace(/\.(tsx)$|((?:\.d)?)((?:\.[^./]+?)?)\.([cm]?)ts$/i, function(m, tsx, d, ext, cm) {
        return tsx ? preserveJsx ? ".jsx" : ".js" : d && (!ext || !cm) ? m : d + ext + "." + cm.toLowerCase() + "js";
      });
    }
    return path;
  }
  const tslib_es6 = {
    __extends,
    __assign,
    __rest,
    __decorate,
    __param,
    __esDecorate,
    __runInitializers,
    __propKey,
    __setFunctionName,
    __metadata,
    __awaiter,
    __generator,
    __createBinding,
    __exportStar,
    __values,
    __read,
    __spread,
    __spreadArrays,
    __spreadArray,
    __await,
    __asyncGenerator,
    __asyncDelegator,
    __asyncValues,
    __makeTemplateObject,
    __importStar,
    __importDefault,
    __classPrivateFieldGet,
    __classPrivateFieldSet,
    __classPrivateFieldIn,
    __addDisposableResource,
    __disposeResources,
    __rewriteRelativeImportExtension
  };
  const tslib_es6$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    __addDisposableResource,
    get __assign() {
      return __assign;
    },
    __asyncDelegator,
    __asyncGenerator,
    __asyncValues,
    __await,
    __awaiter,
    __classPrivateFieldGet,
    __classPrivateFieldIn,
    __classPrivateFieldSet,
    __createBinding,
    __decorate,
    __disposeResources,
    __esDecorate,
    __exportStar,
    __extends,
    __generator,
    __importDefault,
    __importStar,
    __makeTemplateObject,
    __metadata,
    __param,
    __propKey,
    __read,
    __rest,
    __rewriteRelativeImportExtension,
    __runInitializers,
    __setFunctionName,
    __spread,
    __spreadArray,
    __spreadArrays,
    __values,
    default: tslib_es6
  }, Symbol.toStringTag, { value: "Module" }));
  const require$$0 = /* @__PURE__ */ getAugmentedNamespace(tslib_es6$1);
  var Mutex = {};
  var Semaphore = {};
  var errors = {};
  var hasRequiredErrors;
  function requireErrors() {
    if (hasRequiredErrors) return errors;
    hasRequiredErrors = 1;
    Object.defineProperty(errors, "__esModule", { value: true });
    errors.E_CANCELED = errors.E_ALREADY_LOCKED = errors.E_TIMEOUT = void 0;
    errors.E_TIMEOUT = new Error("timeout while waiting for mutex to become available");
    errors.E_ALREADY_LOCKED = new Error("mutex already locked");
    errors.E_CANCELED = new Error("request for lock canceled");
    return errors;
  }
  var hasRequiredSemaphore;
  function requireSemaphore() {
    if (hasRequiredSemaphore) return Semaphore;
    hasRequiredSemaphore = 1;
    Object.defineProperty(Semaphore, "__esModule", { value: true });
    var tslib_1 = require$$0;
    var errors_1 = requireErrors();
    var Semaphore$1 = (
      /** @class */
      (function() {
        function Semaphore2(_value, _cancelError) {
          if (_cancelError === void 0) {
            _cancelError = errors_1.E_CANCELED;
          }
          this._value = _value;
          this._cancelError = _cancelError;
          this._queue = [];
          this._weightedWaiters = [];
        }
        Semaphore2.prototype.acquire = function(weight, priority) {
          var _this = this;
          if (weight === void 0) {
            weight = 1;
          }
          if (priority === void 0) {
            priority = 0;
          }
          if (weight <= 0)
            throw new Error("invalid weight ".concat(weight, ": must be positive"));
          return new Promise(function(resolve, reject) {
            var task = { resolve, reject, weight, priority };
            var i = findIndexFromEnd(_this._queue, function(other) {
              return priority <= other.priority;
            });
            if (i === -1 && weight <= _this._value) {
              _this._dispatchItem(task);
            } else {
              _this._queue.splice(i + 1, 0, task);
            }
          });
        };
        Semaphore2.prototype.runExclusive = function(callback_1) {
          return tslib_1.__awaiter(this, arguments, void 0, function(callback, weight, priority) {
            var _a, value, release;
            if (weight === void 0) {
              weight = 1;
            }
            if (priority === void 0) {
              priority = 0;
            }
            return tslib_1.__generator(this, function(_b) {
              switch (_b.label) {
                case 0:
                  return [4, this.acquire(weight, priority)];
                case 1:
                  _a = _b.sent(), value = _a[0], release = _a[1];
                  _b.label = 2;
                case 2:
                  _b.trys.push([2, , 4, 5]);
                  return [4, callback(value)];
                case 3:
                  return [2, _b.sent()];
                case 4:
                  release();
                  return [
                    7
                    /*endfinally*/
                  ];
                case 5:
                  return [
                    2
                    /*return*/
                  ];
              }
            });
          });
        };
        Semaphore2.prototype.waitForUnlock = function(weight, priority) {
          var _this = this;
          if (weight === void 0) {
            weight = 1;
          }
          if (priority === void 0) {
            priority = 0;
          }
          if (weight <= 0)
            throw new Error("invalid weight ".concat(weight, ": must be positive"));
          if (this._couldLockImmediately(weight, priority)) {
            return Promise.resolve();
          } else {
            return new Promise(function(resolve) {
              if (!_this._weightedWaiters[weight - 1])
                _this._weightedWaiters[weight - 1] = [];
              insertSorted(_this._weightedWaiters[weight - 1], { resolve, priority });
            });
          }
        };
        Semaphore2.prototype.isLocked = function() {
          return this._value <= 0;
        };
        Semaphore2.prototype.getValue = function() {
          return this._value;
        };
        Semaphore2.prototype.setValue = function(value) {
          this._value = value;
          this._dispatchQueue();
        };
        Semaphore2.prototype.release = function(weight) {
          if (weight === void 0) {
            weight = 1;
          }
          if (weight <= 0)
            throw new Error("invalid weight ".concat(weight, ": must be positive"));
          this._value += weight;
          this._dispatchQueue();
        };
        Semaphore2.prototype.cancel = function() {
          var _this = this;
          this._queue.forEach(function(entry) {
            return entry.reject(_this._cancelError);
          });
          this._queue = [];
        };
        Semaphore2.prototype._dispatchQueue = function() {
          this._drainUnlockWaiters();
          while (this._queue.length > 0 && this._queue[0].weight <= this._value) {
            this._dispatchItem(this._queue.shift());
            this._drainUnlockWaiters();
          }
        };
        Semaphore2.prototype._dispatchItem = function(item) {
          var previousValue = this._value;
          this._value -= item.weight;
          item.resolve([previousValue, this._newReleaser(item.weight)]);
        };
        Semaphore2.prototype._newReleaser = function(weight) {
          var _this = this;
          var called = false;
          return function() {
            if (called)
              return;
            called = true;
            _this.release(weight);
          };
        };
        Semaphore2.prototype._drainUnlockWaiters = function() {
          if (this._queue.length === 0) {
            for (var weight = this._value; weight > 0; weight--) {
              var waiters = this._weightedWaiters[weight - 1];
              if (!waiters)
                continue;
              waiters.forEach(function(waiter) {
                return waiter.resolve();
              });
              this._weightedWaiters[weight - 1] = [];
            }
          } else {
            var queuedPriority_1 = this._queue[0].priority;
            for (var weight = this._value; weight > 0; weight--) {
              var waiters = this._weightedWaiters[weight - 1];
              if (!waiters)
                continue;
              var i = waiters.findIndex(function(waiter) {
                return waiter.priority <= queuedPriority_1;
              });
              (i === -1 ? waiters : waiters.splice(0, i)).forEach((function(waiter) {
                return waiter.resolve();
              }));
            }
          }
        };
        Semaphore2.prototype._couldLockImmediately = function(weight, priority) {
          return (this._queue.length === 0 || this._queue[0].priority < priority) && weight <= this._value;
        };
        return Semaphore2;
      })()
    );
    function insertSorted(a, v) {
      var i = findIndexFromEnd(a, function(other) {
        return v.priority <= other.priority;
      });
      a.splice(i + 1, 0, v);
    }
    function findIndexFromEnd(a, predicate) {
      for (var i = a.length - 1; i >= 0; i--) {
        if (predicate(a[i])) {
          return i;
        }
      }
      return -1;
    }
    Semaphore.default = Semaphore$1;
    return Semaphore;
  }
  var hasRequiredMutex;
  function requireMutex() {
    if (hasRequiredMutex) return Mutex;
    hasRequiredMutex = 1;
    Object.defineProperty(Mutex, "__esModule", { value: true });
    var tslib_1 = require$$0;
    var Semaphore_1 = requireSemaphore();
    var Mutex$1 = (
      /** @class */
      (function() {
        function Mutex2(cancelError) {
          this._semaphore = new Semaphore_1.default(1, cancelError);
        }
        Mutex2.prototype.acquire = function() {
          return tslib_1.__awaiter(this, arguments, void 0, function(priority) {
            var _a, releaser;
            if (priority === void 0) {
              priority = 0;
            }
            return tslib_1.__generator(this, function(_b) {
              switch (_b.label) {
                case 0:
                  return [4, this._semaphore.acquire(1, priority)];
                case 1:
                  _a = _b.sent(), releaser = _a[1];
                  return [2, releaser];
              }
            });
          });
        };
        Mutex2.prototype.runExclusive = function(callback, priority) {
          if (priority === void 0) {
            priority = 0;
          }
          return this._semaphore.runExclusive(function() {
            return callback();
          }, 1, priority);
        };
        Mutex2.prototype.isLocked = function() {
          return this._semaphore.isLocked();
        };
        Mutex2.prototype.waitForUnlock = function(priority) {
          if (priority === void 0) {
            priority = 0;
          }
          return this._semaphore.waitForUnlock(1, priority);
        };
        Mutex2.prototype.release = function() {
          if (this._semaphore.isLocked())
            this._semaphore.release();
        };
        Mutex2.prototype.cancel = function() {
          return this._semaphore.cancel();
        };
        return Mutex2;
      })()
    );
    Mutex.default = Mutex$1;
    return Mutex;
  }
  var withTimeout = {};
  var hasRequiredWithTimeout;
  function requireWithTimeout() {
    if (hasRequiredWithTimeout) return withTimeout;
    hasRequiredWithTimeout = 1;
    Object.defineProperty(withTimeout, "__esModule", { value: true });
    withTimeout.withTimeout = void 0;
    var tslib_1 = require$$0;
    var errors_1 = requireErrors();
    function withTimeout$1(sync, timeout, timeoutError) {
      var _this = this;
      if (timeoutError === void 0) {
        timeoutError = errors_1.E_TIMEOUT;
      }
      return {
        acquire: function(weightOrPriority, priority) {
          var weight;
          if (isSemaphore(sync)) {
            weight = weightOrPriority;
          } else {
            weight = void 0;
            priority = weightOrPriority;
          }
          if (weight !== void 0 && weight <= 0) {
            throw new Error("invalid weight ".concat(weight, ": must be positive"));
          }
          return new Promise(function(resolve, reject) {
            return tslib_1.__awaiter(_this, void 0, void 0, function() {
              var isTimeout, handle, ticket, release, e_1;
              return tslib_1.__generator(this, function(_a) {
                switch (_a.label) {
                  case 0:
                    isTimeout = false;
                    handle = setTimeout(function() {
                      isTimeout = true;
                      reject(timeoutError);
                    }, timeout);
                    _a.label = 1;
                  case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4, isSemaphore(sync) ? sync.acquire(weight, priority) : sync.acquire(priority)];
                  case 2:
                    ticket = _a.sent();
                    if (isTimeout) {
                      release = Array.isArray(ticket) ? ticket[1] : ticket;
                      release();
                    } else {
                      clearTimeout(handle);
                      resolve(ticket);
                    }
                    return [3, 4];
                  case 3:
                    e_1 = _a.sent();
                    if (!isTimeout) {
                      clearTimeout(handle);
                      reject(e_1);
                    }
                    return [3, 4];
                  case 4:
                    return [
                      2
                      /*return*/
                    ];
                }
              });
            });
          });
        },
        runExclusive: function(callback, weight, priority) {
          return tslib_1.__awaiter(this, void 0, void 0, function() {
            var release, ticket;
            return tslib_1.__generator(this, function(_a) {
              switch (_a.label) {
                case 0:
                  release = function() {
                    return void 0;
                  };
                  _a.label = 1;
                case 1:
                  _a.trys.push([1, , 7, 8]);
                  return [4, this.acquire(weight, priority)];
                case 2:
                  ticket = _a.sent();
                  if (!Array.isArray(ticket)) return [3, 4];
                  release = ticket[1];
                  return [4, callback(ticket[0])];
                case 3:
                  return [2, _a.sent()];
                case 4:
                  release = ticket;
                  return [4, callback()];
                case 5:
                  return [2, _a.sent()];
                case 6:
                  return [3, 8];
                case 7:
                  release();
                  return [
                    7
                    /*endfinally*/
                  ];
                case 8:
                  return [
                    2
                    /*return*/
                  ];
              }
            });
          });
        },
        release: function(weight) {
          sync.release(weight);
        },
        cancel: function() {
          return sync.cancel();
        },
        waitForUnlock: function(weightOrPriority, priority) {
          var weight;
          if (isSemaphore(sync)) {
            weight = weightOrPriority;
          } else {
            weight = void 0;
            priority = weightOrPriority;
          }
          if (weight !== void 0 && weight <= 0) {
            throw new Error("invalid weight ".concat(weight, ": must be positive"));
          }
          return new Promise(function(resolve, reject) {
            var handle = setTimeout(function() {
              return reject(timeoutError);
            }, timeout);
            (isSemaphore(sync) ? sync.waitForUnlock(weight, priority) : sync.waitForUnlock(priority)).then(function() {
              clearTimeout(handle);
              resolve();
            });
          });
        },
        isLocked: function() {
          return sync.isLocked();
        },
        getValue: function() {
          return sync.getValue();
        },
        setValue: function(value) {
          return sync.setValue(value);
        }
      };
    }
    withTimeout.withTimeout = withTimeout$1;
    function isSemaphore(sync) {
      return sync.getValue !== void 0;
    }
    return withTimeout;
  }
  var tryAcquire = {};
  var hasRequiredTryAcquire;
  function requireTryAcquire() {
    if (hasRequiredTryAcquire) return tryAcquire;
    hasRequiredTryAcquire = 1;
    Object.defineProperty(tryAcquire, "__esModule", { value: true });
    tryAcquire.tryAcquire = void 0;
    var errors_1 = requireErrors();
    var withTimeout_1 = requireWithTimeout();
    function tryAcquire$1(sync, alreadyAcquiredError) {
      if (alreadyAcquiredError === void 0) {
        alreadyAcquiredError = errors_1.E_ALREADY_LOCKED;
      }
      return (0, withTimeout_1.withTimeout)(sync, 0, alreadyAcquiredError);
    }
    tryAcquire.tryAcquire = tryAcquire$1;
    return tryAcquire;
  }
  var hasRequiredLib;
  function requireLib() {
    if (hasRequiredLib) return lib;
    hasRequiredLib = 1;
    (function(exports2) {
      Object.defineProperty(exports2, "__esModule", { value: true });
      exports2.tryAcquire = exports2.withTimeout = exports2.Semaphore = exports2.Mutex = void 0;
      var tslib_1 = require$$0;
      var Mutex_1 = requireMutex();
      Object.defineProperty(exports2, "Mutex", { enumerable: true, get: function() {
        return Mutex_1.default;
      } });
      var Semaphore_1 = requireSemaphore();
      Object.defineProperty(exports2, "Semaphore", { enumerable: true, get: function() {
        return Semaphore_1.default;
      } });
      var withTimeout_1 = requireWithTimeout();
      Object.defineProperty(exports2, "withTimeout", { enumerable: true, get: function() {
        return withTimeout_1.withTimeout;
      } });
      var tryAcquire_1 = requireTryAcquire();
      Object.defineProperty(exports2, "tryAcquire", { enumerable: true, get: function() {
        return tryAcquire_1.tryAcquire;
      } });
      tslib_1.__exportStar(requireErrors(), exports2);
    })(lib);
    return lib;
  }
  var lowLevel = {};
  var types___GENERATED__ = {};
  var hasRequiredTypes___GENERATED__;
  function requireTypes___GENERATED__() {
    if (hasRequiredTypes___GENERATED__) return types___GENERATED__;
    hasRequiredTypes___GENERATED__ = 1;
    Object.defineProperty(types___GENERATED__, "__esModule", { value: true });
    types___GENERATED__.Z3_goal_prec = types___GENERATED__.Z3_error_code = types___GENERATED__.Z3_ast_print_mode = types___GENERATED__.Z3_param_kind = types___GENERATED__.Z3_decl_kind = types___GENERATED__.Z3_ast_kind = types___GENERATED__.Z3_sort_kind = types___GENERATED__.Z3_parameter_kind = types___GENERATED__.Z3_symbol_kind = types___GENERATED__.Z3_lbool = void 0;
    var Z3_lbool;
    (function(Z3_lbool2) {
      Z3_lbool2[Z3_lbool2["Z3_L_FALSE"] = -1] = "Z3_L_FALSE";
      Z3_lbool2[Z3_lbool2["Z3_L_UNDEF"] = 0] = "Z3_L_UNDEF";
      Z3_lbool2[Z3_lbool2["Z3_L_TRUE"] = 1] = "Z3_L_TRUE";
    })(Z3_lbool || (types___GENERATED__.Z3_lbool = Z3_lbool = {}));
    var Z3_symbol_kind;
    (function(Z3_symbol_kind2) {
      Z3_symbol_kind2[Z3_symbol_kind2["Z3_INT_SYMBOL"] = 0] = "Z3_INT_SYMBOL";
      Z3_symbol_kind2[Z3_symbol_kind2["Z3_STRING_SYMBOL"] = 1] = "Z3_STRING_SYMBOL";
    })(Z3_symbol_kind || (types___GENERATED__.Z3_symbol_kind = Z3_symbol_kind = {}));
    var Z3_parameter_kind;
    (function(Z3_parameter_kind2) {
      Z3_parameter_kind2[Z3_parameter_kind2["Z3_PARAMETER_INT"] = 0] = "Z3_PARAMETER_INT";
      Z3_parameter_kind2[Z3_parameter_kind2["Z3_PARAMETER_DOUBLE"] = 1] = "Z3_PARAMETER_DOUBLE";
      Z3_parameter_kind2[Z3_parameter_kind2["Z3_PARAMETER_RATIONAL"] = 2] = "Z3_PARAMETER_RATIONAL";
      Z3_parameter_kind2[Z3_parameter_kind2["Z3_PARAMETER_SYMBOL"] = 3] = "Z3_PARAMETER_SYMBOL";
      Z3_parameter_kind2[Z3_parameter_kind2["Z3_PARAMETER_SORT"] = 4] = "Z3_PARAMETER_SORT";
      Z3_parameter_kind2[Z3_parameter_kind2["Z3_PARAMETER_AST"] = 5] = "Z3_PARAMETER_AST";
      Z3_parameter_kind2[Z3_parameter_kind2["Z3_PARAMETER_FUNC_DECL"] = 6] = "Z3_PARAMETER_FUNC_DECL";
      Z3_parameter_kind2[Z3_parameter_kind2["Z3_PARAMETER_INTERNAL"] = 7] = "Z3_PARAMETER_INTERNAL";
      Z3_parameter_kind2[Z3_parameter_kind2["Z3_PARAMETER_ZSTRING"] = 8] = "Z3_PARAMETER_ZSTRING";
    })(Z3_parameter_kind || (types___GENERATED__.Z3_parameter_kind = Z3_parameter_kind = {}));
    var Z3_sort_kind;
    (function(Z3_sort_kind2) {
      Z3_sort_kind2[Z3_sort_kind2["Z3_UNINTERPRETED_SORT"] = 0] = "Z3_UNINTERPRETED_SORT";
      Z3_sort_kind2[Z3_sort_kind2["Z3_BOOL_SORT"] = 1] = "Z3_BOOL_SORT";
      Z3_sort_kind2[Z3_sort_kind2["Z3_INT_SORT"] = 2] = "Z3_INT_SORT";
      Z3_sort_kind2[Z3_sort_kind2["Z3_REAL_SORT"] = 3] = "Z3_REAL_SORT";
      Z3_sort_kind2[Z3_sort_kind2["Z3_BV_SORT"] = 4] = "Z3_BV_SORT";
      Z3_sort_kind2[Z3_sort_kind2["Z3_ARRAY_SORT"] = 5] = "Z3_ARRAY_SORT";
      Z3_sort_kind2[Z3_sort_kind2["Z3_DATATYPE_SORT"] = 6] = "Z3_DATATYPE_SORT";
      Z3_sort_kind2[Z3_sort_kind2["Z3_RELATION_SORT"] = 7] = "Z3_RELATION_SORT";
      Z3_sort_kind2[Z3_sort_kind2["Z3_FINITE_DOMAIN_SORT"] = 8] = "Z3_FINITE_DOMAIN_SORT";
      Z3_sort_kind2[Z3_sort_kind2["Z3_FLOATING_POINT_SORT"] = 9] = "Z3_FLOATING_POINT_SORT";
      Z3_sort_kind2[Z3_sort_kind2["Z3_ROUNDING_MODE_SORT"] = 10] = "Z3_ROUNDING_MODE_SORT";
      Z3_sort_kind2[Z3_sort_kind2["Z3_SEQ_SORT"] = 11] = "Z3_SEQ_SORT";
      Z3_sort_kind2[Z3_sort_kind2["Z3_RE_SORT"] = 12] = "Z3_RE_SORT";
      Z3_sort_kind2[Z3_sort_kind2["Z3_CHAR_SORT"] = 13] = "Z3_CHAR_SORT";
      Z3_sort_kind2[Z3_sort_kind2["Z3_TYPE_VAR"] = 14] = "Z3_TYPE_VAR";
      Z3_sort_kind2[Z3_sort_kind2["Z3_UNKNOWN_SORT"] = 1e3] = "Z3_UNKNOWN_SORT";
    })(Z3_sort_kind || (types___GENERATED__.Z3_sort_kind = Z3_sort_kind = {}));
    var Z3_ast_kind;
    (function(Z3_ast_kind2) {
      Z3_ast_kind2[Z3_ast_kind2["Z3_NUMERAL_AST"] = 0] = "Z3_NUMERAL_AST";
      Z3_ast_kind2[Z3_ast_kind2["Z3_APP_AST"] = 1] = "Z3_APP_AST";
      Z3_ast_kind2[Z3_ast_kind2["Z3_VAR_AST"] = 2] = "Z3_VAR_AST";
      Z3_ast_kind2[Z3_ast_kind2["Z3_QUANTIFIER_AST"] = 3] = "Z3_QUANTIFIER_AST";
      Z3_ast_kind2[Z3_ast_kind2["Z3_SORT_AST"] = 4] = "Z3_SORT_AST";
      Z3_ast_kind2[Z3_ast_kind2["Z3_FUNC_DECL_AST"] = 5] = "Z3_FUNC_DECL_AST";
      Z3_ast_kind2[Z3_ast_kind2["Z3_UNKNOWN_AST"] = 1e3] = "Z3_UNKNOWN_AST";
    })(Z3_ast_kind || (types___GENERATED__.Z3_ast_kind = Z3_ast_kind = {}));
    var Z3_decl_kind;
    (function(Z3_decl_kind2) {
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_TRUE"] = 256] = "Z3_OP_TRUE";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_FALSE"] = 257] = "Z3_OP_FALSE";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_EQ"] = 258] = "Z3_OP_EQ";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_DISTINCT"] = 259] = "Z3_OP_DISTINCT";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_ITE"] = 260] = "Z3_OP_ITE";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_AND"] = 261] = "Z3_OP_AND";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_OR"] = 262] = "Z3_OP_OR";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_IFF"] = 263] = "Z3_OP_IFF";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_XOR"] = 264] = "Z3_OP_XOR";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_NOT"] = 265] = "Z3_OP_NOT";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_IMPLIES"] = 266] = "Z3_OP_IMPLIES";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_OEQ"] = 267] = "Z3_OP_OEQ";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_ANUM"] = 512] = "Z3_OP_ANUM";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_AGNUM"] = 513] = "Z3_OP_AGNUM";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_LE"] = 514] = "Z3_OP_LE";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_GE"] = 515] = "Z3_OP_GE";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_LT"] = 516] = "Z3_OP_LT";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_GT"] = 517] = "Z3_OP_GT";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_ADD"] = 518] = "Z3_OP_ADD";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_SUB"] = 519] = "Z3_OP_SUB";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_UMINUS"] = 520] = "Z3_OP_UMINUS";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_MUL"] = 521] = "Z3_OP_MUL";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_DIV"] = 522] = "Z3_OP_DIV";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_IDIV"] = 523] = "Z3_OP_IDIV";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_REM"] = 524] = "Z3_OP_REM";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_MOD"] = 525] = "Z3_OP_MOD";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_TO_REAL"] = 526] = "Z3_OP_TO_REAL";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_TO_INT"] = 527] = "Z3_OP_TO_INT";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_IS_INT"] = 528] = "Z3_OP_IS_INT";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_POWER"] = 529] = "Z3_OP_POWER";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_ABS"] = 530] = "Z3_OP_ABS";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_STORE"] = 768] = "Z3_OP_STORE";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_SELECT"] = 769] = "Z3_OP_SELECT";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_CONST_ARRAY"] = 770] = "Z3_OP_CONST_ARRAY";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_ARRAY_MAP"] = 771] = "Z3_OP_ARRAY_MAP";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_ARRAY_DEFAULT"] = 772] = "Z3_OP_ARRAY_DEFAULT";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_SET_UNION"] = 773] = "Z3_OP_SET_UNION";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_SET_INTERSECT"] = 774] = "Z3_OP_SET_INTERSECT";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_SET_DIFFERENCE"] = 775] = "Z3_OP_SET_DIFFERENCE";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_SET_COMPLEMENT"] = 776] = "Z3_OP_SET_COMPLEMENT";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_SET_SUBSET"] = 777] = "Z3_OP_SET_SUBSET";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_AS_ARRAY"] = 778] = "Z3_OP_AS_ARRAY";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_ARRAY_EXT"] = 779] = "Z3_OP_ARRAY_EXT";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_SET_HAS_SIZE"] = 780] = "Z3_OP_SET_HAS_SIZE";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_SET_CARD"] = 781] = "Z3_OP_SET_CARD";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_BNUM"] = 1024] = "Z3_OP_BNUM";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_BIT1"] = 1025] = "Z3_OP_BIT1";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_BIT0"] = 1026] = "Z3_OP_BIT0";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_BNEG"] = 1027] = "Z3_OP_BNEG";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_BADD"] = 1028] = "Z3_OP_BADD";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_BSUB"] = 1029] = "Z3_OP_BSUB";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_BMUL"] = 1030] = "Z3_OP_BMUL";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_BSDIV"] = 1031] = "Z3_OP_BSDIV";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_BUDIV"] = 1032] = "Z3_OP_BUDIV";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_BSREM"] = 1033] = "Z3_OP_BSREM";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_BUREM"] = 1034] = "Z3_OP_BUREM";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_BSMOD"] = 1035] = "Z3_OP_BSMOD";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_BSDIV0"] = 1036] = "Z3_OP_BSDIV0";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_BUDIV0"] = 1037] = "Z3_OP_BUDIV0";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_BSREM0"] = 1038] = "Z3_OP_BSREM0";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_BUREM0"] = 1039] = "Z3_OP_BUREM0";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_BSMOD0"] = 1040] = "Z3_OP_BSMOD0";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_ULEQ"] = 1041] = "Z3_OP_ULEQ";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_SLEQ"] = 1042] = "Z3_OP_SLEQ";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_UGEQ"] = 1043] = "Z3_OP_UGEQ";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_SGEQ"] = 1044] = "Z3_OP_SGEQ";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_ULT"] = 1045] = "Z3_OP_ULT";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_SLT"] = 1046] = "Z3_OP_SLT";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_UGT"] = 1047] = "Z3_OP_UGT";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_SGT"] = 1048] = "Z3_OP_SGT";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_BAND"] = 1049] = "Z3_OP_BAND";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_BOR"] = 1050] = "Z3_OP_BOR";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_BNOT"] = 1051] = "Z3_OP_BNOT";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_BXOR"] = 1052] = "Z3_OP_BXOR";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_BNAND"] = 1053] = "Z3_OP_BNAND";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_BNOR"] = 1054] = "Z3_OP_BNOR";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_BXNOR"] = 1055] = "Z3_OP_BXNOR";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_CONCAT"] = 1056] = "Z3_OP_CONCAT";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_SIGN_EXT"] = 1057] = "Z3_OP_SIGN_EXT";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_ZERO_EXT"] = 1058] = "Z3_OP_ZERO_EXT";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_EXTRACT"] = 1059] = "Z3_OP_EXTRACT";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_REPEAT"] = 1060] = "Z3_OP_REPEAT";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_BREDOR"] = 1061] = "Z3_OP_BREDOR";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_BREDAND"] = 1062] = "Z3_OP_BREDAND";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_BCOMP"] = 1063] = "Z3_OP_BCOMP";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_BSHL"] = 1064] = "Z3_OP_BSHL";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_BLSHR"] = 1065] = "Z3_OP_BLSHR";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_BASHR"] = 1066] = "Z3_OP_BASHR";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_ROTATE_LEFT"] = 1067] = "Z3_OP_ROTATE_LEFT";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_ROTATE_RIGHT"] = 1068] = "Z3_OP_ROTATE_RIGHT";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_EXT_ROTATE_LEFT"] = 1069] = "Z3_OP_EXT_ROTATE_LEFT";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_EXT_ROTATE_RIGHT"] = 1070] = "Z3_OP_EXT_ROTATE_RIGHT";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_BIT2BOOL"] = 1071] = "Z3_OP_BIT2BOOL";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_INT2BV"] = 1072] = "Z3_OP_INT2BV";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_BV2INT"] = 1073] = "Z3_OP_BV2INT";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_SBV2INT"] = 1074] = "Z3_OP_SBV2INT";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_CARRY"] = 1075] = "Z3_OP_CARRY";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_XOR3"] = 1076] = "Z3_OP_XOR3";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_BSMUL_NO_OVFL"] = 1077] = "Z3_OP_BSMUL_NO_OVFL";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_BUMUL_NO_OVFL"] = 1078] = "Z3_OP_BUMUL_NO_OVFL";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_BSMUL_NO_UDFL"] = 1079] = "Z3_OP_BSMUL_NO_UDFL";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_BSDIV_I"] = 1080] = "Z3_OP_BSDIV_I";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_BUDIV_I"] = 1081] = "Z3_OP_BUDIV_I";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_BSREM_I"] = 1082] = "Z3_OP_BSREM_I";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_BUREM_I"] = 1083] = "Z3_OP_BUREM_I";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_BSMOD_I"] = 1084] = "Z3_OP_BSMOD_I";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_PR_UNDEF"] = 1280] = "Z3_OP_PR_UNDEF";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_PR_TRUE"] = 1281] = "Z3_OP_PR_TRUE";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_PR_ASSERTED"] = 1282] = "Z3_OP_PR_ASSERTED";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_PR_GOAL"] = 1283] = "Z3_OP_PR_GOAL";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_PR_MODUS_PONENS"] = 1284] = "Z3_OP_PR_MODUS_PONENS";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_PR_REFLEXIVITY"] = 1285] = "Z3_OP_PR_REFLEXIVITY";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_PR_SYMMETRY"] = 1286] = "Z3_OP_PR_SYMMETRY";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_PR_TRANSITIVITY"] = 1287] = "Z3_OP_PR_TRANSITIVITY";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_PR_TRANSITIVITY_STAR"] = 1288] = "Z3_OP_PR_TRANSITIVITY_STAR";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_PR_MONOTONICITY"] = 1289] = "Z3_OP_PR_MONOTONICITY";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_PR_QUANT_INTRO"] = 1290] = "Z3_OP_PR_QUANT_INTRO";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_PR_BIND"] = 1291] = "Z3_OP_PR_BIND";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_PR_DISTRIBUTIVITY"] = 1292] = "Z3_OP_PR_DISTRIBUTIVITY";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_PR_AND_ELIM"] = 1293] = "Z3_OP_PR_AND_ELIM";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_PR_NOT_OR_ELIM"] = 1294] = "Z3_OP_PR_NOT_OR_ELIM";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_PR_REWRITE"] = 1295] = "Z3_OP_PR_REWRITE";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_PR_REWRITE_STAR"] = 1296] = "Z3_OP_PR_REWRITE_STAR";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_PR_PULL_QUANT"] = 1297] = "Z3_OP_PR_PULL_QUANT";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_PR_PUSH_QUANT"] = 1298] = "Z3_OP_PR_PUSH_QUANT";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_PR_ELIM_UNUSED_VARS"] = 1299] = "Z3_OP_PR_ELIM_UNUSED_VARS";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_PR_DER"] = 1300] = "Z3_OP_PR_DER";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_PR_QUANT_INST"] = 1301] = "Z3_OP_PR_QUANT_INST";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_PR_HYPOTHESIS"] = 1302] = "Z3_OP_PR_HYPOTHESIS";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_PR_LEMMA"] = 1303] = "Z3_OP_PR_LEMMA";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_PR_UNIT_RESOLUTION"] = 1304] = "Z3_OP_PR_UNIT_RESOLUTION";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_PR_IFF_TRUE"] = 1305] = "Z3_OP_PR_IFF_TRUE";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_PR_IFF_FALSE"] = 1306] = "Z3_OP_PR_IFF_FALSE";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_PR_COMMUTATIVITY"] = 1307] = "Z3_OP_PR_COMMUTATIVITY";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_PR_DEF_AXIOM"] = 1308] = "Z3_OP_PR_DEF_AXIOM";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_PR_ASSUMPTION_ADD"] = 1309] = "Z3_OP_PR_ASSUMPTION_ADD";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_PR_LEMMA_ADD"] = 1310] = "Z3_OP_PR_LEMMA_ADD";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_PR_REDUNDANT_DEL"] = 1311] = "Z3_OP_PR_REDUNDANT_DEL";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_PR_CLAUSE_TRAIL"] = 1312] = "Z3_OP_PR_CLAUSE_TRAIL";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_PR_DEF_INTRO"] = 1313] = "Z3_OP_PR_DEF_INTRO";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_PR_APPLY_DEF"] = 1314] = "Z3_OP_PR_APPLY_DEF";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_PR_IFF_OEQ"] = 1315] = "Z3_OP_PR_IFF_OEQ";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_PR_NNF_POS"] = 1316] = "Z3_OP_PR_NNF_POS";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_PR_NNF_NEG"] = 1317] = "Z3_OP_PR_NNF_NEG";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_PR_SKOLEMIZE"] = 1318] = "Z3_OP_PR_SKOLEMIZE";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_PR_MODUS_PONENS_OEQ"] = 1319] = "Z3_OP_PR_MODUS_PONENS_OEQ";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_PR_TH_LEMMA"] = 1320] = "Z3_OP_PR_TH_LEMMA";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_PR_HYPER_RESOLVE"] = 1321] = "Z3_OP_PR_HYPER_RESOLVE";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_RA_STORE"] = 1536] = "Z3_OP_RA_STORE";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_RA_EMPTY"] = 1537] = "Z3_OP_RA_EMPTY";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_RA_IS_EMPTY"] = 1538] = "Z3_OP_RA_IS_EMPTY";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_RA_JOIN"] = 1539] = "Z3_OP_RA_JOIN";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_RA_UNION"] = 1540] = "Z3_OP_RA_UNION";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_RA_WIDEN"] = 1541] = "Z3_OP_RA_WIDEN";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_RA_PROJECT"] = 1542] = "Z3_OP_RA_PROJECT";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_RA_FILTER"] = 1543] = "Z3_OP_RA_FILTER";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_RA_NEGATION_FILTER"] = 1544] = "Z3_OP_RA_NEGATION_FILTER";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_RA_RENAME"] = 1545] = "Z3_OP_RA_RENAME";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_RA_COMPLEMENT"] = 1546] = "Z3_OP_RA_COMPLEMENT";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_RA_SELECT"] = 1547] = "Z3_OP_RA_SELECT";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_RA_CLONE"] = 1548] = "Z3_OP_RA_CLONE";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_FD_CONSTANT"] = 1549] = "Z3_OP_FD_CONSTANT";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_FD_LT"] = 1550] = "Z3_OP_FD_LT";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_SEQ_UNIT"] = 1551] = "Z3_OP_SEQ_UNIT";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_SEQ_EMPTY"] = 1552] = "Z3_OP_SEQ_EMPTY";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_SEQ_CONCAT"] = 1553] = "Z3_OP_SEQ_CONCAT";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_SEQ_PREFIX"] = 1554] = "Z3_OP_SEQ_PREFIX";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_SEQ_SUFFIX"] = 1555] = "Z3_OP_SEQ_SUFFIX";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_SEQ_CONTAINS"] = 1556] = "Z3_OP_SEQ_CONTAINS";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_SEQ_EXTRACT"] = 1557] = "Z3_OP_SEQ_EXTRACT";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_SEQ_REPLACE"] = 1558] = "Z3_OP_SEQ_REPLACE";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_SEQ_REPLACE_RE"] = 1559] = "Z3_OP_SEQ_REPLACE_RE";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_SEQ_REPLACE_RE_ALL"] = 1560] = "Z3_OP_SEQ_REPLACE_RE_ALL";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_SEQ_REPLACE_ALL"] = 1561] = "Z3_OP_SEQ_REPLACE_ALL";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_SEQ_AT"] = 1562] = "Z3_OP_SEQ_AT";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_SEQ_NTH"] = 1563] = "Z3_OP_SEQ_NTH";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_SEQ_LENGTH"] = 1564] = "Z3_OP_SEQ_LENGTH";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_SEQ_INDEX"] = 1565] = "Z3_OP_SEQ_INDEX";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_SEQ_LAST_INDEX"] = 1566] = "Z3_OP_SEQ_LAST_INDEX";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_SEQ_TO_RE"] = 1567] = "Z3_OP_SEQ_TO_RE";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_SEQ_IN_RE"] = 1568] = "Z3_OP_SEQ_IN_RE";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_SEQ_MAP"] = 1569] = "Z3_OP_SEQ_MAP";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_SEQ_MAPI"] = 1570] = "Z3_OP_SEQ_MAPI";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_SEQ_FOLDL"] = 1571] = "Z3_OP_SEQ_FOLDL";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_SEQ_FOLDLI"] = 1572] = "Z3_OP_SEQ_FOLDLI";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_STR_TO_INT"] = 1573] = "Z3_OP_STR_TO_INT";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_INT_TO_STR"] = 1574] = "Z3_OP_INT_TO_STR";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_UBV_TO_STR"] = 1575] = "Z3_OP_UBV_TO_STR";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_SBV_TO_STR"] = 1576] = "Z3_OP_SBV_TO_STR";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_STR_TO_CODE"] = 1577] = "Z3_OP_STR_TO_CODE";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_STR_FROM_CODE"] = 1578] = "Z3_OP_STR_FROM_CODE";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_STRING_LT"] = 1579] = "Z3_OP_STRING_LT";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_STRING_LE"] = 1580] = "Z3_OP_STRING_LE";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_RE_PLUS"] = 1581] = "Z3_OP_RE_PLUS";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_RE_STAR"] = 1582] = "Z3_OP_RE_STAR";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_RE_OPTION"] = 1583] = "Z3_OP_RE_OPTION";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_RE_CONCAT"] = 1584] = "Z3_OP_RE_CONCAT";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_RE_UNION"] = 1585] = "Z3_OP_RE_UNION";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_RE_RANGE"] = 1586] = "Z3_OP_RE_RANGE";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_RE_DIFF"] = 1587] = "Z3_OP_RE_DIFF";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_RE_INTERSECT"] = 1588] = "Z3_OP_RE_INTERSECT";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_RE_LOOP"] = 1589] = "Z3_OP_RE_LOOP";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_RE_POWER"] = 1590] = "Z3_OP_RE_POWER";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_RE_COMPLEMENT"] = 1591] = "Z3_OP_RE_COMPLEMENT";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_RE_EMPTY_SET"] = 1592] = "Z3_OP_RE_EMPTY_SET";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_RE_FULL_SET"] = 1593] = "Z3_OP_RE_FULL_SET";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_RE_FULL_CHAR_SET"] = 1594] = "Z3_OP_RE_FULL_CHAR_SET";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_RE_OF_PRED"] = 1595] = "Z3_OP_RE_OF_PRED";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_RE_REVERSE"] = 1596] = "Z3_OP_RE_REVERSE";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_RE_DERIVATIVE"] = 1597] = "Z3_OP_RE_DERIVATIVE";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_CHAR_CONST"] = 1598] = "Z3_OP_CHAR_CONST";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_CHAR_LE"] = 1599] = "Z3_OP_CHAR_LE";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_CHAR_TO_INT"] = 1600] = "Z3_OP_CHAR_TO_INT";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_CHAR_TO_BV"] = 1601] = "Z3_OP_CHAR_TO_BV";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_CHAR_FROM_BV"] = 1602] = "Z3_OP_CHAR_FROM_BV";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_CHAR_IS_DIGIT"] = 1603] = "Z3_OP_CHAR_IS_DIGIT";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_LABEL"] = 1792] = "Z3_OP_LABEL";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_LABEL_LIT"] = 1793] = "Z3_OP_LABEL_LIT";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_DT_CONSTRUCTOR"] = 2048] = "Z3_OP_DT_CONSTRUCTOR";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_DT_RECOGNISER"] = 2049] = "Z3_OP_DT_RECOGNISER";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_DT_IS"] = 2050] = "Z3_OP_DT_IS";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_DT_ACCESSOR"] = 2051] = "Z3_OP_DT_ACCESSOR";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_DT_UPDATE_FIELD"] = 2052] = "Z3_OP_DT_UPDATE_FIELD";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_PB_AT_MOST"] = 2304] = "Z3_OP_PB_AT_MOST";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_PB_AT_LEAST"] = 2305] = "Z3_OP_PB_AT_LEAST";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_PB_LE"] = 2306] = "Z3_OP_PB_LE";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_PB_GE"] = 2307] = "Z3_OP_PB_GE";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_PB_EQ"] = 2308] = "Z3_OP_PB_EQ";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_SPECIAL_RELATION_LO"] = 40960] = "Z3_OP_SPECIAL_RELATION_LO";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_SPECIAL_RELATION_PO"] = 40961] = "Z3_OP_SPECIAL_RELATION_PO";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_SPECIAL_RELATION_PLO"] = 40962] = "Z3_OP_SPECIAL_RELATION_PLO";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_SPECIAL_RELATION_TO"] = 40963] = "Z3_OP_SPECIAL_RELATION_TO";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_SPECIAL_RELATION_TC"] = 40964] = "Z3_OP_SPECIAL_RELATION_TC";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_SPECIAL_RELATION_TRC"] = 40965] = "Z3_OP_SPECIAL_RELATION_TRC";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_FPA_RM_NEAREST_TIES_TO_EVEN"] = 45056] = "Z3_OP_FPA_RM_NEAREST_TIES_TO_EVEN";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_FPA_RM_NEAREST_TIES_TO_AWAY"] = 45057] = "Z3_OP_FPA_RM_NEAREST_TIES_TO_AWAY";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_FPA_RM_TOWARD_POSITIVE"] = 45058] = "Z3_OP_FPA_RM_TOWARD_POSITIVE";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_FPA_RM_TOWARD_NEGATIVE"] = 45059] = "Z3_OP_FPA_RM_TOWARD_NEGATIVE";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_FPA_RM_TOWARD_ZERO"] = 45060] = "Z3_OP_FPA_RM_TOWARD_ZERO";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_FPA_NUM"] = 45061] = "Z3_OP_FPA_NUM";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_FPA_PLUS_INF"] = 45062] = "Z3_OP_FPA_PLUS_INF";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_FPA_MINUS_INF"] = 45063] = "Z3_OP_FPA_MINUS_INF";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_FPA_NAN"] = 45064] = "Z3_OP_FPA_NAN";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_FPA_PLUS_ZERO"] = 45065] = "Z3_OP_FPA_PLUS_ZERO";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_FPA_MINUS_ZERO"] = 45066] = "Z3_OP_FPA_MINUS_ZERO";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_FPA_ADD"] = 45067] = "Z3_OP_FPA_ADD";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_FPA_SUB"] = 45068] = "Z3_OP_FPA_SUB";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_FPA_NEG"] = 45069] = "Z3_OP_FPA_NEG";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_FPA_MUL"] = 45070] = "Z3_OP_FPA_MUL";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_FPA_DIV"] = 45071] = "Z3_OP_FPA_DIV";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_FPA_REM"] = 45072] = "Z3_OP_FPA_REM";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_FPA_ABS"] = 45073] = "Z3_OP_FPA_ABS";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_FPA_MIN"] = 45074] = "Z3_OP_FPA_MIN";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_FPA_MAX"] = 45075] = "Z3_OP_FPA_MAX";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_FPA_FMA"] = 45076] = "Z3_OP_FPA_FMA";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_FPA_SQRT"] = 45077] = "Z3_OP_FPA_SQRT";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_FPA_ROUND_TO_INTEGRAL"] = 45078] = "Z3_OP_FPA_ROUND_TO_INTEGRAL";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_FPA_EQ"] = 45079] = "Z3_OP_FPA_EQ";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_FPA_LT"] = 45080] = "Z3_OP_FPA_LT";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_FPA_GT"] = 45081] = "Z3_OP_FPA_GT";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_FPA_LE"] = 45082] = "Z3_OP_FPA_LE";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_FPA_GE"] = 45083] = "Z3_OP_FPA_GE";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_FPA_IS_NAN"] = 45084] = "Z3_OP_FPA_IS_NAN";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_FPA_IS_INF"] = 45085] = "Z3_OP_FPA_IS_INF";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_FPA_IS_ZERO"] = 45086] = "Z3_OP_FPA_IS_ZERO";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_FPA_IS_NORMAL"] = 45087] = "Z3_OP_FPA_IS_NORMAL";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_FPA_IS_SUBNORMAL"] = 45088] = "Z3_OP_FPA_IS_SUBNORMAL";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_FPA_IS_NEGATIVE"] = 45089] = "Z3_OP_FPA_IS_NEGATIVE";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_FPA_IS_POSITIVE"] = 45090] = "Z3_OP_FPA_IS_POSITIVE";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_FPA_FP"] = 45091] = "Z3_OP_FPA_FP";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_FPA_TO_FP"] = 45092] = "Z3_OP_FPA_TO_FP";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_FPA_TO_FP_UNSIGNED"] = 45093] = "Z3_OP_FPA_TO_FP_UNSIGNED";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_FPA_TO_UBV"] = 45094] = "Z3_OP_FPA_TO_UBV";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_FPA_TO_SBV"] = 45095] = "Z3_OP_FPA_TO_SBV";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_FPA_TO_REAL"] = 45096] = "Z3_OP_FPA_TO_REAL";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_FPA_TO_IEEE_BV"] = 45097] = "Z3_OP_FPA_TO_IEEE_BV";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_FPA_BVWRAP"] = 45098] = "Z3_OP_FPA_BVWRAP";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_FPA_BV2RM"] = 45099] = "Z3_OP_FPA_BV2RM";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_INTERNAL"] = 45100] = "Z3_OP_INTERNAL";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_RECURSIVE"] = 45101] = "Z3_OP_RECURSIVE";
      Z3_decl_kind2[Z3_decl_kind2["Z3_OP_UNINTERPRETED"] = 45102] = "Z3_OP_UNINTERPRETED";
    })(Z3_decl_kind || (types___GENERATED__.Z3_decl_kind = Z3_decl_kind = {}));
    var Z3_param_kind;
    (function(Z3_param_kind2) {
      Z3_param_kind2[Z3_param_kind2["Z3_PK_UINT"] = 0] = "Z3_PK_UINT";
      Z3_param_kind2[Z3_param_kind2["Z3_PK_BOOL"] = 1] = "Z3_PK_BOOL";
      Z3_param_kind2[Z3_param_kind2["Z3_PK_DOUBLE"] = 2] = "Z3_PK_DOUBLE";
      Z3_param_kind2[Z3_param_kind2["Z3_PK_SYMBOL"] = 3] = "Z3_PK_SYMBOL";
      Z3_param_kind2[Z3_param_kind2["Z3_PK_STRING"] = 4] = "Z3_PK_STRING";
      Z3_param_kind2[Z3_param_kind2["Z3_PK_OTHER"] = 5] = "Z3_PK_OTHER";
      Z3_param_kind2[Z3_param_kind2["Z3_PK_INVALID"] = 6] = "Z3_PK_INVALID";
    })(Z3_param_kind || (types___GENERATED__.Z3_param_kind = Z3_param_kind = {}));
    var Z3_ast_print_mode;
    (function(Z3_ast_print_mode2) {
      Z3_ast_print_mode2[Z3_ast_print_mode2["Z3_PRINT_SMTLIB_FULL"] = 0] = "Z3_PRINT_SMTLIB_FULL";
      Z3_ast_print_mode2[Z3_ast_print_mode2["Z3_PRINT_LOW_LEVEL"] = 1] = "Z3_PRINT_LOW_LEVEL";
      Z3_ast_print_mode2[Z3_ast_print_mode2["Z3_PRINT_SMTLIB2_COMPLIANT"] = 2] = "Z3_PRINT_SMTLIB2_COMPLIANT";
    })(Z3_ast_print_mode || (types___GENERATED__.Z3_ast_print_mode = Z3_ast_print_mode = {}));
    var Z3_error_code;
    (function(Z3_error_code2) {
      Z3_error_code2[Z3_error_code2["Z3_OK"] = 0] = "Z3_OK";
      Z3_error_code2[Z3_error_code2["Z3_SORT_ERROR"] = 1] = "Z3_SORT_ERROR";
      Z3_error_code2[Z3_error_code2["Z3_IOB"] = 2] = "Z3_IOB";
      Z3_error_code2[Z3_error_code2["Z3_INVALID_ARG"] = 3] = "Z3_INVALID_ARG";
      Z3_error_code2[Z3_error_code2["Z3_PARSER_ERROR"] = 4] = "Z3_PARSER_ERROR";
      Z3_error_code2[Z3_error_code2["Z3_NO_PARSER"] = 5] = "Z3_NO_PARSER";
      Z3_error_code2[Z3_error_code2["Z3_INVALID_PATTERN"] = 6] = "Z3_INVALID_PATTERN";
      Z3_error_code2[Z3_error_code2["Z3_MEMOUT_FAIL"] = 7] = "Z3_MEMOUT_FAIL";
      Z3_error_code2[Z3_error_code2["Z3_FILE_ACCESS_ERROR"] = 8] = "Z3_FILE_ACCESS_ERROR";
      Z3_error_code2[Z3_error_code2["Z3_INTERNAL_FATAL"] = 9] = "Z3_INTERNAL_FATAL";
      Z3_error_code2[Z3_error_code2["Z3_INVALID_USAGE"] = 10] = "Z3_INVALID_USAGE";
      Z3_error_code2[Z3_error_code2["Z3_DEC_REF_ERROR"] = 11] = "Z3_DEC_REF_ERROR";
      Z3_error_code2[Z3_error_code2["Z3_EXCEPTION"] = 12] = "Z3_EXCEPTION";
    })(Z3_error_code || (types___GENERATED__.Z3_error_code = Z3_error_code = {}));
    var Z3_goal_prec;
    (function(Z3_goal_prec2) {
      Z3_goal_prec2[Z3_goal_prec2["Z3_GOAL_PRECISE"] = 0] = "Z3_GOAL_PRECISE";
      Z3_goal_prec2[Z3_goal_prec2["Z3_GOAL_UNDER"] = 1] = "Z3_GOAL_UNDER";
      Z3_goal_prec2[Z3_goal_prec2["Z3_GOAL_OVER"] = 2] = "Z3_GOAL_OVER";
      Z3_goal_prec2[Z3_goal_prec2["Z3_GOAL_UNDER_OVER"] = 3] = "Z3_GOAL_UNDER_OVER";
    })(Z3_goal_prec || (types___GENERATED__.Z3_goal_prec = Z3_goal_prec = {}));
    return types___GENERATED__;
  }
  var wrapper___GENERATED__ = {};
  var hasRequiredWrapper___GENERATED__;
  function requireWrapper___GENERATED__() {
    if (hasRequiredWrapper___GENERATED__) return wrapper___GENERATED__;
    hasRequiredWrapper___GENERATED__ = 1;
    Object.defineProperty(wrapper___GENERATED__, "__esModule", { value: true });
    wrapper___GENERATED__.init = init;
    async function init(initModule) {
      let Mod = await initModule();
      function intArrayToByteArr(ints) {
        return new Uint8Array(new Uint32Array(ints).buffer);
      }
      function boolArrayToByteArr(bools) {
        return bools.map((b) => b ? 1 : 0);
      }
      function readUintArray(address, count) {
        return Array.from(new Uint32Array(Mod.HEAPU32.buffer, address, count));
      }
      let outAddress = Mod._malloc(24);
      let outUintArray = new Uint32Array(Mod.HEAPU32.buffer, outAddress, 4);
      let getOutUint = (i) => outUintArray[i];
      let outIntArray = new Int32Array(Mod.HEAPU32.buffer, outAddress, 4);
      let getOutInt = (i) => outIntArray[i];
      let outUint64Array = new BigUint64Array(Mod.HEAPU32.buffer, outAddress, 2);
      let getOutUint64 = (i) => outUint64Array[i];
      let outInt64Array = new BigInt64Array(Mod.HEAPU32.buffer, outAddress, 2);
      let getOutInt64 = (i) => outInt64Array[i];
      return {
        em: Mod,
        Z3: {
          mk_context: function(c) {
            let ctx = Mod._Z3_mk_context(c);
            Mod._set_noop_error_handler(ctx);
            return ctx;
          },
          mk_context_rc: function(c) {
            let ctx = Mod._Z3_mk_context_rc(c);
            Mod._set_noop_error_handler(ctx);
            return ctx;
          },
          global_param_set: function(param_id, param_value) {
            return Mod.ccall("Z3_global_param_set", "void", ["string", "string"], [param_id, param_value]);
          },
          global_param_reset_all: Mod._Z3_global_param_reset_all,
          global_param_get: function(param_id) {
            let ret = Mod.ccall("Z3_global_param_get", "boolean", ["string", "number"], [param_id, outAddress]);
            if (!ret) {
              return null;
            }
            return Mod.UTF8ToString(getOutUint(0));
          },
          mk_config: Mod._Z3_mk_config,
          del_config: Mod._Z3_del_config,
          set_param_value: function(c, param_id, param_value) {
            return Mod.ccall("Z3_set_param_value", "void", ["number", "string", "string"], [c, param_id, param_value]);
          },
          del_context: Mod._Z3_del_context,
          inc_ref: Mod._Z3_inc_ref,
          dec_ref: Mod._Z3_dec_ref,
          update_param_value: function(c, param_id, param_value) {
            return Mod.ccall("Z3_update_param_value", "void", ["number", "string", "string"], [c, param_id, param_value]);
          },
          get_global_param_descrs: Mod._Z3_get_global_param_descrs,
          interrupt: Mod._Z3_interrupt,
          enable_concurrent_dec_ref: Mod._Z3_enable_concurrent_dec_ref,
          mk_params: Mod._Z3_mk_params,
          params_inc_ref: Mod._Z3_params_inc_ref,
          params_dec_ref: Mod._Z3_params_dec_ref,
          params_set_bool: Mod._Z3_params_set_bool,
          params_set_uint: Mod._Z3_params_set_uint,
          params_set_double: Mod._Z3_params_set_double,
          params_set_symbol: Mod._Z3_params_set_symbol,
          params_to_string: function(c, p) {
            return Mod.ccall("Z3_params_to_string", "string", ["number", "number"], [c, p]);
          },
          params_validate: Mod._Z3_params_validate,
          param_descrs_inc_ref: Mod._Z3_param_descrs_inc_ref,
          param_descrs_dec_ref: Mod._Z3_param_descrs_dec_ref,
          param_descrs_get_kind: Mod._Z3_param_descrs_get_kind,
          param_descrs_size: function(c, p) {
            let ret = Mod.ccall("Z3_param_descrs_size", "number", ["number", "number"], [c, p]);
            ret = new Uint32Array([ret])[0];
            return ret;
          },
          param_descrs_get_name: Mod._Z3_param_descrs_get_name,
          param_descrs_get_documentation: function(c, p, s) {
            return Mod.ccall("Z3_param_descrs_get_documentation", "string", ["number", "number", "number"], [c, p, s]);
          },
          param_descrs_to_string: function(c, p) {
            return Mod.ccall("Z3_param_descrs_to_string", "string", ["number", "number"], [c, p]);
          },
          mk_int_symbol: Mod._Z3_mk_int_symbol,
          mk_string_symbol: function(c, s) {
            return Mod.ccall("Z3_mk_string_symbol", "number", ["number", "string"], [c, s]);
          },
          mk_uninterpreted_sort: Mod._Z3_mk_uninterpreted_sort,
          mk_type_variable: Mod._Z3_mk_type_variable,
          mk_bool_sort: Mod._Z3_mk_bool_sort,
          mk_int_sort: Mod._Z3_mk_int_sort,
          mk_real_sort: Mod._Z3_mk_real_sort,
          mk_bv_sort: Mod._Z3_mk_bv_sort,
          mk_finite_domain_sort: Mod._Z3_mk_finite_domain_sort,
          mk_array_sort: Mod._Z3_mk_array_sort,
          mk_array_sort_n: function(c, domain, range) {
            return Mod.ccall("Z3_mk_array_sort_n", "number", ["number", "number", "array", "number"], [
              c,
              domain.length,
              intArrayToByteArr(domain),
              range
            ]);
          },
          mk_tuple_sort: function(c, mk_tuple_name, field_names, field_sorts) {
            if (field_names.length !== field_sorts.length) {
              throw new TypeError(`field_names and field_sorts must be the same length (got ${field_names.length} and {field_sorts.length})`);
            }
            let outArray_proj_decl = Mod._malloc(4 * field_names.length);
            try {
              let ret = Mod.ccall("Z3_mk_tuple_sort", "number", [
                "number",
                "number",
                "number",
                "array",
                "array",
                "number",
                "number"
              ], [
                c,
                mk_tuple_name,
                field_names.length,
                intArrayToByteArr(field_names),
                intArrayToByteArr(field_sorts),
                outAddress,
                outArray_proj_decl
              ]);
              return {
                rv: ret,
                mk_tuple_decl: getOutUint(0),
                proj_decl: readUintArray(outArray_proj_decl, field_names.length)
              };
            } finally {
              Mod._free(outArray_proj_decl);
            }
          },
          mk_enumeration_sort: function(c, name, enum_names) {
            let outArray_enum_consts = Mod._malloc(4 * enum_names.length);
            try {
              let outArray_enum_testers = Mod._malloc(4 * enum_names.length);
              try {
                let ret = Mod.ccall("Z3_mk_enumeration_sort", "number", ["number", "number", "number", "array", "number", "number"], [
                  c,
                  name,
                  enum_names.length,
                  intArrayToByteArr(enum_names),
                  outArray_enum_consts,
                  outArray_enum_testers
                ]);
                return {
                  rv: ret,
                  enum_consts: readUintArray(outArray_enum_consts, enum_names.length),
                  enum_testers: readUintArray(outArray_enum_testers, enum_names.length)
                };
              } finally {
                Mod._free(outArray_enum_testers);
              }
            } finally {
              Mod._free(outArray_enum_consts);
            }
          },
          mk_list_sort: function(c, name, elem_sort) {
            let ret = Mod.ccall("Z3_mk_list_sort", "number", [
              "number",
              "number",
              "number",
              "number",
              "number",
              "number",
              "number",
              "number",
              "number"
            ], [
              c,
              name,
              elem_sort,
              outAddress,
              outAddress + 4,
              outAddress + 8,
              outAddress + 12,
              outAddress + 16,
              outAddress + 20
            ]);
            return {
              rv: ret,
              nil_decl: getOutUint(0),
              is_nil_decl: getOutUint(1),
              cons_decl: getOutUint(2),
              is_cons_decl: getOutUint(3),
              head_decl: getOutUint(4),
              tail_decl: getOutUint(5)
            };
          },
          mk_constructor: function(c, name, recognizer, field_names, sorts, sort_refs) {
            if (field_names.length !== sorts.length) {
              throw new TypeError(`field_names and sorts must be the same length (got ${field_names.length} and {sorts.length})`);
            }
            if (field_names.length !== sort_refs.length) {
              throw new TypeError(`field_names and sort_refs must be the same length (got ${field_names.length} and {sort_refs.length})`);
            }
            return Mod.ccall("Z3_mk_constructor", "number", ["number", "number", "number", "number", "array", "array", "array"], [
              c,
              name,
              recognizer,
              field_names.length,
              intArrayToByteArr(field_names),
              intArrayToByteArr(sorts),
              intArrayToByteArr(sort_refs)
            ]);
          },
          constructor_num_fields: function(c, constr) {
            let ret = Mod.ccall("Z3_constructor_num_fields", "number", ["number", "number"], [c, constr]);
            ret = new Uint32Array([ret])[0];
            return ret;
          },
          del_constructor: Mod._Z3_del_constructor,
          mk_datatype: function(c, name, constructors) {
            return Mod.ccall("Z3_mk_datatype", "number", ["number", "number", "number", "array"], [
              c,
              name,
              constructors.length,
              intArrayToByteArr(constructors)
            ]);
          },
          mk_datatype_sort: Mod._Z3_mk_datatype_sort,
          mk_constructor_list: function(c, constructors) {
            return Mod.ccall("Z3_mk_constructor_list", "number", ["number", "number", "array"], [
              c,
              constructors.length,
              intArrayToByteArr(constructors)
            ]);
          },
          del_constructor_list: Mod._Z3_del_constructor_list,
          mk_datatypes: function(c, sort_names, constructor_lists) {
            if (sort_names.length !== constructor_lists.length) {
              throw new TypeError(`sort_names and constructor_lists must be the same length (got ${sort_names.length} and {constructor_lists.length})`);
            }
            let outArray_sorts = Mod._malloc(4 * sort_names.length);
            try {
              let ret = Mod.ccall("Z3_mk_datatypes", "void", ["number", "number", "array", "number", "array"], [
                c,
                sort_names.length,
                intArrayToByteArr(sort_names),
                outArray_sorts,
                intArrayToByteArr(constructor_lists)
              ]);
              return readUintArray(outArray_sorts, sort_names.length);
            } finally {
              Mod._free(outArray_sorts);
            }
          },
          query_constructor: function(c, constr, num_fields) {
            let outArray_accessors = Mod._malloc(4 * num_fields);
            try {
              let ret = Mod.ccall("Z3_query_constructor", "void", ["number", "number", "number", "number", "number", "number"], [
                c,
                constr,
                num_fields,
                outAddress,
                outAddress + 4,
                outArray_accessors
              ]);
              return {
                constructor: getOutUint(0),
                tester: getOutUint(1),
                accessors: readUintArray(outArray_accessors, num_fields)
              };
            } finally {
              Mod._free(outArray_accessors);
            }
          },
          mk_func_decl: function(c, s, domain, range) {
            return Mod.ccall("Z3_mk_func_decl", "number", ["number", "number", "number", "array", "number"], [
              c,
              s,
              domain.length,
              intArrayToByteArr(domain),
              range
            ]);
          },
          mk_app: function(c, d, args) {
            return Mod.ccall("Z3_mk_app", "number", ["number", "number", "number", "array"], [c, d, args.length, intArrayToByteArr(args)]);
          },
          mk_const: Mod._Z3_mk_const,
          mk_fresh_func_decl: function(c, prefix, domain, range) {
            return Mod.ccall("Z3_mk_fresh_func_decl", "number", ["number", "string", "number", "array", "number"], [
              c,
              prefix,
              domain.length,
              intArrayToByteArr(domain),
              range
            ]);
          },
          mk_fresh_const: function(c, prefix, ty) {
            return Mod.ccall("Z3_mk_fresh_const", "number", ["number", "string", "number"], [c, prefix, ty]);
          },
          mk_rec_func_decl: function(c, s, domain, range) {
            return Mod.ccall("Z3_mk_rec_func_decl", "number", ["number", "number", "number", "array", "number"], [
              c,
              s,
              domain.length,
              intArrayToByteArr(domain),
              range
            ]);
          },
          add_rec_def: function(c, f, args, body) {
            return Mod.ccall("Z3_add_rec_def", "void", ["number", "number", "number", "array", "number"], [
              c,
              f,
              args.length,
              intArrayToByteArr(args),
              body
            ]);
          },
          mk_true: Mod._Z3_mk_true,
          mk_false: Mod._Z3_mk_false,
          mk_eq: Mod._Z3_mk_eq,
          mk_distinct: function(c, args) {
            return Mod.ccall("Z3_mk_distinct", "number", ["number", "number", "array"], [c, args.length, intArrayToByteArr(args)]);
          },
          mk_not: Mod._Z3_mk_not,
          mk_ite: Mod._Z3_mk_ite,
          mk_iff: Mod._Z3_mk_iff,
          mk_implies: Mod._Z3_mk_implies,
          mk_xor: Mod._Z3_mk_xor,
          mk_and: function(c, args) {
            return Mod.ccall("Z3_mk_and", "number", ["number", "number", "array"], [c, args.length, intArrayToByteArr(args)]);
          },
          mk_or: function(c, args) {
            return Mod.ccall("Z3_mk_or", "number", ["number", "number", "array"], [c, args.length, intArrayToByteArr(args)]);
          },
          mk_add: function(c, args) {
            return Mod.ccall("Z3_mk_add", "number", ["number", "number", "array"], [c, args.length, intArrayToByteArr(args)]);
          },
          mk_mul: function(c, args) {
            return Mod.ccall("Z3_mk_mul", "number", ["number", "number", "array"], [c, args.length, intArrayToByteArr(args)]);
          },
          mk_sub: function(c, args) {
            return Mod.ccall("Z3_mk_sub", "number", ["number", "number", "array"], [c, args.length, intArrayToByteArr(args)]);
          },
          mk_unary_minus: Mod._Z3_mk_unary_minus,
          mk_div: Mod._Z3_mk_div,
          mk_mod: Mod._Z3_mk_mod,
          mk_rem: Mod._Z3_mk_rem,
          mk_power: Mod._Z3_mk_power,
          mk_abs: Mod._Z3_mk_abs,
          mk_lt: Mod._Z3_mk_lt,
          mk_le: Mod._Z3_mk_le,
          mk_gt: Mod._Z3_mk_gt,
          mk_ge: Mod._Z3_mk_ge,
          mk_divides: Mod._Z3_mk_divides,
          mk_int2real: Mod._Z3_mk_int2real,
          mk_real2int: Mod._Z3_mk_real2int,
          mk_is_int: Mod._Z3_mk_is_int,
          mk_bvnot: Mod._Z3_mk_bvnot,
          mk_bvredand: Mod._Z3_mk_bvredand,
          mk_bvredor: Mod._Z3_mk_bvredor,
          mk_bvand: Mod._Z3_mk_bvand,
          mk_bvor: Mod._Z3_mk_bvor,
          mk_bvxor: Mod._Z3_mk_bvxor,
          mk_bvnand: Mod._Z3_mk_bvnand,
          mk_bvnor: Mod._Z3_mk_bvnor,
          mk_bvxnor: Mod._Z3_mk_bvxnor,
          mk_bvneg: Mod._Z3_mk_bvneg,
          mk_bvadd: Mod._Z3_mk_bvadd,
          mk_bvsub: Mod._Z3_mk_bvsub,
          mk_bvmul: Mod._Z3_mk_bvmul,
          mk_bvudiv: Mod._Z3_mk_bvudiv,
          mk_bvsdiv: Mod._Z3_mk_bvsdiv,
          mk_bvurem: Mod._Z3_mk_bvurem,
          mk_bvsrem: Mod._Z3_mk_bvsrem,
          mk_bvsmod: Mod._Z3_mk_bvsmod,
          mk_bvult: Mod._Z3_mk_bvult,
          mk_bvslt: Mod._Z3_mk_bvslt,
          mk_bvule: Mod._Z3_mk_bvule,
          mk_bvsle: Mod._Z3_mk_bvsle,
          mk_bvuge: Mod._Z3_mk_bvuge,
          mk_bvsge: Mod._Z3_mk_bvsge,
          mk_bvugt: Mod._Z3_mk_bvugt,
          mk_bvsgt: Mod._Z3_mk_bvsgt,
          mk_concat: Mod._Z3_mk_concat,
          mk_extract: Mod._Z3_mk_extract,
          mk_sign_ext: Mod._Z3_mk_sign_ext,
          mk_zero_ext: Mod._Z3_mk_zero_ext,
          mk_repeat: Mod._Z3_mk_repeat,
          mk_bit2bool: Mod._Z3_mk_bit2bool,
          mk_bvshl: Mod._Z3_mk_bvshl,
          mk_bvlshr: Mod._Z3_mk_bvlshr,
          mk_bvashr: Mod._Z3_mk_bvashr,
          mk_rotate_left: Mod._Z3_mk_rotate_left,
          mk_rotate_right: Mod._Z3_mk_rotate_right,
          mk_ext_rotate_left: Mod._Z3_mk_ext_rotate_left,
          mk_ext_rotate_right: Mod._Z3_mk_ext_rotate_right,
          mk_int2bv: Mod._Z3_mk_int2bv,
          mk_bv2int: Mod._Z3_mk_bv2int,
          mk_bvadd_no_overflow: Mod._Z3_mk_bvadd_no_overflow,
          mk_bvadd_no_underflow: Mod._Z3_mk_bvadd_no_underflow,
          mk_bvsub_no_overflow: Mod._Z3_mk_bvsub_no_overflow,
          mk_bvsub_no_underflow: Mod._Z3_mk_bvsub_no_underflow,
          mk_bvsdiv_no_overflow: Mod._Z3_mk_bvsdiv_no_overflow,
          mk_bvneg_no_overflow: Mod._Z3_mk_bvneg_no_overflow,
          mk_bvmul_no_overflow: Mod._Z3_mk_bvmul_no_overflow,
          mk_bvmul_no_underflow: Mod._Z3_mk_bvmul_no_underflow,
          mk_select: Mod._Z3_mk_select,
          mk_select_n: function(c, a, idxs) {
            return Mod.ccall("Z3_mk_select_n", "number", ["number", "number", "number", "array"], [c, a, idxs.length, intArrayToByteArr(idxs)]);
          },
          mk_store: Mod._Z3_mk_store,
          mk_store_n: function(c, a, idxs, v) {
            return Mod.ccall("Z3_mk_store_n", "number", ["number", "number", "number", "array", "number"], [
              c,
              a,
              idxs.length,
              intArrayToByteArr(idxs),
              v
            ]);
          },
          mk_const_array: Mod._Z3_mk_const_array,
          mk_map: function(c, f, args) {
            return Mod.ccall("Z3_mk_map", "number", ["number", "number", "number", "array"], [c, f, args.length, intArrayToByteArr(args)]);
          },
          mk_array_default: Mod._Z3_mk_array_default,
          mk_as_array: Mod._Z3_mk_as_array,
          mk_set_has_size: Mod._Z3_mk_set_has_size,
          mk_set_sort: Mod._Z3_mk_set_sort,
          mk_empty_set: Mod._Z3_mk_empty_set,
          mk_full_set: Mod._Z3_mk_full_set,
          mk_set_add: Mod._Z3_mk_set_add,
          mk_set_del: Mod._Z3_mk_set_del,
          mk_set_union: function(c, args) {
            return Mod.ccall("Z3_mk_set_union", "number", ["number", "number", "array"], [c, args.length, intArrayToByteArr(args)]);
          },
          mk_set_intersect: function(c, args) {
            return Mod.ccall("Z3_mk_set_intersect", "number", ["number", "number", "array"], [c, args.length, intArrayToByteArr(args)]);
          },
          mk_set_difference: Mod._Z3_mk_set_difference,
          mk_set_complement: Mod._Z3_mk_set_complement,
          mk_set_member: Mod._Z3_mk_set_member,
          mk_set_subset: Mod._Z3_mk_set_subset,
          mk_array_ext: Mod._Z3_mk_array_ext,
          mk_numeral: function(c, numeral, ty) {
            return Mod.ccall("Z3_mk_numeral", "number", ["number", "string", "number"], [c, numeral, ty]);
          },
          mk_real: Mod._Z3_mk_real,
          mk_real_int64: Mod._Z3_mk_real_int64,
          mk_int: Mod._Z3_mk_int,
          mk_unsigned_int: Mod._Z3_mk_unsigned_int,
          mk_int64: Mod._Z3_mk_int64,
          mk_unsigned_int64: Mod._Z3_mk_unsigned_int64,
          mk_bv_numeral: function(c, bits) {
            return Mod.ccall("Z3_mk_bv_numeral", "number", ["number", "number", "array"], [c, bits.length, boolArrayToByteArr(bits)]);
          },
          mk_seq_sort: Mod._Z3_mk_seq_sort,
          is_seq_sort: function(c, s) {
            return Mod.ccall("Z3_is_seq_sort", "boolean", ["number", "number"], [c, s]);
          },
          get_seq_sort_basis: Mod._Z3_get_seq_sort_basis,
          mk_re_sort: Mod._Z3_mk_re_sort,
          is_re_sort: function(c, s) {
            return Mod.ccall("Z3_is_re_sort", "boolean", ["number", "number"], [c, s]);
          },
          get_re_sort_basis: Mod._Z3_get_re_sort_basis,
          mk_string_sort: Mod._Z3_mk_string_sort,
          mk_char_sort: Mod._Z3_mk_char_sort,
          is_string_sort: function(c, s) {
            return Mod.ccall("Z3_is_string_sort", "boolean", ["number", "number"], [c, s]);
          },
          is_char_sort: function(c, s) {
            return Mod.ccall("Z3_is_char_sort", "boolean", ["number", "number"], [c, s]);
          },
          mk_string: function(c, s) {
            return Mod.ccall("Z3_mk_string", "number", ["number", "string"], [c, s]);
          },
          mk_lstring: function(c, len, s) {
            return Mod.ccall("Z3_mk_lstring", "number", ["number", "number", "string"], [c, len, s]);
          },
          mk_u32string: function(c, chars) {
            return Mod.ccall("Z3_mk_u32string", "number", ["number", "number", "array"], [c, chars.length, intArrayToByteArr(chars)]);
          },
          is_string: function(c, s) {
            return Mod.ccall("Z3_is_string", "boolean", ["number", "number"], [c, s]);
          },
          get_string: function(c, s) {
            return Mod.ccall("Z3_get_string", "string", ["number", "number"], [c, s]);
          },
          get_string_length: function(c, s) {
            let ret = Mod.ccall("Z3_get_string_length", "number", ["number", "number"], [c, s]);
            ret = new Uint32Array([ret])[0];
            return ret;
          },
          get_string_contents: function(c, s, length) {
            let outArray_contents = Mod._malloc(4 * length);
            try {
              let ret = Mod.ccall("Z3_get_string_contents", "void", ["number", "number", "number", "number"], [c, s, length, outArray_contents]);
              return readUintArray(outArray_contents, length);
            } finally {
              Mod._free(outArray_contents);
            }
          },
          mk_seq_empty: Mod._Z3_mk_seq_empty,
          mk_seq_unit: Mod._Z3_mk_seq_unit,
          mk_seq_concat: function(c, args) {
            return Mod.ccall("Z3_mk_seq_concat", "number", ["number", "number", "array"], [c, args.length, intArrayToByteArr(args)]);
          },
          mk_seq_prefix: Mod._Z3_mk_seq_prefix,
          mk_seq_suffix: Mod._Z3_mk_seq_suffix,
          mk_seq_contains: Mod._Z3_mk_seq_contains,
          mk_str_lt: Mod._Z3_mk_str_lt,
          mk_str_le: Mod._Z3_mk_str_le,
          mk_seq_extract: Mod._Z3_mk_seq_extract,
          mk_seq_replace: Mod._Z3_mk_seq_replace,
          mk_seq_at: Mod._Z3_mk_seq_at,
          mk_seq_nth: Mod._Z3_mk_seq_nth,
          mk_seq_length: Mod._Z3_mk_seq_length,
          mk_seq_index: Mod._Z3_mk_seq_index,
          mk_seq_last_index: Mod._Z3_mk_seq_last_index,
          mk_seq_map: Mod._Z3_mk_seq_map,
          mk_seq_mapi: Mod._Z3_mk_seq_mapi,
          mk_seq_foldl: Mod._Z3_mk_seq_foldl,
          mk_seq_foldli: Mod._Z3_mk_seq_foldli,
          mk_str_to_int: Mod._Z3_mk_str_to_int,
          mk_int_to_str: Mod._Z3_mk_int_to_str,
          mk_string_to_code: Mod._Z3_mk_string_to_code,
          mk_string_from_code: Mod._Z3_mk_string_from_code,
          mk_ubv_to_str: Mod._Z3_mk_ubv_to_str,
          mk_sbv_to_str: Mod._Z3_mk_sbv_to_str,
          mk_seq_to_re: Mod._Z3_mk_seq_to_re,
          mk_seq_in_re: Mod._Z3_mk_seq_in_re,
          mk_re_plus: Mod._Z3_mk_re_plus,
          mk_re_star: Mod._Z3_mk_re_star,
          mk_re_option: Mod._Z3_mk_re_option,
          mk_re_union: function(c, args) {
            return Mod.ccall("Z3_mk_re_union", "number", ["number", "number", "array"], [c, args.length, intArrayToByteArr(args)]);
          },
          mk_re_concat: function(c, args) {
            return Mod.ccall("Z3_mk_re_concat", "number", ["number", "number", "array"], [c, args.length, intArrayToByteArr(args)]);
          },
          mk_re_range: Mod._Z3_mk_re_range,
          mk_re_allchar: Mod._Z3_mk_re_allchar,
          mk_re_loop: Mod._Z3_mk_re_loop,
          mk_re_power: Mod._Z3_mk_re_power,
          mk_re_intersect: function(c, args) {
            return Mod.ccall("Z3_mk_re_intersect", "number", ["number", "number", "array"], [c, args.length, intArrayToByteArr(args)]);
          },
          mk_re_complement: Mod._Z3_mk_re_complement,
          mk_re_diff: Mod._Z3_mk_re_diff,
          mk_re_empty: Mod._Z3_mk_re_empty,
          mk_re_full: Mod._Z3_mk_re_full,
          mk_char: Mod._Z3_mk_char,
          mk_char_le: Mod._Z3_mk_char_le,
          mk_char_to_int: Mod._Z3_mk_char_to_int,
          mk_char_to_bv: Mod._Z3_mk_char_to_bv,
          mk_char_from_bv: Mod._Z3_mk_char_from_bv,
          mk_char_is_digit: Mod._Z3_mk_char_is_digit,
          mk_linear_order: Mod._Z3_mk_linear_order,
          mk_partial_order: Mod._Z3_mk_partial_order,
          mk_piecewise_linear_order: Mod._Z3_mk_piecewise_linear_order,
          mk_tree_order: Mod._Z3_mk_tree_order,
          mk_transitive_closure: Mod._Z3_mk_transitive_closure,
          mk_pattern: function(c, terms) {
            return Mod.ccall("Z3_mk_pattern", "number", ["number", "number", "array"], [c, terms.length, intArrayToByteArr(terms)]);
          },
          mk_bound: Mod._Z3_mk_bound,
          mk_forall: function(c, weight, patterns, sorts, decl_names, body) {
            if (sorts.length !== decl_names.length) {
              throw new TypeError(`sorts and decl_names must be the same length (got ${sorts.length} and {decl_names.length})`);
            }
            return Mod.ccall("Z3_mk_forall", "number", [
              "number",
              "number",
              "number",
              "array",
              "number",
              "array",
              "array",
              "number"
            ], [
              c,
              weight,
              patterns.length,
              intArrayToByteArr(patterns),
              sorts.length,
              intArrayToByteArr(sorts),
              intArrayToByteArr(decl_names),
              body
            ]);
          },
          mk_exists: function(c, weight, patterns, sorts, decl_names, body) {
            if (sorts.length !== decl_names.length) {
              throw new TypeError(`sorts and decl_names must be the same length (got ${sorts.length} and {decl_names.length})`);
            }
            return Mod.ccall("Z3_mk_exists", "number", [
              "number",
              "number",
              "number",
              "array",
              "number",
              "array",
              "array",
              "number"
            ], [
              c,
              weight,
              patterns.length,
              intArrayToByteArr(patterns),
              sorts.length,
              intArrayToByteArr(sorts),
              intArrayToByteArr(decl_names),
              body
            ]);
          },
          mk_quantifier: function(c, is_forall, weight, patterns, sorts, decl_names, body) {
            if (sorts.length !== decl_names.length) {
              throw new TypeError(`sorts and decl_names must be the same length (got ${sorts.length} and {decl_names.length})`);
            }
            return Mod.ccall("Z3_mk_quantifier", "number", [
              "number",
              "boolean",
              "number",
              "number",
              "array",
              "number",
              "array",
              "array",
              "number"
            ], [
              c,
              is_forall,
              weight,
              patterns.length,
              intArrayToByteArr(patterns),
              sorts.length,
              intArrayToByteArr(sorts),
              intArrayToByteArr(decl_names),
              body
            ]);
          },
          mk_quantifier_ex: function(c, is_forall, weight, quantifier_id, skolem_id, patterns, no_patterns, sorts, decl_names, body) {
            if (sorts.length !== decl_names.length) {
              throw new TypeError(`sorts and decl_names must be the same length (got ${sorts.length} and {decl_names.length})`);
            }
            return Mod.ccall("Z3_mk_quantifier_ex", "number", [
              "number",
              "boolean",
              "number",
              "number",
              "number",
              "number",
              "array",
              "number",
              "array",
              "number",
              "array",
              "array",
              "number"
            ], [
              c,
              is_forall,
              weight,
              quantifier_id,
              skolem_id,
              patterns.length,
              intArrayToByteArr(patterns),
              no_patterns.length,
              intArrayToByteArr(no_patterns),
              sorts.length,
              intArrayToByteArr(sorts),
              intArrayToByteArr(decl_names),
              body
            ]);
          },
          mk_forall_const: function(c, weight, bound, patterns, body) {
            return Mod.ccall("Z3_mk_forall_const", "number", ["number", "number", "number", "array", "number", "array", "number"], [
              c,
              weight,
              bound.length,
              intArrayToByteArr(bound),
              patterns.length,
              intArrayToByteArr(patterns),
              body
            ]);
          },
          mk_exists_const: function(c, weight, bound, patterns, body) {
            return Mod.ccall("Z3_mk_exists_const", "number", ["number", "number", "number", "array", "number", "array", "number"], [
              c,
              weight,
              bound.length,
              intArrayToByteArr(bound),
              patterns.length,
              intArrayToByteArr(patterns),
              body
            ]);
          },
          mk_quantifier_const: function(c, is_forall, weight, bound, patterns, body) {
            return Mod.ccall("Z3_mk_quantifier_const", "number", [
              "number",
              "boolean",
              "number",
              "number",
              "array",
              "number",
              "array",
              "number"
            ], [
              c,
              is_forall,
              weight,
              bound.length,
              intArrayToByteArr(bound),
              patterns.length,
              intArrayToByteArr(patterns),
              body
            ]);
          },
          mk_quantifier_const_ex: function(c, is_forall, weight, quantifier_id, skolem_id, bound, patterns, no_patterns, body) {
            return Mod.ccall("Z3_mk_quantifier_const_ex", "number", [
              "number",
              "boolean",
              "number",
              "number",
              "number",
              "number",
              "array",
              "number",
              "array",
              "number",
              "array",
              "number"
            ], [
              c,
              is_forall,
              weight,
              quantifier_id,
              skolem_id,
              bound.length,
              intArrayToByteArr(bound),
              patterns.length,
              intArrayToByteArr(patterns),
              no_patterns.length,
              intArrayToByteArr(no_patterns),
              body
            ]);
          },
          mk_lambda: function(c, sorts, decl_names, body) {
            if (sorts.length !== decl_names.length) {
              throw new TypeError(`sorts and decl_names must be the same length (got ${sorts.length} and {decl_names.length})`);
            }
            return Mod.ccall("Z3_mk_lambda", "number", ["number", "number", "array", "array", "number"], [
              c,
              sorts.length,
              intArrayToByteArr(sorts),
              intArrayToByteArr(decl_names),
              body
            ]);
          },
          mk_lambda_const: function(c, bound, body) {
            return Mod.ccall("Z3_mk_lambda_const", "number", ["number", "number", "array", "number"], [
              c,
              bound.length,
              intArrayToByteArr(bound),
              body
            ]);
          },
          get_symbol_kind: Mod._Z3_get_symbol_kind,
          get_symbol_int: Mod._Z3_get_symbol_int,
          get_symbol_string: function(c, s) {
            return Mod.ccall("Z3_get_symbol_string", "string", ["number", "number"], [c, s]);
          },
          get_sort_name: Mod._Z3_get_sort_name,
          get_sort_id: function(c, s) {
            let ret = Mod.ccall("Z3_get_sort_id", "number", ["number", "number"], [c, s]);
            ret = new Uint32Array([ret])[0];
            return ret;
          },
          sort_to_ast: Mod._Z3_sort_to_ast,
          is_eq_sort: function(c, s1, s2) {
            return Mod.ccall("Z3_is_eq_sort", "boolean", ["number", "number", "number"], [c, s1, s2]);
          },
          get_sort_kind: Mod._Z3_get_sort_kind,
          get_bv_sort_size: function(c, t) {
            let ret = Mod.ccall("Z3_get_bv_sort_size", "number", ["number", "number"], [c, t]);
            ret = new Uint32Array([ret])[0];
            return ret;
          },
          get_finite_domain_sort_size: function(c, s) {
            let ret = Mod.ccall("Z3_get_finite_domain_sort_size", "boolean", ["number", "number", "number"], [c, s, outAddress]);
            if (!ret) {
              return null;
            }
            return getOutUint64(0);
          },
          get_array_arity: function(c, s) {
            let ret = Mod.ccall("Z3_get_array_arity", "number", ["number", "number"], [c, s]);
            ret = new Uint32Array([ret])[0];
            return ret;
          },
          get_array_sort_domain: Mod._Z3_get_array_sort_domain,
          get_array_sort_domain_n: Mod._Z3_get_array_sort_domain_n,
          get_array_sort_range: Mod._Z3_get_array_sort_range,
          get_tuple_sort_mk_decl: Mod._Z3_get_tuple_sort_mk_decl,
          get_tuple_sort_num_fields: function(c, t) {
            let ret = Mod.ccall("Z3_get_tuple_sort_num_fields", "number", ["number", "number"], [c, t]);
            ret = new Uint32Array([ret])[0];
            return ret;
          },
          get_tuple_sort_field_decl: Mod._Z3_get_tuple_sort_field_decl,
          is_recursive_datatype_sort: function(c, s) {
            return Mod.ccall("Z3_is_recursive_datatype_sort", "boolean", ["number", "number"], [c, s]);
          },
          get_datatype_sort_num_constructors: function(c, t) {
            let ret = Mod.ccall("Z3_get_datatype_sort_num_constructors", "number", ["number", "number"], [c, t]);
            ret = new Uint32Array([ret])[0];
            return ret;
          },
          get_datatype_sort_constructor: Mod._Z3_get_datatype_sort_constructor,
          get_datatype_sort_recognizer: Mod._Z3_get_datatype_sort_recognizer,
          get_datatype_sort_constructor_accessor: Mod._Z3_get_datatype_sort_constructor_accessor,
          datatype_update_field: Mod._Z3_datatype_update_field,
          get_relation_arity: function(c, s) {
            let ret = Mod.ccall("Z3_get_relation_arity", "number", ["number", "number"], [c, s]);
            ret = new Uint32Array([ret])[0];
            return ret;
          },
          get_relation_column: Mod._Z3_get_relation_column,
          mk_atmost: function(c, args, k) {
            return Mod.ccall("Z3_mk_atmost", "number", ["number", "number", "array", "number"], [c, args.length, intArrayToByteArr(args), k]);
          },
          mk_atleast: function(c, args, k) {
            return Mod.ccall("Z3_mk_atleast", "number", ["number", "number", "array", "number"], [c, args.length, intArrayToByteArr(args), k]);
          },
          mk_pble: function(c, args, coeffs, k) {
            if (args.length !== coeffs.length) {
              throw new TypeError(`args and coeffs must be the same length (got ${args.length} and {coeffs.length})`);
            }
            return Mod.ccall("Z3_mk_pble", "number", ["number", "number", "array", "array", "number"], [
              c,
              args.length,
              intArrayToByteArr(args),
              intArrayToByteArr(coeffs),
              k
            ]);
          },
          mk_pbge: function(c, args, coeffs, k) {
            if (args.length !== coeffs.length) {
              throw new TypeError(`args and coeffs must be the same length (got ${args.length} and {coeffs.length})`);
            }
            return Mod.ccall("Z3_mk_pbge", "number", ["number", "number", "array", "array", "number"], [
              c,
              args.length,
              intArrayToByteArr(args),
              intArrayToByteArr(coeffs),
              k
            ]);
          },
          mk_pbeq: function(c, args, coeffs, k) {
            if (args.length !== coeffs.length) {
              throw new TypeError(`args and coeffs must be the same length (got ${args.length} and {coeffs.length})`);
            }
            return Mod.ccall("Z3_mk_pbeq", "number", ["number", "number", "array", "array", "number"], [
              c,
              args.length,
              intArrayToByteArr(args),
              intArrayToByteArr(coeffs),
              k
            ]);
          },
          func_decl_to_ast: Mod._Z3_func_decl_to_ast,
          is_eq_func_decl: function(c, f1, f2) {
            return Mod.ccall("Z3_is_eq_func_decl", "boolean", ["number", "number", "number"], [c, f1, f2]);
          },
          get_func_decl_id: function(c, f) {
            let ret = Mod.ccall("Z3_get_func_decl_id", "number", ["number", "number"], [c, f]);
            ret = new Uint32Array([ret])[0];
            return ret;
          },
          get_decl_name: Mod._Z3_get_decl_name,
          get_decl_kind: Mod._Z3_get_decl_kind,
          get_domain_size: function(c, d) {
            let ret = Mod.ccall("Z3_get_domain_size", "number", ["number", "number"], [c, d]);
            ret = new Uint32Array([ret])[0];
            return ret;
          },
          get_arity: function(c, d) {
            let ret = Mod.ccall("Z3_get_arity", "number", ["number", "number"], [c, d]);
            ret = new Uint32Array([ret])[0];
            return ret;
          },
          get_domain: Mod._Z3_get_domain,
          get_range: Mod._Z3_get_range,
          get_decl_num_parameters: function(c, d) {
            let ret = Mod.ccall("Z3_get_decl_num_parameters", "number", ["number", "number"], [c, d]);
            ret = new Uint32Array([ret])[0];
            return ret;
          },
          get_decl_parameter_kind: Mod._Z3_get_decl_parameter_kind,
          get_decl_int_parameter: Mod._Z3_get_decl_int_parameter,
          get_decl_double_parameter: Mod._Z3_get_decl_double_parameter,
          get_decl_symbol_parameter: Mod._Z3_get_decl_symbol_parameter,
          get_decl_sort_parameter: Mod._Z3_get_decl_sort_parameter,
          get_decl_ast_parameter: Mod._Z3_get_decl_ast_parameter,
          get_decl_func_decl_parameter: Mod._Z3_get_decl_func_decl_parameter,
          get_decl_rational_parameter: function(c, d, idx) {
            return Mod.ccall("Z3_get_decl_rational_parameter", "string", ["number", "number", "number"], [c, d, idx]);
          },
          app_to_ast: Mod._Z3_app_to_ast,
          get_app_decl: Mod._Z3_get_app_decl,
          get_app_num_args: function(c, a) {
            let ret = Mod.ccall("Z3_get_app_num_args", "number", ["number", "number"], [c, a]);
            ret = new Uint32Array([ret])[0];
            return ret;
          },
          get_app_arg: Mod._Z3_get_app_arg,
          is_eq_ast: function(c, t1, t2) {
            return Mod.ccall("Z3_is_eq_ast", "boolean", ["number", "number", "number"], [c, t1, t2]);
          },
          get_ast_id: function(c, t) {
            let ret = Mod.ccall("Z3_get_ast_id", "number", ["number", "number"], [c, t]);
            ret = new Uint32Array([ret])[0];
            return ret;
          },
          get_ast_hash: function(c, a) {
            let ret = Mod.ccall("Z3_get_ast_hash", "number", ["number", "number"], [c, a]);
            ret = new Uint32Array([ret])[0];
            return ret;
          },
          get_sort: Mod._Z3_get_sort,
          is_well_sorted: function(c, t) {
            return Mod.ccall("Z3_is_well_sorted", "boolean", ["number", "number"], [c, t]);
          },
          get_bool_value: Mod._Z3_get_bool_value,
          get_ast_kind: Mod._Z3_get_ast_kind,
          is_app: function(c, a) {
            return Mod.ccall("Z3_is_app", "boolean", ["number", "number"], [c, a]);
          },
          is_ground: function(c, a) {
            return Mod.ccall("Z3_is_ground", "boolean", ["number", "number"], [c, a]);
          },
          get_depth: function(c, a) {
            let ret = Mod.ccall("Z3_get_depth", "number", ["number", "number"], [c, a]);
            ret = new Uint32Array([ret])[0];
            return ret;
          },
          is_numeral_ast: function(c, a) {
            return Mod.ccall("Z3_is_numeral_ast", "boolean", ["number", "number"], [c, a]);
          },
          is_algebraic_number: function(c, a) {
            return Mod.ccall("Z3_is_algebraic_number", "boolean", ["number", "number"], [c, a]);
          },
          to_app: Mod._Z3_to_app,
          to_func_decl: Mod._Z3_to_func_decl,
          get_numeral_string: function(c, a) {
            return Mod.ccall("Z3_get_numeral_string", "string", ["number", "number"], [c, a]);
          },
          get_numeral_binary_string: function(c, a) {
            return Mod.ccall("Z3_get_numeral_binary_string", "string", ["number", "number"], [c, a]);
          },
          get_numeral_decimal_string: function(c, a, precision) {
            return Mod.ccall("Z3_get_numeral_decimal_string", "string", ["number", "number", "number"], [c, a, precision]);
          },
          get_numeral_double: Mod._Z3_get_numeral_double,
          get_numerator: Mod._Z3_get_numerator,
          get_denominator: Mod._Z3_get_denominator,
          get_numeral_small: function(c, a) {
            let ret = Mod.ccall("Z3_get_numeral_small", "boolean", ["number", "number", "number", "number"], [c, a, outAddress, outAddress + 8]);
            if (!ret) {
              return null;
            }
            return { num: getOutInt64(0), den: getOutInt64(1) };
          },
          get_numeral_int: function(c, v) {
            let ret = Mod.ccall("Z3_get_numeral_int", "boolean", ["number", "number", "number"], [c, v, outAddress]);
            if (!ret) {
              return null;
            }
            return getOutInt(0);
          },
          get_numeral_uint: function(c, v) {
            let ret = Mod.ccall("Z3_get_numeral_uint", "boolean", ["number", "number", "number"], [c, v, outAddress]);
            if (!ret) {
              return null;
            }
            return getOutUint(0);
          },
          get_numeral_uint64: function(c, v) {
            let ret = Mod.ccall("Z3_get_numeral_uint64", "boolean", ["number", "number", "number"], [c, v, outAddress]);
            if (!ret) {
              return null;
            }
            return getOutUint64(0);
          },
          get_numeral_int64: function(c, v) {
            let ret = Mod.ccall("Z3_get_numeral_int64", "boolean", ["number", "number", "number"], [c, v, outAddress]);
            if (!ret) {
              return null;
            }
            return getOutInt64(0);
          },
          get_numeral_rational_int64: function(c, v) {
            let ret = Mod.ccall("Z3_get_numeral_rational_int64", "boolean", ["number", "number", "number", "number"], [c, v, outAddress, outAddress + 8]);
            if (!ret) {
              return null;
            }
            return { num: getOutInt64(0), den: getOutInt64(1) };
          },
          get_algebraic_number_lower: Mod._Z3_get_algebraic_number_lower,
          get_algebraic_number_upper: Mod._Z3_get_algebraic_number_upper,
          pattern_to_ast: Mod._Z3_pattern_to_ast,
          get_pattern_num_terms: function(c, p) {
            let ret = Mod.ccall("Z3_get_pattern_num_terms", "number", ["number", "number"], [c, p]);
            ret = new Uint32Array([ret])[0];
            return ret;
          },
          get_pattern: Mod._Z3_get_pattern,
          get_index_value: function(c, a) {
            let ret = Mod.ccall("Z3_get_index_value", "number", ["number", "number"], [c, a]);
            ret = new Uint32Array([ret])[0];
            return ret;
          },
          is_quantifier_forall: function(c, a) {
            return Mod.ccall("Z3_is_quantifier_forall", "boolean", ["number", "number"], [c, a]);
          },
          is_quantifier_exists: function(c, a) {
            return Mod.ccall("Z3_is_quantifier_exists", "boolean", ["number", "number"], [c, a]);
          },
          is_lambda: function(c, a) {
            return Mod.ccall("Z3_is_lambda", "boolean", ["number", "number"], [c, a]);
          },
          get_quantifier_weight: function(c, a) {
            let ret = Mod.ccall("Z3_get_quantifier_weight", "number", ["number", "number"], [c, a]);
            ret = new Uint32Array([ret])[0];
            return ret;
          },
          get_quantifier_skolem_id: Mod._Z3_get_quantifier_skolem_id,
          get_quantifier_id: Mod._Z3_get_quantifier_id,
          get_quantifier_num_patterns: function(c, a) {
            let ret = Mod.ccall("Z3_get_quantifier_num_patterns", "number", ["number", "number"], [c, a]);
            ret = new Uint32Array([ret])[0];
            return ret;
          },
          get_quantifier_pattern_ast: Mod._Z3_get_quantifier_pattern_ast,
          get_quantifier_num_no_patterns: function(c, a) {
            let ret = Mod.ccall("Z3_get_quantifier_num_no_patterns", "number", ["number", "number"], [c, a]);
            ret = new Uint32Array([ret])[0];
            return ret;
          },
          get_quantifier_no_pattern_ast: Mod._Z3_get_quantifier_no_pattern_ast,
          get_quantifier_num_bound: function(c, a) {
            let ret = Mod.ccall("Z3_get_quantifier_num_bound", "number", ["number", "number"], [c, a]);
            ret = new Uint32Array([ret])[0];
            return ret;
          },
          get_quantifier_bound_name: Mod._Z3_get_quantifier_bound_name,
          get_quantifier_bound_sort: Mod._Z3_get_quantifier_bound_sort,
          get_quantifier_body: Mod._Z3_get_quantifier_body,
          simplify: function(c, a) {
            return Mod.async_call(Mod._async_Z3_simplify, c, a);
          },
          simplify_ex: function(c, a, p) {
            return Mod.async_call(Mod._async_Z3_simplify_ex, c, a, p);
          },
          simplify_get_help: function(c) {
            return Mod.ccall("Z3_simplify_get_help", "string", ["number"], [c]);
          },
          simplify_get_param_descrs: Mod._Z3_simplify_get_param_descrs,
          update_term: function(c, a, args) {
            return Mod.ccall("Z3_update_term", "number", ["number", "number", "number", "array"], [c, a, args.length, intArrayToByteArr(args)]);
          },
          substitute: function(c, a, from, to) {
            if (from.length !== to.length) {
              throw new TypeError(`from and to must be the same length (got ${from.length} and {to.length})`);
            }
            return Mod.ccall("Z3_substitute", "number", ["number", "number", "number", "array", "array"], [
              c,
              a,
              from.length,
              intArrayToByteArr(from),
              intArrayToByteArr(to)
            ]);
          },
          substitute_vars: function(c, a, to) {
            return Mod.ccall("Z3_substitute_vars", "number", ["number", "number", "number", "array"], [c, a, to.length, intArrayToByteArr(to)]);
          },
          substitute_funs: function(c, a, from, to) {
            if (from.length !== to.length) {
              throw new TypeError(`from and to must be the same length (got ${from.length} and {to.length})`);
            }
            return Mod.ccall("Z3_substitute_funs", "number", ["number", "number", "number", "array", "array"], [
              c,
              a,
              from.length,
              intArrayToByteArr(from),
              intArrayToByteArr(to)
            ]);
          },
          translate: Mod._Z3_translate,
          mk_model: Mod._Z3_mk_model,
          model_inc_ref: Mod._Z3_model_inc_ref,
          model_dec_ref: Mod._Z3_model_dec_ref,
          model_eval: function(c, m, t, model_completion) {
            let ret = Mod.ccall("Z3_model_eval", "boolean", ["number", "number", "number", "boolean", "number"], [c, m, t, model_completion, outAddress]);
            if (!ret) {
              return null;
            }
            return getOutUint(0);
          },
          model_get_const_interp: Mod._Z3_model_get_const_interp,
          model_has_interp: function(c, m, a) {
            return Mod.ccall("Z3_model_has_interp", "boolean", ["number", "number", "number"], [c, m, a]);
          },
          model_get_func_interp: Mod._Z3_model_get_func_interp,
          model_get_num_consts: function(c, m) {
            let ret = Mod.ccall("Z3_model_get_num_consts", "number", ["number", "number"], [c, m]);
            ret = new Uint32Array([ret])[0];
            return ret;
          },
          model_get_const_decl: Mod._Z3_model_get_const_decl,
          model_get_num_funcs: function(c, m) {
            let ret = Mod.ccall("Z3_model_get_num_funcs", "number", ["number", "number"], [c, m]);
            ret = new Uint32Array([ret])[0];
            return ret;
          },
          model_get_func_decl: Mod._Z3_model_get_func_decl,
          model_get_num_sorts: function(c, m) {
            let ret = Mod.ccall("Z3_model_get_num_sorts", "number", ["number", "number"], [c, m]);
            ret = new Uint32Array([ret])[0];
            return ret;
          },
          model_get_sort: Mod._Z3_model_get_sort,
          model_get_sort_universe: Mod._Z3_model_get_sort_universe,
          model_translate: Mod._Z3_model_translate,
          is_as_array: function(c, a) {
            return Mod.ccall("Z3_is_as_array", "boolean", ["number", "number"], [c, a]);
          },
          get_as_array_func_decl: Mod._Z3_get_as_array_func_decl,
          add_func_interp: Mod._Z3_add_func_interp,
          add_const_interp: Mod._Z3_add_const_interp,
          func_interp_inc_ref: Mod._Z3_func_interp_inc_ref,
          func_interp_dec_ref: Mod._Z3_func_interp_dec_ref,
          func_interp_get_num_entries: function(c, f) {
            let ret = Mod.ccall("Z3_func_interp_get_num_entries", "number", ["number", "number"], [c, f]);
            ret = new Uint32Array([ret])[0];
            return ret;
          },
          func_interp_get_entry: Mod._Z3_func_interp_get_entry,
          func_interp_get_else: Mod._Z3_func_interp_get_else,
          func_interp_set_else: Mod._Z3_func_interp_set_else,
          func_interp_get_arity: function(c, f) {
            let ret = Mod.ccall("Z3_func_interp_get_arity", "number", ["number", "number"], [c, f]);
            ret = new Uint32Array([ret])[0];
            return ret;
          },
          func_interp_add_entry: Mod._Z3_func_interp_add_entry,
          func_entry_inc_ref: Mod._Z3_func_entry_inc_ref,
          func_entry_dec_ref: Mod._Z3_func_entry_dec_ref,
          func_entry_get_value: Mod._Z3_func_entry_get_value,
          func_entry_get_num_args: function(c, e) {
            let ret = Mod.ccall("Z3_func_entry_get_num_args", "number", ["number", "number"], [c, e]);
            ret = new Uint32Array([ret])[0];
            return ret;
          },
          func_entry_get_arg: Mod._Z3_func_entry_get_arg,
          open_log: function(filename) {
            return Mod.ccall("Z3_open_log", "boolean", ["string"], [filename]);
          },
          append_log: function(string) {
            return Mod.ccall("Z3_append_log", "void", ["string"], [string]);
          },
          close_log: Mod._Z3_close_log,
          toggle_warning_messages: Mod._Z3_toggle_warning_messages,
          set_ast_print_mode: Mod._Z3_set_ast_print_mode,
          ast_to_string: function(c, a) {
            return Mod.ccall("Z3_ast_to_string", "string", ["number", "number"], [c, a]);
          },
          pattern_to_string: function(c, p) {
            return Mod.ccall("Z3_pattern_to_string", "string", ["number", "number"], [c, p]);
          },
          sort_to_string: function(c, s) {
            return Mod.ccall("Z3_sort_to_string", "string", ["number", "number"], [c, s]);
          },
          func_decl_to_string: function(c, d) {
            return Mod.ccall("Z3_func_decl_to_string", "string", ["number", "number"], [c, d]);
          },
          model_to_string: function(c, m) {
            return Mod.ccall("Z3_model_to_string", "string", ["number", "number"], [c, m]);
          },
          benchmark_to_smtlib_string: function(c, name, logic, status, attributes, assumptions, formula) {
            return Mod.ccall("Z3_benchmark_to_smtlib_string", "string", [
              "number",
              "string",
              "string",
              "string",
              "string",
              "number",
              "array",
              "number"
            ], [
              c,
              name,
              logic,
              status,
              attributes,
              assumptions.length,
              intArrayToByteArr(assumptions),
              formula
            ]);
          },
          parse_smtlib2_string: function(c, str, sort_names, sorts, decl_names, decls) {
            if (sort_names.length !== sorts.length) {
              throw new TypeError(`sort_names and sorts must be the same length (got ${sort_names.length} and {sorts.length})`);
            }
            if (decl_names.length !== decls.length) {
              throw new TypeError(`decl_names and decls must be the same length (got ${decl_names.length} and {decls.length})`);
            }
            return Mod.ccall("Z3_parse_smtlib2_string", "number", [
              "number",
              "string",
              "number",
              "array",
              "array",
              "number",
              "array",
              "array"
            ], [
              c,
              str,
              sort_names.length,
              intArrayToByteArr(sort_names),
              intArrayToByteArr(sorts),
              decl_names.length,
              intArrayToByteArr(decl_names),
              intArrayToByteArr(decls)
            ]);
          },
          parse_smtlib2_file: function(c, file_name, sort_names, sorts, decl_names, decls) {
            if (sort_names.length !== sorts.length) {
              throw new TypeError(`sort_names and sorts must be the same length (got ${sort_names.length} and {sorts.length})`);
            }
            if (decl_names.length !== decls.length) {
              throw new TypeError(`decl_names and decls must be the same length (got ${decl_names.length} and {decls.length})`);
            }
            return Mod.ccall("Z3_parse_smtlib2_file", "number", [
              "number",
              "string",
              "number",
              "array",
              "array",
              "number",
              "array",
              "array"
            ], [
              c,
              file_name,
              sort_names.length,
              intArrayToByteArr(sort_names),
              intArrayToByteArr(sorts),
              decl_names.length,
              intArrayToByteArr(decl_names),
              intArrayToByteArr(decls)
            ]);
          },
          eval_smtlib2_string: async function(c, str) {
            return await Mod.async_call(() => Mod.ccall("async_Z3_eval_smtlib2_string", "void", ["number", "string"], [c, str]));
          },
          mk_parser_context: Mod._Z3_mk_parser_context,
          parser_context_inc_ref: Mod._Z3_parser_context_inc_ref,
          parser_context_dec_ref: Mod._Z3_parser_context_dec_ref,
          parser_context_add_sort: Mod._Z3_parser_context_add_sort,
          parser_context_add_decl: Mod._Z3_parser_context_add_decl,
          parser_context_from_string: function(c, pc, s) {
            return Mod.ccall("Z3_parser_context_from_string", "number", ["number", "number", "string"], [c, pc, s]);
          },
          get_error_code: Mod._Z3_get_error_code,
          set_error: Mod._Z3_set_error,
          get_error_msg: function(c, err) {
            return Mod.ccall("Z3_get_error_msg", "string", ["number", "number"], [c, err]);
          },
          get_version: function() {
            Mod.ccall("Z3_get_version", "void", ["number", "number", "number", "number"], [outAddress, outAddress + 4, outAddress + 8, outAddress + 12]);
            return {
              major: getOutUint(0),
              minor: getOutUint(1),
              build_number: getOutUint(2),
              revision_number: getOutUint(3)
            };
          },
          get_full_version: function() {
            return Mod.ccall("Z3_get_full_version", "string", [], []);
          },
          enable_trace: function(tag) {
            return Mod.ccall("Z3_enable_trace", "void", ["string"], [tag]);
          },
          disable_trace: function(tag) {
            return Mod.ccall("Z3_disable_trace", "void", ["string"], [tag]);
          },
          reset_memory: Mod._Z3_reset_memory,
          finalize_memory: Mod._Z3_finalize_memory,
          mk_goal: Mod._Z3_mk_goal,
          goal_inc_ref: Mod._Z3_goal_inc_ref,
          goal_dec_ref: Mod._Z3_goal_dec_ref,
          goal_precision: Mod._Z3_goal_precision,
          goal_assert: Mod._Z3_goal_assert,
          goal_inconsistent: function(c, g) {
            return Mod.ccall("Z3_goal_inconsistent", "boolean", ["number", "number"], [c, g]);
          },
          goal_depth: function(c, g) {
            let ret = Mod.ccall("Z3_goal_depth", "number", ["number", "number"], [c, g]);
            ret = new Uint32Array([ret])[0];
            return ret;
          },
          goal_reset: Mod._Z3_goal_reset,
          goal_size: function(c, g) {
            let ret = Mod.ccall("Z3_goal_size", "number", ["number", "number"], [c, g]);
            ret = new Uint32Array([ret])[0];
            return ret;
          },
          goal_formula: Mod._Z3_goal_formula,
          goal_num_exprs: function(c, g) {
            let ret = Mod.ccall("Z3_goal_num_exprs", "number", ["number", "number"], [c, g]);
            ret = new Uint32Array([ret])[0];
            return ret;
          },
          goal_is_decided_sat: function(c, g) {
            return Mod.ccall("Z3_goal_is_decided_sat", "boolean", ["number", "number"], [c, g]);
          },
          goal_is_decided_unsat: function(c, g) {
            return Mod.ccall("Z3_goal_is_decided_unsat", "boolean", ["number", "number"], [c, g]);
          },
          goal_translate: Mod._Z3_goal_translate,
          goal_convert_model: Mod._Z3_goal_convert_model,
          goal_to_string: function(c, g) {
            return Mod.ccall("Z3_goal_to_string", "string", ["number", "number"], [c, g]);
          },
          goal_to_dimacs_string: function(c, g, include_names) {
            return Mod.ccall("Z3_goal_to_dimacs_string", "string", ["number", "number", "boolean"], [c, g, include_names]);
          },
          mk_tactic: function(c, name) {
            return Mod.ccall("Z3_mk_tactic", "number", ["number", "string"], [c, name]);
          },
          tactic_inc_ref: Mod._Z3_tactic_inc_ref,
          tactic_dec_ref: Mod._Z3_tactic_dec_ref,
          mk_probe: function(c, name) {
            return Mod.ccall("Z3_mk_probe", "number", ["number", "string"], [c, name]);
          },
          probe_inc_ref: Mod._Z3_probe_inc_ref,
          probe_dec_ref: Mod._Z3_probe_dec_ref,
          tactic_and_then: Mod._Z3_tactic_and_then,
          tactic_or_else: Mod._Z3_tactic_or_else,
          tactic_par_or: function(c, ts) {
            return Mod.ccall("Z3_tactic_par_or", "number", ["number", "number", "array"], [c, ts.length, intArrayToByteArr(ts)]);
          },
          tactic_par_and_then: Mod._Z3_tactic_par_and_then,
          tactic_try_for: Mod._Z3_tactic_try_for,
          tactic_when: Mod._Z3_tactic_when,
          tactic_cond: Mod._Z3_tactic_cond,
          tactic_repeat: Mod._Z3_tactic_repeat,
          tactic_skip: Mod._Z3_tactic_skip,
          tactic_fail: Mod._Z3_tactic_fail,
          tactic_fail_if: Mod._Z3_tactic_fail_if,
          tactic_fail_if_not_decided: Mod._Z3_tactic_fail_if_not_decided,
          tactic_using_params: Mod._Z3_tactic_using_params,
          mk_simplifier: function(c, name) {
            return Mod.ccall("Z3_mk_simplifier", "number", ["number", "string"], [c, name]);
          },
          simplifier_inc_ref: Mod._Z3_simplifier_inc_ref,
          simplifier_dec_ref: Mod._Z3_simplifier_dec_ref,
          solver_add_simplifier: Mod._Z3_solver_add_simplifier,
          simplifier_and_then: Mod._Z3_simplifier_and_then,
          simplifier_using_params: Mod._Z3_simplifier_using_params,
          get_num_simplifiers: function(c) {
            let ret = Mod.ccall("Z3_get_num_simplifiers", "number", ["number"], [c]);
            ret = new Uint32Array([ret])[0];
            return ret;
          },
          get_simplifier_name: function(c, i) {
            return Mod.ccall("Z3_get_simplifier_name", "string", ["number", "number"], [c, i]);
          },
          simplifier_get_help: function(c, t) {
            return Mod.ccall("Z3_simplifier_get_help", "string", ["number", "number"], [c, t]);
          },
          simplifier_get_param_descrs: Mod._Z3_simplifier_get_param_descrs,
          simplifier_get_descr: function(c, name) {
            return Mod.ccall("Z3_simplifier_get_descr", "string", ["number", "string"], [c, name]);
          },
          probe_const: Mod._Z3_probe_const,
          probe_lt: Mod._Z3_probe_lt,
          probe_gt: Mod._Z3_probe_gt,
          probe_le: Mod._Z3_probe_le,
          probe_ge: Mod._Z3_probe_ge,
          probe_eq: Mod._Z3_probe_eq,
          probe_and: Mod._Z3_probe_and,
          probe_or: Mod._Z3_probe_or,
          probe_not: Mod._Z3_probe_not,
          get_num_tactics: function(c) {
            let ret = Mod.ccall("Z3_get_num_tactics", "number", ["number"], [c]);
            ret = new Uint32Array([ret])[0];
            return ret;
          },
          get_tactic_name: function(c, i) {
            return Mod.ccall("Z3_get_tactic_name", "string", ["number", "number"], [c, i]);
          },
          get_num_probes: function(c) {
            let ret = Mod.ccall("Z3_get_num_probes", "number", ["number"], [c]);
            ret = new Uint32Array([ret])[0];
            return ret;
          },
          get_probe_name: function(c, i) {
            return Mod.ccall("Z3_get_probe_name", "string", ["number", "number"], [c, i]);
          },
          tactic_get_help: function(c, t) {
            return Mod.ccall("Z3_tactic_get_help", "string", ["number", "number"], [c, t]);
          },
          tactic_get_param_descrs: Mod._Z3_tactic_get_param_descrs,
          tactic_get_descr: function(c, name) {
            return Mod.ccall("Z3_tactic_get_descr", "string", ["number", "string"], [c, name]);
          },
          probe_get_descr: function(c, name) {
            return Mod.ccall("Z3_probe_get_descr", "string", ["number", "string"], [c, name]);
          },
          probe_apply: Mod._Z3_probe_apply,
          tactic_apply: function(c, t, g) {
            return Mod.async_call(Mod._async_Z3_tactic_apply, c, t, g);
          },
          tactic_apply_ex: function(c, t, g, p) {
            return Mod.async_call(Mod._async_Z3_tactic_apply_ex, c, t, g, p);
          },
          apply_result_inc_ref: Mod._Z3_apply_result_inc_ref,
          apply_result_dec_ref: Mod._Z3_apply_result_dec_ref,
          apply_result_to_string: function(c, r) {
            return Mod.ccall("Z3_apply_result_to_string", "string", ["number", "number"], [c, r]);
          },
          apply_result_get_num_subgoals: function(c, r) {
            let ret = Mod.ccall("Z3_apply_result_get_num_subgoals", "number", ["number", "number"], [c, r]);
            ret = new Uint32Array([ret])[0];
            return ret;
          },
          apply_result_get_subgoal: Mod._Z3_apply_result_get_subgoal,
          mk_solver: Mod._Z3_mk_solver,
          mk_simple_solver: Mod._Z3_mk_simple_solver,
          mk_solver_for_logic: Mod._Z3_mk_solver_for_logic,
          mk_solver_from_tactic: Mod._Z3_mk_solver_from_tactic,
          solver_translate: Mod._Z3_solver_translate,
          solver_import_model_converter: Mod._Z3_solver_import_model_converter,
          solver_get_help: function(c, s) {
            return Mod.ccall("Z3_solver_get_help", "string", ["number", "number"], [c, s]);
          },
          solver_get_param_descrs: Mod._Z3_solver_get_param_descrs,
          solver_set_params: Mod._Z3_solver_set_params,
          solver_inc_ref: Mod._Z3_solver_inc_ref,
          solver_dec_ref: Mod._Z3_solver_dec_ref,
          solver_interrupt: Mod._Z3_solver_interrupt,
          solver_push: Mod._Z3_solver_push,
          solver_pop: Mod._Z3_solver_pop,
          solver_reset: Mod._Z3_solver_reset,
          solver_get_num_scopes: function(c, s) {
            let ret = Mod.ccall("Z3_solver_get_num_scopes", "number", ["number", "number"], [c, s]);
            ret = new Uint32Array([ret])[0];
            return ret;
          },
          solver_assert: Mod._Z3_solver_assert,
          solver_assert_and_track: Mod._Z3_solver_assert_and_track,
          solver_from_file: function(c, s, file_name) {
            return Mod.ccall("Z3_solver_from_file", "void", ["number", "number", "string"], [c, s, file_name]);
          },
          solver_from_string: function(c, s, str) {
            return Mod.ccall("Z3_solver_from_string", "void", ["number", "number", "string"], [c, s, str]);
          },
          solver_get_assertions: Mod._Z3_solver_get_assertions,
          solver_get_units: Mod._Z3_solver_get_units,
          solver_get_trail: Mod._Z3_solver_get_trail,
          solver_get_non_units: Mod._Z3_solver_get_non_units,
          solver_get_levels: function(c, s, literals, levels) {
            return Mod.ccall("Z3_solver_get_levels", "void", ["number", "number", "number", "number", "array"], [
              c,
              s,
              literals,
              levels.length,
              intArrayToByteArr(levels)
            ]);
          },
          solver_congruence_root: Mod._Z3_solver_congruence_root,
          solver_congruence_next: Mod._Z3_solver_congruence_next,
          solver_congruence_explain: Mod._Z3_solver_congruence_explain,
          solver_solve_for: Mod._Z3_solver_solve_for,
          solver_next_split: function(c, cb, t, idx, phase) {
            return Mod.ccall("Z3_solver_next_split", "boolean", ["number", "number", "number", "number", "number"], [c, cb, t, idx, phase]);
          },
          solver_propagate_declare: function(c, name, domain, range) {
            return Mod.ccall("Z3_solver_propagate_declare", "number", ["number", "number", "number", "array", "number"], [
              c,
              name,
              domain.length,
              intArrayToByteArr(domain),
              range
            ]);
          },
          solver_propagate_register: Mod._Z3_solver_propagate_register,
          solver_propagate_register_cb: Mod._Z3_solver_propagate_register_cb,
          solver_propagate_consequence: function(c, cb, fixed, eq_lhs, eq_rhs, conseq) {
            if (eq_lhs.length !== eq_rhs.length) {
              throw new TypeError(`eq_lhs and eq_rhs must be the same length (got ${eq_lhs.length} and {eq_rhs.length})`);
            }
            return Mod.ccall("Z3_solver_propagate_consequence", "boolean", [
              "number",
              "number",
              "number",
              "array",
              "number",
              "array",
              "array",
              "number"
            ], [
              c,
              cb,
              fixed.length,
              intArrayToByteArr(fixed),
              eq_lhs.length,
              intArrayToByteArr(eq_lhs),
              intArrayToByteArr(eq_rhs),
              conseq
            ]);
          },
          solver_set_initial_value: Mod._Z3_solver_set_initial_value,
          solver_check: function(c, s) {
            return Mod.async_call(Mod._async_Z3_solver_check, c, s);
          },
          solver_check_assumptions: async function(c, s, assumptions) {
            return await Mod.async_call(() => Mod.ccall("async_Z3_solver_check_assumptions", "void", ["number", "number", "number", "array"], [
              c,
              s,
              assumptions.length,
              intArrayToByteArr(assumptions)
            ]));
          },
          get_implied_equalities: function(c, s, terms) {
            let outArray_class_ids = Mod._malloc(4 * terms.length);
            try {
              let ret = Mod.ccall("Z3_get_implied_equalities", "number", ["number", "number", "number", "array", "number"], [
                c,
                s,
                terms.length,
                intArrayToByteArr(terms),
                outArray_class_ids
              ]);
              return {
                rv: ret,
                class_ids: readUintArray(outArray_class_ids, terms.length)
              };
            } finally {
              Mod._free(outArray_class_ids);
            }
          },
          solver_get_consequences: function(c, s, assumptions, variables, consequences) {
            return Mod.async_call(Mod._async_Z3_solver_get_consequences, c, s, assumptions, variables, consequences);
          },
          solver_cube: function(c, s, vars, backtrack_level) {
            return Mod.async_call(Mod._async_Z3_solver_cube, c, s, vars, backtrack_level);
          },
          solver_get_model: Mod._Z3_solver_get_model,
          solver_get_proof: Mod._Z3_solver_get_proof,
          solver_get_unsat_core: Mod._Z3_solver_get_unsat_core,
          solver_get_reason_unknown: function(c, s) {
            return Mod.ccall("Z3_solver_get_reason_unknown", "string", ["number", "number"], [c, s]);
          },
          solver_get_statistics: Mod._Z3_solver_get_statistics,
          solver_to_string: function(c, s) {
            return Mod.ccall("Z3_solver_to_string", "string", ["number", "number"], [c, s]);
          },
          solver_to_dimacs_string: function(c, s, include_names) {
            return Mod.ccall("Z3_solver_to_dimacs_string", "string", ["number", "number", "boolean"], [c, s, include_names]);
          },
          stats_to_string: function(c, s) {
            return Mod.ccall("Z3_stats_to_string", "string", ["number", "number"], [c, s]);
          },
          stats_inc_ref: Mod._Z3_stats_inc_ref,
          stats_dec_ref: Mod._Z3_stats_dec_ref,
          stats_size: function(c, s) {
            let ret = Mod.ccall("Z3_stats_size", "number", ["number", "number"], [c, s]);
            ret = new Uint32Array([ret])[0];
            return ret;
          },
          stats_get_key: function(c, s, idx) {
            return Mod.ccall("Z3_stats_get_key", "string", ["number", "number", "number"], [c, s, idx]);
          },
          stats_is_uint: function(c, s, idx) {
            return Mod.ccall("Z3_stats_is_uint", "boolean", ["number", "number", "number"], [c, s, idx]);
          },
          stats_is_double: function(c, s, idx) {
            return Mod.ccall("Z3_stats_is_double", "boolean", ["number", "number", "number"], [c, s, idx]);
          },
          stats_get_uint_value: function(c, s, idx) {
            let ret = Mod.ccall("Z3_stats_get_uint_value", "number", ["number", "number", "number"], [c, s, idx]);
            ret = new Uint32Array([ret])[0];
            return ret;
          },
          stats_get_double_value: Mod._Z3_stats_get_double_value,
          get_estimated_alloc_size: Mod._Z3_get_estimated_alloc_size,
          algebraic_is_value: function(c, a) {
            return Mod.ccall("Z3_algebraic_is_value", "boolean", ["number", "number"], [c, a]);
          },
          algebraic_is_pos: function(c, a) {
            return Mod.ccall("Z3_algebraic_is_pos", "boolean", ["number", "number"], [c, a]);
          },
          algebraic_is_neg: function(c, a) {
            return Mod.ccall("Z3_algebraic_is_neg", "boolean", ["number", "number"], [c, a]);
          },
          algebraic_is_zero: function(c, a) {
            return Mod.ccall("Z3_algebraic_is_zero", "boolean", ["number", "number"], [c, a]);
          },
          algebraic_sign: Mod._Z3_algebraic_sign,
          algebraic_add: Mod._Z3_algebraic_add,
          algebraic_sub: Mod._Z3_algebraic_sub,
          algebraic_mul: Mod._Z3_algebraic_mul,
          algebraic_div: Mod._Z3_algebraic_div,
          algebraic_root: Mod._Z3_algebraic_root,
          algebraic_power: Mod._Z3_algebraic_power,
          algebraic_lt: function(c, a, b) {
            return Mod.ccall("Z3_algebraic_lt", "boolean", ["number", "number", "number"], [c, a, b]);
          },
          algebraic_gt: function(c, a, b) {
            return Mod.ccall("Z3_algebraic_gt", "boolean", ["number", "number", "number"], [c, a, b]);
          },
          algebraic_le: function(c, a, b) {
            return Mod.ccall("Z3_algebraic_le", "boolean", ["number", "number", "number"], [c, a, b]);
          },
          algebraic_ge: function(c, a, b) {
            return Mod.ccall("Z3_algebraic_ge", "boolean", ["number", "number", "number"], [c, a, b]);
          },
          algebraic_eq: function(c, a, b) {
            return Mod.ccall("Z3_algebraic_eq", "boolean", ["number", "number", "number"], [c, a, b]);
          },
          algebraic_neq: function(c, a, b) {
            return Mod.ccall("Z3_algebraic_neq", "boolean", ["number", "number", "number"], [c, a, b]);
          },
          algebraic_roots: async function(c, p, a) {
            return await Mod.async_call(() => Mod.ccall("async_Z3_algebraic_roots", "void", ["number", "number", "number", "array"], [c, p, a.length, intArrayToByteArr(a)]));
          },
          algebraic_eval: async function(c, p, a) {
            return await Mod.async_call(() => Mod.ccall("async_Z3_algebraic_eval", "void", ["number", "number", "number", "array"], [c, p, a.length, intArrayToByteArr(a)]));
          },
          algebraic_get_poly: Mod._Z3_algebraic_get_poly,
          algebraic_get_i: function(c, a) {
            let ret = Mod.ccall("Z3_algebraic_get_i", "number", ["number", "number"], [c, a]);
            ret = new Uint32Array([ret])[0];
            return ret;
          },
          mk_ast_vector: Mod._Z3_mk_ast_vector,
          ast_vector_inc_ref: Mod._Z3_ast_vector_inc_ref,
          ast_vector_dec_ref: Mod._Z3_ast_vector_dec_ref,
          ast_vector_size: function(c, v) {
            let ret = Mod.ccall("Z3_ast_vector_size", "number", ["number", "number"], [c, v]);
            ret = new Uint32Array([ret])[0];
            return ret;
          },
          ast_vector_get: Mod._Z3_ast_vector_get,
          ast_vector_set: Mod._Z3_ast_vector_set,
          ast_vector_resize: Mod._Z3_ast_vector_resize,
          ast_vector_push: Mod._Z3_ast_vector_push,
          ast_vector_translate: Mod._Z3_ast_vector_translate,
          ast_vector_to_string: function(c, v) {
            return Mod.ccall("Z3_ast_vector_to_string", "string", ["number", "number"], [c, v]);
          },
          mk_ast_map: Mod._Z3_mk_ast_map,
          ast_map_inc_ref: Mod._Z3_ast_map_inc_ref,
          ast_map_dec_ref: Mod._Z3_ast_map_dec_ref,
          ast_map_contains: function(c, m, k) {
            return Mod.ccall("Z3_ast_map_contains", "boolean", ["number", "number", "number"], [c, m, k]);
          },
          ast_map_find: Mod._Z3_ast_map_find,
          ast_map_insert: Mod._Z3_ast_map_insert,
          ast_map_erase: Mod._Z3_ast_map_erase,
          ast_map_reset: Mod._Z3_ast_map_reset,
          ast_map_size: function(c, m) {
            let ret = Mod.ccall("Z3_ast_map_size", "number", ["number", "number"], [c, m]);
            ret = new Uint32Array([ret])[0];
            return ret;
          },
          ast_map_keys: Mod._Z3_ast_map_keys,
          ast_map_to_string: function(c, m) {
            return Mod.ccall("Z3_ast_map_to_string", "string", ["number", "number"], [c, m]);
          },
          mk_fixedpoint: Mod._Z3_mk_fixedpoint,
          fixedpoint_inc_ref: Mod._Z3_fixedpoint_inc_ref,
          fixedpoint_dec_ref: Mod._Z3_fixedpoint_dec_ref,
          fixedpoint_add_rule: Mod._Z3_fixedpoint_add_rule,
          fixedpoint_add_fact: function(c, d, r, args) {
            return Mod.ccall("Z3_fixedpoint_add_fact", "void", ["number", "number", "number", "number", "array"], [
              c,
              d,
              r,
              args.length,
              intArrayToByteArr(args)
            ]);
          },
          fixedpoint_assert: Mod._Z3_fixedpoint_assert,
          fixedpoint_query: function(c, d, query) {
            return Mod.async_call(Mod._async_Z3_fixedpoint_query, c, d, query);
          },
          fixedpoint_query_relations: async function(c, d, relations) {
            return await Mod.async_call(() => Mod.ccall("async_Z3_fixedpoint_query_relations", "void", ["number", "number", "number", "array"], [
              c,
              d,
              relations.length,
              intArrayToByteArr(relations)
            ]));
          },
          fixedpoint_get_answer: Mod._Z3_fixedpoint_get_answer,
          fixedpoint_get_reason_unknown: function(c, d) {
            return Mod.ccall("Z3_fixedpoint_get_reason_unknown", "string", ["number", "number"], [c, d]);
          },
          fixedpoint_update_rule: Mod._Z3_fixedpoint_update_rule,
          fixedpoint_get_num_levels: function(c, d, pred) {
            let ret = Mod.ccall("Z3_fixedpoint_get_num_levels", "number", ["number", "number", "number"], [c, d, pred]);
            ret = new Uint32Array([ret])[0];
            return ret;
          },
          fixedpoint_get_cover_delta: Mod._Z3_fixedpoint_get_cover_delta,
          fixedpoint_add_cover: Mod._Z3_fixedpoint_add_cover,
          fixedpoint_get_statistics: Mod._Z3_fixedpoint_get_statistics,
          fixedpoint_register_relation: Mod._Z3_fixedpoint_register_relation,
          fixedpoint_set_predicate_representation: function(c, d, f, relation_kinds) {
            return Mod.ccall("Z3_fixedpoint_set_predicate_representation", "void", ["number", "number", "number", "number", "array"], [
              c,
              d,
              f,
              relation_kinds.length,
              intArrayToByteArr(relation_kinds)
            ]);
          },
          fixedpoint_get_rules: Mod._Z3_fixedpoint_get_rules,
          fixedpoint_get_assertions: Mod._Z3_fixedpoint_get_assertions,
          fixedpoint_set_params: Mod._Z3_fixedpoint_set_params,
          fixedpoint_get_help: function(c, f) {
            return Mod.ccall("Z3_fixedpoint_get_help", "string", ["number", "number"], [c, f]);
          },
          fixedpoint_get_param_descrs: Mod._Z3_fixedpoint_get_param_descrs,
          fixedpoint_to_string: function(c, f, queries) {
            return Mod.ccall("Z3_fixedpoint_to_string", "string", ["number", "number", "number", "array"], [
              c,
              f,
              queries.length,
              intArrayToByteArr(queries)
            ]);
          },
          fixedpoint_from_string: function(c, f, s) {
            return Mod.ccall("Z3_fixedpoint_from_string", "number", ["number", "number", "string"], [c, f, s]);
          },
          fixedpoint_from_file: function(c, f, s) {
            return Mod.ccall("Z3_fixedpoint_from_file", "number", ["number", "number", "string"], [c, f, s]);
          },
          mk_fpa_rounding_mode_sort: Mod._Z3_mk_fpa_rounding_mode_sort,
          mk_fpa_round_nearest_ties_to_even: Mod._Z3_mk_fpa_round_nearest_ties_to_even,
          mk_fpa_rne: Mod._Z3_mk_fpa_rne,
          mk_fpa_round_nearest_ties_to_away: Mod._Z3_mk_fpa_round_nearest_ties_to_away,
          mk_fpa_rna: Mod._Z3_mk_fpa_rna,
          mk_fpa_round_toward_positive: Mod._Z3_mk_fpa_round_toward_positive,
          mk_fpa_rtp: Mod._Z3_mk_fpa_rtp,
          mk_fpa_round_toward_negative: Mod._Z3_mk_fpa_round_toward_negative,
          mk_fpa_rtn: Mod._Z3_mk_fpa_rtn,
          mk_fpa_round_toward_zero: Mod._Z3_mk_fpa_round_toward_zero,
          mk_fpa_rtz: Mod._Z3_mk_fpa_rtz,
          mk_fpa_sort: Mod._Z3_mk_fpa_sort,
          mk_fpa_sort_half: Mod._Z3_mk_fpa_sort_half,
          mk_fpa_sort_16: Mod._Z3_mk_fpa_sort_16,
          mk_fpa_sort_single: Mod._Z3_mk_fpa_sort_single,
          mk_fpa_sort_32: Mod._Z3_mk_fpa_sort_32,
          mk_fpa_sort_double: Mod._Z3_mk_fpa_sort_double,
          mk_fpa_sort_64: Mod._Z3_mk_fpa_sort_64,
          mk_fpa_sort_quadruple: Mod._Z3_mk_fpa_sort_quadruple,
          mk_fpa_sort_128: Mod._Z3_mk_fpa_sort_128,
          mk_fpa_nan: Mod._Z3_mk_fpa_nan,
          mk_fpa_inf: Mod._Z3_mk_fpa_inf,
          mk_fpa_zero: Mod._Z3_mk_fpa_zero,
          mk_fpa_fp: Mod._Z3_mk_fpa_fp,
          mk_fpa_numeral_float: Mod._Z3_mk_fpa_numeral_float,
          mk_fpa_numeral_double: Mod._Z3_mk_fpa_numeral_double,
          mk_fpa_numeral_int: Mod._Z3_mk_fpa_numeral_int,
          mk_fpa_numeral_int_uint: Mod._Z3_mk_fpa_numeral_int_uint,
          mk_fpa_numeral_int64_uint64: Mod._Z3_mk_fpa_numeral_int64_uint64,
          mk_fpa_abs: Mod._Z3_mk_fpa_abs,
          mk_fpa_neg: Mod._Z3_mk_fpa_neg,
          mk_fpa_add: Mod._Z3_mk_fpa_add,
          mk_fpa_sub: Mod._Z3_mk_fpa_sub,
          mk_fpa_mul: Mod._Z3_mk_fpa_mul,
          mk_fpa_div: Mod._Z3_mk_fpa_div,
          mk_fpa_fma: Mod._Z3_mk_fpa_fma,
          mk_fpa_sqrt: Mod._Z3_mk_fpa_sqrt,
          mk_fpa_rem: Mod._Z3_mk_fpa_rem,
          mk_fpa_round_to_integral: Mod._Z3_mk_fpa_round_to_integral,
          mk_fpa_min: Mod._Z3_mk_fpa_min,
          mk_fpa_max: Mod._Z3_mk_fpa_max,
          mk_fpa_leq: Mod._Z3_mk_fpa_leq,
          mk_fpa_lt: Mod._Z3_mk_fpa_lt,
          mk_fpa_geq: Mod._Z3_mk_fpa_geq,
          mk_fpa_gt: Mod._Z3_mk_fpa_gt,
          mk_fpa_eq: Mod._Z3_mk_fpa_eq,
          mk_fpa_is_normal: Mod._Z3_mk_fpa_is_normal,
          mk_fpa_is_subnormal: Mod._Z3_mk_fpa_is_subnormal,
          mk_fpa_is_zero: Mod._Z3_mk_fpa_is_zero,
          mk_fpa_is_infinite: Mod._Z3_mk_fpa_is_infinite,
          mk_fpa_is_nan: Mod._Z3_mk_fpa_is_nan,
          mk_fpa_is_negative: Mod._Z3_mk_fpa_is_negative,
          mk_fpa_is_positive: Mod._Z3_mk_fpa_is_positive,
          mk_fpa_to_fp_bv: Mod._Z3_mk_fpa_to_fp_bv,
          mk_fpa_to_fp_float: Mod._Z3_mk_fpa_to_fp_float,
          mk_fpa_to_fp_real: Mod._Z3_mk_fpa_to_fp_real,
          mk_fpa_to_fp_signed: Mod._Z3_mk_fpa_to_fp_signed,
          mk_fpa_to_fp_unsigned: Mod._Z3_mk_fpa_to_fp_unsigned,
          mk_fpa_to_ubv: Mod._Z3_mk_fpa_to_ubv,
          mk_fpa_to_sbv: Mod._Z3_mk_fpa_to_sbv,
          mk_fpa_to_real: Mod._Z3_mk_fpa_to_real,
          fpa_get_ebits: function(c, s) {
            let ret = Mod.ccall("Z3_fpa_get_ebits", "number", ["number", "number"], [c, s]);
            ret = new Uint32Array([ret])[0];
            return ret;
          },
          fpa_get_sbits: function(c, s) {
            let ret = Mod.ccall("Z3_fpa_get_sbits", "number", ["number", "number"], [c, s]);
            ret = new Uint32Array([ret])[0];
            return ret;
          },
          fpa_is_numeral_nan: function(c, t) {
            return Mod.ccall("Z3_fpa_is_numeral_nan", "boolean", ["number", "number"], [c, t]);
          },
          fpa_is_numeral_inf: function(c, t) {
            return Mod.ccall("Z3_fpa_is_numeral_inf", "boolean", ["number", "number"], [c, t]);
          },
          fpa_is_numeral_zero: function(c, t) {
            return Mod.ccall("Z3_fpa_is_numeral_zero", "boolean", ["number", "number"], [c, t]);
          },
          fpa_is_numeral_normal: function(c, t) {
            return Mod.ccall("Z3_fpa_is_numeral_normal", "boolean", ["number", "number"], [c, t]);
          },
          fpa_is_numeral_subnormal: function(c, t) {
            return Mod.ccall("Z3_fpa_is_numeral_subnormal", "boolean", ["number", "number"], [c, t]);
          },
          fpa_is_numeral_positive: function(c, t) {
            return Mod.ccall("Z3_fpa_is_numeral_positive", "boolean", ["number", "number"], [c, t]);
          },
          fpa_is_numeral_negative: function(c, t) {
            return Mod.ccall("Z3_fpa_is_numeral_negative", "boolean", ["number", "number"], [c, t]);
          },
          fpa_get_numeral_sign_bv: Mod._Z3_fpa_get_numeral_sign_bv,
          fpa_get_numeral_significand_bv: Mod._Z3_fpa_get_numeral_significand_bv,
          fpa_get_numeral_sign: function(c, t) {
            let ret = Mod.ccall("Z3_fpa_get_numeral_sign", "boolean", ["number", "number", "number"], [c, t, outAddress]);
            if (!ret) {
              return null;
            }
            return getOutInt(0);
          },
          fpa_get_numeral_significand_string: function(c, t) {
            return Mod.ccall("Z3_fpa_get_numeral_significand_string", "string", ["number", "number"], [c, t]);
          },
          fpa_get_numeral_significand_uint64: function(c, t) {
            let ret = Mod.ccall("Z3_fpa_get_numeral_significand_uint64", "boolean", ["number", "number", "number"], [c, t, outAddress]);
            if (!ret) {
              return null;
            }
            return getOutUint64(0);
          },
          fpa_get_numeral_exponent_string: function(c, t, biased) {
            return Mod.ccall("Z3_fpa_get_numeral_exponent_string", "string", ["number", "number", "boolean"], [c, t, biased]);
          },
          fpa_get_numeral_exponent_int64: function(c, t, biased) {
            let ret = Mod.ccall("Z3_fpa_get_numeral_exponent_int64", "boolean", ["number", "number", "number", "boolean"], [c, t, outAddress, biased]);
            if (!ret) {
              return null;
            }
            return getOutInt64(0);
          },
          fpa_get_numeral_exponent_bv: Mod._Z3_fpa_get_numeral_exponent_bv,
          mk_fpa_to_ieee_bv: Mod._Z3_mk_fpa_to_ieee_bv,
          mk_fpa_to_fp_int_real: Mod._Z3_mk_fpa_to_fp_int_real,
          mk_optimize: Mod._Z3_mk_optimize,
          optimize_inc_ref: Mod._Z3_optimize_inc_ref,
          optimize_dec_ref: Mod._Z3_optimize_dec_ref,
          optimize_assert: Mod._Z3_optimize_assert,
          optimize_assert_and_track: Mod._Z3_optimize_assert_and_track,
          optimize_assert_soft: function(c, o, a, weight, id) {
            let ret = Mod.ccall("Z3_optimize_assert_soft", "number", ["number", "number", "number", "string", "number"], [c, o, a, weight, id]);
            ret = new Uint32Array([ret])[0];
            return ret;
          },
          optimize_maximize: function(c, o, t) {
            let ret = Mod.ccall("Z3_optimize_maximize", "number", ["number", "number", "number"], [c, o, t]);
            ret = new Uint32Array([ret])[0];
            return ret;
          },
          optimize_minimize: function(c, o, t) {
            let ret = Mod.ccall("Z3_optimize_minimize", "number", ["number", "number", "number"], [c, o, t]);
            ret = new Uint32Array([ret])[0];
            return ret;
          },
          optimize_push: Mod._Z3_optimize_push,
          optimize_pop: Mod._Z3_optimize_pop,
          optimize_set_initial_value: Mod._Z3_optimize_set_initial_value,
          optimize_check: async function(c, o, assumptions) {
            return await Mod.async_call(() => Mod.ccall("async_Z3_optimize_check", "void", ["number", "number", "number", "array"], [
              c,
              o,
              assumptions.length,
              intArrayToByteArr(assumptions)
            ]));
          },
          optimize_get_reason_unknown: function(c, d) {
            return Mod.ccall("Z3_optimize_get_reason_unknown", "string", ["number", "number"], [c, d]);
          },
          optimize_get_model: Mod._Z3_optimize_get_model,
          optimize_get_unsat_core: Mod._Z3_optimize_get_unsat_core,
          optimize_set_params: Mod._Z3_optimize_set_params,
          optimize_get_param_descrs: Mod._Z3_optimize_get_param_descrs,
          optimize_get_lower: Mod._Z3_optimize_get_lower,
          optimize_get_upper: Mod._Z3_optimize_get_upper,
          optimize_get_lower_as_vector: Mod._Z3_optimize_get_lower_as_vector,
          optimize_get_upper_as_vector: Mod._Z3_optimize_get_upper_as_vector,
          optimize_to_string: function(c, o) {
            return Mod.ccall("Z3_optimize_to_string", "string", ["number", "number"], [c, o]);
          },
          optimize_from_string: function(c, o, s) {
            return Mod.ccall("Z3_optimize_from_string", "void", ["number", "number", "string"], [c, o, s]);
          },
          optimize_from_file: function(c, o, s) {
            return Mod.ccall("Z3_optimize_from_file", "void", ["number", "number", "string"], [c, o, s]);
          },
          optimize_get_help: function(c, t) {
            return Mod.ccall("Z3_optimize_get_help", "string", ["number", "number"], [c, t]);
          },
          optimize_get_statistics: Mod._Z3_optimize_get_statistics,
          optimize_get_assertions: Mod._Z3_optimize_get_assertions,
          optimize_get_objectives: Mod._Z3_optimize_get_objectives,
          polynomial_subresultants: function(c, p, q, x) {
            return Mod.async_call(Mod._async_Z3_polynomial_subresultants, c, p, q, x);
          },
          rcf_del: Mod._Z3_rcf_del,
          rcf_mk_rational: function(c, val) {
            return Mod.ccall("Z3_rcf_mk_rational", "number", ["number", "string"], [c, val]);
          },
          rcf_mk_small_int: Mod._Z3_rcf_mk_small_int,
          rcf_mk_pi: Mod._Z3_rcf_mk_pi,
          rcf_mk_e: Mod._Z3_rcf_mk_e,
          rcf_mk_infinitesimal: Mod._Z3_rcf_mk_infinitesimal,
          rcf_mk_roots: function(c, a) {
            let outArray_roots = Mod._malloc(4 * a.length);
            try {
              let ret = Mod.ccall("Z3_rcf_mk_roots", "number", ["number", "number", "array", "number"], [
                c,
                a.length,
                intArrayToByteArr(a),
                outArray_roots
              ]);
              ret = new Uint32Array([ret])[0];
              return {
                rv: ret,
                roots: readUintArray(outArray_roots, a.length)
              };
            } finally {
              Mod._free(outArray_roots);
            }
          },
          rcf_add: Mod._Z3_rcf_add,
          rcf_sub: Mod._Z3_rcf_sub,
          rcf_mul: Mod._Z3_rcf_mul,
          rcf_div: Mod._Z3_rcf_div,
          rcf_neg: Mod._Z3_rcf_neg,
          rcf_inv: Mod._Z3_rcf_inv,
          rcf_power: Mod._Z3_rcf_power,
          rcf_lt: function(c, a, b) {
            return Mod.ccall("Z3_rcf_lt", "boolean", ["number", "number", "number"], [c, a, b]);
          },
          rcf_gt: function(c, a, b) {
            return Mod.ccall("Z3_rcf_gt", "boolean", ["number", "number", "number"], [c, a, b]);
          },
          rcf_le: function(c, a, b) {
            return Mod.ccall("Z3_rcf_le", "boolean", ["number", "number", "number"], [c, a, b]);
          },
          rcf_ge: function(c, a, b) {
            return Mod.ccall("Z3_rcf_ge", "boolean", ["number", "number", "number"], [c, a, b]);
          },
          rcf_eq: function(c, a, b) {
            return Mod.ccall("Z3_rcf_eq", "boolean", ["number", "number", "number"], [c, a, b]);
          },
          rcf_neq: function(c, a, b) {
            return Mod.ccall("Z3_rcf_neq", "boolean", ["number", "number", "number"], [c, a, b]);
          },
          rcf_num_to_string: function(c, a, compact, html) {
            return Mod.ccall("Z3_rcf_num_to_string", "string", ["number", "number", "boolean", "boolean"], [c, a, compact, html]);
          },
          rcf_num_to_decimal_string: function(c, a, prec) {
            return Mod.ccall("Z3_rcf_num_to_decimal_string", "string", ["number", "number", "number"], [c, a, prec]);
          },
          rcf_get_numerator_denominator: function(c, a) {
            Mod.ccall("Z3_rcf_get_numerator_denominator", "void", ["number", "number", "number", "number"], [c, a, outAddress, outAddress + 4]);
            return {
              n: getOutUint(0),
              d: getOutUint(1)
            };
          },
          rcf_is_rational: function(c, a) {
            return Mod.ccall("Z3_rcf_is_rational", "boolean", ["number", "number"], [c, a]);
          },
          rcf_is_algebraic: function(c, a) {
            return Mod.ccall("Z3_rcf_is_algebraic", "boolean", ["number", "number"], [c, a]);
          },
          rcf_is_infinitesimal: function(c, a) {
            return Mod.ccall("Z3_rcf_is_infinitesimal", "boolean", ["number", "number"], [c, a]);
          },
          rcf_is_transcendental: function(c, a) {
            return Mod.ccall("Z3_rcf_is_transcendental", "boolean", ["number", "number"], [c, a]);
          },
          rcf_extension_index: function(c, a) {
            let ret = Mod.ccall("Z3_rcf_extension_index", "number", ["number", "number"], [c, a]);
            ret = new Uint32Array([ret])[0];
            return ret;
          },
          rcf_transcendental_name: Mod._Z3_rcf_transcendental_name,
          rcf_infinitesimal_name: Mod._Z3_rcf_infinitesimal_name,
          rcf_num_coefficients: function(c, a) {
            let ret = Mod.ccall("Z3_rcf_num_coefficients", "number", ["number", "number"], [c, a]);
            ret = new Uint32Array([ret])[0];
            return ret;
          },
          rcf_coefficient: Mod._Z3_rcf_coefficient,
          rcf_num_sign_conditions: function(c, a) {
            let ret = Mod.ccall("Z3_rcf_num_sign_conditions", "number", ["number", "number"], [c, a]);
            ret = new Uint32Array([ret])[0];
            return ret;
          },
          rcf_sign_condition_sign: Mod._Z3_rcf_sign_condition_sign,
          rcf_num_sign_condition_coefficients: function(c, a, i) {
            let ret = Mod.ccall("Z3_rcf_num_sign_condition_coefficients", "number", ["number", "number", "number"], [c, a, i]);
            ret = new Uint32Array([ret])[0];
            return ret;
          },
          rcf_sign_condition_coefficient: Mod._Z3_rcf_sign_condition_coefficient,
          fixedpoint_query_from_lvl: function(c, d, query, lvl) {
            return Mod.async_call(Mod._async_Z3_fixedpoint_query_from_lvl, c, d, query, lvl);
          },
          fixedpoint_get_ground_sat_answer: Mod._Z3_fixedpoint_get_ground_sat_answer,
          fixedpoint_get_rules_along_trace: Mod._Z3_fixedpoint_get_rules_along_trace,
          fixedpoint_get_rule_names_along_trace: Mod._Z3_fixedpoint_get_rule_names_along_trace,
          fixedpoint_add_invariant: Mod._Z3_fixedpoint_add_invariant,
          fixedpoint_get_reachable: Mod._Z3_fixedpoint_get_reachable,
          qe_model_project: function(c, m, bound, body) {
            return Mod.ccall("Z3_qe_model_project", "number", ["number", "number", "number", "array", "number"], [
              c,
              m,
              bound.length,
              intArrayToByteArr(bound),
              body
            ]);
          },
          qe_model_project_skolem: function(c, m, bound, body, map) {
            return Mod.ccall("Z3_qe_model_project_skolem", "number", ["number", "number", "number", "array", "number", "number"], [
              c,
              m,
              bound.length,
              intArrayToByteArr(bound),
              body,
              map
            ]);
          },
          qe_model_project_with_witness: function(c, m, bound, body, map) {
            return Mod.ccall("Z3_qe_model_project_with_witness", "number", ["number", "number", "number", "array", "number", "number"], [
              c,
              m,
              bound.length,
              intArrayToByteArr(bound),
              body,
              map
            ]);
          },
          model_extrapolate: Mod._Z3_model_extrapolate,
          qe_lite: Mod._Z3_qe_lite
        }
      };
    }
    return wrapper___GENERATED__;
  }
  var hasRequiredLowLevel;
  function requireLowLevel() {
    if (hasRequiredLowLevel) return lowLevel;
    hasRequiredLowLevel = 1;
    (function(exports2) {
      var __createBinding2 = lowLevel && lowLevel.__createBinding || (Object.create ? (function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
          desc = { enumerable: true, get: function() {
            return m[k];
          } };
        }
        Object.defineProperty(o, k2, desc);
      }) : (function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        o[k2] = m[k];
      }));
      var __exportStar2 = lowLevel && lowLevel.__exportStar || function(m, exports3) {
        for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports3, p)) __createBinding2(exports3, m, p);
      };
      Object.defineProperty(exports2, "__esModule", { value: true });
      __exportStar2(requireTypes___GENERATED__(), exports2);
      __exportStar2(requireWrapper___GENERATED__(), exports2);
    })(lowLevel);
    return lowLevel;
  }
  var types = {};
  var hasRequiredTypes;
  function requireTypes() {
    if (hasRequiredTypes) return types;
    hasRequiredTypes = 1;
    Object.defineProperty(types, "__esModule", { value: true });
    types.Z3AssertionError = types.Z3Error = void 0;
    class Z3Error extends Error {
    }
    types.Z3Error = Z3Error;
    class Z3AssertionError extends Z3Error {
    }
    types.Z3AssertionError = Z3AssertionError;
    return types;
  }
  var utils = {};
  var hasRequiredUtils;
  function requireUtils() {
    if (hasRequiredUtils) return utils;
    hasRequiredUtils = 1;
    Object.defineProperty(utils, "__esModule", { value: true });
    utils.assertExhaustive = assertExhaustive;
    utils.assert = assert;
    utils.allSatisfy = allSatisfy;
    const types_1 = requireTypes();
    function assertExhaustive(x) {
      throw new Error("Unexpected code execution detected, should be caught at compile time");
    }
    function assert(condition, reason) {
      if (!condition) {
        throw new types_1.Z3AssertionError(reason ?? "Assertion failed");
      }
    }
    function allSatisfy(collection, premise) {
      let hasItems = false;
      for (const arg of collection) {
        hasItems = true;
        if (!premise(arg)) {
          return false;
        }
      }
      return hasItems === true ? true : null;
    }
    return utils;
  }
  var hasRequiredHighLevel$1;
  function requireHighLevel$1() {
    if (hasRequiredHighLevel$1) return highLevel;
    hasRequiredHighLevel$1 = 1;
    Object.defineProperty(highLevel, "__esModule", { value: true });
    highLevel.createApi = createApi;
    const async_mutex_1 = requireLib();
    const low_level_1 = requireLowLevel();
    const types_1 = requireTypes();
    const utils_1 = requireUtils();
    const FALLBACK_PRECISION = 17;
    const asyncMutex = new async_mutex_1.Mutex();
    function isCoercibleRational(obj) {
      const r = obj !== null && (typeof obj === "object" || typeof obj === "function") && (obj.numerator !== null && (typeof obj.numerator === "number" || typeof obj.numerator === "bigint")) && (obj.denominator !== null && (typeof obj.denominator === "number" || typeof obj.denominator === "bigint"));
      r && (0, utils_1.assert)((typeof obj.numerator !== "number" || Number.isSafeInteger(obj.numerator)) && (typeof obj.denominator !== "number" || Number.isSafeInteger(obj.denominator)), "Fraction numerator and denominator must be integers");
      return r;
    }
    function createApi(Z3) {
      const cleanup = new FinalizationRegistry((callback) => callback());
      function enableTrace(tag) {
        Z3.enable_trace(tag);
      }
      function disableTrace(tag) {
        Z3.disable_trace(tag);
      }
      function getVersion() {
        return Z3.get_version();
      }
      function getVersionString() {
        const { major, minor, build_number } = Z3.get_version();
        return `${major}.${minor}.${build_number}`;
      }
      function getFullVersion() {
        return Z3.get_full_version();
      }
      function openLog(filename) {
        return Z3.open_log(filename);
      }
      function appendLog(s) {
        Z3.append_log(s);
      }
      function setParam(key, value) {
        if (typeof key === "string") {
          Z3.global_param_set(key, value.toString());
        } else {
          (0, utils_1.assert)(value === void 0, "Can't provide a Record and second parameter to set_param at the same time");
          Object.entries(key).forEach(([key2, value2]) => setParam(key2, value2));
        }
      }
      function resetParams() {
        Z3.global_param_reset_all();
      }
      function getParam(name) {
        return Z3.global_param_get(name);
      }
      function createContext(name, options) {
        const cfg = Z3.mk_config();
        if (options != null) {
          Object.entries(options).forEach(([key, value]) => check(Z3.set_param_value(cfg, key, value.toString())));
        }
        const contextPtr = Z3.mk_context_rc(cfg);
        Z3.set_ast_print_mode(contextPtr, low_level_1.Z3_ast_print_mode.Z3_PRINT_SMTLIB2_COMPLIANT);
        Z3.del_config(cfg);
        function _assertContext(...ctxs) {
          ctxs.forEach((other) => (0, utils_1.assert)("ctx" in other ? ctx === other.ctx : ctx === other, "Context mismatch"));
        }
        function _assertPtr(ptr) {
          if (ptr == null)
            throw new TypeError("Expected non-null pointer");
        }
        function throwIfError() {
          if (Z3.get_error_code(contextPtr) !== low_level_1.Z3_error_code.Z3_OK) {
            throw new Error(Z3.get_error_msg(ctx.ptr, Z3.get_error_code(ctx.ptr)));
          }
        }
        function check(val) {
          throwIfError();
          return val;
        }
        function _toSymbol(s) {
          if (typeof s === "number") {
            return check(Z3.mk_int_symbol(contextPtr, s));
          } else {
            return check(Z3.mk_string_symbol(contextPtr, s));
          }
        }
        function _fromSymbol(sym) {
          const kind = check(Z3.get_symbol_kind(contextPtr, sym));
          switch (kind) {
            case low_level_1.Z3_symbol_kind.Z3_INT_SYMBOL:
              return Z3.get_symbol_int(contextPtr, sym);
            case low_level_1.Z3_symbol_kind.Z3_STRING_SYMBOL:
              return Z3.get_symbol_string(contextPtr, sym);
            default:
              (0, utils_1.assertExhaustive)(kind);
          }
        }
        function _toParams(key, value) {
          const params = Z3.mk_params(contextPtr);
          Z3.params_inc_ref(contextPtr, params);
          if (typeof value === "boolean") {
            Z3.params_set_bool(contextPtr, params, _toSymbol(key), value);
          } else if (typeof value === "number") {
            if (Number.isInteger(value)) {
              check(Z3.params_set_uint(contextPtr, params, _toSymbol(key), value));
            } else {
              check(Z3.params_set_double(contextPtr, params, _toSymbol(key), value));
            }
          } else if (typeof value === "string") {
            check(Z3.params_set_symbol(contextPtr, params, _toSymbol(key), _toSymbol(value)));
          }
          return params;
        }
        function _toAst(ast) {
          switch (check(Z3.get_ast_kind(contextPtr, ast))) {
            case low_level_1.Z3_ast_kind.Z3_SORT_AST:
              return _toSort(ast);
            case low_level_1.Z3_ast_kind.Z3_FUNC_DECL_AST:
              return new FuncDeclImpl(ast);
            default:
              return _toExpr(ast);
          }
        }
        function _toSort(ast) {
          switch (check(Z3.get_sort_kind(contextPtr, ast))) {
            case low_level_1.Z3_sort_kind.Z3_BOOL_SORT:
              return new BoolSortImpl(ast);
            case low_level_1.Z3_sort_kind.Z3_INT_SORT:
            case low_level_1.Z3_sort_kind.Z3_REAL_SORT:
              return new ArithSortImpl(ast);
            case low_level_1.Z3_sort_kind.Z3_BV_SORT:
              return new BitVecSortImpl(ast);
            case low_level_1.Z3_sort_kind.Z3_ARRAY_SORT:
              return new ArraySortImpl(ast);
            default:
              return new SortImpl(ast);
          }
        }
        function _toExpr(ast) {
          const kind = check(Z3.get_ast_kind(contextPtr, ast));
          if (kind === low_level_1.Z3_ast_kind.Z3_QUANTIFIER_AST) {
            if (Z3.is_lambda(contextPtr, ast)) {
              return new LambdaImpl(ast);
            }
            return new NonLambdaQuantifierImpl(ast);
          }
          const sortKind = check(Z3.get_sort_kind(contextPtr, Z3.get_sort(contextPtr, ast)));
          switch (sortKind) {
            case low_level_1.Z3_sort_kind.Z3_BOOL_SORT:
              return new BoolImpl(ast);
            case low_level_1.Z3_sort_kind.Z3_INT_SORT:
              if (kind === low_level_1.Z3_ast_kind.Z3_NUMERAL_AST) {
                return new IntNumImpl(ast);
              }
              return new ArithImpl(ast);
            case low_level_1.Z3_sort_kind.Z3_REAL_SORT:
              if (kind === low_level_1.Z3_ast_kind.Z3_NUMERAL_AST) {
                return new RatNumImpl(ast);
              }
              return new ArithImpl(ast);
            case low_level_1.Z3_sort_kind.Z3_BV_SORT:
              if (kind === low_level_1.Z3_ast_kind.Z3_NUMERAL_AST) {
                return new BitVecNumImpl(ast);
              }
              return new BitVecImpl(ast);
            case low_level_1.Z3_sort_kind.Z3_ARRAY_SORT:
              return new ArrayImpl(ast);
            default:
              return new ExprImpl(ast);
          }
        }
        function _flattenArgs(args) {
          const result = [];
          for (const arg of args) {
            if (isAstVector(arg)) {
              result.push(...arg.values());
            } else {
              result.push(arg);
            }
          }
          return result;
        }
        function _toProbe(p) {
          if (isProbe(p)) {
            return p;
          }
          return new ProbeImpl(p);
        }
        function _probeNary(f, args) {
          (0, utils_1.assert)(args.length > 0, "At least one argument expected");
          let r = _toProbe(args[0]);
          for (let i = 1; i < args.length; i++) {
            r = new ProbeImpl(check(f(contextPtr, r.ptr, _toProbe(args[i]).ptr)));
          }
          return r;
        }
        function interrupt() {
          check(Z3.interrupt(contextPtr));
        }
        function isModel(obj) {
          const r = obj instanceof ModelImpl;
          r && _assertContext(obj);
          return r;
        }
        function isAst(obj) {
          const r = obj instanceof AstImpl;
          r && _assertContext(obj);
          return r;
        }
        function isSort(obj) {
          const r = obj instanceof SortImpl;
          r && _assertContext(obj);
          return r;
        }
        function isFuncDecl(obj) {
          const r = obj instanceof FuncDeclImpl;
          r && _assertContext(obj);
          return r;
        }
        function isFuncInterp(obj) {
          const r = obj instanceof FuncInterpImpl;
          r && _assertContext(obj);
          return r;
        }
        function isApp(obj) {
          if (!isExpr(obj)) {
            return false;
          }
          const kind = check(Z3.get_ast_kind(contextPtr, obj.ast));
          return kind === low_level_1.Z3_ast_kind.Z3_NUMERAL_AST || kind === low_level_1.Z3_ast_kind.Z3_APP_AST;
        }
        function isConst(obj) {
          return isExpr(obj) && isApp(obj) && obj.numArgs() === 0;
        }
        function isExpr(obj) {
          const r = obj instanceof ExprImpl;
          r && _assertContext(obj);
          return r;
        }
        function isVar(obj) {
          return isExpr(obj) && check(Z3.get_ast_kind(contextPtr, obj.ast)) === low_level_1.Z3_ast_kind.Z3_VAR_AST;
        }
        function isAppOf(obj, kind) {
          return isExpr(obj) && isApp(obj) && obj.decl().kind() === kind;
        }
        function isBool(obj) {
          const r = obj instanceof ExprImpl && obj.sort.kind() === low_level_1.Z3_sort_kind.Z3_BOOL_SORT;
          r && _assertContext(obj);
          return r;
        }
        function isTrue(obj) {
          return isAppOf(obj, low_level_1.Z3_decl_kind.Z3_OP_TRUE);
        }
        function isFalse(obj) {
          return isAppOf(obj, low_level_1.Z3_decl_kind.Z3_OP_FALSE);
        }
        function isAnd(obj) {
          return isAppOf(obj, low_level_1.Z3_decl_kind.Z3_OP_AND);
        }
        function isOr(obj) {
          return isAppOf(obj, low_level_1.Z3_decl_kind.Z3_OP_OR);
        }
        function isImplies(obj) {
          return isAppOf(obj, low_level_1.Z3_decl_kind.Z3_OP_IMPLIES);
        }
        function isNot(obj) {
          return isAppOf(obj, low_level_1.Z3_decl_kind.Z3_OP_NOT);
        }
        function isEq(obj) {
          return isAppOf(obj, low_level_1.Z3_decl_kind.Z3_OP_EQ);
        }
        function isDistinct(obj) {
          return isAppOf(obj, low_level_1.Z3_decl_kind.Z3_OP_DISTINCT);
        }
        function isQuantifier(obj) {
          const r = obj instanceof QuantifierImpl;
          r && _assertContext(obj);
          return r;
        }
        function isArith(obj) {
          const r = obj instanceof ArithImpl;
          r && _assertContext(obj);
          return r;
        }
        function isArithSort(obj) {
          const r = obj instanceof ArithSortImpl;
          r && _assertContext(obj);
          return r;
        }
        function isInt(obj) {
          return isArith(obj) && isIntSort(obj.sort);
        }
        function isIntVal(obj) {
          const r = obj instanceof IntNumImpl;
          r && _assertContext(obj);
          return r;
        }
        function isIntSort(obj) {
          return isSort(obj) && obj.kind() === low_level_1.Z3_sort_kind.Z3_INT_SORT;
        }
        function isReal(obj) {
          return isArith(obj) && isRealSort(obj.sort);
        }
        function isRealVal(obj) {
          const r = obj instanceof RatNumImpl;
          r && _assertContext(obj);
          return r;
        }
        function isRealSort(obj) {
          return isSort(obj) && obj.kind() === low_level_1.Z3_sort_kind.Z3_REAL_SORT;
        }
        function isBitVecSort(obj) {
          const r = obj instanceof BitVecSortImpl;
          r && _assertContext(obj);
          return r;
        }
        function isBitVec(obj) {
          const r = obj instanceof BitVecImpl;
          r && _assertContext(obj);
          return r;
        }
        function isBitVecVal(obj) {
          const r = obj instanceof BitVecNumImpl;
          r && _assertContext(obj);
          return r;
        }
        function isArraySort(obj) {
          const r = obj instanceof ArraySortImpl;
          r && _assertContext(obj);
          return r;
        }
        function isArray(obj) {
          const r = obj instanceof ArrayImpl;
          r && _assertContext(obj);
          return r;
        }
        function isConstArray(obj) {
          return isAppOf(obj, low_level_1.Z3_decl_kind.Z3_OP_CONST_ARRAY);
        }
        function isProbe(obj) {
          const r = obj instanceof ProbeImpl;
          r && _assertContext(obj);
          return r;
        }
        function isTactic(obj) {
          const r = obj instanceof TacticImpl;
          r && _assertContext(obj);
          return r;
        }
        function isAstVector(obj) {
          const r = obj instanceof AstVectorImpl;
          r && _assertContext(obj);
          return r;
        }
        function eqIdentity(a, b) {
          return a.eqIdentity(b);
        }
        function getVarIndex(obj) {
          (0, utils_1.assert)(isVar(obj), "Z3 bound variable expected");
          return Z3.get_index_value(contextPtr, obj.ast);
        }
        function from(value) {
          if (typeof value === "boolean") {
            return Bool.val(value);
          } else if (typeof value === "number") {
            if (!Number.isFinite(value)) {
              throw new Error(`cannot represent infinity/NaN (got ${value})`);
            }
            if (Math.floor(value) === value) {
              return Int.val(value);
            }
            return Real.val(value);
          } else if (isCoercibleRational(value)) {
            return Real.val(value);
          } else if (typeof value === "bigint") {
            return Int.val(value);
          } else if (isExpr(value)) {
            return value;
          }
          (0, utils_1.assert)(false);
        }
        async function solve(...assertions) {
          const solver = new ctx.Solver();
          solver.add(...assertions);
          const result = await solver.check();
          if (result === "sat") {
            return solver.model();
          }
          return result;
        }
        async function simplify(e) {
          const result = await Z3.simplify(contextPtr, e.ast);
          return _toExpr(check(result));
        }
        const Sort = {
          declare: (name2) => new SortImpl(Z3.mk_uninterpreted_sort(contextPtr, _toSymbol(name2)))
        };
        const Function = {
          declare: (name2, ...signature) => {
            const arity = signature.length - 1;
            const rng = signature[arity];
            _assertContext(rng);
            const dom = [];
            for (let i = 0; i < arity; i++) {
              _assertContext(signature[i]);
              dom.push(signature[i].ptr);
            }
            return new FuncDeclImpl(Z3.mk_func_decl(contextPtr, _toSymbol(name2), dom, rng.ptr));
          },
          fresh: (...signature) => {
            const arity = signature.length - 1;
            const rng = signature[arity];
            _assertContext(rng);
            const dom = [];
            for (let i = 0; i < arity; i++) {
              _assertContext(signature[i]);
              dom.push(signature[i].ptr);
            }
            return new FuncDeclImpl(Z3.mk_fresh_func_decl(contextPtr, "f", dom, rng.ptr));
          }
        };
        const RecFunc = {
          declare: (name2, ...signature) => {
            const arity = signature.length - 1;
            const rng = signature[arity];
            _assertContext(rng);
            const dom = [];
            for (let i = 0; i < arity; i++) {
              _assertContext(signature[i]);
              dom.push(signature[i].ptr);
            }
            return new FuncDeclImpl(Z3.mk_rec_func_decl(contextPtr, _toSymbol(name2), dom, rng.ptr));
          },
          addDefinition: (f, args, body) => {
            _assertContext(f, ...args, body);
            check(Z3.add_rec_def(contextPtr, f.ptr, args.map((arg) => arg.ast), body.ast));
          }
        };
        const Bool = {
          sort: () => new BoolSortImpl(Z3.mk_bool_sort(contextPtr)),
          const: (name2) => new BoolImpl(Z3.mk_const(contextPtr, _toSymbol(name2), Bool.sort().ptr)),
          consts: (names) => {
            if (typeof names === "string") {
              names = names.split(" ");
            }
            return names.map((name2) => Bool.const(name2));
          },
          vector: (prefix, count) => {
            const result = [];
            for (let i = 0; i < count; i++) {
              result.push(Bool.const(`${prefix}__${i}`));
            }
            return result;
          },
          fresh: (prefix = "b") => new BoolImpl(Z3.mk_fresh_const(contextPtr, prefix, Bool.sort().ptr)),
          val: (value) => {
            if (value) {
              return new BoolImpl(Z3.mk_true(contextPtr));
            }
            return new BoolImpl(Z3.mk_false(contextPtr));
          }
        };
        const Int = {
          sort: () => new ArithSortImpl(Z3.mk_int_sort(contextPtr)),
          const: (name2) => new ArithImpl(Z3.mk_const(contextPtr, _toSymbol(name2), Int.sort().ptr)),
          consts: (names) => {
            if (typeof names === "string") {
              names = names.split(" ");
            }
            return names.map((name2) => Int.const(name2));
          },
          vector: (prefix, count) => {
            const result = [];
            for (let i = 0; i < count; i++) {
              result.push(Int.const(`${prefix}__${i}`));
            }
            return result;
          },
          fresh: (prefix = "x") => new ArithImpl(Z3.mk_fresh_const(contextPtr, prefix, Int.sort().ptr)),
          val: (value) => {
            (0, utils_1.assert)(typeof value === "bigint" || typeof value === "string" || Number.isSafeInteger(value));
            return new IntNumImpl(check(Z3.mk_numeral(contextPtr, value.toString(), Int.sort().ptr)));
          }
        };
        const Real = {
          sort: () => new ArithSortImpl(Z3.mk_real_sort(contextPtr)),
          const: (name2) => new ArithImpl(check(Z3.mk_const(contextPtr, _toSymbol(name2), Real.sort().ptr))),
          consts: (names) => {
            if (typeof names === "string") {
              names = names.split(" ");
            }
            return names.map((name2) => Real.const(name2));
          },
          vector: (prefix, count) => {
            const result = [];
            for (let i = 0; i < count; i++) {
              result.push(Real.const(`${prefix}__${i}`));
            }
            return result;
          },
          fresh: (prefix = "b") => new ArithImpl(Z3.mk_fresh_const(contextPtr, prefix, Real.sort().ptr)),
          val: (value) => {
            if (isCoercibleRational(value)) {
              value = `${value.numerator}/${value.denominator}`;
            }
            return new RatNumImpl(Z3.mk_numeral(contextPtr, value.toString(), Real.sort().ptr));
          }
        };
        const BitVec = {
          sort(bits) {
            (0, utils_1.assert)(Number.isSafeInteger(bits), "number of bits must be an integer");
            return new BitVecSortImpl(Z3.mk_bv_sort(contextPtr, bits));
          },
          const(name2, bits) {
            return new BitVecImpl(check(Z3.mk_const(contextPtr, _toSymbol(name2), isBitVecSort(bits) ? bits.ptr : BitVec.sort(bits).ptr)));
          },
          consts(names, bits) {
            if (typeof names === "string") {
              names = names.split(" ");
            }
            return names.map((name2) => BitVec.const(name2, bits));
          },
          val(value, bits) {
            if (value === true) {
              return BitVec.val(1, bits);
            } else if (value === false) {
              return BitVec.val(0, bits);
            }
            return new BitVecNumImpl(check(Z3.mk_numeral(contextPtr, value.toString(), isBitVecSort(bits) ? bits.ptr : BitVec.sort(bits).ptr)));
          }
        };
        const Array2 = {
          sort(...sig) {
            const arity = sig.length - 1;
            const r = sig[arity];
            const d = sig[0];
            if (arity === 1) {
              return new ArraySortImpl(Z3.mk_array_sort(contextPtr, d.ptr, r.ptr));
            }
            const dom = sig.slice(0, arity);
            return new ArraySortImpl(Z3.mk_array_sort_n(contextPtr, dom.map((s) => s.ptr), r.ptr));
          },
          const(name2, ...sig) {
            return new ArrayImpl(check(Z3.mk_const(contextPtr, _toSymbol(name2), Array2.sort(...sig).ptr)));
          },
          consts(names, ...sig) {
            if (typeof names === "string") {
              names = names.split(" ");
            }
            return names.map((name2) => Array2.const(name2, ...sig));
          },
          K(domain, value) {
            return new ArrayImpl(check(Z3.mk_const_array(contextPtr, domain.ptr, value.ptr)));
          }
        };
        const Set = {
          // reference: https://z3prover.github.io/api/html/namespacez3py.html#a545f894afeb24caa1b88b7f2a324ee7e
          sort(sort) {
            return Array2.sort(sort, Bool.sort());
          },
          const(name2, sort) {
            return new SetImpl(check(Z3.mk_const(contextPtr, _toSymbol(name2), Array2.sort(sort, Bool.sort()).ptr)));
          },
          consts(names, sort) {
            if (typeof names === "string") {
              names = names.split(" ");
            }
            return names.map((name2) => Set.const(name2, sort));
          },
          empty(sort) {
            return EmptySet(sort);
          },
          val(values, sort) {
            var result = EmptySet(sort);
            for (const value of values) {
              result = SetAdd(result, value);
            }
            return result;
          }
        };
        const Datatype = Object.assign((name2) => {
          return new DatatypeImpl(ctx, name2);
        }, {
          createDatatypes(...datatypes) {
            return createDatatypes(...datatypes);
          }
        });
        function If(condition, onTrue, onFalse) {
          if (isProbe(condition) && isTactic(onTrue) && isTactic(onFalse)) {
            return Cond(condition, onTrue, onFalse);
          }
          (0, utils_1.assert)(!isProbe(condition) && !isTactic(onTrue) && !isTactic(onFalse), "Mixed expressions and goals");
          if (typeof condition === "boolean") {
            condition = Bool.val(condition);
          }
          onTrue = from(onTrue);
          onFalse = from(onFalse);
          return _toExpr(check(Z3.mk_ite(contextPtr, condition.ptr, onTrue.ast, onFalse.ast)));
        }
        function Distinct(...exprs) {
          (0, utils_1.assert)(exprs.length > 0, "Can't make Distinct ouf of nothing");
          return new BoolImpl(check(Z3.mk_distinct(contextPtr, exprs.map((expr) => {
            expr = from(expr);
            _assertContext(expr);
            return expr.ast;
          }))));
        }
        function Const(name2, sort) {
          _assertContext(sort);
          return _toExpr(check(Z3.mk_const(contextPtr, _toSymbol(name2), sort.ptr)));
        }
        function Consts(names, sort) {
          _assertContext(sort);
          if (typeof names === "string") {
            names = names.split(" ");
          }
          return names.map((name2) => Const(name2, sort));
        }
        function FreshConst(sort, prefix = "c") {
          _assertContext(sort);
          return _toExpr(Z3.mk_fresh_const(sort.ctx.ptr, prefix, sort.ptr));
        }
        function Var(idx, sort) {
          _assertContext(sort);
          return _toExpr(Z3.mk_bound(sort.ctx.ptr, idx, sort.ptr));
        }
        function Implies(a, b) {
          a = from(a);
          b = from(b);
          _assertContext(a, b);
          return new BoolImpl(check(Z3.mk_implies(contextPtr, a.ptr, b.ptr)));
        }
        function Iff(a, b) {
          a = from(a);
          b = from(b);
          _assertContext(a, b);
          return new BoolImpl(check(Z3.mk_iff(contextPtr, a.ptr, b.ptr)));
        }
        function Eq(a, b) {
          a = from(a);
          b = from(b);
          _assertContext(a, b);
          return a.eq(b);
        }
        function Xor(a, b) {
          a = from(a);
          b = from(b);
          _assertContext(a, b);
          return new BoolImpl(check(Z3.mk_xor(contextPtr, a.ptr, b.ptr)));
        }
        function Not(a) {
          if (typeof a === "boolean") {
            a = from(a);
          }
          _assertContext(a);
          if (isProbe(a)) {
            return new ProbeImpl(check(Z3.probe_not(contextPtr, a.ptr)));
          }
          return new BoolImpl(check(Z3.mk_not(contextPtr, a.ptr)));
        }
        function And(...args) {
          if (args.length == 1 && args[0] instanceof ctx.AstVector) {
            args = [...args[0].values()];
            (0, utils_1.assert)((0, utils_1.allSatisfy)(args, isBool) ?? true, "AstVector containing not bools");
          }
          const allProbes = (0, utils_1.allSatisfy)(args, isProbe) ?? false;
          if (allProbes) {
            return _probeNary(Z3.probe_and, args);
          } else {
            const castArgs = args.map(from);
            _assertContext(...castArgs);
            return new BoolImpl(check(Z3.mk_and(contextPtr, castArgs.map((arg) => arg.ptr))));
          }
        }
        function Or(...args) {
          if (args.length == 1 && args[0] instanceof ctx.AstVector) {
            args = [...args[0].values()];
            (0, utils_1.assert)((0, utils_1.allSatisfy)(args, isBool) ?? true, "AstVector containing not bools");
          }
          const allProbes = (0, utils_1.allSatisfy)(args, isProbe) ?? false;
          if (allProbes) {
            return _probeNary(Z3.probe_or, args);
          } else {
            const castArgs = args.map(from);
            _assertContext(...castArgs);
            return new BoolImpl(check(Z3.mk_or(contextPtr, castArgs.map((arg) => arg.ptr))));
          }
        }
        function PbEq(args, coeffs, k) {
          _assertContext(...args);
          if (args.length !== coeffs.length) {
            throw new Error("Number of arguments and coefficients must match");
          }
          return new BoolImpl(check(Z3.mk_pbeq(contextPtr, args.map((arg) => arg.ast), coeffs, k)));
        }
        function PbGe(args, coeffs, k) {
          _assertContext(...args);
          if (args.length !== coeffs.length) {
            throw new Error("Number of arguments and coefficients must match");
          }
          return new BoolImpl(check(Z3.mk_pbge(contextPtr, args.map((arg) => arg.ast), coeffs, k)));
        }
        function PbLe(args, coeffs, k) {
          _assertContext(...args);
          if (args.length !== coeffs.length) {
            throw new Error("Number of arguments and coefficients must match");
          }
          return new BoolImpl(check(Z3.mk_pble(contextPtr, args.map((arg) => arg.ast), coeffs, k)));
        }
        function ForAll(quantifiers, body, weight = 1) {
          if (!(0, utils_1.allSatisfy)(quantifiers, isConst)) {
            throw new Error("Quantifier variables must be constants");
          }
          return new NonLambdaQuantifierImpl(check(Z3.mk_quantifier_const_ex(
            contextPtr,
            true,
            weight,
            _toSymbol(""),
            _toSymbol(""),
            quantifiers.map((q) => q.ptr),
            // The earlier check verifies these are all apps
            [],
            [],
            body.ptr
          )));
        }
        function Exists(quantifiers, body, weight = 1) {
          if (!(0, utils_1.allSatisfy)(quantifiers, isConst)) {
            throw new Error("Quantifier variables must be constants");
          }
          return new NonLambdaQuantifierImpl(check(Z3.mk_quantifier_const_ex(
            contextPtr,
            false,
            weight,
            _toSymbol(""),
            _toSymbol(""),
            quantifiers.map((q) => q.ptr),
            // The earlier check verifies these are all apps
            [],
            [],
            body.ptr
          )));
        }
        function Lambda(quantifiers, expr) {
          if (!(0, utils_1.allSatisfy)(quantifiers, isConst)) {
            throw new Error("Quantifier variables must be constants");
          }
          return new LambdaImpl(check(Z3.mk_lambda_const(contextPtr, quantifiers.map((q) => q.ptr), expr.ptr)));
        }
        function ToReal(expr) {
          expr = from(expr);
          _assertContext(expr);
          (0, utils_1.assert)(isInt(expr), "Int expression expected");
          return new ArithImpl(check(Z3.mk_int2real(contextPtr, expr.ast)));
        }
        function ToInt(expr) {
          if (!isExpr(expr)) {
            expr = Real.val(expr);
          }
          _assertContext(expr);
          (0, utils_1.assert)(isReal(expr), "Real expression expected");
          return new ArithImpl(check(Z3.mk_real2int(contextPtr, expr.ast)));
        }
        function IsInt(expr) {
          if (!isExpr(expr)) {
            expr = Real.val(expr);
          }
          _assertContext(expr);
          (0, utils_1.assert)(isReal(expr), "Real expression expected");
          return new BoolImpl(check(Z3.mk_is_int(contextPtr, expr.ast)));
        }
        function Sqrt(a) {
          if (!isExpr(a)) {
            a = Real.val(a);
          }
          return a.pow("1/2");
        }
        function Cbrt(a) {
          if (!isExpr(a)) {
            a = Real.val(a);
          }
          return a.pow("1/3");
        }
        function BV2Int(a, isSigned) {
          _assertContext(a);
          return new ArithImpl(check(Z3.mk_bv2int(contextPtr, a.ast, isSigned)));
        }
        function Int2BV(a, bits) {
          if (isArith(a)) {
            (0, utils_1.assert)(isInt(a), "parameter must be an integer");
          } else {
            (0, utils_1.assert)(typeof a !== "number" || Number.isSafeInteger(a), "parameter must not have decimal places");
            a = Int.val(a);
          }
          return new BitVecImpl(check(Z3.mk_int2bv(contextPtr, bits, a.ast)));
        }
        function Concat(...bitvecs) {
          _assertContext(...bitvecs);
          return bitvecs.reduce((prev, curr) => new BitVecImpl(check(Z3.mk_concat(contextPtr, prev.ast, curr.ast))));
        }
        function Cond(probe, onTrue, onFalse) {
          _assertContext(probe, onTrue, onFalse);
          return new TacticImpl(check(Z3.tactic_cond(contextPtr, probe.ptr, onTrue.ptr, onFalse.ptr)));
        }
        function LT(a, b) {
          return new BoolImpl(check(Z3.mk_lt(contextPtr, a.ast, a.sort.cast(b).ast)));
        }
        function GT(a, b) {
          return new BoolImpl(check(Z3.mk_gt(contextPtr, a.ast, a.sort.cast(b).ast)));
        }
        function LE(a, b) {
          return new BoolImpl(check(Z3.mk_le(contextPtr, a.ast, a.sort.cast(b).ast)));
        }
        function GE(a, b) {
          return new BoolImpl(check(Z3.mk_ge(contextPtr, a.ast, a.sort.cast(b).ast)));
        }
        function ULT(a, b) {
          return new BoolImpl(check(Z3.mk_bvult(contextPtr, a.ast, a.sort.cast(b).ast)));
        }
        function UGT(a, b) {
          return new BoolImpl(check(Z3.mk_bvugt(contextPtr, a.ast, a.sort.cast(b).ast)));
        }
        function ULE(a, b) {
          return new BoolImpl(check(Z3.mk_bvule(contextPtr, a.ast, a.sort.cast(b).ast)));
        }
        function UGE(a, b) {
          return new BoolImpl(check(Z3.mk_bvuge(contextPtr, a.ast, a.sort.cast(b).ast)));
        }
        function SLT(a, b) {
          return new BoolImpl(check(Z3.mk_bvslt(contextPtr, a.ast, a.sort.cast(b).ast)));
        }
        function SGT(a, b) {
          return new BoolImpl(check(Z3.mk_bvsgt(contextPtr, a.ast, a.sort.cast(b).ast)));
        }
        function SLE(a, b) {
          return new BoolImpl(check(Z3.mk_bvsle(contextPtr, a.ast, a.sort.cast(b).ast)));
        }
        function SGE(a, b) {
          return new BoolImpl(check(Z3.mk_bvsge(contextPtr, a.ast, a.sort.cast(b).ast)));
        }
        function Extract(hi, lo, val) {
          return new BitVecImpl(check(Z3.mk_extract(contextPtr, hi, lo, val.ast)));
        }
        function Select(array, ...indices) {
          const args = indices.map((arg, i) => array.domain_n(i).cast(arg));
          if (args.length === 1) {
            return _toExpr(check(Z3.mk_select(contextPtr, array.ast, args[0].ast)));
          }
          const _args = args.map((arg) => arg.ast);
          return _toExpr(check(Z3.mk_select_n(contextPtr, array.ast, _args)));
        }
        function Store(array, ...indicesAndValue) {
          const args = indicesAndValue.map((arg, i) => {
            if (i === indicesAndValue.length - 1) {
              return array.range().cast(arg);
            }
            return array.domain_n(i).cast(arg);
          });
          if (args.length <= 1) {
            throw new Error("Array store requires both index and value arguments");
          }
          if (args.length === 2) {
            return _toExpr(check(Z3.mk_store(contextPtr, array.ast, args[0].ast, args[1].ast)));
          }
          const _idxs = args.slice(0, args.length - 1).map((arg) => arg.ast);
          return _toExpr(check(Z3.mk_store_n(contextPtr, array.ast, _idxs, args[args.length - 1].ast)));
        }
        function SetUnion(...args) {
          return new SetImpl(check(Z3.mk_set_union(contextPtr, args.map((arg) => arg.ast))));
        }
        function SetIntersect(...args) {
          return new SetImpl(check(Z3.mk_set_intersect(contextPtr, args.map((arg) => arg.ast))));
        }
        function SetDifference(a, b) {
          return new SetImpl(check(Z3.mk_set_difference(contextPtr, a.ast, b.ast)));
        }
        function SetHasSize(set, size) {
          const a = typeof size === "object" ? Int.sort().cast(size) : Int.sort().cast(size);
          return new BoolImpl(check(Z3.mk_set_has_size(contextPtr, set.ast, a.ast)));
        }
        function SetAdd(set, elem) {
          const arg = set.elemSort().cast(elem);
          return new SetImpl(check(Z3.mk_set_add(contextPtr, set.ast, arg.ast)));
        }
        function SetDel(set, elem) {
          const arg = set.elemSort().cast(elem);
          return new SetImpl(check(Z3.mk_set_del(contextPtr, set.ast, arg.ast)));
        }
        function SetComplement(set) {
          return new SetImpl(check(Z3.mk_set_complement(contextPtr, set.ast)));
        }
        function EmptySet(sort) {
          return new SetImpl(check(Z3.mk_empty_set(contextPtr, sort.ptr)));
        }
        function FullSet(sort) {
          return new SetImpl(check(Z3.mk_full_set(contextPtr, sort.ptr)));
        }
        function isMember(elem, set) {
          const arg = set.elemSort().cast(elem);
          return new BoolImpl(check(Z3.mk_set_member(contextPtr, arg.ast, set.ast)));
        }
        function isSubset(a, b) {
          return new BoolImpl(check(Z3.mk_set_subset(contextPtr, a.ast, b.ast)));
        }
        class AstImpl {
          constructor(ptr) {
            this.ptr = ptr;
            this.ctx = ctx;
            const myAst = this.ast;
            Z3.inc_ref(contextPtr, myAst);
            cleanup.register(this, () => Z3.dec_ref(contextPtr, myAst), this);
          }
          get ast() {
            return this.ptr;
          }
          id() {
            return Z3.get_ast_id(contextPtr, this.ast);
          }
          eqIdentity(other) {
            _assertContext(other);
            return check(Z3.is_eq_ast(contextPtr, this.ast, other.ast));
          }
          neqIdentity(other) {
            _assertContext(other);
            return !this.eqIdentity(other);
          }
          sexpr() {
            return Z3.ast_to_string(contextPtr, this.ast);
          }
          hash() {
            return Z3.get_ast_hash(contextPtr, this.ast);
          }
          toString() {
            return this.sexpr();
          }
        }
        class SolverImpl {
          get ptr() {
            _assertPtr(this._ptr);
            return this._ptr;
          }
          constructor(ptr = Z3.mk_solver(contextPtr)) {
            this.ctx = ctx;
            let myPtr;
            if (typeof ptr === "string") {
              myPtr = check(Z3.mk_solver_for_logic(contextPtr, _toSymbol(ptr)));
            } else {
              myPtr = ptr;
            }
            this._ptr = myPtr;
            Z3.solver_inc_ref(contextPtr, myPtr);
            cleanup.register(this, () => Z3.solver_dec_ref(contextPtr, myPtr), this);
          }
          set(key, value) {
            Z3.solver_set_params(contextPtr, this.ptr, _toParams(key, value));
          }
          push() {
            Z3.solver_push(contextPtr, this.ptr);
          }
          pop(num = 1) {
            Z3.solver_pop(contextPtr, this.ptr, num);
          }
          numScopes() {
            return Z3.solver_get_num_scopes(contextPtr, this.ptr);
          }
          reset() {
            Z3.solver_reset(contextPtr, this.ptr);
          }
          add(...exprs) {
            _flattenArgs(exprs).forEach((expr) => {
              _assertContext(expr);
              check(Z3.solver_assert(contextPtr, this.ptr, expr.ast));
            });
          }
          addAndTrack(expr, constant) {
            if (typeof constant === "string") {
              constant = Bool.const(constant);
            }
            (0, utils_1.assert)(isConst(constant), "Provided expression that is not a constant to addAndTrack");
            check(Z3.solver_assert_and_track(contextPtr, this.ptr, expr.ast, constant.ast));
          }
          assertions() {
            return new AstVectorImpl(check(Z3.solver_get_assertions(contextPtr, this.ptr)));
          }
          async check(...exprs) {
            const assumptions = _flattenArgs(exprs).map((expr) => {
              _assertContext(expr);
              return expr.ast;
            });
            const result = await asyncMutex.runExclusive(() => check(Z3.solver_check_assumptions(contextPtr, this.ptr, assumptions)));
            switch (result) {
              case low_level_1.Z3_lbool.Z3_L_FALSE:
                return "unsat";
              case low_level_1.Z3_lbool.Z3_L_TRUE:
                return "sat";
              case low_level_1.Z3_lbool.Z3_L_UNDEF:
                return "unknown";
              default:
                (0, utils_1.assertExhaustive)(result);
            }
          }
          model() {
            return new ModelImpl(check(Z3.solver_get_model(contextPtr, this.ptr)));
          }
          toString() {
            return check(Z3.solver_to_string(contextPtr, this.ptr));
          }
          fromString(s) {
            Z3.solver_from_string(contextPtr, this.ptr, s);
            throwIfError();
          }
          release() {
            Z3.solver_dec_ref(contextPtr, this.ptr);
            this._ptr = null;
            cleanup.unregister(this);
          }
        }
        class OptimizeImpl {
          get ptr() {
            _assertPtr(this._ptr);
            return this._ptr;
          }
          constructor(ptr = Z3.mk_optimize(contextPtr)) {
            this.ctx = ctx;
            let myPtr;
            myPtr = ptr;
            this._ptr = myPtr;
            Z3.optimize_inc_ref(contextPtr, myPtr);
            cleanup.register(this, () => Z3.optimize_dec_ref(contextPtr, myPtr), this);
          }
          set(key, value) {
            Z3.optimize_set_params(contextPtr, this.ptr, _toParams(key, value));
          }
          push() {
            Z3.optimize_push(contextPtr, this.ptr);
          }
          pop() {
            Z3.optimize_pop(contextPtr, this.ptr);
          }
          add(...exprs) {
            _flattenArgs(exprs).forEach((expr) => {
              _assertContext(expr);
              check(Z3.optimize_assert(contextPtr, this.ptr, expr.ast));
            });
          }
          addSoft(expr, weight, id = "") {
            if (isCoercibleRational(weight)) {
              weight = `${weight.numerator}/${weight.denominator}`;
            }
            check(Z3.optimize_assert_soft(contextPtr, this.ptr, expr.ast, weight.toString(), _toSymbol(id)));
          }
          addAndTrack(expr, constant) {
            if (typeof constant === "string") {
              constant = Bool.const(constant);
            }
            (0, utils_1.assert)(isConst(constant), "Provided expression that is not a constant to addAndTrack");
            check(Z3.optimize_assert_and_track(contextPtr, this.ptr, expr.ast, constant.ast));
          }
          assertions() {
            return new AstVectorImpl(check(Z3.optimize_get_assertions(contextPtr, this.ptr)));
          }
          maximize(expr) {
            check(Z3.optimize_maximize(contextPtr, this.ptr, expr.ast));
          }
          minimize(expr) {
            check(Z3.optimize_minimize(contextPtr, this.ptr, expr.ast));
          }
          async check(...exprs) {
            const assumptions = _flattenArgs(exprs).map((expr) => {
              _assertContext(expr);
              return expr.ast;
            });
            const result = await asyncMutex.runExclusive(() => check(Z3.optimize_check(contextPtr, this.ptr, assumptions)));
            switch (result) {
              case low_level_1.Z3_lbool.Z3_L_FALSE:
                return "unsat";
              case low_level_1.Z3_lbool.Z3_L_TRUE:
                return "sat";
              case low_level_1.Z3_lbool.Z3_L_UNDEF:
                return "unknown";
              default:
                (0, utils_1.assertExhaustive)(result);
            }
          }
          model() {
            return new ModelImpl(check(Z3.optimize_get_model(contextPtr, this.ptr)));
          }
          toString() {
            return check(Z3.optimize_to_string(contextPtr, this.ptr));
          }
          fromString(s) {
            Z3.optimize_from_string(contextPtr, this.ptr, s);
            throwIfError();
          }
          release() {
            Z3.optimize_dec_ref(contextPtr, this.ptr);
            this._ptr = null;
            cleanup.unregister(this);
          }
        }
        class ModelImpl {
          get ptr() {
            _assertPtr(this._ptr);
            return this._ptr;
          }
          constructor(ptr = Z3.mk_model(contextPtr)) {
            this.ctx = ctx;
            this._ptr = ptr;
            Z3.model_inc_ref(contextPtr, ptr);
            cleanup.register(this, () => Z3.model_dec_ref(contextPtr, ptr), this);
          }
          length() {
            return Z3.model_get_num_consts(contextPtr, this.ptr) + Z3.model_get_num_funcs(contextPtr, this.ptr);
          }
          [Symbol.iterator]() {
            return this.values();
          }
          *entries() {
            const length = this.length();
            for (let i = 0; i < length; i++) {
              yield [i, this.get(i)];
            }
          }
          *keys() {
            for (const [key] of this.entries()) {
              yield key;
            }
          }
          *values() {
            for (const [, value] of this.entries()) {
              yield value;
            }
          }
          decls() {
            return [...this.values()];
          }
          sexpr() {
            return check(Z3.model_to_string(contextPtr, this.ptr));
          }
          toString() {
            return this.sexpr();
          }
          eval(expr, modelCompletion = false) {
            _assertContext(expr);
            const r = check(Z3.model_eval(contextPtr, this.ptr, expr.ast, modelCompletion));
            if (r === null) {
              throw new types_1.Z3Error("Failed to evaluate expression in the model");
            }
            return _toExpr(r);
          }
          get(i, to) {
            (0, utils_1.assert)(to === void 0 || typeof i === "number");
            if (typeof i === "number") {
              const length = this.length();
              if (i >= length) {
                throw new RangeError(`expected index ${i} to be less than length ${length}`);
              }
              if (to === void 0) {
                const numConsts = check(Z3.model_get_num_consts(contextPtr, this.ptr));
                if (i < numConsts) {
                  return new FuncDeclImpl(check(Z3.model_get_const_decl(contextPtr, this.ptr, i)));
                } else {
                  return new FuncDeclImpl(check(Z3.model_get_func_decl(contextPtr, this.ptr, i - numConsts)));
                }
              }
              if (to < 0) {
                to += length;
              }
              if (to >= length) {
                throw new RangeError(`expected index ${to} to be less than length ${length}`);
              }
              const result = [];
              for (let j = i; j < to; j++) {
                result.push(this.get(j));
              }
              return result;
            } else if (isFuncDecl(i) || isExpr(i) && isConst(i)) {
              const result = this.getInterp(i);
              (0, utils_1.assert)(result !== null);
              return result;
            } else if (isSort(i)) {
              return this.getUniverse(i);
            }
            (0, utils_1.assert)(false, "Number, declaration or constant expected");
          }
          updateValue(decl, a) {
            _assertContext(decl);
            _assertContext(a);
            if (isExpr(decl)) {
              decl = decl.decl();
            }
            if (isFuncDecl(decl) && decl.arity() !== 0 && isFuncInterp(a)) {
              const funcInterp = this.addFuncInterp(decl, a.elseValue());
              for (let i = 0; i < a.numEntries(); i++) {
                const e = a.entry(i);
                const n = e.numArgs();
                const args = commonjsGlobal.Array(n).map((_, i2) => e.argValue(i2));
                funcInterp.addEntry(args, e.value());
              }
              return;
            }
            if (!isFuncDecl(decl) || decl.arity() !== 0) {
              throw new types_1.Z3Error("Expecting 0-ary function or constant expression");
            }
            if (!isAst(a)) {
              throw new types_1.Z3Error("Only func declarations can be assigned to func interpretations");
            }
            check(Z3.add_const_interp(contextPtr, this.ptr, decl.ptr, a.ast));
          }
          addFuncInterp(decl, defaultValue) {
            const fi = check(Z3.add_func_interp(contextPtr, this.ptr, decl.ptr, decl.range().cast(defaultValue).ptr));
            return new FuncInterpImpl(fi);
          }
          getInterp(expr) {
            (0, utils_1.assert)(isFuncDecl(expr) || isConst(expr), "Declaration expected");
            if (isConst(expr)) {
              (0, utils_1.assert)(isExpr(expr));
              expr = expr.decl();
            }
            (0, utils_1.assert)(isFuncDecl(expr));
            if (expr.arity() === 0) {
              const result = check(Z3.model_get_const_interp(contextPtr, this.ptr, expr.ptr));
              if (result === null) {
                return null;
              }
              return _toExpr(result);
            } else {
              const interp = check(Z3.model_get_func_interp(contextPtr, this.ptr, expr.ptr));
              if (interp === null) {
                return null;
              }
              return new FuncInterpImpl(interp);
            }
          }
          getUniverse(sort) {
            _assertContext(sort);
            return new AstVectorImpl(check(Z3.model_get_sort_universe(contextPtr, this.ptr, sort.ptr)));
          }
          release() {
            Z3.model_dec_ref(contextPtr, this.ptr);
            this._ptr = null;
            cleanup.unregister(this);
          }
        }
        class FuncEntryImpl {
          constructor(ptr) {
            this.ptr = ptr;
            this.ctx = ctx;
            Z3.func_entry_inc_ref(contextPtr, ptr);
            cleanup.register(this, () => Z3.func_entry_dec_ref(contextPtr, ptr), this);
          }
          numArgs() {
            return check(Z3.func_entry_get_num_args(contextPtr, this.ptr));
          }
          argValue(i) {
            return _toExpr(check(Z3.func_entry_get_arg(contextPtr, this.ptr, i)));
          }
          value() {
            return _toExpr(check(Z3.func_entry_get_value(contextPtr, this.ptr)));
          }
        }
        class FuncInterpImpl {
          constructor(ptr) {
            this.ptr = ptr;
            this.ctx = ctx;
            Z3.func_interp_inc_ref(contextPtr, ptr);
            cleanup.register(this, () => Z3.func_interp_dec_ref(contextPtr, ptr), this);
          }
          elseValue() {
            return _toExpr(check(Z3.func_interp_get_else(contextPtr, this.ptr)));
          }
          numEntries() {
            return check(Z3.func_interp_get_num_entries(contextPtr, this.ptr));
          }
          arity() {
            return check(Z3.func_interp_get_arity(contextPtr, this.ptr));
          }
          entry(i) {
            return new FuncEntryImpl(check(Z3.func_interp_get_entry(contextPtr, this.ptr, i)));
          }
          addEntry(args, value) {
            const argsVec = new AstVectorImpl();
            for (const arg of args) {
              argsVec.push(arg);
            }
            _assertContext(argsVec);
            _assertContext(value);
            (0, utils_1.assert)(this.arity() === argsVec.length(), "Number of arguments in entry doesn't match function arity");
            check(Z3.func_interp_add_entry(contextPtr, this.ptr, argsVec.ptr, value.ptr));
          }
        }
        class SortImpl extends AstImpl {
          get ast() {
            return Z3.sort_to_ast(contextPtr, this.ptr);
          }
          kind() {
            return Z3.get_sort_kind(contextPtr, this.ptr);
          }
          subsort(other) {
            _assertContext(other);
            return false;
          }
          cast(expr) {
            _assertContext(expr);
            (0, utils_1.assert)(expr.sort.eqIdentity(expr.sort), "Sort mismatch");
            return expr;
          }
          name() {
            return _fromSymbol(Z3.get_sort_name(contextPtr, this.ptr));
          }
          eqIdentity(other) {
            _assertContext(other);
            return check(Z3.is_eq_sort(contextPtr, this.ptr, other.ptr));
          }
          neqIdentity(other) {
            return !this.eqIdentity(other);
          }
        }
        class FuncDeclImpl extends AstImpl {
          get ast() {
            return Z3.func_decl_to_ast(contextPtr, this.ptr);
          }
          name() {
            return _fromSymbol(Z3.get_decl_name(contextPtr, this.ptr));
          }
          arity() {
            return Z3.get_arity(contextPtr, this.ptr);
          }
          domain(i) {
            (0, utils_1.assert)(i < this.arity(), "Index out of bounds");
            return _toSort(Z3.get_domain(contextPtr, this.ptr, i));
          }
          range() {
            return _toSort(Z3.get_range(contextPtr, this.ptr));
          }
          kind() {
            return Z3.get_decl_kind(contextPtr, this.ptr);
          }
          params() {
            const n = Z3.get_decl_num_parameters(contextPtr, this.ptr);
            const result = [];
            for (let i = 0; i < n; i++) {
              const kind = check(Z3.get_decl_parameter_kind(contextPtr, this.ptr, i));
              switch (kind) {
                case low_level_1.Z3_parameter_kind.Z3_PARAMETER_INT:
                  result.push(check(Z3.get_decl_int_parameter(contextPtr, this.ptr, i)));
                  break;
                case low_level_1.Z3_parameter_kind.Z3_PARAMETER_DOUBLE:
                  result.push(check(Z3.get_decl_double_parameter(contextPtr, this.ptr, i)));
                  break;
                case low_level_1.Z3_parameter_kind.Z3_PARAMETER_RATIONAL:
                  result.push(check(Z3.get_decl_rational_parameter(contextPtr, this.ptr, i)));
                  break;
                case low_level_1.Z3_parameter_kind.Z3_PARAMETER_SYMBOL:
                  result.push(_fromSymbol(check(Z3.get_decl_symbol_parameter(contextPtr, this.ptr, i))));
                  break;
                case low_level_1.Z3_parameter_kind.Z3_PARAMETER_SORT:
                  result.push(new SortImpl(check(Z3.get_decl_sort_parameter(contextPtr, this.ptr, i))));
                  break;
                case low_level_1.Z3_parameter_kind.Z3_PARAMETER_AST:
                  result.push(new ExprImpl(check(Z3.get_decl_ast_parameter(contextPtr, this.ptr, i))));
                  break;
                case low_level_1.Z3_parameter_kind.Z3_PARAMETER_FUNC_DECL:
                  result.push(new FuncDeclImpl(check(Z3.get_decl_func_decl_parameter(contextPtr, this.ptr, i))));
                  break;
                case low_level_1.Z3_parameter_kind.Z3_PARAMETER_INTERNAL:
                  break;
                case low_level_1.Z3_parameter_kind.Z3_PARAMETER_ZSTRING:
                  break;
                default:
                  (0, utils_1.assertExhaustive)(kind);
              }
            }
            return result;
          }
          call(...args) {
            (0, utils_1.assert)(args.length === this.arity(), `Incorrect number of arguments to ${this}`);
            return _toExpr(check(Z3.mk_app(contextPtr, this.ptr, args.map((arg, i) => {
              return this.domain(i).cast(arg).ast;
            }))));
          }
        }
        class ExprImpl extends AstImpl {
          get sort() {
            return _toSort(Z3.get_sort(contextPtr, this.ast));
          }
          eq(other) {
            return new BoolImpl(check(Z3.mk_eq(contextPtr, this.ast, from(other).ast)));
          }
          neq(other) {
            return new BoolImpl(check(Z3.mk_distinct(contextPtr, [this, other].map((expr) => from(expr).ast))));
          }
          name() {
            return this.decl().name();
          }
          params() {
            return this.decl().params();
          }
          decl() {
            (0, utils_1.assert)(isApp(this), "Z3 application expected");
            return new FuncDeclImpl(check(Z3.get_app_decl(contextPtr, check(Z3.to_app(contextPtr, this.ast)))));
          }
          numArgs() {
            (0, utils_1.assert)(isApp(this), "Z3 applicaiton expected");
            return check(Z3.get_app_num_args(contextPtr, check(Z3.to_app(contextPtr, this.ast))));
          }
          arg(i) {
            (0, utils_1.assert)(isApp(this), "Z3 applicaiton expected");
            (0, utils_1.assert)(i < this.numArgs(), `Invalid argument index - expected ${i} to be less than ${this.numArgs()}`);
            return _toExpr(check(Z3.get_app_arg(contextPtr, check(Z3.to_app(contextPtr, this.ast)), i)));
          }
          children() {
            const num_args = this.numArgs();
            if (isApp(this)) {
              const result = [];
              for (let i = 0; i < num_args; i++) {
                result.push(this.arg(i));
              }
              return result;
            }
            return [];
          }
        }
        class PatternImpl {
          constructor(ptr) {
            this.ptr = ptr;
            this.ctx = ctx;
          }
        }
        class BoolSortImpl extends SortImpl {
          cast(other) {
            if (typeof other === "boolean") {
              other = Bool.val(other);
            }
            (0, utils_1.assert)(isExpr(other), "true, false or Z3 Boolean expression expected.");
            (0, utils_1.assert)(this.eqIdentity(other.sort), "Value cannot be converted into a Z3 Boolean value");
            return other;
          }
          subsort(other) {
            _assertContext(other.ctx);
            return other instanceof ArithSortImpl;
          }
        }
        class BoolImpl extends ExprImpl {
          not() {
            return Not(this);
          }
          and(other) {
            return And(this, other);
          }
          or(other) {
            return Or(this, other);
          }
          xor(other) {
            return Xor(this, other);
          }
          implies(other) {
            return Implies(this, other);
          }
          iff(other) {
            return Iff(this, other);
          }
        }
        class ProbeImpl {
          constructor(ptr) {
            this.ptr = ptr;
            this.ctx = ctx;
          }
        }
        class TacticImpl {
          constructor(tactic) {
            this.ctx = ctx;
            let myPtr;
            if (typeof tactic === "string") {
              myPtr = check(Z3.mk_tactic(contextPtr, tactic));
            } else {
              myPtr = tactic;
            }
            this.ptr = myPtr;
            Z3.tactic_inc_ref(contextPtr, myPtr);
            cleanup.register(this, () => Z3.tactic_dec_ref(contextPtr, myPtr), this);
          }
        }
        class ArithSortImpl extends SortImpl {
          cast(other) {
            const sortTypeStr = isIntSort(this) ? "IntSort" : "RealSort";
            if (isExpr(other)) {
              const otherS = other.sort;
              if (isArith(other)) {
                if (this.eqIdentity(otherS)) {
                  return other;
                } else if (isIntSort(otherS) && isRealSort(this)) {
                  return ToReal(other);
                }
                (0, utils_1.assert)(false, "Can't cast Real to IntSort without loss");
              } else if (isBool(other)) {
                if (isIntSort(this)) {
                  return If(other, 1, 0);
                } else {
                  return ToReal(If(other, 1, 0));
                }
              }
              (0, utils_1.assert)(false, `Can't cast expression to ${sortTypeStr}`);
            } else {
              if (typeof other !== "boolean") {
                if (isIntSort(this)) {
                  (0, utils_1.assert)(!isCoercibleRational(other), "Can't cast fraction to IntSort");
                  return Int.val(other);
                }
                return Real.val(other);
              }
              (0, utils_1.assert)(false, `Can't cast primitive to ${sortTypeStr}`);
            }
          }
        }
        function Sum(arg0, ...args) {
          if (arg0 instanceof BitVecImpl) {
            if (args.length !== 1) {
              throw new Error("BitVec add only supports 2 arguments");
            }
            return new BitVecImpl(check(Z3.mk_bvadd(contextPtr, arg0.ast, arg0.sort.cast(args[0]).ast)));
          } else {
            (0, utils_1.assert)(arg0 instanceof ArithImpl);
            return new ArithImpl(check(Z3.mk_add(contextPtr, [arg0.ast].concat(args.map((arg) => arg0.sort.cast(arg).ast)))));
          }
        }
        function Sub(arg0, ...args) {
          if (arg0 instanceof BitVecImpl) {
            if (args.length !== 1) {
              throw new Error("BitVec sub only supports 2 arguments");
            }
            return new BitVecImpl(check(Z3.mk_bvsub(contextPtr, arg0.ast, arg0.sort.cast(args[0]).ast)));
          } else {
            (0, utils_1.assert)(arg0 instanceof ArithImpl);
            return new ArithImpl(check(Z3.mk_sub(contextPtr, [arg0.ast].concat(args.map((arg) => arg0.sort.cast(arg).ast)))));
          }
        }
        function Product(arg0, ...args) {
          if (arg0 instanceof BitVecImpl) {
            if (args.length !== 1) {
              throw new Error("BitVec mul only supports 2 arguments");
            }
            return new BitVecImpl(check(Z3.mk_bvmul(contextPtr, arg0.ast, arg0.sort.cast(args[0]).ast)));
          } else {
            (0, utils_1.assert)(arg0 instanceof ArithImpl);
            return new ArithImpl(check(Z3.mk_mul(contextPtr, [arg0.ast].concat(args.map((arg) => arg0.sort.cast(arg).ast)))));
          }
        }
        function Div(arg0, arg1) {
          if (arg0 instanceof BitVecImpl) {
            return new BitVecImpl(check(Z3.mk_bvsdiv(contextPtr, arg0.ast, arg0.sort.cast(arg1).ast)));
          } else {
            (0, utils_1.assert)(arg0 instanceof ArithImpl);
            return new ArithImpl(check(Z3.mk_div(contextPtr, arg0.ast, arg0.sort.cast(arg1).ast)));
          }
        }
        function BUDiv(arg0, arg1) {
          return new BitVecImpl(check(Z3.mk_bvudiv(contextPtr, arg0.ast, arg0.sort.cast(arg1).ast)));
        }
        function Neg(a) {
          if (a instanceof BitVecImpl) {
            return new BitVecImpl(check(Z3.mk_bvneg(contextPtr, a.ast)));
          } else {
            (0, utils_1.assert)(a instanceof ArithImpl);
            return new ArithImpl(check(Z3.mk_unary_minus(contextPtr, a.ast)));
          }
        }
        function Mod(a, b) {
          if (a instanceof BitVecImpl) {
            return new BitVecImpl(check(Z3.mk_bvsrem(contextPtr, a.ast, a.sort.cast(b).ast)));
          } else {
            (0, utils_1.assert)(a instanceof ArithImpl);
            return new ArithImpl(check(Z3.mk_mod(contextPtr, a.ast, a.sort.cast(b).ast)));
          }
        }
        class ArithImpl extends ExprImpl {
          add(other) {
            return Sum(this, other);
          }
          mul(other) {
            return Product(this, other);
          }
          sub(other) {
            return Sub(this, other);
          }
          pow(exponent) {
            return new ArithImpl(check(Z3.mk_power(contextPtr, this.ast, this.sort.cast(exponent).ast)));
          }
          div(other) {
            return Div(this, other);
          }
          mod(other) {
            return Mod(this, other);
          }
          neg() {
            return Neg(this);
          }
          le(other) {
            return LE(this, other);
          }
          lt(other) {
            return LT(this, other);
          }
          gt(other) {
            return GT(this, other);
          }
          ge(other) {
            return GE(this, other);
          }
        }
        class IntNumImpl extends ArithImpl {
          value() {
            return BigInt(this.asString());
          }
          asString() {
            return Z3.get_numeral_string(contextPtr, this.ast);
          }
          asBinary() {
            return Z3.get_numeral_binary_string(contextPtr, this.ast);
          }
        }
        class RatNumImpl extends ArithImpl {
          value() {
            return { numerator: this.numerator().value(), denominator: this.denominator().value() };
          }
          numerator() {
            return new IntNumImpl(Z3.get_numerator(contextPtr, this.ast));
          }
          denominator() {
            return new IntNumImpl(Z3.get_denominator(contextPtr, this.ast));
          }
          asNumber() {
            const { numerator, denominator } = this.value();
            const div = numerator / denominator;
            return Number(div) + Number(numerator - div * denominator) / Number(denominator);
          }
          asDecimal(prec = Number.parseInt(getParam("precision") ?? FALLBACK_PRECISION.toString())) {
            return Z3.get_numeral_decimal_string(contextPtr, this.ast, prec);
          }
          asString() {
            return Z3.get_numeral_string(contextPtr, this.ast);
          }
        }
        class BitVecSortImpl extends SortImpl {
          size() {
            return Z3.get_bv_sort_size(contextPtr, this.ptr);
          }
          subsort(other) {
            return isBitVecSort(other) && this.size() < other.size();
          }
          cast(other) {
            if (isExpr(other)) {
              _assertContext(other);
              return other;
            }
            (0, utils_1.assert)(!isCoercibleRational(other), "Can't convert rational to BitVec");
            return BitVec.val(other, this.size());
          }
        }
        class BitVecImpl extends ExprImpl {
          size() {
            return this.sort.size();
          }
          add(other) {
            return Sum(this, other);
          }
          mul(other) {
            return Product(this, other);
          }
          sub(other) {
            return Sub(this, other);
          }
          sdiv(other) {
            return Div(this, other);
          }
          udiv(other) {
            return BUDiv(this, other);
          }
          smod(other) {
            return Mod(this, other);
          }
          urem(other) {
            return new BitVecImpl(check(Z3.mk_bvurem(contextPtr, this.ast, this.sort.cast(other).ast)));
          }
          srem(other) {
            return new BitVecImpl(check(Z3.mk_bvsrem(contextPtr, this.ast, this.sort.cast(other).ast)));
          }
          neg() {
            return Neg(this);
          }
          or(other) {
            return new BitVecImpl(check(Z3.mk_bvor(contextPtr, this.ast, this.sort.cast(other).ast)));
          }
          and(other) {
            return new BitVecImpl(check(Z3.mk_bvand(contextPtr, this.ast, this.sort.cast(other).ast)));
          }
          nand(other) {
            return new BitVecImpl(check(Z3.mk_bvnand(contextPtr, this.ast, this.sort.cast(other).ast)));
          }
          xor(other) {
            return new BitVecImpl(check(Z3.mk_bvxor(contextPtr, this.ast, this.sort.cast(other).ast)));
          }
          xnor(other) {
            return new BitVecImpl(check(Z3.mk_bvxnor(contextPtr, this.ast, this.sort.cast(other).ast)));
          }
          shr(count) {
            return new BitVecImpl(check(Z3.mk_bvashr(contextPtr, this.ast, this.sort.cast(count).ast)));
          }
          lshr(count) {
            return new BitVecImpl(check(Z3.mk_bvlshr(contextPtr, this.ast, this.sort.cast(count).ast)));
          }
          shl(count) {
            return new BitVecImpl(check(Z3.mk_bvshl(contextPtr, this.ast, this.sort.cast(count).ast)));
          }
          rotateRight(count) {
            return new BitVecImpl(check(Z3.mk_ext_rotate_right(contextPtr, this.ast, this.sort.cast(count).ast)));
          }
          rotateLeft(count) {
            return new BitVecImpl(check(Z3.mk_ext_rotate_left(contextPtr, this.ast, this.sort.cast(count).ast)));
          }
          not() {
            return new BitVecImpl(check(Z3.mk_bvnot(contextPtr, this.ast)));
          }
          extract(high, low) {
            return Extract(high, low, this);
          }
          signExt(count) {
            return new BitVecImpl(check(Z3.mk_sign_ext(contextPtr, count, this.ast)));
          }
          zeroExt(count) {
            return new BitVecImpl(check(Z3.mk_zero_ext(contextPtr, count, this.ast)));
          }
          repeat(count) {
            return new BitVecImpl(check(Z3.mk_repeat(contextPtr, count, this.ast)));
          }
          sle(other) {
            return SLE(this, other);
          }
          ule(other) {
            return ULE(this, other);
          }
          slt(other) {
            return SLT(this, other);
          }
          ult(other) {
            return ULT(this, other);
          }
          sge(other) {
            return SGE(this, other);
          }
          uge(other) {
            return UGE(this, other);
          }
          sgt(other) {
            return SGT(this, other);
          }
          ugt(other) {
            return UGT(this, other);
          }
          redAnd() {
            return new BitVecImpl(check(Z3.mk_bvredand(contextPtr, this.ast)));
          }
          redOr() {
            return new BitVecImpl(check(Z3.mk_bvredor(contextPtr, this.ast)));
          }
          addNoOverflow(other, isSigned) {
            return new BoolImpl(check(Z3.mk_bvadd_no_overflow(contextPtr, this.ast, this.sort.cast(other).ast, isSigned)));
          }
          addNoUnderflow(other) {
            return new BoolImpl(check(Z3.mk_bvadd_no_underflow(contextPtr, this.ast, this.sort.cast(other).ast)));
          }
          subNoOverflow(other) {
            return new BoolImpl(check(Z3.mk_bvsub_no_overflow(contextPtr, this.ast, this.sort.cast(other).ast)));
          }
          subNoUndeflow(other, isSigned) {
            return new BoolImpl(check(Z3.mk_bvsub_no_underflow(contextPtr, this.ast, this.sort.cast(other).ast, isSigned)));
          }
          sdivNoOverflow(other) {
            return new BoolImpl(check(Z3.mk_bvsdiv_no_overflow(contextPtr, this.ast, this.sort.cast(other).ast)));
          }
          mulNoOverflow(other, isSigned) {
            return new BoolImpl(check(Z3.mk_bvmul_no_overflow(contextPtr, this.ast, this.sort.cast(other).ast, isSigned)));
          }
          mulNoUndeflow(other) {
            return new BoolImpl(check(Z3.mk_bvmul_no_underflow(contextPtr, this.ast, this.sort.cast(other).ast)));
          }
          negNoOverflow() {
            return new BoolImpl(check(Z3.mk_bvneg_no_overflow(contextPtr, this.ast)));
          }
        }
        class BitVecNumImpl extends BitVecImpl {
          value() {
            return BigInt(this.asString());
          }
          asSignedValue() {
            let val = this.value();
            const size = BigInt(this.size());
            if (val >= 2n ** (size - 1n)) {
              val = val - 2n ** size;
            }
            if (val < (-2n) ** (size - 1n)) {
              val = val + 2n ** size;
            }
            return val;
          }
          asString() {
            return Z3.get_numeral_string(contextPtr, this.ast);
          }
          asBinaryString() {
            return Z3.get_numeral_binary_string(contextPtr, this.ast);
          }
        }
        class ArraySortImpl extends SortImpl {
          domain() {
            return _toSort(check(Z3.get_array_sort_domain(contextPtr, this.ptr)));
          }
          domain_n(i) {
            return _toSort(check(Z3.get_array_sort_domain_n(contextPtr, this.ptr, i)));
          }
          range() {
            return _toSort(check(Z3.get_array_sort_range(contextPtr, this.ptr)));
          }
        }
        class ArrayImpl extends ExprImpl {
          domain() {
            return this.sort.domain();
          }
          domain_n(i) {
            return this.sort.domain_n(i);
          }
          range() {
            return this.sort.range();
          }
          select(...indices) {
            return Select(this, ...indices);
          }
          store(...indicesAndValue) {
            return Store(this, ...indicesAndValue);
          }
        }
        class SetImpl extends ExprImpl {
          elemSort() {
            return this.sort.domain();
          }
          union(...args) {
            return SetUnion(this, ...args);
          }
          intersect(...args) {
            return SetIntersect(this, ...args);
          }
          diff(b) {
            return SetDifference(this, b);
          }
          hasSize(size) {
            return SetHasSize(this, size);
          }
          add(elem) {
            return SetAdd(this, elem);
          }
          del(elem) {
            return SetDel(this, elem);
          }
          complement() {
            return SetComplement(this);
          }
          contains(elem) {
            return isMember(elem, this);
          }
          subsetOf(b) {
            return isSubset(this, b);
          }
        }
        class DatatypeImpl {
          constructor(ctx2, name2) {
            this.constructors = [];
            this.ctx = ctx2;
            this.name = name2;
          }
          declare(name2, ...fields) {
            this.constructors.push([name2, fields]);
            return this;
          }
          create() {
            const datatypes = createDatatypes(this);
            return datatypes[0];
          }
        }
        class DatatypeSortImpl extends SortImpl {
          numConstructors() {
            return Z3.get_datatype_sort_num_constructors(contextPtr, this.ptr);
          }
          constructorDecl(idx) {
            const ptr = Z3.get_datatype_sort_constructor(contextPtr, this.ptr, idx);
            return new FuncDeclImpl(ptr);
          }
          recognizer(idx) {
            const ptr = Z3.get_datatype_sort_recognizer(contextPtr, this.ptr, idx);
            return new FuncDeclImpl(ptr);
          }
          accessor(constructorIdx, accessorIdx) {
            const ptr = Z3.get_datatype_sort_constructor_accessor(contextPtr, this.ptr, constructorIdx, accessorIdx);
            return new FuncDeclImpl(ptr);
          }
          cast(other) {
            if (isExpr(other)) {
              (0, utils_1.assert)(this.eqIdentity(other.sort), "Value cannot be converted to this datatype");
              return other;
            }
            throw new Error("Cannot coerce value to datatype expression");
          }
          subsort(other) {
            _assertContext(other.ctx);
            return this.eqIdentity(other);
          }
        }
        function createDatatypes(...datatypes) {
          if (datatypes.length === 0) {
            throw new Error("At least one datatype must be provided");
          }
          const dtCtx = datatypes[0].ctx;
          for (const dt of datatypes) {
            if (dt.ctx !== dtCtx) {
              throw new Error("All datatypes must be from the same context");
            }
          }
          const sortNames = datatypes.map((dt) => dt.name);
          const constructorLists = [];
          const scopedConstructors = [];
          try {
            for (const dt of datatypes) {
              const constructors = [];
              for (const [constructorName, fields] of dt.constructors) {
                const fieldNames = [];
                const fieldSorts = [];
                const fieldRefs = [];
                for (const [fieldName, fieldSort] of fields) {
                  fieldNames.push(fieldName);
                  if (fieldSort instanceof DatatypeImpl) {
                    const refIndex = datatypes.indexOf(fieldSort);
                    if (refIndex === -1) {
                      throw new Error(`Referenced datatype "${fieldSort.name}" not found in datatypes being created`);
                    }
                    fieldSorts.push(null);
                    fieldRefs.push(refIndex);
                  } else {
                    fieldSorts.push(fieldSort.ptr);
                    fieldRefs.push(0);
                  }
                }
                const constructor = Z3.mk_constructor(contextPtr, Z3.mk_string_symbol(contextPtr, constructorName), Z3.mk_string_symbol(contextPtr, `is_${constructorName}`), fieldNames.map((name2) => Z3.mk_string_symbol(contextPtr, name2)), fieldSorts, fieldRefs);
                constructors.push(constructor);
                scopedConstructors.push(constructor);
              }
              const constructorList = Z3.mk_constructor_list(contextPtr, constructors);
              constructorLists.push(constructorList);
            }
            const sortSymbols = sortNames.map((name2) => Z3.mk_string_symbol(contextPtr, name2));
            const resultSorts = Z3.mk_datatypes(contextPtr, sortSymbols, constructorLists);
            const results = [];
            for (let i = 0; i < resultSorts.length; i++) {
              const sortImpl = new DatatypeSortImpl(resultSorts[i]);
              const numConstructors = sortImpl.numConstructors();
              for (let j = 0; j < numConstructors; j++) {
                const constructor = sortImpl.constructorDecl(j);
                const recognizer = sortImpl.recognizer(j);
                const constructorName = constructor.name().toString();
                if (constructor.arity() === 0) {
                  sortImpl[constructorName] = constructor.call();
                } else {
                  sortImpl[constructorName] = constructor;
                }
                sortImpl[`is_${constructorName}`] = recognizer;
                for (let k = 0; k < constructor.arity(); k++) {
                  const accessor = sortImpl.accessor(j, k);
                  const accessorName = accessor.name().toString();
                  sortImpl[accessorName] = accessor;
                }
              }
              results.push(sortImpl);
            }
            return results;
          } finally {
            for (const constructor of scopedConstructors) {
              Z3.del_constructor(contextPtr, constructor);
            }
            for (const constructorList of constructorLists) {
              Z3.del_constructor_list(contextPtr, constructorList);
            }
          }
        }
        class QuantifierImpl extends ExprImpl {
          is_forall() {
            return Z3.is_quantifier_forall(contextPtr, this.ast);
          }
          is_exists() {
            return Z3.is_quantifier_exists(contextPtr, this.ast);
          }
          is_lambda() {
            return Z3.is_lambda(contextPtr, this.ast);
          }
          weight() {
            return Z3.get_quantifier_weight(contextPtr, this.ast);
          }
          num_patterns() {
            return Z3.get_quantifier_num_patterns(contextPtr, this.ast);
          }
          pattern(i) {
            return new PatternImpl(check(Z3.get_quantifier_pattern_ast(contextPtr, this.ast, i)));
          }
          num_no_patterns() {
            return Z3.get_quantifier_num_no_patterns(contextPtr, this.ast);
          }
          no_pattern(i) {
            return _toExpr(check(Z3.get_quantifier_no_pattern_ast(contextPtr, this.ast, i)));
          }
          body() {
            return _toExpr(check(Z3.get_quantifier_body(contextPtr, this.ast)));
          }
          num_vars() {
            return Z3.get_quantifier_num_bound(contextPtr, this.ast);
          }
          var_name(i) {
            return _fromSymbol(Z3.get_quantifier_bound_name(contextPtr, this.ast, i));
          }
          var_sort(i) {
            return _toSort(check(Z3.get_quantifier_bound_sort(contextPtr, this.ast, i)));
          }
          children() {
            return [this.body()];
          }
        }
        class NonLambdaQuantifierImpl extends QuantifierImpl {
          not() {
            return Not(this);
          }
          and(other) {
            return And(this, other);
          }
          or(other) {
            return Or(this, other);
          }
          xor(other) {
            return Xor(this, other);
          }
          implies(other) {
            return Implies(this, other);
          }
          iff(other) {
            return Iff(this, other);
          }
        }
        class LambdaImpl extends QuantifierImpl {
          domain() {
            return this.sort.domain();
          }
          domain_n(i) {
            return this.sort.domain_n(i);
          }
          range() {
            return this.sort.range();
          }
          select(...indices) {
            return Select(this, ...indices);
          }
          store(...indicesAndValue) {
            return Store(this, ...indicesAndValue);
          }
        }
        class AstVectorImpl {
          constructor(ptr = Z3.mk_ast_vector(contextPtr)) {
            this.ptr = ptr;
            this.ctx = ctx;
            Z3.ast_vector_inc_ref(contextPtr, ptr);
            cleanup.register(this, () => Z3.ast_vector_dec_ref(contextPtr, ptr), this);
          }
          length() {
            return Z3.ast_vector_size(contextPtr, this.ptr);
          }
          [Symbol.iterator]() {
            return this.values();
          }
          *entries() {
            const length = this.length();
            for (let i = 0; i < length; i++) {
              yield [i, this.get(i)];
            }
          }
          *keys() {
            for (let [key] of this.entries()) {
              yield key;
            }
          }
          *values() {
            for (let [, value] of this.entries()) {
              yield value;
            }
          }
          get(from2, to) {
            const length = this.length();
            if (from2 < 0) {
              from2 += length;
            }
            if (from2 >= length) {
              throw new RangeError(`expected from index ${from2} to be less than length ${length}`);
            }
            if (to === void 0) {
              return _toAst(check(Z3.ast_vector_get(contextPtr, this.ptr, from2)));
            }
            if (to < 0) {
              to += length;
            }
            if (to >= length) {
              throw new RangeError(`expected to index ${to} to be less than length ${length}`);
            }
            const result = [];
            for (let i = from2; i < to; i++) {
              result.push(_toAst(check(Z3.ast_vector_get(contextPtr, this.ptr, i))));
            }
            return result;
          }
          set(i, v) {
            _assertContext(v);
            if (i >= this.length()) {
              throw new RangeError(`expected index ${i} to be less than length ${this.length()}`);
            }
            check(Z3.ast_vector_set(contextPtr, this.ptr, i, v.ast));
          }
          push(v) {
            _assertContext(v);
            check(Z3.ast_vector_push(contextPtr, this.ptr, v.ast));
          }
          resize(size) {
            check(Z3.ast_vector_resize(contextPtr, this.ptr, size));
          }
          has(v) {
            _assertContext(v);
            for (const item of this.values()) {
              if (item.eqIdentity(v)) {
                return true;
              }
            }
            return false;
          }
          sexpr() {
            return check(Z3.ast_vector_to_string(contextPtr, this.ptr));
          }
        }
        class AstMapImpl {
          constructor(ptr = Z3.mk_ast_map(contextPtr)) {
            this.ptr = ptr;
            this.ctx = ctx;
            Z3.ast_map_inc_ref(contextPtr, ptr);
            cleanup.register(this, () => Z3.ast_map_dec_ref(contextPtr, ptr), this);
          }
          [Symbol.iterator]() {
            return this.entries();
          }
          get size() {
            return Z3.ast_map_size(contextPtr, this.ptr);
          }
          *entries() {
            for (const key of this.keys()) {
              yield [key, this.get(key)];
            }
          }
          keys() {
            return new AstVectorImpl(Z3.ast_map_keys(contextPtr, this.ptr));
          }
          *values() {
            for (const [_, value] of this.entries()) {
              yield value;
            }
          }
          get(key) {
            return _toAst(check(Z3.ast_map_find(contextPtr, this.ptr, key.ast)));
          }
          set(key, value) {
            check(Z3.ast_map_insert(contextPtr, this.ptr, key.ast, value.ast));
          }
          delete(key) {
            check(Z3.ast_map_erase(contextPtr, this.ptr, key.ast));
          }
          clear() {
            check(Z3.ast_map_reset(contextPtr, this.ptr));
          }
          has(key) {
            return check(Z3.ast_map_contains(contextPtr, this.ptr, key.ast));
          }
          sexpr() {
            return check(Z3.ast_map_to_string(contextPtr, this.ptr));
          }
        }
        function substitute(t, ...substitutions) {
          _assertContext(t);
          const from2 = [];
          const to = [];
          for (const [f, t2] of substitutions) {
            _assertContext(f);
            _assertContext(t2);
            from2.push(f.ast);
            to.push(t2.ast);
          }
          return _toExpr(check(Z3.substitute(contextPtr, t.ast, from2, to)));
        }
        function ast_from_string(s) {
          const sort_names = [];
          const sorts = [];
          const decl_names = [];
          const decls = [];
          const v = new AstVectorImpl(check(Z3.parse_smtlib2_string(contextPtr, s, sort_names, sorts, decl_names, decls)));
          if (v.length() !== 1) {
            throw new Error("Expected exactly one AST. Instead got " + v.length() + ": " + v.sexpr());
          }
          return v.get(0);
        }
        const ctx = {
          ptr: contextPtr,
          name,
          /////////////
          // Classes //
          /////////////
          Solver: SolverImpl,
          Optimize: OptimizeImpl,
          Model: ModelImpl,
          Tactic: TacticImpl,
          AstVector: AstVectorImpl,
          AstMap: AstMapImpl,
          ///////////////
          // Functions //
          ///////////////
          interrupt,
          isModel,
          isAst,
          isSort,
          isFuncDecl,
          isFuncInterp,
          isApp,
          isConst,
          isExpr,
          isVar,
          isAppOf,
          isBool,
          isTrue,
          isFalse,
          isAnd,
          isOr,
          isImplies,
          isNot,
          isEq,
          isDistinct,
          isQuantifier,
          isArith,
          isArithSort,
          isInt,
          isIntVal,
          isIntSort,
          isReal,
          isRealVal,
          isRealSort,
          isBitVecSort,
          isBitVec,
          isBitVecVal,
          // TODO fix ordering
          isArraySort,
          isArray,
          isConstArray,
          isProbe,
          isTactic,
          isAstVector,
          eqIdentity,
          getVarIndex,
          from,
          solve,
          /////////////
          // Objects //
          /////////////
          Sort,
          Function,
          RecFunc,
          Bool,
          Int,
          Real,
          BitVec,
          Array: Array2,
          Set,
          Datatype,
          ////////////////
          // Operations //
          ////////////////
          If,
          Distinct,
          Const,
          Consts,
          FreshConst,
          Var,
          Implies,
          Iff,
          Eq,
          Xor,
          Not,
          And,
          Or,
          PbEq,
          PbGe,
          PbLe,
          ForAll,
          Exists,
          Lambda,
          ToReal,
          ToInt,
          IsInt,
          Sqrt,
          Cbrt,
          BV2Int,
          Int2BV,
          Concat,
          Cond,
          LT,
          GT,
          LE,
          GE,
          ULT,
          UGT,
          ULE,
          UGE,
          SLT,
          SGT,
          SLE,
          SGE,
          Sum,
          Sub,
          Product,
          Div,
          BUDiv,
          Neg,
          Mod,
          Select,
          Store,
          Extract,
          substitute,
          simplify,
          /////////////
          // Loading //
          /////////////
          ast_from_string,
          SetUnion,
          SetIntersect,
          SetDifference,
          SetHasSize,
          SetAdd,
          SetDel,
          SetComplement,
          EmptySet,
          FullSet,
          isMember,
          isSubset
        };
        cleanup.register(ctx, () => Z3.del_context(contextPtr));
        return ctx;
      }
      return {
        enableTrace,
        disableTrace,
        getVersion,
        getVersionString,
        getFullVersion,
        openLog,
        appendLog,
        getParam,
        setParam,
        resetParams,
        Context: createContext
      };
    }
    return highLevel;
  }
  var hasRequiredHighLevel;
  function requireHighLevel() {
    if (hasRequiredHighLevel) return highLevel$1;
    hasRequiredHighLevel = 1;
    (function(exports2) {
      var __createBinding2 = highLevel$1 && highLevel$1.__createBinding || (Object.create ? (function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
          desc = { enumerable: true, get: function() {
            return m[k];
          } };
        }
        Object.defineProperty(o, k2, desc);
      }) : (function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        o[k2] = m[k];
      }));
      var __exportStar2 = highLevel$1 && highLevel$1.__exportStar || function(m, exports3) {
        for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports3, p)) __createBinding2(exports3, m, p);
      };
      Object.defineProperty(exports2, "__esModule", { value: true });
      __exportStar2(requireHighLevel$1(), exports2);
      __exportStar2(requireTypes(), exports2);
    })(highLevel$1);
    return highLevel$1;
  }
  var hasRequiredBrowser;
  function requireBrowser() {
    if (hasRequiredBrowser) return browser$1;
    hasRequiredBrowser = 1;
    (function(exports2) {
      console.log("momomomomomomomomo");
      var __createBinding2 = browser$1 && browser$1.__createBinding || (Object.create ? (function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
          desc = { enumerable: true, get: function() {
            return m[k];
          } };
        }
        Object.defineProperty(o, k2, desc);
      }) : (function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        o[k2] = m[k];
      }));
      var __exportStar2 = browser$1 && browser$1.__exportStar || function(m, exports3) {
        for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports3, p)) __createBinding2(exports3, m, p);
      };
      Object.defineProperty(exports2, "__esModule", { value: true });
      exports2.init = init;
      const high_level_1 = requireHighLevel();
      const low_level_1 = requireLowLevel();
      __exportStar2(requireTypes(), exports2);
      __exportStar2(requireTypes___GENERATED__(), exports2);
      async function init() {
        const initZ3 = commonjsGlobal.initZ3;
        if (initZ3 === void 0) {
          throw new Error("initZ3 was not imported correctly. Please consult documentation on how to load Z3 in browser");
        }
        const lowLevel2 = await (0, low_level_1.init)(initZ3);
        const highLevel2 = (0, high_level_1.createApi)(lowLevel2.Z3);
        return { ...lowLevel2, ...highLevel2 };
      }
    })(browser$1);
    return browser$1;
  }
  var browserExports = requireBrowser();
  const browser = /* @__PURE__ */ getDefaultExportFromCjs(browserExports);
  const z3 = /* @__PURE__ */ _mergeNamespaces({
    __proto__: null,
    default: browser
  }, [browserExports]);
  class UnsatError extends Error {
    constructor(message) {
      message = message === void 0 ? "Cannot solve state. Unable to make accurate predictions." : message;
      super(message);
      this.name = "UnsatError";
      Object.setPrototypeOf(this, new.target.prototype);
    }
  }
  class InsufficientSequenceLengthError extends Error {
    constructor(message) {
      super(message);
      this.name = "InsufficientSequenceLengthError";
      Object.setPrototypeOf(this, new.target.prototype);
    }
  }
  function uint64(n) {
    return n & 0xffffffffffffffffn;
  }
  class XorShift128Plus {
    // Mimic static class
    constructor() {
    }
    // Modifies symbolicState! Performs XORShift128+ on symbolic state (z3).
    static symbolic(symbolicState) {
      let temp = symbolicState[0];
      temp = temp.xor(temp.shl(23));
      temp = temp.xor(temp.lshr(17));
      temp = temp.xor(symbolicState[1]);
      temp = temp.xor(symbolicState[1].lshr(26));
      symbolicState[0] = symbolicState[1];
      symbolicState[1] = temp;
    }
    static symbolicArithmeticShiftRight(symbolicState) {
      let temp = symbolicState[0];
      temp = temp.xor(temp.shl(23));
      temp = temp.xor(temp.shr(17));
      temp = temp.xor(symbolicState[1]);
      temp = temp.xor(symbolicState[1].shr(26));
      symbolicState[0] = symbolicState[1];
      symbolicState[1] = temp;
    }
    // Modifies `concreteState`! Performs XORShift128+ backwards on concrete state, due to how V8 provides random numbers.
    static concreteBackwards(concreteState) {
      let temp = concreteState[1] ^ concreteState[0] >> 26n ^ concreteState[0];
      temp = uint64(temp ^ temp >> 17n ^ temp >> 34n ^ temp >> 51n);
      temp = uint64(temp ^ temp << 23n ^ temp << 46n);
      concreteState[1] = concreteState[0];
      concreteState[0] = temp;
    }
    // Modifies concreteState.
    static concrete(concreteState) {
      let temp = concreteState[0];
      temp ^= uint64(temp << 23n);
      temp ^= uint64(temp >> 17n);
      temp ^= concreteState[1];
      temp ^= uint64(concreteState[1] >> 26n);
      concreteState[0] = concreteState[1];
      concreteState[1] = temp;
    }
    static concreteArithmeticShiftRight(concreteState) {
      let temp = uint64(concreteState[0]);
      temp ^= uint64(temp << 23n);
      temp ^= this.#arithmeticShiftRight(temp, 17n);
      temp ^= concreteState[1];
      temp ^= this.#arithmeticShiftRight(concreteState[1], 26n);
      concreteState[0] = concreteState[1];
      concreteState[1] = uint64(temp);
    }
    // Arithmetically shift 'x' to the right 'n' amount.
    static #arithmeticShiftRight(x, n) {
      const shifted = uint64(x >> n);
      const signBit = x & 1n << 63n;
      if (signBit === 0n) {
        return shifted;
      }
      const fillMask = (1n << n) - 1n << 64n - n;
      return shifted | fillMask;
    }
  }
  class ChromeRandomnessPredictor {
    // Map a 53-bit integer into the range [0, 1) as a double.
    #SCALING_FACTOR_53_BIT_INT = Math.pow(2, 53);
    #concreteState = [0n, 0n];
    constructor(sequence) {
      this.sequence = sequence;
    }
    async predictNext() {
      if (this.#concreteState[0] === 0n && this.#concreteState[1] === 0n) {
        await this.#solveSymbolicState();
      }
      const next = this.#toDouble(this.#concreteState[0]);
      XorShift128Plus.concreteBackwards(this.#concreteState);
      return next;
    }
    // Solves symbolic state so we can move forward using concrete state, which
    // is much faster than having to compute symbolic state for every prediction.
    async #solveSymbolicState() {
      try {
        const { Context } = await browserExports.init();
        const context = Context("main");
        const solver = new context.Solver();
        const symbolicState0 = context.BitVec.const("ss0", 64);
        const symbolicState1 = context.BitVec.const("ss1", 64);
        const symbolicStatePair = [symbolicState0, symbolicState1];
        const sequence = [...this.sequence].reverse();
        for (const n of sequence) {
          XorShift128Plus.symbolic(symbolicStatePair);
          const mantissa = this.#recoverMantissa(n);
          solver.add(symbolicStatePair[0].lshr(11).eq(context.BitVec.val(mantissa, 64)));
        }
        if (await solver.check() !== "sat") {
          throw new UnsatError();
        }
        const model = solver.model();
        this.#concreteState = [
          // Order matters here!
          model.get(symbolicState0).value(),
          model.get(symbolicState1).value()
        ];
      } catch (e) {
        return Promise.reject(e);
      }
    }
    #recoverMantissa(n) {
      const mantissa = Math.floor(n * this.#SCALING_FACTOR_53_BIT_INT);
      return BigInt(mantissa);
    }
    #toDouble(n) {
      return Number(n >> 11n) / this.#SCALING_FACTOR_53_BIT_INT;
    }
  }
  class FirefoxRandomnessPredictor {
    // The mantissa bits (53 effective bits = 52 stored + 1 implicit) for doubles as defined in IEEE-754
    #IEEE754_MANTISSA_BITS_MASK = 0x1fffffffffffffn;
    // Map a 53-bit integer into the range [0, 1) as a double.
    #SCALING_FACTOR_53_BIT_INT = Math.pow(2, 53);
    #concreteState = [0n, 0n];
    constructor(sequence) {
      this.sequence = sequence;
    }
    async predictNext() {
      if (this.#concreteState[0] === 0n && this.#concreteState[1] === 0n) {
        await this.#solveSymbolicState();
      }
      XorShift128Plus.concrete(this.#concreteState);
      return this.#toDouble(uint64(this.#concreteState[0] + this.#concreteState[1]));
    }
    // Solves symbolic state so we can move forward using concrete state, which
    // is much faster than having to compute symbolic state for every prediction.
    async #solveSymbolicState() {
      try {
        if (typeof window !== "undefined") {
          let m = void 0;
          var Module2 = {
            // @ts-ignore
            locateFile: (path, prefix) => {
              console.log({ step: "locateFile", path, prefix });
              if (path.endsWith(".wasm")) {
                return "https://z3-tawny.vercel.app/z3-built.wasm";
              }
              return prefix + path;
            }
          };
          if (typeof Module2 !== "undefined") {
            m = Module2;
          }
          console.log({ from: "firefoxPredictor", Module: m });
          window.z3 = z3;
        }
        const { Context } = await browserExports.init();
        const context = Context("main");
        const solver = new context.Solver();
        const symbolicState0 = context.BitVec.const("ss0", 64);
        const symbolicState1 = context.BitVec.const("ss1", 64);
        const symbolicStatePair = [symbolicState0, symbolicState1];
        for (const n of this.sequence) {
          XorShift128Plus.symbolic(symbolicStatePair);
          const mantissa = this.#recoverMantissa(n);
          const sum = symbolicStatePair[0].add(symbolicStatePair[1]).and(context.BitVec.val(this.#IEEE754_MANTISSA_BITS_MASK, 64));
          solver.add(sum.eq(context.BitVec.val(mantissa, 64)));
        }
        if (await solver.check() !== "sat") {
          throw new UnsatError();
        }
        const model = solver.model();
        const concreteStatePair = [
          // Order matters here!
          model.get(symbolicState0).value(),
          model.get(symbolicState1).value()
        ];
        for (const _ of this.sequence) {
          XorShift128Plus.concrete(concreteStatePair);
        }
        this.#concreteState = concreteStatePair;
      } catch (e) {
        return Promise.reject(e);
      }
    }
    #recoverMantissa(double) {
      return BigInt(Math.floor(double * this.#SCALING_FACTOR_53_BIT_INT));
    }
    #toDouble(n) {
      return Number(n & this.#IEEE754_MANTISSA_BITS_MASK) / this.#SCALING_FACTOR_53_BIT_INT;
    }
  }
  class SafariRandomnessPredictor {
    #minimumSequenceLength = 6;
    #concreteState = [0n, 0n];
    #symbolicXor;
    #concreteXor;
    // The mantissa bits (53 effective bits = 52 stored + 1 implicit) for doubles as defined in IEEE-754
    #IEEE754_MANTISSA_BITS_MASK = 0x1fffffffffffffn;
    // Map a 53-bit integer into the range [0, 1) as a double.
    #SCALING_FACTOR_53_BIT_INT = Math.pow(2, 53);
    constructor(sequence) {
      if (sequence.length < this.#minimumSequenceLength) {
        throw new InsufficientSequenceLengthError(`sequence length must be >= 6 : got ${sequence.length}`);
      }
      this.#symbolicXor = (s) => XorShift128Plus.symbolicArithmeticShiftRight(s);
      this.#concreteXor = (s) => XorShift128Plus.concreteArithmeticShiftRight(s);
      this.sequence = sequence;
    }
    async predictNext() {
      if (this.#concreteState[0] === 0n && this.#concreteState[1] === 0n) {
        await this.#withRetry(
          () => this.#solveSymbolicState(),
          () => {
            this.#symbolicXor = (s) => XorShift128Plus.symbolic(s);
            this.#concreteXor = (s) => XorShift128Plus.concrete(s);
            return this.#solveSymbolicState();
          }
        );
      }
      this.#concreteXor(this.#concreteState);
      return this.#toDouble(uint64(this.#concreteState[0] + this.#concreteState[1]));
    }
    async #withRetry(baseFn, retryFn) {
      try {
        return await baseFn();
      } catch (_e) {
        return await retryFn();
      }
    }
    async #solveSymbolicState() {
      try {
        const { Context } = await browserExports.init();
        const context = Context("main");
        const solver = new context.Solver();
        const symbolicState0 = context.BitVec.const("ss0", 64);
        const symbolicState1 = context.BitVec.const("ss1", 64);
        const symbolicState = [symbolicState0, symbolicState1];
        for (const n of this.sequence) {
          this.#symbolicXor(symbolicState);
          const mantissa = this.#recoverMantissa(n);
          const sum = symbolicState[0].add(symbolicState[1]).and(context.BitVec.val(this.#IEEE754_MANTISSA_BITS_MASK, 64));
          solver.add(sum.eq(context.BitVec.val(mantissa, 64)));
        }
        if (await solver.check() !== "sat") {
          throw new UnsatError();
        }
        const model = solver.model();
        const concreteStatePair = [
          // Order matters here!
          model.get(symbolicState0).value(),
          model.get(symbolicState1).value()
        ];
        for (const _ of this.sequence) {
          this.#concreteXor(concreteStatePair);
        }
        this.#concreteState = concreteStatePair;
      } catch (e) {
        return Promise.reject(e);
      }
    }
    #recoverMantissa(n) {
      return BigInt(Math.floor(n * this.#SCALING_FACTOR_53_BIT_INT));
    }
    #toDouble(n) {
      return Number(n & this.#IEEE754_MANTISSA_BITS_MASK) / this.#SCALING_FACTOR_53_BIT_INT;
    }
  }
  const JSRandomnessPredictor = {
    firefox: (sequence) => new FirefoxRandomnessPredictor(sequence),
    chrome: (sequence) => new ChromeRandomnessPredictor(sequence),
    safari: (sequence) => new SafariRandomnessPredictor(sequence)
  };
  const { firefox, safari, chrome } = JSRandomnessPredictor;
  console.log({ from: "js-randomness-predictor.js", Module: typeof Module === "undefined" ? "undefined" : Module });
  var Module = {
    locateFile: (path, prefix) => {
      console.log({ step: "locateFile", path, prefix });
      if (path.endsWith(".wasm")) {
        return "https://z3-tawny.vercel.app/z3-built.wasm";
      }
      return prefix + path;
    }
  };
  console.log({ from: "js-randomness-predictor.js", Module: typeof Module === "undefined" ? "undefined" : Module });
  const index = {
    firefox,
    safari,
    chrome,
    init: async () => {
      window.Buffer = bufferExports.Buffer;
    }
  };
  return index;
}));
