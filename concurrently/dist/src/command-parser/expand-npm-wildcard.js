"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpandNpmWildcard = void 0;
const fs_1 = __importDefault(require("fs"));
const lodash_1 = __importDefault(require("lodash"));
const OMISSION = /\(!([^)]+)\)/;
/**
 * Finds wildcards in npm/yarn/pnpm run commands and replaces them with all matching scripts in the
 * `package.json` file of the current directory.
 */
class ExpandNpmWildcard {
    constructor(readPackage = ExpandNpmWildcard.readPackage) {
        this.readPackage = readPackage;
    }
    static readPackage() {
        try {
            const json = fs_1.default.readFileSync('package.json', { encoding: 'utf-8' });
            return JSON.parse(json);
        }
        catch (e) {
            return {};
        }
    }
    parse(commandInfo) {
        const [, npmCmd, cmdName, args] = commandInfo.command.match(/(npm|yarn|pnpm) run (\S+)([^&]*)/) || [];
        const wildcardPosition = (cmdName || '').indexOf('*');
        // If the regex didn't match an npm script, or it has no wildcard,
        // then we have nothing to do here
        if (!cmdName || wildcardPosition === -1) {
            return commandInfo;
        }
        if (!this.scripts) {
            this.scripts = Object.keys(this.readPackage().scripts || {});
        }
        const omissionRegex = cmdName.match(OMISSION);
        const cmdNameSansOmission = cmdName.replace(OMISSION, '');
        const preWildcard = lodash_1.default.escapeRegExp(cmdNameSansOmission.slice(0, wildcardPosition));
        const postWildcard = lodash_1.default.escapeRegExp(cmdNameSansOmission.slice(wildcardPosition + 1));
        const wildcardRegex = new RegExp(`^${preWildcard}(.*?)${postWildcard}$`);
        const currentName = commandInfo.name || '';
        return this.scripts
            .map(script => {
            const match = script.match(wildcardRegex);
            if (omissionRegex) {
                const toOmit = script.match(new RegExp(omissionRegex[1]));
                if (toOmit) {
                    return;
                }
            }
            if (match) {
                return {
                    ...commandInfo,
                    command: `${npmCmd} run ${script}${args}`,
                    // Will use an empty command name if command has no name and the wildcard match is empty,
                    // e.g. if `npm:watch-*` matches `npm run watch-`.
                    name: currentName + match[1],
                };
            }
        })
            .filter((commandInfo) => !!commandInfo);
    }
}
exports.ExpandNpmWildcard = ExpandNpmWildcard;
