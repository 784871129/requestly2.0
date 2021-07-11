import { useState } from 'react';
import axios from 'axios';
function debounce(func,delay){
    let timer=null;
    return function(){
        if(timer) clearTimeout(timer);
        timer=setTimeout(func,delay);
    }
}
function useRule(){
    //无需初始化的state
    const INITIAL_STATE={
        name:'',
        des:'',
        items:
        [
        {
            index:0,
            header:'',
            value:'',
            url:'',
        }]
    }
    const [rule,setRule]=useState(INITIAL_STATE);
    //根据id初始化state
    const getRule=(_id)=>{
        axios.get('https://qcwdoj.fn.thelarkcloud.com/getRule',{
            params:
            {
                _id:_id
            }
        })
        .then((res)=>{
                const items=res.data[0].items.map((item)=>{item.index=item.header;return item})    
                setRule(()=>{return {
                name:res.data[0].name,
                des:res.data[0].des,
                items:items
            }})
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    //根据输入更新rule
    const updateItemsofRule=(item)=>{
        debounce(setRule((rule)=>{
            const po=rule.items.findIndex((prev_item)=>{return prev_item.index===item.index});            
            rule.items[po]=item;
            return {
                name:rule.name,
                des:rule.des,
                items:rule.items
            }
        }),1000)

    }   
    //更新到已有Rule
    const updateRule=(name,des,_id)=>{
        const data={
            name:name,
            des:des,
            items:rule.items
        }
        
        let postdata=JSON.stringify(data,(key,value)=>{if(key === 'index')return undefined;return value})
        console.log(postdata);
        axios.post('https://qcwdoj.fn.thelarkcloud.com/updateRule',postdata,{headers:{'Content-Type':'application/json'},params:{id:_id}})
        .then(
            alert('修改成功！')
        )
        .catch((err)=>{console.log(err)});
    }
    //提交新Rule
    const createRule=(name,des)=>{
        const data={
            name:name,
            des:des,
            items:rule.items
        }
        let postdata=JSON.stringify(data,(key,value)=>{if(key === 'index')return undefined;return value}) 
        console.log('创建:',postdata,des);
        axios.post('https://qcwdoj.fn.thelarkcloud.com/createRule',postdata,{headers:{'Content-Type':'application/json'}})
        .then(
            alert('新建成功！')
        )
        .catch((err)=>{console.log(err)});
    }
    const deleteRule=async (_id)=>{
        await axios.get('https://qcwdoj.fn.thelarkcloud.com/deleteRule',{
            params:
            {
                _id:_id
            }
        })
        .then((res)=>{
            console.log('成功删除：_id=',res._id);
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    return [
    {
        rule
    },
    {
        setRule,
        createRule,
        updateRule,
        updateItemsofRule,
        getRule,
        deleteRule
    }]
}
export default useRule;