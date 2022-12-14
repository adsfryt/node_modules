/*************************************************************
 *
 *  Copyright (c) 2020-2022 The MathJax Consortium
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */


/**
 * @fileoverview  The TextParser class for the textmacros package
 *
 * @author dpvc@mathjax.org (Davide P. Cervone)
 */

import TexParser from '../TexParser.js';
import TexError from '../TexError.js';
import ParseOptions from '../ParseOptions.js';
import ParseUtil from '../ParseUtil.js';
import {StackItem} from '../StackItem.js';
import {MmlNode, AbstractMmlNode} from '../../../core/MmlTree/MmlNode.js';
import {EnvList} from '../StackItem.js';
import NodeUtil from '../NodeUtil.js';
import {StopItem, StyleItem} from '../base/BaseItems.js';

/**
 * Subclass of the TexParser but for handling text-mode material
 */
export class TextParser extends TexParser {

  /**
   * The accumulated text material to go into an mtext element
   */
  public text: string;

  /**
   * Saved stack environments for processing braces
   */
  public envStack: EnvList[];

  /**
   * The scriptlevel of this text-mode material
   */
  public level: number | string | undefined;

  /**
   * The accumulated MmlNodes generated by parsing the text-mode material
   */
  protected nodes: MmlNode[];

  /**
   * Short-hand for obtaining the saved TexParser
   */
  public get texParser() {
    return this.configuration.packageData.get('textmacros').texParser;
  }

  /**
   * @override
   */
  public get tags() {
    return this.texParser.tags;
  }

  /**
   * @override
   * @constructor
   */
  constructor(text: string, env: EnvList, configuration: ParseOptions, level?: number | string) {
    super(text, env, configuration);
    this.level = level;
  }

  /**
   * Make sure we only return one element (wrap multiple ones in an mrow or mstyle, as needed).
   *
   * @override
   */
  public mml() {
    return (this.level != null ?
            this.create('node', 'mstyle', this.nodes, {displaystyle: false, scriptlevel: this.level}) :
            this.nodes.length === 1 ? this.nodes[0] : this.create('node', 'mrow', this.nodes));
  }

  /**
   * @override
   */
  public Parse() {
    this.text = '';
    this.nodes = [];
    this.envStack = [];
    super.Parse();
  }

  /**
   * Creates an mtext element for the saved text and pushes that onto the node list
   */
  public saveText() {
    if (this.text) {
      const mathvariant = this.stack.env.mathvariant;
      const text = ParseUtil.internalText(this, this.text, mathvariant ? {mathvariant} : {});
      this.text = '';
      this.Push(text);
    }
  }

  /**
   * @override
   */
  public Push(mml: MmlNode | StackItem) {
    if (this.text) {
      this.saveText();
    }
    if (mml instanceof StopItem) {
      return super.Push(mml);
    }
    if (mml instanceof StyleItem) {
      this.stack.env.mathcolor = this.stack.env.color;
      return;
    }
    if (mml instanceof AbstractMmlNode) {
      this.addAttributes(mml);
      this.nodes.push(mml);
    }
  }

  /**
   * Push some math into the node list, adding mathsize and mathcolor
   *   if specified in the environment.
   *
   * @param {MmlNode} mml   The math nodes to push
   */
  public PushMath(mml: MmlNode) {
    const env = this.stack.env;
    if (!mml.isKind('TeXAtom')) {
      mml = this.create('node', 'TeXAtom', [mml]);  // make sure the math is an ORD
    }
    for (const name of ['mathsize', 'mathcolor']) {
      if (env[name] && !mml.attributes.getExplicit(name)) {
        if (!mml.isToken && !mml.isKind('mstyle')) {
          mml = this.create('node', 'mstyle', [mml]);
        }
        NodeUtil.setAttribute(mml, name, env[name]);
      }
    }
    if (mml.isInferred) {
      mml = this.create('node', 'mrow', mml.childNodes);
    }
    this.nodes.push(mml);
  }

  /**
   * Add mathsize, mathcolor, and mathvariant to token nodes,
   *   if they are specified in the environment
   *
   * @param {MmlNode} mml   The node to adjust
   */
  public addAttributes(mml: MmlNode) {
    const env = this.stack.env;
    if (!mml.isToken) return;
    for (const name of ['mathsize', 'mathcolor', 'mathvariant']) {
      if (env[name] && !mml.attributes.getExplicit(name)) {
        NodeUtil.setAttribute(mml, name, env[name]);
      }
    }
  }

  /**
   * Process the argument as text with the given environment settings
   *
   * @param {string} name   The macro that is calling for a parameter
   * @param {EnvList} env   The environment to use
   */
  public ParseTextArg(name: string, env: EnvList) {
    const text = this.GetArgument(name);
    env = Object.assign(Object.assign({}, this.stack.env), env);
    return (new TextParser(text, env, this.configuration)).mml();
  }

  /**
   * Process an argument as text rather than math
   *
   * @override
   */
  public ParseArg(name: string) {
    return (new TextParser(this.GetArgument(name), this.stack.env, this.configuration)).mml();
  }

  /**
   * Throw an error
   *
   * @param {string} id        The id for the message string
   * @param {string} message   The English version of the message
   * @param {string[]} args    Any substitution args for the message
   */
  public Error(id: string, message: string, ...args: string[]) {
    throw new TexError(id, message, ...args);
  }

}
