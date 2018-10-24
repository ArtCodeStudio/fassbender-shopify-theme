import { shopifyExtension } from '../tinybind';
import Debug from 'debug';
import { Utils, getJSON } from './Utils';
import jQuery from '../jquery';

// TODO move to the-developer-app modul
export class TheDeveloperAppService {
  public static baseUrl = 'https://next.artandcode.studio'; // 'https://the-developer-app.artandcode.studio';
  public static instance?: TheDeveloperAppService;

  constructor() {
    if (TheDeveloperAppService.instance) {
      return TheDeveloperAppService.instance;
    }
    TheDeveloperAppService.instance = this;
  }
}