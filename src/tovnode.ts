import vnode, {VNode} from './vnode';
import htmlDomApi, {DOMAPI} from './htmldomapi';
import * as ipRegex from 'ip-regex';
import {injectIP} from './injectIP';

// extend toVNode functon with extra parameter, if ip is true => scan for ip addresses 
export function toVNode(node: Node, domApi?: DOMAPI, ipFilter = false): VNode {
  const api: DOMAPI = domApi !== undefined ? domApi : htmlDomApi;
  let text: string;
  if (api.isElement(node)) {
    const id = node.id ? '#' + node.id : '';
    const cn = node.getAttribute('class');
    const c = cn ? '.' + cn.split(' ').join('.') : '';
    const sel = api.tagName(node).toLowerCase() + id + c;
    const attrs: any = {};
    const children: Array<VNode> = [];
    let name: string;
    let i: number, n: number;
    const elmAttrs = node.attributes;
    const elmChildren = node.childNodes;
    for (i = 0, n = elmAttrs.length; i < n; i++) {
      name = elmAttrs[i].nodeName;
      if (name !== 'id' && name !== 'class') {
        attrs[name] = elmAttrs[i].nodeValue;
      }
    }
    for (i = 0, n = elmChildren.length; i < n; i++) {
      children.push(toVNode(elmChildren[i], domApi, ipFilter));
    }
    return vnode(sel, {attrs}, children, undefined, node);
  } else if (api.isText(node)) {
    text = api.getTextContent(node) as string;
    //check if ip scan is needed 
    if ( ipFilter && ipRegex().test(text)) {
      return injectIP(text, node);
    }
    return vnode(undefined, undefined, undefined, text, node);
  } else if (api.isComment(node)) {
    text = api.getTextContent(node) as string;
    return vnode('!', {}, [], text, node as any);
  } else {
    return vnode('', {}, [], undefined, node as any);
  }
}

export default toVNode;