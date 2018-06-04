/*
 * decaffeinate suggestions:
 * DS101: Remove unnecessary use of Array.from
 * DS102: Remove unnecessary code created because of implicit returns
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
// The default `.` adapter thats comes with Rivets.js. Allows subscribing to
// properties on plain objects, implemented in ES5 natives using
// `Object.defineProperty`.
Rivets.public.adapters['.'] = {
  id: '_rv',
  counter: 0,
  weakmap: {},

  weakReference(obj) {
    let id;
    if (!obj.hasOwnProperty(this.id)) {
      id = this.counter++;
      Object.defineProperty(obj, this.id, {value: id});
    }

    return this.weakmap[obj[this.id]] || (this.weakmap[obj[this.id]] = {callbacks: {}});
  },

  cleanupWeakReference(ref, id) {
    if (!Object.keys(ref.callbacks).length) {
      if (!ref.pointers || !Object.keys(ref.pointers).length) {
        return delete this.weakmap[id];
      }
    }
  },

  stubFunction(obj, fn) {
    const original = obj[fn];
    const map = this.weakReference(obj);
    const { weakmap } = this;

    return obj[fn] = function() {
      const response = original.apply(obj, arguments);

      for (let r in map.pointers) {
        const k = map.pointers[r];
        for (let callback of Array.from((weakmap[r] != null ? weakmap[r].callbacks[k] : undefined) != null ? (weakmap[r] != null ? weakmap[r].callbacks[k] : undefined) : [])) { callback(); }
      }

      return response;
    };
  },

  observeMutations(obj, ref, keypath) {
    if (Array.isArray(obj)) {
      const map = this.weakReference(obj);

      if (map.pointers == null) {
        map.pointers = {};
        const functions = ['push', 'pop', 'shift', 'unshift', 'sort', 'reverse', 'splice'];
        for (let fn of Array.from(functions)) { this.stubFunction(obj, fn); }
      }

      if (map.pointers[ref] == null) { map.pointers[ref] = []; }

      if (!Array.from(map.pointers[ref]).includes(keypath)) {
        return map.pointers[ref].push(keypath);
      }
    }
  },

  unobserveMutations(obj, ref, keypath) {
    if (Array.isArray(obj) && (obj[this.id] != null)) {
      let map;
      if (map = this.weakmap[obj[this.id]]) {
        let pointers;
        if (pointers = map.pointers[ref]) {
          let idx;
          if ((idx = pointers.indexOf(keypath)) >= 0) {
            pointers.splice(idx, 1);
          }

          if (!pointers.length) { delete map.pointers[ref]; }
          return this.cleanupWeakReference(map, obj[this.id]);
        }
      }
    }
  },

  observe(obj, keypath, callback) {
    let { callbacks } = this.weakReference(obj);

    if (callbacks[keypath] == null) {
      callbacks[keypath] = [];
      const desc = Object.getOwnPropertyDescriptor(obj, keypath);

      if (!(desc != null ? desc.get : undefined) && !(desc != null ? desc.set : undefined)) {
        let value = obj[keypath];

        Object.defineProperty(obj, keypath, {
          enumerable: true,
          get() { return value; },
          set: newValue => {
            if (newValue !== value) {
              let map;
              this.unobserveMutations(value, obj[this.id], keypath);
              value = newValue;

              if (map = this.weakmap[obj[this.id]]) {
                ({ callbacks } = map);

                if (callbacks[keypath]) {
                  for (let cb of Array.from(callbacks[keypath].slice())) { if (Array.from(callbacks[keypath]).includes(cb)) { cb(); } }
                }
                return this.observeMutations(newValue, obj[this.id], keypath);
              }
            }
          }
        }
        );
      }
    }

    if (!Array.from(callbacks[keypath]).includes(callback)) {
      callbacks[keypath].push(callback);
    }

    return this.observeMutations(obj[keypath], obj[this.id], keypath);
  },

  unobserve(obj, keypath, callback) {
    let map;
    if (map = this.weakmap[obj[this.id]]) {
      let callbacks;
      if (callbacks = map.callbacks[keypath]) {
        let idx;
        if ((idx = callbacks.indexOf(callback)) >= 0) {
          callbacks.splice(idx, 1);

          if (!callbacks.length) {
            delete map.callbacks[keypath];
            this.unobserveMutations(obj[keypath], obj[this.id], keypath);
          }
        }

        return this.cleanupWeakReference(map, obj[this.id]);
      }
    }
  },

  get(obj, keypath) {
    return obj[keypath];
  },

  set(obj, keypath, value) {
    return obj[keypath] = value;
  }
};
