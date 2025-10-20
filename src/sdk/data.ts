/* eslint-disable @typescript-eslint/no-explicit-any */
import { reactive,watch} from "vue";




const data=reactive<any>(window.$wujie?.props?.modelValue??{})

watch(data, (newVal: any) => {
  window.$wujie.bus.$emit('update:modelValue', {
    pluginId: window.$wujie?.props?.pluginId,
    id: window.$wujie?.props?.editIndex,
    data: newVal
  })
})

export default function useData(){
  
    return data
}

