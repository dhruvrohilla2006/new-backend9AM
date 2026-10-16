import { create } from 'zustand'

const counterStore = create((set) => ({
  count: 1,
  inc: () => set((state) => ({ count: state.count + 1 })),
}))


const userStore = create((set)=>({
    name:"",
    age:"",
    std:"",
    setDetails:(name,std)=> set(()=>({name:name,std:std}))
}))

export default counterStore