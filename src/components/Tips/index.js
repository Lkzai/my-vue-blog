import TipsComponent from './Tips'

const Tips = {};

// 注册Tips
Tips.install = function (Vue) {
    // 生成一个Vue的子类
    // 同时这个子类也就是组件
    const TipsConstructor = Vue.extend(TipsComponent)
    // 生成一个该子类的实例
    const instance = new TipsConstructor();

    // 将这个实例挂载在我创建的div上
    // 并将此div加入全局挂载点内部
    instance.$mount(document.createElement('div'))
    document.body.appendChild(instance.$el)

    // 通过Vue的原型注册一个方法
    // 让所有实例共享这个方法 
    Vue.prototype.$tips = (msg, type, duration) => {
        instance.message = msg;
        instance.type = type;
        instance.visible = true;
        clearTimeout(window.timer);
        if(duration) {
            window.timer = setTimeout(() => {
                instance.visible = false;
            }, duration);
        }
    }
}

export default Tips