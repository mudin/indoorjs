/* global describe, it, before */

import chai from 'chai';
import { fabric } from 'fabric';
import { Map, Marker } from '../lib/indoor.js';

window.fabric = fabric;

chai.expect();

const expect = chai.expect;

let lib;

describe('Given an instance of my Cat library', () => {
  before(() => {
    lib = new Map();
  });
  describe('when I need the name', () => {
    it('should return the name', () => {
      expect(lib).to.have.property('canvas');
    });
  });
});

describe('Given an instance of my Dog library', () => {
  before(() => {
    lib = new Marker();
  });
  describe('when I need the name', () => {
    it('should return the name', () => {
      expect(lib.class).to.be.equal('marker');
    });
  });
});
