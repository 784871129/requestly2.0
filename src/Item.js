import React from 'react';
import {Form,Card,Space,Input,Button} from 'antd';

import {DeleteOutlined} from '@ant-design/icons'

function debounce(func,delay){
    let timer=null;
    return function(){
        if(timer) clearTimeout(timer);
        timer=setTimeout(func,delay);
    }
}

function Item(props){
    const initdata=props.data;    

    return (
        <Card 
        style={{width:900,alignSelf:"center",margin:10}}>
           <Form  name='item' initialValues={{
               header:initdata.header,
               value:initdata.value,
               url:initdata.url
           }}
            onValuesChange={(_,allChangedValues)=>{props.handleItemDataChange(props.index,allChangedValues)}}
           >
        <Space>
            <Form.Item name='header' label='Header'  rules={[
                {
                    required:true
                }
            ]}>
                <Input addonBefore='Header' placeholder='Header Name' style={{margin:10,width:372}} />
            </Form.Item>
            <Form.Item name='value' label='Value' rules={[
                {
                    required:true
                }
            ]}>
                <Input addonBefore='Value' placeholder='Header Value' style={{margin:10,width:300}} />
            </Form.Item>
            <Button 
            icon={<DeleteOutlined/>} 
            onClick={()=>{props.handleDelete(props.index)}} 
            style={{marginLeft:80}} 
            type='link' />
        </Space>
        <Form.Item name='url' label='Url'>
        <Input 
            placeholder='Leave this field empty to apply rule to all URLs' 
            style={{margin:10,width:700}}
            />
        </Form.Item>
    </Form>
        </Card>
    )
}
export default Item;