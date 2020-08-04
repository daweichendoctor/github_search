// 懒加载
import baseLoadable from '@loadable/component';

const loadable = (fn: () => Promise<any>) => baseLoadable(fn);

export default loadable