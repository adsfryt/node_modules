import {combineWithMathJax} from '../../../../../../../js/components/global.js';
import {VERSION} from '../../../../../../../js/components/version.js';

import * as module1 from '../../../../../../../js/input/tex/colortbl/ColortblConfiguration.js';

if (MathJax.loader) {
  MathJax.loader.checkVersion('[tex]/colortbl', VERSION, 'tex-extension');
}

combineWithMathJax({_: {
  input: {
    tex: {
      colortbl: {
        ColortblConfiguration: module1
      }
    }
  }
}});
