import vnode, {VNode} from "./vnode";

export const injectIP = (text: string, node: Node): VNode => {
  return vnode(undefined, undefined, undefined, "###.###.###.###", node as any);
};
