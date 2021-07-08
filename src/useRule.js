import { useState } from 'react';
import axios from 'axios';

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
    const getRule=async (_id)=>{
        await axios.get('https://qcwdoj.fn.thelarkcloud.com/getRule',{
            params:
            {
                _id:_id
            }
        })
        .then((res)=>{
            console.log('huoqu',res.data[0]);        
            setRule(()=>{return {
                name:res.data[0].name,
                des:res.data[0].des,
                items:res.data[0].items 
            }})
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    //根据输入更新rule
    const updateItemsofRule=(item)=>{
        setRule((rule)=>{
            const po=rule.items.findIndex((prev_item)=>{return prev_item.index===item.index});            rule.items[po]=item;
            return {
                name:rule.name,
                des:rule.des,
                items:rule.items
            }
        })
    }   
    //更新到已有Rule
    const updateRule=(name,des,_id)=>{
        const data={
            name:name,
            des:des,
            test:'test',
            items:rule.items
        }
        
        let postdata=JSON.stringify(data,(_,value)=>{if(typeof value === 'number')return undefined;return value})

        console.log(postdata);
        axios.post('https://qcwdoj.fn.thelarkcloud.com/updateRule',postdata,{headers:{'Content-Type':'application/json'},params:{id:_id}})
        .then(
            alert('修改成功！')
        )
        .catch((err)=>{console.log(err)});
    }
    //提交新Rule
    const createRule=async (name,des)=>{
        const data={
            name:name,
            des:des,
            items:rule.items
        }
        let postdata=JSON.stringify(data,(_,value)=>{if(typeof value === 'number')return undefined;return value}) 
        axios.post('https://qcwdoj.fn.thelarkcloud.com/requestly',postdata,{headers:{'Content-Type':'application/json'}})
        .then(
            alert('新建成功！')
        )
        .catch((err)=>{console.log(err)});
    }
    const deleteRule=async (_id)=>{
        await axios.get('https://qcwdoj.fn.thelarkcloud.com/deleteTableData',{
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