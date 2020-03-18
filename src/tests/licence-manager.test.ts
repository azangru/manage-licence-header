import fs from 'fs';
import path from 'path';

import { addLicence, removeLicence, replaceLicence } from '../licence-manager';
import configs from '../config';

const licenceText = fs
  .readFileSync(path.resolve(__dirname, 'fixtures/lorem-ipsum.txt'), 'utf-8')
  .trim();
const newLicenceText = fs
  .readFileSync(path.resolve(__dirname, 'fixtures/zombie-ipsum.txt'), 'utf-8')
  .trim();
const sampleSourceFile = fs
  .readFileSync(path.resolve(__dirname, 'fixtures/example.js'), 'utf-8')
  .trim();

describe('licence-manager', () => {

  const config = configs.js;

  describe('addLicence', () => {
    it('adds licence to the head of the file', () => {
      expect(addLicence(sampleSourceFile, licenceText, config)).toMatchSnapshot();
    });

    it('does not modify file already containing licence', () => {
      const fileWithLicence = addLicence(sampleSourceFile, licenceText, config);
      expect(addLicence(fileWithLicence, licenceText, config)).toMatchSnapshot();
    });
  });

  describe('removeLicence', () => {
    it('removes licence from the head of the file', () => {
      const fileWithLicence = addLicence(sampleSourceFile, licenceText, config);
      expect(removeLicence(fileWithLicence, licenceText, config)).toBe(sampleSourceFile);
    });
  });

  describe('replaceLicence', () => {
    it('replaces old licence with the new one', () => {
      const fileWithLicence = addLicence(sampleSourceFile, licenceText, config);
      expect(replaceLicence(fileWithLicence, licenceText, newLicenceText, config)).toMatchSnapshot();
    });
  });


});
