import { useState } from 'react';
import axios from 'axios';

function useProject(){
    const [list,setList]=useState([]);
    const [loading,setLoading]=useState(true);
    const getList=async ()=>{
        await axios.get('https://qcwdoj.fn.thelarkcloud.com/getList')
        .then((res)=>{
            //初始化列表
            setLoading(true);
            setList(()=>{
                return res.data.map((item)=>{
                    return {
                        _id:item._id,
                        key:item._id,
                        name:item.name,
                        description:item.des,
                        create_time:item.updatedAt
                    }
                })
            })
            setLoading(false);
        })
        .catch((err)=>{
            console.log(err)
            setLoading(false)
        })
    }

    return [{list,loading},{getList}];
}

function debounce(func,delay){
    let timer=null;
    return function(){
        if(timer) clearTimeout(timer);
        timer=setTimeout(func,delay);
    }
}





export default useProject 