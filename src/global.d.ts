declare global {
    interface EventMap {
        'update:modelValue': (pluginId: string, id: string, data: any) => void
    }
    interface EmitMap {
        'update:modelValue': {
            pluginId: string
            id: string
            data: any
        }
    }

    type EventCallback<T = any> = (...args: T[]) => void
    type AllEventCallback = (event: string, ...args: any[]) => void

    interface EventBus {
        /** 监听指定事件 */
        $on<K extends keyof EventMap>(event: K, fn: EventMap[K]): EventBus

        /** 监听所有事件 */
        $onAll(fn: AllEventCallback): EventBus

        /** 监听指定事件一次 */
        $once<K extends keyof EventMap>(event: K, fn: EventMap[K]): void

        /** 取消监听指定事件 */
        $off<K extends keyof EventMap>(event: K, fn: EventMap[K]): EventBus

        /** 取消监听所有事件 */
        $offAll(fn: AllEventCallback): EventBus

        /** 触发指定事件 */
        $emit<K extends keyof EventMap>(event: K, ...args: Parameters<EventMap[K]>): EventBus

        /** 清空所有事件监听 */
        $clear(): EventBus
    }
    interface Window {
        /**
         * 是否存在无界
         */
        __POWERED_BY_WUJIE__?: boolean
        /**
         * 子应用公共加载路径
         */
        __WUJIE_PUBLIC_PATH__: string
        /**
         * 原生的querySelector
         */
        __WUJIE_RAW_DOCUMENT_QUERY_SELECTOR__: typeof Document.prototype.querySelector
        /**
         * 原生的querySelectorAll
         */
        __WUJIE_RAW_DOCUMENT_QUERY_SELECTOR_ALL__: typeof Document.prototype.querySelectorAll
        /**
         * 原生的window对象
         */
        __WUJIE_RAW_WINDOW__: Window
        /**
         * 子应用沙盒实例，用户不应该使用
         */
        __WUJIE: any
        /**
         * 子应用mount函数
         */
        __WUJIE_MOUNT: () => void
        /**
         * 子应用unmount函数
         */
        __WUJIE_UNMOUNT: () => void
        /**
         * 注入对象
         */
        $wujie: {
            bus: (typeof import('wujie'))['bus'],
            shadowRoot?: ShadowRoot
            props?: { [key: string]: any }
            location?: Object
        }
    }
}

export { }
